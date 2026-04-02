import { GoogleGenAI, Type } from "@google/genai";
import { ProposalData, VoiceTone, ExperienceLevel } from "../types";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function generateProposal(
  jobDescription: string,
  tone: VoiceTone = "Friendly",
  skills: string = "",
  experience: ExperienceLevel = "Senior (5-8 years)"
): Promise<ProposalData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Analyze the following Upwork job description and my profile to generate a winning proposal.
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      MY PROFILE:
      Skills: ${skills}
      Experience Level: ${experience}
      Tone: ${tone}
    `,
    config: {
      systemInstruction: "You are a professional Upwork proposal writer. Return your response in valid JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          coverLetter: { type: Type.STRING, description: "The full cover letter text" },
          suggestedRate: { type: Type.STRING, description: "Suggested hourly rate range" },
          estimatedTime: { type: Type.STRING, description: "Estimated project duration" },
          strategyToWin: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          confidenceScore: { type: Type.NUMBER, description: "Match percentage (0-100)" }
        },
        required: ["coverLetter", "suggestedRate", "estimatedTime", "strategyToWin", "confidenceScore"]
      }
    }
  });

  const text = response.text;
  return JSON.parse(text || "{}");
}

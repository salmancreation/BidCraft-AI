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
      
      CRITICAL INSTRUCTIONS:
      1. COVER LETTER: Use Markdown for formatting. Include bullet points for skills/achievements. Make it highly readable, professional, and personalized. Avoid "AI-isms".
      2. SUGGESTED RATE: Be realistic. Research current Upwork market rates for ${experience} level in this niche. Provide a specific range (e.g., "$45–$55/hr").
      3. STRATEGY: Provide 3 actionable, tactical points to win this specific client.
    `,
    config: {
      systemInstruction: "You are a world-class Upwork proposal consultant. You specialize in high-conversion, human-like writing and strategic bidding. You always return valid JSON.",
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

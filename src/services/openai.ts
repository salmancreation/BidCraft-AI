import OpenAI from 'openai';
import { ProposalData, VoiceTone, ExperienceLevel } from "../types";

// Note: In a production app, you should call this from a backend to hide your API key.
// For this demo, we use dangerouslyAllowBrowser: true.
const apiKey = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateProposal(
  jobDescription: string,
  tone: VoiceTone = "Friendly",
  skills: string = "",
  experience: ExperienceLevel = "Senior (5-8 years)"
): Promise<ProposalData> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional Upwork proposal writer. 
        Analyze the job description and user profile to generate a winning proposal.
        Return the response in valid JSON format matching this schema:
        {
          "coverLetter": "string (the full cover letter text)",
          "suggestedRate": "string (e.g. '$12–15/hr')",
          "estimatedTime": "string (e.g. '5–7 hours')",
          "strategyToWin": [
            { "title": "string", "description": "string" }
          ],
          "confidenceScore": 85
        }`
      },
      {
        role: "user",
        content: `
          JOB DESCRIPTION:
          ${jobDescription}
          
          MY PROFILE:
          Skills: ${skills}
          Experience Level: ${experience}
          Tone: ${tone}
        `
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = completion.choices[0].message.content;
  return JSON.parse(content || "{}");
}

export interface ProposalData {
  coverLetter: string;
  suggestedRate: string;
  estimatedTime: string;
  strategyToWin: {
    title: string;
    description: string;
  }[];
  confidenceScore: number;
}

export type VoiceTone = 'Friendly' | 'Expert' | 'Confident';
export type ExperienceLevel = 'Junior (0-2 years)' | 'Mid-level (2-5 years)' | 'Senior (5-8 years)' | 'Expert (8+ years)';

export interface StrategyPoint {
  title: string;
  description: string;
}

export interface ProposalData {
  id?: string;
  uid?: string;
  jobDescription?: string;
  coverLetter: string;
  suggestedRate: string;
  estimatedTime: string;
  strategyToWin: StrategyPoint[];
  confidenceScore: number;
  createdAt?: string;
  tone?: VoiceTone;
  skills?: string[];
}

export type VoiceTone = 'Friendly' | 'Expert' | 'Confident';
export type ExperienceLevel = 'Junior (0-2 years)' | 'Mid-level (2-5 years)' | 'Senior (5-8 years)' | 'Expert (8+ years)';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
  defaultSkills: string[];
  defaultExperience: ExperienceLevel;
}

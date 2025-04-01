export type WritingType = "essay" | "letter" | "story" | "academic";

export interface Topic {
  id: string;
  title: string;
}

export interface TopicGroup {
  id: string;
  title: string;
  topics: Topic[];
}

export interface WritingPrompt {
  id: string;
  type: WritingType;
  topicId: string;
  title: string;
  description: string;
  tips: string[];
  wordLimit: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: number; // in minutes
}

export interface WritingFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string;
  correctedText: string;
}

export interface WritingSubmission {
  id: string;
  promptId: string;
  content: string;
  submittedAt: string;
  feedback?: WritingFeedback;
}

export interface AiSuggestion {
  id: string;
  promptId: string;
  content: string;
  generatedAt: string;
}

export interface UserProgress {
  completedPrompts: string[];
  totalAttempts: number;
  averageScore: number;
  strengths: string[];
  areasToImprove: string[];
}
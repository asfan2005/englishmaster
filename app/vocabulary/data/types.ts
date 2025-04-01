export type VocabularyLevel = "beginner" | "intermediate" | "advanced";

export type VocabularyCategory = 
  | "everyday" 
  | "academic" 
  | "business"
  | "technology"
  | "science"
  | "arts"
  | "social";

export interface VocabularyTopic {
  id: string;
  title: string;
  description: string;
}

export interface TopicGroup {
  category: VocabularyCategory;
  topics: VocabularyTopic[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  pronunciation: string;
  example: string;
  synonyms: string[];
  topicId: string;
  level: VocabularyLevel;
  category?: VocabularyCategory;
}

export interface VocabularySet {
  id: string;
  title: string;
  description: string;
  level: VocabularyLevel;
  topicId: string;
  category: VocabularyCategory;
  words: VocabularyWord[];
}

export interface UserVocabularyProgress {
  wordId: string;
  status: "learning" | "familiar" | "mastered";
  lastReviewed: string; // ISO date string
  nextReviewDate: string; // ISO date string
  reviewCount: number;
} 
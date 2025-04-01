import { ReactNode } from "react";

export interface ReadingLevel {
  id: string;
  name: string;
}

export interface ReadingType {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  example?: string;
}

export interface PronunciationItem {
  title: string;
  text: string;
  focusPoints?: string[];
}

export interface ReadingQuestion {
  id: string;
  type: "mcq" | "truefalse" | "shortanswer";
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ReadingExercise {
  id: string;
  title: string;
  level: string;
  type: string;
  text: string;
  description: string;
  estimatedTime: number;
  difficulty: "easy" | "medium" | "hard" | "very hard";
  vocabulary?: VocabularyItem[];
  questions?: ReadingQuestion[];
  pronunciation?: PronunciationItem[];
  source?: string;
  sourceUrl?: string;
}
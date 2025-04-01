// Grammar level types
export type GrammarLevel = "beginner" | "intermediate" | "advanced" | "all";

// Grammar category types
export type GrammarCategory = 
  | "tenses" 
  | "articles" 
  | "prepositions" 
  | "modals" 
  | "conditionals" 
  | "passive-voice" 
  | "reported-speech" 
  | "relative-clauses" 
  | "conjunctions" 
  | "all";

// Interface for grammar topics
export interface GrammarTopic {
  id: string;
  title: string;
  description?: string;
}

// Interface for grammar rules
export interface GrammarRule {
  id: string;
  title: string;
  description: string;
  explanation: string;
  simpleExplanation?: string;
  examples: string[];
  exercises: GrammarExercise[];
  level: GrammarLevel | "all";
  category: GrammarCategory;
  relatedRules?: string[];
  commonMistakes?: string;
  comparisonNotes?: string;
}

// Interface for grammar exercises
export interface GrammarExercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  type: "multiple-choice" | "fill-in-blank" | "reorder" | "correct-errors";
}

// Interface for user progress tracking
export interface UserGrammarProgress {
  ruleId: string;
  status: "learning" | "familiar" | "mastered";
  lastPracticed: string; // ISO string date
  nextReviewDate: string; // ISO string date
  practiceCount: number;
} 
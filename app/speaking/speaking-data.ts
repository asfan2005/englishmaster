import { BookOpen, Mic, Globe, Briefcase, Plane } from "lucide-react";

export const speakingLevels = [
  { id: "beginner", name: "Beginner (A1-A2)" },
  { id: "intermediate", name: "Intermediate (B1-B2)" },
  { id: "advanced", name: "Advanced (C1-C2)" },
  { id: "ielts", name: "IELTS Practice" },
];

export const speakingTopics = [
  {
    id: "1",
    title: "Your Hometown",
    description: "Describe your hometown. You should say: where it is located, what it is known for, what you like about it, and how it has changed over the years.",
    keyPoints: ["Location", "Famous for", "Personal opinion", "Changes"],
    category: "personal",
    level: ["beginner", "intermediate"]
  },
  {
    id: "2",
    title: "Technology Impact",
    description: "How has technology impacted your daily life? Discuss the positive and negative effects of technology on society and personal interactions.",
    keyPoints: ["Daily usage", "Benefits", "Drawbacks", "Future outlook"],
    category: "technology",
    level: ["intermediate", "advanced"]
  },
  {
    id: "3",
    title: "Environmental Challenges",
    description: "What do you think is the most serious environmental challenge facing our planet? Why is it important and what can individuals do to help address it?",
    keyPoints: ["Key challenge", "Importance", "Solutions", "Personal actions"],
    category: "environment",
    level: ["intermediate", "advanced", "ielts"]
  },
  {
    id: "4",
    title: "Favorite Hobby",
    description: "Describe a hobby that you enjoy. You should say: what the hobby is, how long you have been doing it, how you got interested in it, and why you enjoy it.",
    keyPoints: ["Activity", "Duration", "Initial interest", "Benefits"],
    category: "personal",
    level: ["beginner", "intermediate"]
  },
  {
    id: "5",
    title: "Education System",
    description: "Discuss the education system in your country. What are its strengths and weaknesses? How would you improve it if you could?",
    keyPoints: ["Current system", "Strengths", "Weaknesses", "Improvements"],
    category: "education",
    level: ["intermediate", "advanced", "ielts"]
  },
  {
    id: "6",
    title: "Cultural Traditions",
    description: "Explain an important cultural tradition in your country. How is it celebrated and what is its significance?",
    keyPoints: ["The tradition", "Celebration", "Meaning", "Personal experience"],
    category: "culture",
    level: ["beginner", "intermediate", "ielts"]
  },
  {
    id: "7",
    title: "Future Career",
    description: "What career would you like to pursue in the future? Why have you chosen this path and what skills do you need to develop?",
    keyPoints: ["Career choice", "Reasons", "Required skills", "Preparation"],
    category: "career",
    level: ["beginner", "intermediate"]
  },
  {
    id: "8",
    title: "Work-Life Balance",
    description: "Is work-life balance important? Discuss the challenges of maintaining work-life balance in modern society and suggest ways to improve it.",
    keyPoints: ["Importance", "Challenges", "Solutions", "Personal view"],
    category: "work",
    level: ["intermediate", "advanced", "ielts"]
  },
];

export const speakingCategories = [
  { id: "personal", name: "Personal Life", icon: Mic },
  { id: "education", name: "Education", icon: BookOpen },
  { id: "culture", name: "Culture & Society", icon: Globe },
  { id: "career", name: "Career & Work", icon: Briefcase },
  { id: "travel", name: "Travel & Places", icon: Plane },
];

export const initialFeedback = {
  overallScore: 7.5,
  categoryScores: {
    fluency: 7,
    vocabulary: 8,
    grammar: 7,
    pronunciation: 8
  },
  strengths: [
    "Good use of vocabulary related to the topic",
    "Clear structure with introduction and conclusion",
    "Natural intonation patterns"
  ],
  areasToImprove: [
    "Some hesitations affect your fluency",
    "Grammar errors with past tense forms",
    "Limited use of complex sentence structures"
  ],
  corrections: [
    {
      incorrect: "I go to the market yesterday",
      correct: "I went to the market yesterday",
      explanation: "Use past tense (went) for completed actions in the past."
    },
    {
      incorrect: "They don't believing in traditional values",
      correct: "They don't believe in traditional values",
      explanation: "After auxiliary verbs like 'don't', use the base form of the verb."
    }
  ]
};

export const sampleCorrections = [
  {
    incorrect: "I living in this city for five years",
    correct: "I have been living in this city for five years",
    explanation: "Use present perfect continuous for actions that started in the past and continue to the present."
  },
  {
    incorrect: "Yesterday I go to the beach",
    correct: "Yesterday I went to the beach",
    explanation: "Use past tense for completed actions in the past."
  },
  {
    incorrect: "She don't like spicy food",
    correct: "She doesn't like spicy food",
    explanation: "For third person singular (she/he/it), use 'doesn't' instead of 'don't'."
  },
  {
    incorrect: "I am agree with you",
    correct: "I agree with you",
    explanation: "The verb 'agree' doesn't use 'am' before it. It's not used in continuous form in this context."
  },
  {
    incorrect: "They was happy about the news",
    correct: "They were happy about the news",
    explanation: "Use 'were' (not 'was') with plural subjects like 'they'."
  }
];
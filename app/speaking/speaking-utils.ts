import { sampleCorrections } from './speaking-data';

// Random topic generatsiya qilish
export function generateRandomTopic(topics: any[]) {
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
}

// Tasodifiy elementlar tanlab olish
function getRandomElements(array: any[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Level bo'yicha score berish
export function scoreResponseBasedOnLevel(level: string) {
  let baseScore = 0;
  let fluency = 0;
  let vocabulary = 0;
  let grammar = 0;
  let pronunciation = 0;
  
  const randomCorrections = getRandomElements(sampleCorrections, 2);
  
  switch(level) {
    case "beginner":
      baseScore = 5 + Math.random() * 2;
      fluency = 4 + Math.random() * 3;
      vocabulary = 4 + Math.random() * 3;
      grammar = 4 + Math.random() * 3;
      pronunciation = 5 + Math.random() * 3;
      break;
    case "intermediate":
      baseScore = 6.5 + Math.random() * 1.5;
      fluency = 6 + Math.random() * 2;
      vocabulary = 6 + Math.random() * 2;
      grammar = 6 + Math.random() * 2;
      pronunciation = 6 + Math.random() * 2;
      break;
    case "advanced":
      baseScore = 7.5 + Math.random() * 1.5;
      fluency = 7 + Math.random() * 2;
      vocabulary = 7 + Math.random() * 2;
      grammar = 7 + Math.random() * 2;
      pronunciation = 7 + Math.random() * 2;
      break;
    case "ielts":
      baseScore = 6 + Math.random() * 3;
      fluency = 5 + Math.random() * 4;
      vocabulary = 5 + Math.random() * 4;
      grammar = 5 + Math.random() * 4;
      pronunciation = 5 + Math.random() * 4;
      break;
  }
  
  // Roundlashtirish
  baseScore = Math.round(baseScore * 10) / 10;
  fluency = Math.round(fluency);
  vocabulary = Math.round(vocabulary);
  grammar = Math.round(grammar);
  pronunciation = Math.round(pronunciation);
  
  // Strengths va kamchiliklar generatsiya qilish
  const strengths = getRandomStrengths(level);
  const areasToImprove = getRandomAreasToImprove(level);
  
  return {
    overallScore: baseScore,
    categoryScores: {
      fluency,
      vocabulary,
      grammar,
      pronunciation
    },
    strengths,
    areasToImprove,
    corrections: randomCorrections
  };
}

// Kuchli tomonlarni tanlab olish
function getRandomStrengths(level: string) {
  const allStrengths = [
    "Good use of vocabulary related to the topic",
    "Clear structure with introduction and conclusion",
    "Natural intonation patterns",
    "Effective use of connecting words",
    "Good development of ideas",
    "Appropriate use of examples to support main points",
    "Clear pronunciation of most sounds",
    "Good use of idiomatic expressions",
    "Consistent use of appropriate tenses",
    "Good eye contact and body language",
    "Effective stress on important words",
    "Appropriate speaking pace"
  ];
  
  const advancedStrengths = [
    "Excellent range of sophisticated vocabulary",
    "Flexible use of complex grammatical structures",
    "Very natural rhythm and intonation patterns",
    "Skilled use of hedging language and qualifiers",
    "Excellent development of abstract concepts",
    "Strong critical thinking in responses"
  ];
  
  let strengthsPool = [...allStrengths];
  if (level === "advanced" || level === "ielts") {
    strengthsPool = [...strengthsPool, ...advancedStrengths];
  }
  
  return getRandomElements(strengthsPool, 3);
}

// Rivojlantirishga muhtoj tomonlarni tanlab olish
function getRandomAreasToImprove(level: string) {
  const commonAreas = [
    "Some hesitations affect your fluency",
    "Grammar errors with past tense forms",
    "Limited use of complex sentence structures",
    "Pronunciation of certain sounds needs improvement",
    "More linking words would improve coherence",
    "More detailed examples would strengthen your answer",
    "Try to elaborate more on key points",
    "Work on reducing filler words like 'um', 'er'",
    "More varied vocabulary would enhance your response",
    "Some words were mispronounced"
  ];
  
  const beginnerAreas = [
    "Basic sentence structure needs improvement",
    "Limited vocabulary range",
    "Difficulty with verb tenses",
    "Frequent long pauses affect understanding",
    "Word stress patterns need work"
  ];
  
  const advancedAreas = [
    "Minor issues with article usage",
    "Could use more sophisticated cohesive devices",
    "Some idioms were used incorrectly",
    "Occasional unnatural collocations",
    "More nuanced vocabulary would be appropriate for this level"
  ];
  
  let areasPool = [...commonAreas];
  if (level === "beginner") {
    areasPool = [...areasPool, ...beginnerAreas];
  } else if (level === "advanced" || level === "ielts") {
    areasPool = [...areasPool, ...advancedAreas];
  }
  
  return getRandomElements(areasPool, 3);
}

// Audio duration qayta hisoblash
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Vaqtni formatlab berish
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
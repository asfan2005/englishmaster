import { TopicGroup, VocabularySet, VocabularyWord, VocabularyCategory } from "./types";
import { BookOpen, Briefcase, BrainCircuit, Atom, Palette, Users } from "lucide-react";
import { everydayWords } from "./everyday-words";
import { academicWords } from "./academic-words";
import { businessWords } from "./business-words";
import { technologyWords } from "./technology-words";
import { scienceWords } from "./science-words";
import { artsWords } from "./arts-words";
import { socialWords } from "./social-words";

export const categoryIcons: Record<VocabularyCategory, any> = {
  everyday: BookOpen,
  academic: BookOpen,
  business: Briefcase,
  technology: BrainCircuit,
  science: Atom,
  arts: Palette,
  social: Users
};

export const topicGroups: TopicGroup[] = [
  {
    category: "everyday",
    topics: [
      {
        id: "daily-routines",
        title: "Daily Routines",
        description: "Vocabulary related to everyday activities and routines"
      },
      {
        id: "food-and-dining",
        title: "Food and Dining",
        description: "Words related to food, cooking, and eating out"
      },
      {
        id: "travel-and-transportation",
        title: "Travel and Transportation",
        description: "Vocabulary for getting around and visiting new places"
      }
    ]
  },
  {
    category: "academic",
    topics: [
      {
        id: "education",
        title: "Education",
        description: "Words related to learning, teaching and academic institutions"
      },
      {
        id: "research",
        title: "Research Methods",
        description: "Vocabulary for academic research and scholarly writing"
      },
      {
        id: "critical-thinking",
        title: "Critical Thinking",
        description: "Terms related to analysis, evaluation, and logical reasoning"
      }
    ]
  },
  {
    category: "business",
    topics: [
      {
        id: "marketing",
        title: "Marketing",
        description: "Terminology related to promotion, advertising, and market analysis"
      },
      {
        id: "finance",
        title: "Finance",
        description: "Vocabulary related to money management, investing, and financial reporting"
      },
      {
        id: "management",
        title: "Management",
        description: "Terms related to leadership, organization, and business administration"
      }
    ]
  },
  {
    category: "technology",
    topics: [
      {
        id: "computing",
        title: "Computing",
        description: "Words related to computers, software, and digital technology"
      },
      {
        id: "mobile-technology",
        title: "Mobile Technology",
        description: "Vocabulary for smartphones, apps, and mobile computing"
      },
      {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        description: "Terms related to AI, machine learning, and neural networks"
      }
    ]
  },
  {
    category: "science",
    topics: [
      {
        id: "biology",
        title: "Biology",
        description: "Vocabulary related to living organisms and biological processes"
      },
      {
        id: "environmental-science",
        title: "Environmental Science",
        description: "Terms related to ecology, sustainability, and environmental issues"
      },
      {
        id: "physics",
        title: "Physics",
        description: "Words related to matter, energy, and the fundamental forces"
      }
    ]
  },
  {
    category: "arts",
    topics: [
      {
        id: "visual-arts",
        title: "Visual Arts",
        description: "Vocabulary for painting, drawing, sculpture, and other visual media"
      },
      {
        id: "literature",
        title: "Literature",
        description: "Terms related to fiction, poetry, and literary analysis"
      },
      {
        id: "performing-arts",
        title: "Performing Arts",
        description: "Words related to theater, dance, and musical performance"
      }
    ]
  },
  {
    category: "social",
    topics: [
      {
        id: "relationships",
        title: "Relationships",
        description: "Vocabulary related to personal and professional relationships"
      },
      {
        id: "social-media",
        title: "Social Media",
        description: "Terms related to online social networks and digital communication"
      },
      {
        id: "culture",
        title: "Culture",
        description: "Words related to customs, traditions, and social norms"
      }
    ]
  }
];

// Combine all words
const allWords: VocabularyWord[] = [
  ...everydayWords,
  ...academicWords,
  ...businessWords,
  ...technologyWords,
  ...scienceWords,
  ...artsWords,
  ...socialWords
];

// Create vocabulary sets from the categorized word lists
export const vocabularySets: VocabularySet[] = [
  // Everyday
  {
    id: "everyday-beginner",
    title: "Everyday Basics",
    description: "Essential vocabulary for daily conversations",
    level: "beginner",
    topicId: "daily-routines",
    category: "everyday",
    words: allWords.filter(word => word.category === "everyday" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "everyday-intermediate",
    title: "Everyday Expression",
    description: "Intermediate vocabulary for daily situations",
    level: "intermediate",
    topicId: "daily-routines",
    category: "everyday",
    words: allWords.filter(word => word.category === "everyday" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "everyday-advanced",
    title: "Everyday Fluency",
    description: "Advanced vocabulary for sophisticated daily communication",
    level: "advanced",
    topicId: "daily-routines",
    category: "everyday",
    words: allWords.filter(word => word.category === "everyday" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "food-dining-vocabulary",
    title: "Food and Dining",
    description: "Vocabulary related to food, cooking, and dining out",
    level: "intermediate",
    topicId: "food-and-dining",
    category: "everyday",
    words: allWords.filter(word => word.topicId === "food-and-dining").slice(0, 15)
  },
  {
    id: "travel-transportation-vocabulary",
    title: "Travel and Transportation",
    description: "Words related to travel, transportation, and exploration",
    level: "intermediate",
    topicId: "travel-and-transportation",
    category: "everyday",
    words: allWords.filter(word => word.topicId === "travel-and-transportation").slice(0, 15)
  },
  
  // Academic
  {
    id: "academic-beginner",
    title: "Academic Basics",
    description: "Fundamental vocabulary for academic settings",
    level: "beginner",
    topicId: "education",
    category: "academic",
    words: allWords.filter(word => word.category === "academic" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "academic-intermediate",
    title: "Academic Expression",
    description: "Intermediate academic vocabulary",
    level: "intermediate",
    topicId: "education",
    category: "academic",
    words: allWords.filter(word => word.category === "academic" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "academic-advanced",
    title: "Advanced Academic Discourse",
    description: "Sophisticated vocabulary for scholarly contexts",
    level: "advanced",
    topicId: "education",
    category: "academic",
    words: allWords.filter(word => word.category === "academic" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "research-methods-vocabulary",
    title: "Research Methods",
    description: "Terminology related to academic research",
    level: "advanced",
    topicId: "research",
    category: "academic",
    words: allWords.filter(word => word.topicId === "research").slice(0, 15)
  },
  {
    id: "critical-thinking-vocabulary",
    title: "Critical Thinking",
    description: "Vocabulary for analysis and logical reasoning",
    level: "intermediate",
    topicId: "critical-thinking",
    category: "academic",
    words: allWords.filter(word => word.topicId === "critical-thinking").slice(0, 15)
  },
  
  // Business
  {
    id: "business-beginner",
    title: "Business Basics",
    description: "Essential business vocabulary",
    level: "beginner",
    topicId: "management",
    category: "business",
    words: allWords.filter(word => word.category === "business" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "business-intermediate",
    title: "Business Communication",
    description: "Intermediate vocabulary for business contexts",
    level: "intermediate",
    topicId: "management",
    category: "business",
    words: allWords.filter(word => word.category === "business" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "business-advanced",
    title: "Advanced Business Terminology",
    description: "Sophisticated business vocabulary",
    level: "advanced",
    topicId: "management",
    category: "business",
    words: allWords.filter(word => word.category === "business" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "marketing-vocabulary",
    title: "Marketing Terminology",
    description: "Words related to promotion and advertising",
    level: "intermediate",
    topicId: "marketing",
    category: "business",
    words: allWords.filter(word => word.topicId === "marketing").slice(0, 15)
  },
  {
    id: "finance-vocabulary",
    title: "Financial Terms",
    description: "Vocabulary for financial discussions",
    level: "advanced",
    topicId: "finance",
    category: "business",
    words: allWords.filter(word => word.topicId === "finance").slice(0, 15)
  },
  
  // Technology
  {
    id: "technology-beginner",
    title: "Technology Basics",
    description: "Fundamental technology vocabulary",
    level: "beginner",
    topicId: "computing",
    category: "technology",
    words: allWords.filter(word => word.category === "technology" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "technology-intermediate",
    title: "Technology in Use",
    description: "Intermediate technology vocabulary",
    level: "intermediate",
    topicId: "computing",
    category: "technology",
    words: allWords.filter(word => word.category === "technology" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "technology-advanced",
    title: "Advanced Technology Concepts",
    description: "Sophisticated technology terminology",
    level: "advanced",
    topicId: "computing",
    category: "technology",
    words: allWords.filter(word => word.category === "technology" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "mobile-technology-vocabulary",
    title: "Mobile Technology",
    description: "Words related to mobile devices and apps",
    level: "intermediate",
    topicId: "mobile-technology",
    category: "technology",
    words: allWords.filter(word => word.topicId === "mobile-technology").slice(0, 15)
  },
  {
    id: "ai-vocabulary",
    title: "Artificial Intelligence",
    description: "Terminology for AI and machine learning",
    level: "advanced",
    topicId: "artificial-intelligence",
    category: "technology",
    words: allWords.filter(word => word.topicId === "artificial-intelligence").slice(0, 15)
  },
  
  // Science
  {
    id: "science-beginner",
    title: "Science Basics",
    description: "Fundamental scientific vocabulary",
    level: "beginner",
    topicId: "biology",
    category: "science",
    words: allWords.filter(word => word.category === "science" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "science-intermediate",
    title: "Scientific Terminology",
    description: "Intermediate scientific vocabulary",
    level: "intermediate",
    topicId: "biology",
    category: "science",
    words: allWords.filter(word => word.category === "science" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "science-advanced",
    title: "Advanced Scientific Concepts",
    description: "Sophisticated scientific terminology",
    level: "advanced",
    topicId: "physics",
    category: "science",
    words: allWords.filter(word => word.category === "science" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "biology-vocabulary",
    title: "Biology Terms",
    description: "Vocabulary related to living organisms",
    level: "intermediate",
    topicId: "biology",
    category: "science",
    words: allWords.filter(word => word.topicId === "biology").slice(0, 15)
  },
  {
    id: "environmental-vocabulary",
    title: "Environmental Science",
    description: "Terms related to ecology and sustainability",
    level: "intermediate",
    topicId: "environmental-science",
    category: "science",
    words: allWords.filter(word => word.topicId === "environmental-science").slice(0, 15)
  },
  
  // Arts
  {
    id: "arts-beginner",
    title: "Arts Basics",
    description: "Fundamental arts vocabulary",
    level: "beginner",
    topicId: "visual-arts",
    category: "arts",
    words: allWords.filter(word => word.category === "arts" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "arts-intermediate",
    title: "Artistic Expression",
    description: "Intermediate arts vocabulary",
    level: "intermediate",
    topicId: "visual-arts",
    category: "arts",
    words: allWords.filter(word => word.category === "arts" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "arts-advanced",
    title: "Advanced Artistic Concepts",
    description: "Sophisticated arts terminology",
    level: "advanced",
    topicId: "performing-arts",
    category: "arts",
    words: allWords.filter(word => word.category === "arts" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "visual-arts-vocabulary",
    title: "Visual Arts",
    description: "Vocabulary for painting, drawing, and sculpture",
    level: "intermediate",
    topicId: "visual-arts",
    category: "arts",
    words: allWords.filter(word => word.topicId === "visual-arts").slice(0, 15)
  },
  {
    id: "literature-vocabulary",
    title: "Literature",
    description: "Terms related to fiction and poetry",
    level: "intermediate",
    topicId: "literature",
    category: "arts",
    words: allWords.filter(word => word.topicId === "literature").slice(0, 15)
  },
  
  // Social
  {
    id: "social-beginner",
    title: "Social Basics",
    description: "Fundamental social vocabulary",
    level: "beginner",
    topicId: "relationships",
    category: "social",
    words: allWords.filter(word => word.category === "social" && word.level === "beginner").slice(0, 15)
  },
  {
    id: "social-intermediate",
    title: "Social Interaction",
    description: "Intermediate social vocabulary",
    level: "intermediate",
    topicId: "relationships",
    category: "social",
    words: allWords.filter(word => word.category === "social" && word.level === "intermediate").slice(0, 15)
  },
  {
    id: "social-advanced",
    title: "Advanced Social Concepts",
    description: "Sophisticated social terminology",
    level: "advanced",
    topicId: "culture",
    category: "social",
    words: allWords.filter(word => word.category === "social" && word.level === "advanced").slice(0, 15)
  },
  {
    id: "relationships-vocabulary",
    title: "Relationships",
    description: "Vocabulary for personal and professional relationships",
    level: "intermediate",
    topicId: "relationships",
    category: "social",
    words: allWords.filter(word => word.topicId === "relationships").slice(0, 15)
  },
  {
    id: "social-media-vocabulary",
    title: "Social Media",
    description: "Terms related to online social networks",
    level: "intermediate",
    topicId: "social-media",
    category: "social",
    words: allWords.filter(word => word.topicId === "social-media").slice(0, 15)
  }
];

// Helper function to get all words
export const getAllWords = () => {
  return allWords;
};

// Helper function to count by level and topic
export const countByLevelAndTopic = () => {
  const counts: Record<string, Record<string, number>> = {};
  
  vocabularySets.forEach(set => {
    if (!counts[set.level]) {
      counts[set.level] = {};
    }
    
    counts[set.level][set.topicId] = (counts[set.level][set.topicId] || 0) + set.words.length;
  });
  
  return counts;
};

// Helper function to count by type and topic
export const countByTypeAndTopic = () => {
  const counts: Record<string, Record<string, number>> = {
    everyday: {},
    academic: {},
    business: {},
    technology: {},
    science: {},
    arts: {},
    social: {}
  };
  
  vocabularySets.forEach(set => {
    const category = set.category;
    const topicId = set.topicId;
    
    if (!counts[category]) {
      counts[category] = {};
    }
    
    counts[category][topicId] = (counts[category][topicId] || 0) + set.words.length;
  });
  
  return counts;
}; 
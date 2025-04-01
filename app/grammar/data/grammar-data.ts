import { GrammarLevel, GrammarCategory, GrammarTopic, GrammarRule } from "./types";

// Define difficulty levels
export const difficultyLevels: Record<GrammarLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  all: "All Levels"
};

// Define grammar topics
export const grammarTopics: GrammarTopic[] = [
  {
    id: "tenses",
    title: "Tenses",
    description: "Learn about different tenses in English"
  },
  {
    id: "articles",
    title: "Articles",
    description: "Understanding when to use a, an, and the"
  },
  {
    id: "prepositions",
    title: "Prepositions",
    description: "Learn about words that show relationships between other words"
  },
  {
    id: "modals",
    title: "Modal Verbs",
    description: "Verbs that express necessity, possibility, permission or ability"
  },
  {
    id: "conditionals",
    title: "Conditionals",
    description: "Sentences discussing hypothetical situations and their consequences"
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    description: "Sentences where the subject receives the action"
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    description: "How to report what someone else said"
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    description: "Clauses that provide additional information about a noun"
  },
  {
    id: "conjunctions",
    title: "Conjunctions",
    description: "Words that connect clauses, phrases, or words"
  }
];

// Define grammar rules
export const grammarRules: GrammarRule[] = [
  // Present Simple Tense
  {
    id: "present-simple",
    title: "Present Simple Tense",
    description: "The present simple tense is used to describe habits, unchanging situations, general truths, and fixed arrangements.",
    explanation: "We use the present simple tense for things that happen regularly or for facts that are always true. For the third person singular (he/she/it), we add -s or -es to the verb.",
    simpleExplanation: "Use this tense for things that happen regularly or facts that don't change.",
    examples: [
      "I work in London.",
      "She lives in Paris.",
      "The Earth revolves around the Sun.",
      "The train leaves at 6 PM every day."
    ],
    exercises: [
      {
        id: "ps-ex1",
        question: "She ____ (work) as a doctor.",
        options: ["work", "works", "working", "is working"],
        correctAnswer: "works",
        explanation: "For third person singular (she), we add -s to the verb in present simple.",
        type: "multiple-choice"
      },
      {
        id: "ps-ex2",
        question: "We ____ (not/go) to the movies very often.",
        correctAnswer: "don't go",
        explanation: "For negative forms in present simple, we use don't/doesn't + base form of the verb.",
        type: "fill-in-blank"
      }
    ],
    level: "beginner",
    category: "tenses",
    commonMistakes: "A common mistake is forgetting to add -s for third person singular or using continuous tense for general facts."
  },
  
  // Present Continuous Tense
  {
    id: "present-continuous",
    title: "Present Continuous Tense",
    description: "The present continuous tense is used to describe actions that are happening now or around now.",
    explanation: "We form the present continuous tense with the present tense of the verb 'to be' + the present participle (verb + -ing).",
    simpleExplanation: "Use this tense for actions happening right now or around this time period.",
    examples: [
      "I am working on a project right now.",
      "They are playing tennis this afternoon.",
      "She is studying for her exams this week.",
      "Look! It is raining."
    ],
    exercises: [
      {
        id: "pc-ex1",
        question: "What ____ you ____ (do) right now?",
        correctAnswer: "are doing",
        explanation: "Present continuous is formed with am/is/are + verb-ing.",
        type: "fill-in-blank"
      },
      {
        id: "pc-ex2",
        question: "She ____ (not/work) today because she's on vacation.",
        options: ["doesn't work", "isn't working", "not working", "doesn't working"],
        correctAnswer: "isn't working",
        explanation: "Negative form of present continuous is am/is/are + not + verb-ing.",
        type: "multiple-choice"
      }
    ],
    level: "beginner",
    category: "tenses",
    relatedRules: ["present-simple"],
    comparisonNotes: "Unlike the present simple (which is used for habits and general truths), the present continuous is used for actions happening at or around the moment of speaking."
  },
  
  // Definite and Indefinite Articles
  {
    id: "articles",
    title: "Definite and Indefinite Articles",
    description: "Articles are used before nouns to show whether you're talking about something specific or general.",
    explanation: "Use 'the' (definite article) for specific nouns and 'a/an' (indefinite articles) for general or non-specific nouns. Use 'a' before consonant sounds and 'an' before vowel sounds.",
    simpleExplanation: "Use 'the' when talking about something specific that both speaker and listener know about. Use 'a/an' when introducing something for the first time or talking about any example of something.",
    examples: [
      "I saw a dog. The dog was chasing a cat.",
      "She's an engineer. The engineer who designed this building won an award.",
      "I need an umbrella because it's raining.",
      "The sun rises in the east."
    ],
    exercises: [
      {
        id: "art-ex1",
        question: "Can you pass me ____ salt, please?",
        options: ["a", "an", "the", "no article"],
        correctAnswer: "the",
        explanation: "We use 'the' for specific things that both people know about. There's typically only one salt shaker at the table.",
        type: "multiple-choice"
      },
      {
        id: "art-ex2",
        question: "She wants to be ____ doctor when she grows up.",
        correctAnswer: "a",
        explanation: "We use 'a' before consonant sounds when talking about jobs or professions in a general sense.",
        type: "fill-in-blank"
      }
    ],
    level: "beginner",
    category: "articles",
    commonMistakes: "Common mistakes include using 'a' instead of 'an' before vowel sounds, using articles with uncountable nouns, or using 'the' when talking about things in general."
  },
  
  // Prepositions of Place
  {
    id: "prepositions-place",
    title: "Prepositions of Place",
    description: "Prepositions of place show the position or location of one thing in relation to another.",
    explanation: "Common prepositions of place include 'in', 'on', 'at', 'under', 'above', 'below', 'between', 'behind', 'in front of', and 'next to'.",
    simpleExplanation: "These words help us describe where things are located.",
    examples: [
      "The book is on the table.",
      "She lives in London.",
      "The cat is under the bed.",
      "We'll meet at the station."
    ],
    exercises: [
      {
        id: "pp-ex1",
        question: "The keys are ____ the drawer.",
        options: ["in", "on", "at", "between"],
        correctAnswer: "in",
        explanation: "'In' is used for enclosed spaces or areas.",
        type: "multiple-choice"
      },
      {
        id: "pp-ex2",
        question: "The picture is hanging ____ the wall.",
        correctAnswer: "on",
        explanation: "'On' is used for surfaces.",
        type: "fill-in-blank"
      }
    ],
    level: "beginner",
    category: "prepositions",
    commonMistakes: "Common mistakes include confusing 'in', 'on', and 'at', which have specific uses for locations."
  },
  
  // Modal Verbs - Can, Could
  {
    id: "modals-ability",
    title: "Modal Verbs: Can and Could",
    description: "Modal verbs 'can' and 'could' are used to express ability, possibility, permission, and requests.",
    explanation: "We use 'can' for present ability or permission, and 'could' for past ability or for more polite requests.",
    simpleExplanation: "Use 'can' to talk about what you are able to do now, and 'could' to talk about what you were able to do in the past or to make polite requests.",
    examples: [
      "I can swim. (ability)",
      "Can I use your phone? (permission)",
      "She could play the piano when she was young. (past ability)",
      "Could you help me with this? (polite request)"
    ],
    exercises: [
      {
        id: "modal-ex1",
        question: "She ____ speak three languages fluently.",
        options: ["can", "could", "may", "might"],
        correctAnswer: "can",
        explanation: "'Can' is used to express present ability.",
        type: "multiple-choice"
      },
      {
        id: "modal-ex2",
        question: "I ____ ride a bike when I was a child, but now I prefer driving.",
        correctAnswer: "could",
        explanation: "'Could' is used for past ability.",
        type: "fill-in-blank"
      }
    ],
    level: "intermediate",
    category: "modals",
    relatedRules: ["modals-permission", "modals-possibility"],
    commonMistakes: "A common mistake is using 'can' instead of 'could' when talking about past abilities."
  },
  
  // First Conditional
  {
    id: "first-conditional",
    title: "First Conditional",
    description: "The first conditional is used to talk about future possible situations and their probable results.",
    explanation: "We form the first conditional with 'if + present simple' in the condition clause, and 'will + base form' in the result clause.",
    simpleExplanation: "Use this structure to talk about real or likely situations in the future and their consequences.",
    examples: [
      "If it rains tomorrow, we will cancel the picnic.",
      "She will call you if she has time.",
      "If you don't study, you won't pass the exam.",
      "Will you be upset if I don't come to the party?"
    ],
    exercises: [
      {
        id: "fc-ex1",
        question: "If you ____ (study) hard, you ____ (pass) the exam.",
        correctAnswer: "study, will pass",
        explanation: "In the first conditional, use present simple after 'if' and will + base form in the result clause.",
        type: "fill-in-blank"
      },
      {
        id: "fc-ex2",
        question: "Which sentence is in the first conditional?",
        options: [
          "If I had more money, I would buy a car.",
          "If she studies, she will pass the exam.",
          "If I were you, I would tell the truth.",
          "If you had called me, I would have come."
        ],
        correctAnswer: "If she studies, she will pass the exam.",
        explanation: "The first conditional uses the structure: if + present simple, will + base form.",
        type: "multiple-choice"
      }
    ],
    level: "intermediate",
    category: "conditionals",
    relatedRules: ["second-conditional", "third-conditional"],
    comparisonNotes: "Unlike the second conditional (which is used for hypothetical present situations), the first conditional is used for real possibilities in the future."
  }
]; 
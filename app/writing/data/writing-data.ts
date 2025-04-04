import { TopicGroup, WritingPrompt, UserProgress } from "./types";

export const topicGroups: TopicGroup[] = [
  {
    id: "essays_general",
    title: "General Essays",
    topics: [
      { id: "tech", title: "Technology" },
      { id: "environment", title: "Environment" },
      { id: "education", title: "Education" },
      { id: "health", title: "Health & Wellness" },
      { id: "society", title: "Society & Culture" },
    ],
  },
  {
    id: "essays_opinion",
    title: "Opinion Essays",
    topics: [
      { id: "current_events", title: "Current Events" },
      { id: "ethical_dilemmas", title: "Ethical Dilemmas" },
      { id: "controversies", title: "Controversies" },
    ],
  },
  {
    id: "letters_formal",
    title: "Formal Letters",
    topics: [
      { id: "application", title: "Application Letters" },
      { id: "complaint", title: "Complaint Letters" },
      { id: "inquiry", title: "Inquiry Letters" },
    ],
  },
  {
    id: "letters_informal",
    title: "Informal Letters",
    topics: [
      { id: "friendship", title: "Friendship Letters" },
      { id: "travel", title: "Travel Experiences" },
      { id: "personal", title: "Personal Updates" },
    ],
  },
  {
    id: "stories_fiction",
    title: "Fiction",
    topics: [
      { id: "adventure", title: "Adventure" },
      { id: "mystery", title: "Mystery" },
      { id: "scifi", title: "Science Fiction" },
      { id: "fantasy", title: "Fantasy" },
    ],
  },
  {
    id: "stories_creative",
    title: "Creative Writing",
    topics: [
      { id: "personal_narrative", title: "Personal Narrative" },
      { id: "descriptive", title: "Descriptive Writing" },
      { id: "dialogue", title: "Dialogue-Driven" },
    ],
  },
  {
    id: "academic_essays",
    title: "Academic Essays",
    topics: [
      { id: "research", title: "Research Papers" },
      { id: "analysis", title: "Critical Analysis" },
      { id: "argumentative", title: "Argumentative Essays" },
      { id: "comparison", title: "Comparison Essays" },
      { id: "literature", title: "Literature Reviews" },
    ],
  },
];

export const writingPrompts: WritingPrompt[] = [
  // General Essays - Technology
  {
    id: "tech_impact",
    type: "essay",
    topicId: "tech",
    title: "The Impact of Technology on Society",
    description: "Discuss how technology has changed human interaction and relationships in the past decade. Consider both positive and negative impacts.",
    tips: [
      "Begin with a clear thesis statement about technology's impact",
      "Provide specific examples of technological changes",
      "Consider multiple perspectives (different age groups, cultures, etc.)",
      "Discuss both benefits and drawbacks",
      "Conclude with thoughts on future implications",
    ],
    wordLimit: 500,
    difficulty: "intermediate",
    timeEstimate: 45,
  },
  {
    id: "ai_ethics",
    type: "essay",
    topicId: "tech",
    title: "Ethical Considerations in Artificial Intelligence",
    description: "Explore the ethical challenges that arise with the development and implementation of artificial intelligence technologies.",
    tips: [
      "Define AI and its current applications",
      "Identify key ethical concerns (privacy, bias, job displacement, etc.)",
      "Support your points with real-world examples",
      "Consider different stakeholder perspectives",
      "Discuss potential solutions or frameworks for ethical AI",
    ],
    wordLimit: 600,
    difficulty: "advanced",
    timeEstimate: 60,
  },
  {
    id: "digital_privacy",
    type: "essay",
    topicId: "tech",
    title: "Digital Privacy in the Information Age",
    description: "Analyze the concept of privacy in the digital era and discuss whether individuals should be concerned about sharing personal information online.",
    tips: [
      "Define digital privacy and why it matters",
      "Discuss how companies collect and use personal data",
      "Consider government surveillance and regulations",
      "Present balanced arguments about privacy concerns",
      "Offer practical tips for protecting personal information",
    ],
    wordLimit: 550,
    difficulty: "intermediate",
    timeEstimate: 50,
  },
  
  // General Essays - Environment
  {
    id: "climate_action",
    type: "essay",
    topicId: "environment",
    title: "Individual Actions for Climate Change",
    description: "Explore the effectiveness of individual actions versus systemic change in addressing climate change. What can one person really do?",
    tips: [
      "Begin with an overview of the climate crisis",
      "Analyze various individual actions (diet, transport, consumption)",
      "Compare with systemic/policy changes needed",
      "Use specific examples and data to support points",
      "Conclude with a balanced perspective on responsibility",
    ],
    wordLimit: 500,
    difficulty: "intermediate",
    timeEstimate: 45,
  },
  {
    id: "biodiversity_loss",
    type: "essay",
    topicId: "environment",
    title: "The Biodiversity Crisis: Causes and Solutions",
    description: "Examine the current biodiversity crisis, its major causes, and potential solutions to preserve Earth's species.",
    tips: [
      "Define biodiversity and explain its importance",
      "Outline major threats (habitat loss, climate change, etc.)",
      "Include specific examples of endangered ecosystems or species",
      "Discuss conservation strategies and their effectiveness",
      "Consider economic, political and social dimensions",
    ],
    wordLimit: 600,
    difficulty: "advanced",
    timeEstimate: 60,
  },
  {
    id: "sustainable_cities",
    type: "essay",
    topicId: "environment",
    title: "Designing Sustainable Cities for the Future",
    description: "Describe how cities can be redesigned to become more sustainable and environmentally friendly while maintaining quality of life.",
    tips: [
      "Identify key challenges of current urban design",
      "Explore innovations in green architecture and urban planning",
      "Discuss transportation, energy, and waste management solutions",
      "Include real-world examples of sustainable city initiatives",
      "Consider the balance between development and sustainability",
    ],
    wordLimit: 550,
    difficulty: "intermediate",
    timeEstimate: 50,
  },
  
  // Education
  {
    id: "education_reform",
    type: "essay",
    topicId: "education",
    title: "Reforming Education for the 21st Century",
    description: "Discuss how educational systems should evolve to better prepare students for the challenges and opportunities of the 21st century.",
    tips: [
      "Analyze limitations of traditional education models",
      "Identify key skills needed for future success",
      "Consider technological integration in education",
      "Explore alternative educational approaches",
      "Balance innovation with core educational values",
    ],
    wordLimit: 550,
    difficulty: "intermediate",
    timeEstimate: 50,
  },
  {
    id: "online_learning",
    type: "essay",
    topicId: "education",
    title: "The Advantages and Limitations of Online Learning",
    description: "Evaluate the benefits and drawbacks of online education compared to traditional classroom learning.",
    tips: [
      "Consider accessibility and flexibility benefits",
      "Discuss challenges in engagement and social development",
      "Examine effectiveness for different subjects and age groups",
      "Include evidence from recent research or experiences",
      "Consider a hybrid approach that combines both methods",
    ],
    wordLimit: 500,
    difficulty: "beginner",
    timeEstimate: 40,
  },
  {
    id: "lifelong_learning",
    type: "essay",
    topicId: "education",
    title: "The Importance of Lifelong Learning",
    description: "Explain why continuous learning throughout life is increasingly important in today's rapidly changing world.",
    tips: [
      "Define lifelong learning and its various forms",
      "Connect to technological and economic changes",
      "Discuss benefits to individuals and society",
      "Consider barriers to lifelong learning",
      "Provide practical suggestions for fostering a learning mindset",
    ],
    wordLimit: 450,
    difficulty: "beginner",
    timeEstimate: 35,
  },
  
  // Formal Letters
  {
    id: "job_application",
    type: "letter",
    topicId: "application",
    title: "Job Application Letter",
    description: "Write a formal letter applying for your dream job, highlighting your qualifications and explaining why you're the ideal candidate.",
    tips: [
      "Use proper business letter format",
      "Research the company and position thoroughly",
      "Highlight relevant skills and experiences",
      "Connect your background to the job requirements",
      "Keep a professional tone throughout",
    ],
    wordLimit: 350,
    difficulty: "intermediate",
    timeEstimate: 40,
  },
  {
    id: "complaint_letter",
    type: "letter",
    topicId: "complaint",
    title: "Product Complaint Letter",
    description: "Compose a formal complaint letter to a company about a defective product you purchased, requesting an appropriate resolution.",
    tips: [
      "Begin with a clear statement of the problem",
      "Include relevant details (purchase date, model number, etc.)",
      "Describe the issue factually without emotional language",
      "Specify your expected resolution clearly",
      "Be firm but courteous throughout",
    ],
    wordLimit: 300,
    difficulty: "beginner",
    timeEstimate: 30,
  },
  {
    id: "inquiry_letter",
    type: "letter",
    topicId: "inquiry",
    title: "University Program Inquiry",
    description: "Write a formal letter to a university requesting information about a specific academic program you're interested in.",
    tips: [
      "Research the university before writing",
      "Be specific about which program you're inquiring about",
      "Ask clear, well-thought-out questions",
      "Briefly explain your background and interest",
      "Express appreciation for their assistance",
    ],
    wordLimit: 300,
    difficulty: "beginner",
    timeEstimate: 25,
  },
  
  // Informal Letters
  {
    id: "friend_travel",
    type: "letter",
    topicId: "travel",
    title: "Travel Experience Letter",
    description: "Write a letter to a friend describing a memorable travel experience and why they should visit the same place.",
    tips: [
      "Use a conversational, friendly tone",
      "Include vivid descriptions of places and experiences",
      "Share personal reactions and emotions",
      "Offer specific recommendations for your friend",
      "End with questions about their recent experiences",
    ],
    wordLimit: 400,
    difficulty: "beginner",
    timeEstimate: 30,
  },
  {
    id: "personal_update",
    type: "letter",
    topicId: "personal",
    title: "Life Update to an Old Friend",
    description: "Write a letter to a childhood friend you haven't spoken to in years, updating them on your life and reconnecting.",
    tips: [
      "Begin with a warm greeting and acknowledgment of time passed",
      "Share key life events and changes since you last spoke",
      "Balance information about yourself with questions about them",
      "Include nostalgic references to shared memories",
      "Express genuine interest in renewing the friendship",
    ],
    wordLimit: 350,
    difficulty: "beginner",
    timeEstimate: 25,
  },
  {
    id: "thanks_letter",
    type: "letter",
    topicId: "friendship",
    title: "Thank You Letter to a Mentor",
    description: "Write a heartfelt letter thanking someone who has been an important mentor in your life, explaining their impact on you.",
    tips: [
      "Be specific about how they've helped you",
      "Share examples of their positive influence",
      "Express genuine emotion and gratitude",
      "Mention how their guidance continues to help you",
      "Keep the focus on their impact rather than yourself",
    ],
    wordLimit: 300,
    difficulty: "beginner",
    timeEstimate: 30,
  },
  
  // Fiction Stories
  {
    id: "adventure_story",
    type: "story",
    topicId: "adventure",
    title: "The Unexpected Journey",
    description: "Write a short adventure story about a character who accidentally discovers a hidden portal to another world during a routine day.",
    tips: [
      "Establish a relatable main character with clear motivation",
      "Create vivid descriptions of both the ordinary and fantastic settings",
      "Include sensory details to make the new world come alive",
      "Balance dialogue, action, and description",
      "Create tension through obstacles or challenges",
    ],
    wordLimit: 800,
    difficulty: "intermediate",
    timeEstimate: 60,
  },
  {
    id: "mystery_story",
    type: "story",
    topicId: "mystery",
    title: "The Missing Artifact",
    description: "Write a mystery story about a detective investigating the disappearance of a valuable artifact from a museum.",
    tips: [
      "Introduce the mystery early with interesting details",
      "Create a detective character with unique traits",
      "Include red herrings and multiple suspects",
      "Drop subtle clues throughout the narrative",
      "Ensure the resolution makes logical sense",
    ],
    wordLimit: 850,
    difficulty: "advanced",
    timeEstimate: 70,
  },
  {
    id: "scifi_story",
    type: "story",
    topicId: "scifi",
    title: "First Contact",
    description: "Write a science fiction story about humanity's first contact with an alien civilization and the unexpected misunderstanding that occurs.",
    tips: [
      "Create a believable near-future setting",
      "Develop interesting alien characteristics that drive the plot",
      "Focus on the communication challenges between species",
      "Balance technical details with human/emotional elements",
      "Explore themes of difference, understanding, and connection",
    ],
    wordLimit: 900,
    difficulty: "advanced",
    timeEstimate: 75,
  },
  
  // Academic Essays
  {
    id: "research_methods",
    type: "academic",
    topicId: "research",
    title: "Qualitative vs. Quantitative Research Methods",
    description: "Compare and contrast qualitative and quantitative research methodologies, discussing when each is most appropriate in academic research.",
    tips: [
      "Define each methodology clearly with examples",
      "Analyze strengths and limitations of each approach",
      "Consider how they can complement each other",
      "Include specific research scenarios to illustrate your points",
      "Cite relevant academic sources to support your arguments",
    ],
    wordLimit: 750,
    difficulty: "advanced",
    timeEstimate: 70,
  },
  {
    id: "literary_analysis",
    type: "academic",
    topicId: "analysis",
    title: "Symbolism in Modern Literature",
    description: "Analyze the use of symbolism in a modern literary work of your choice, explaining how it contributes to themes and character development.",
    tips: [
      "Choose specific symbols to focus on",
      "Connect symbols to broader themes in the work",
      "Support analysis with direct textual evidence",
      "Consider author's background and literary context",
      "Organize around a central thesis about symbolism's function",
    ],
    wordLimit: 800,
    difficulty: "advanced",
    timeEstimate: 75,
  },
  {
    id: "comparative_systems",
    type: "academic",
    topicId: "comparison",
    title: "Comparative Economic Systems",
    description: "Compare two different economic systems (e.g., capitalism vs. socialism, or variations within capitalism), evaluating their effectiveness and limitations.",
    tips: [
      "Define key characteristics of each system",
      "Use specific country examples as case studies",
      "Analyze based on multiple criteria (efficiency, equality, etc.)",
      "Acknowledge complexity and hybrid systems",
      "Support arguments with economic data and theory",
    ],
    wordLimit: 850,
    difficulty: "advanced",
    timeEstimate: 80,
  },
];

export const sampleUserProgress: UserProgress = {
  completedPrompts: [
    "tech_impact",
    "online_learning",
    "complaint_letter",
    "friend_travel"
  ],
  totalAttempts: 8,
  averageScore: 76,
  strengths: [
    "Vocabulary range",
    "Creative idea development",
    "Organizational structure"
  ],
  areasToImprove: [
    "Grammar consistency",
    "Supporting evidence",
    "Conclusion strength"
  ]
};

export const writingTips = {
  essays: [
    "Start with a clear thesis statement that outlines your main argument",
    "Organize your essay with a logical structure (introduction, body paragraphs, conclusion)",
    "Use topic sentences to begin each paragraph and transition smoothly between ideas",
    "Support your points with specific examples, evidence, or data",
    "Address counterarguments to strengthen your position",
    "Avoid overgeneralizations and unsupported claims",
    "Conclude by restating your thesis and summarizing key points",
    "Revise for clarity, conciseness, and coherence",
  ],
  letters: [
    "Consider your audience and adjust your tone accordingly",
    "Begin with an appropriate greeting and clear purpose statement",
    "Organize content logically with paragraph breaks for new topics",
    "Keep formal letters concise and to the point",
    "Use personal anecdotes in informal letters to engage the reader",
    "End with a call to action or next steps if appropriate",
    "Include a warm closing appropriate to your relationship with the recipient",
    "Proofread carefully for errors in spelling and grammar",
  ],
  stories: [
    "Create engaging characters with clear motivations and conflicts",
    "Establish a vivid setting that supports your story's mood",
    "Show don't tell—use sensory details and specific actions",
    "Include meaningful dialogue that reveals character and advances plot",
    "Maintain a consistent point of view throughout",
    "Structure your story with a beginning (setup), middle (conflict), and end (resolution)",
    "Create tension to keep readers interested",
    "End with resolution but consider leaving some elements for readers to ponder",
  ],
};

export const aiPrompts = {
  outline: "Please help me create an outline for the following writing task: {prompt}. I need a structured approach with main points and supporting ideas.",
  
  improve: "Please review this section of my writing and suggest improvements: {text}. Focus on clarity, coherence, and persuasiveness.",
  
  feedback: "Please provide detailed feedback on this writing piece: {text}. Analyze strengths and weaknesses in organization, argument quality, language use, and evidence."
};
export const aiResponseTemplates = {
    welcomeMessage: `Hello! I'm your AI reading assistant. I can help you with:
  
  1. Understanding difficult passages
  2. Explaining vocabulary
  3. Answering questions about the text
  4. Providing pronunciation guidance
  
  Feel free to ask me anything about the reading material.`,
  
    vocabularyHelp: (word: string, definition: string) => `
  The word "${word}" means: ${definition}
  
  This is an important word to understand in this context because it helps explain a key concept in the text.
    `,
  
    pronunciationFeedback: {
      excellent: `
  Your pronunciation was excellent! Your speech was clear, natural, and easy to understand. You have great control of:
  - Word stress patterns
  - Natural intonation
  - Clear vowel and consonant sounds
  
  Keep up the great work!
      `,
      
      good: `
  Your pronunciation was good! You were understandable throughout, with just a few areas that could use some refinement:
  
  Strengths:
  - Good overall clarity
  - Most words pronounced correctly
  - Appropriate speaking pace
  
  Areas to practice:
  - Pay attention to the stress on multisyllabic words
  - Work on the specific sounds I've highlighted in the text
  - Try to make your intonation a bit more natural
      `,
      
      needsWork: `
  Thank you for your reading. I understood most of what you said, but there are several areas where your pronunciation could improve:
  
  Strengths:
  - Good effort with difficult vocabulary
  - Clear volume and pace
  
  Focus points:
  - The 'th' sound needs more practice - try placing your tongue between your teeth
  - Word stress was often on the wrong syllable
  - Some vowel sounds were unclear
  
  Let's practice the highlighted sections together. Would you like to try again with a shorter section?
      `
    },
  
    comprehensionHelp: (question: string) => `
  That's a good question about "${question}"
  
  Based on the text, I can explain that this refers to...
  
  The key points to understand are:
  1. First important element
  2. Second important element
  3. Third important element
  
  Does that help clarify the meaning?
    `,
  
    improvementSuggestions: [
      "Try reading aloud more regularly to improve fluency",
      "Record yourself reading and listen back to identify pronunciation patterns",
      "Practice specific sounds that are difficult for you",
      "Shadow native speakers by listening and repeating along with audio",
      "Focus on sentence stress and rhythm rather than individual sounds",
      "Learn the phonetic alphabet to better understand pronunciation guides"
    ]
  };
// Mock AI response generator - in a real app, this would be an API call
export const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('understand') || lowerMessage.includes('explain')) {
      return "I'd be happy to explain the audio in a simpler way. The conversation takes place in a restaurant. A woman asks for a table for two outside on the patio. The waiter takes their drink orders (iced tea and sparkling water). The woman orders salmon, and the man initially wants risotto but changes to pasta because he has lactose intolerance.";
    }
    
    if (lowerMessage.includes('vocabulary') || lowerMessage.includes('word') || lowerMessage.includes('mean')) {
      return "Some key vocabulary in this audio includes:\n- Patio: an outdoor seating area at a restaurant\n- Server: a person who takes orders and brings food (same as waiter/waitress)\n- Sparkling water: water with bubbles/carbonation\n- Lactose intolerant: unable to digest lactose, a sugar found in milk and dairy products\n- Risotto: an Italian rice dish cooked with broth\n\nIs there a specific word you'd like me to explain?";
    }
    
    if (lowerMessage.includes('difficult') || lowerMessage.includes('hard') || lowerMessage.includes('challenging')) {
      return "The most challenging parts of this audio might be the specific food items (risotto, salmon) and understanding why the man changes his order. He initially orders mushroom risotto but changes to vegetable pasta because he's lactose intolerant and risotto contains dairy (butter and parmesan cheese).";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('hint') || lowerMessage.includes('answer')) {
      return "I can give you some hints without revealing the exact answers. The conversation is about two people ordering food at a restaurant. Pay attention to where they decide to sit, what they order to drink, their food choices, and why one person changes their order. Also, listen for an additional request made after the main orders.";
    }
    
    // Default response
    return "I'm here to help you understand the listening exercise. You can ask me to explain difficult parts, define vocabulary, or give hints for the questions. What specifically would you like help with?";
  };
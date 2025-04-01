import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, ChevronRight, Check } from "lucide-react";
import { generateAIResponse } from "../data/ai-responses";
import { ListeningExercise } from "../data/types";

interface AIHelpProps {
  exercise: ListeningExercise;
}

export default function AIHelp({ exercise }: AIHelpProps) {
  const [aiMessage, setAiMessage] = useState("");
  const [aiConversation, setAiConversation] = useState<Array<{role: string, content: string}>>([
    {
      role: "assistant",
      content: "Hi there! I can help you understand the audio. Feel free to ask me questions about any parts you don't understand."
    }
  ]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  
  const conversationEndRef = useRef<HTMLDivElement | null>(null);
  
  // Scroll to bottom of conversation when new messages are added
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiConversation]);
  
  // Send message to AI assistant
  const sendMessageToAI = () => {
    if (!aiMessage.trim()) return;
    
    // Add user message to conversation
    setAiConversation(prev => [
      ...prev,
      { role: 'user', content: aiMessage }
    ]);
    
    // Clear input
    setAiMessage('');
    
    // Show AI is responding
    setIsAiResponding(true);
    
    // Generate AI response (In a real app, you would call an API here)
    setTimeout(() => {
      const responseContent = generateAIResponse(aiMessage);
      
      setAiConversation(prev => [
        ...prev,
        { role: 'assistant', content: responseContent }
      ]);
      
      setIsAiResponding(false);
    }, 1500);
  };
  
  // Handle message input keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageToAI();
    }
  };
  
  // Quick question handlers
  const handleQuickQuestion = (question: string) => {
    setAiMessage(question);
    sendMessageToAI();
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-850">
        {/* Welcome message with info card */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-2">
          <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">AI Listening Assistant</h3>
          <p className="text-blue-700 dark:text-blue-200 text-sm">
            I can help you understand the audio better. You can ask me to:
          </p>
          <ul className="text-blue-700 dark:text-blue-200 text-sm mt-2 space-y-1">
            <li className="flex items-start gap-2">
              <Check size={14} className="mt-1 flex-shrink-0" />
              <span>Explain difficult parts of the conversation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="mt-1 flex-shrink-0" />
              <span>Define vocabulary words you didn't understand</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="mt-1 flex-shrink-0" />
              <span>Give hints for questions without revealing the answers</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="mt-1 flex-shrink-0" />
              <span>Provide cultural context for situations in the audio</span>
            </li>
          </ul>
        </div>
        
        {/* Conversation messages */}
        {aiConversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center mr-2 mt-1">
                <Bot size={16} />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            
            {message.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center ml-2 mt-1">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              </div>
            )}
          </div>
        ))}
        
        {isAiResponding && (
          <div className="flex justify-start">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center mr-2 mt-1">
              <Bot size={16} />
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-tl-none px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div className="flex items-center gap-2 h-6">
                <div className="flex space-x-1 items-center">
                  <div className="h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={conversationEndRef} className="h-2"></div>
      </div>
      
      {/* Quick suggestions */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Quick Questions:</h3>
        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          <button
            onClick={() => handleQuickQuestion("Can you explain the main points of the conversation?")}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <ChevronRight size={14} />
            <span>Explain the conversation</span>
          </button>
          
          <button
            onClick={() => handleQuickQuestion("What are the difficult vocabulary words in this audio?")}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <ChevronRight size={14} />
            <span>Explain vocabulary</span>
          </button>
          
          <button
            onClick={() => handleQuickQuestion("Can you give me hints for the questions without revealing the answers?")}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <ChevronRight size={14} />
            <span>Give me hints</span>
          </button>
          
          <button
            onClick={() => handleQuickQuestion("What parts of this audio were the most challenging to understand?")}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <ChevronRight size={14} />
            <span>Difficult parts</span>
          </button>
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask for help understanding the audio..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-750 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100 text-sm min-h-[40px] resize-none"
              rows={1}
              onKeyDown={handleKeyDown}
            ></textarea>
          </div>
          
          <button
            onClick={sendMessageToAI}
            disabled={!aiMessage.trim() || isAiResponding}
            className={`p-3 rounded-full ${
              !aiMessage.trim() || isAiResponding
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
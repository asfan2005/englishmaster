"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Bot } from "lucide-react";
import { GrammarRule } from "../data/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GrammarAiAssistantProps {
  selectedRule?: GrammarRule;
  userInput: string;
  setUserInput: (input: string) => void;
  onSubmit: () => void;
  aiResponse: string;
  isLoading: boolean;
}

export default function GrammarAiAssistant({
  selectedRule,
  userInput,
  setUserInput,
  onSubmit,
  aiResponse,
  isLoading
}: GrammarAiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: selectedRule
        ? `I'm here to help you understand **${selectedRule.title}**. What would you like to know about it?`
        : "Welcome! I'm your grammar assistant. Select a rule from the sidebar or ask me any grammar question."
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add user message and AI response to the chat
  useEffect(() => {
    if (aiResponse && !isLoading) {
      const updatedMessages: Message[] = [...messages];
      
      // Check if the last message was from the user
      if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].role === "user") {
        // Just add the AI response
        updatedMessages.push({
          role: "assistant",
          content: aiResponse
        });
      } else {
        // Add user input and AI response
        if (userInput) {
          updatedMessages.push(
            {
              role: "user",
              content: userInput
            },
            {
              role: "assistant",
              content: aiResponse
            }
          );
        }
      }
      
      setMessages(updatedMessages);
    }
  }, [aiResponse, isLoading]);
  
  // Reset the chat when the selected rule changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: selectedRule
          ? `I'm here to help you understand **${selectedRule.title}**. What would you like to know about it?`
          : "Welcome! I'm your grammar assistant. Select a rule from the sidebar or ask me any grammar question."
      }
    ]);
  }, [selectedRule]);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    // Add user message to chat
    setMessages([
      ...messages,
      {
        role: "user",
        content: userInput
      }
    ]);
    
    // Call the submit handler from props
    onSubmit();
  };
  
  // Format a message with some simple markdown-like syntax
  const formatMessage = (message: string) => {
    // Format bold text
    let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format line breaks
    formattedMessage = formattedMessage.replace(/\n\n/g, '<br /><br />');
    
    return formattedMessage;
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          Grammar AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 px-4 pt-0 pb-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div 
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    className="leading-relaxed"
                  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-2 border-t px-4">
        <form onSubmit={handleSubmit} className="flex w-full items-end gap-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`Ask about ${selectedRule ? selectedRule.title : "grammar"}...`}
            className="min-h-24 flex-1 resize-none"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-24 w-24"
            disabled={!userInput.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Send className="h-6 w-6" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
} 
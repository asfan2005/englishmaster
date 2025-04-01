"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2, BookOpen, Lightbulb, List } from "lucide-react";
import { VocabularyWord } from "../data/types";
import { cn } from "@/lib/utils";

interface AiAssistantProps {
  selectedWord?: VocabularyWord;
  userInput: string;
  setUserInput: (input: string) => void;
  onSubmit: () => void;
  aiResponse: string;
  isLoading: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({
  selectedWord,
  userInput,
  setUserInput,
  onSubmit,
  aiResponse,
  isLoading,
}) => {
  const quickPrompts = [
    { text: "Show examples", icon: BookOpen },
    { text: "Explain meaning", icon: Lightbulb },
    { text: "List synonyms", icon: List },
  ];

  const handleQuickPrompt = (prompt: string) => {
    setUserInput(prompt);
    onSubmit();
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b bg-primary/5 flex items-center space-x-2">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">AI Vocabulary Assistant</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        {selectedWord ? (
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-1">{selectedWord.word}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedWord.partOfSpeech} • Level: {selectedWord.level}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt.text}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickPrompt(prompt.text.toLowerCase())}
                >
                  <prompt.icon className="mr-2 h-4 w-4" />
                  {prompt.text}
                </Button>
              ))}
            </div>

            {aiResponse && (
              <div className="bg-card rounded-lg p-4 border mt-4">
                <div className="flex items-start space-x-2">
                  <Bot className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1 space-y-2">
                    <p className="whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Select a word to start</h3>
            <p className="text-sm text-muted-foreground">
              Choose a word from your saved words list to get AI assistance
            </p>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex space-x-2"
        >
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              selectedWord
                ? `Ask anything about "${selectedWord.word}"...`
                : "Select a word first..."
            }
            disabled={!selectedWord || isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!selectedWord || !userInput.trim() || isLoading}
            className={cn(
              "w-10 h-10 p-0",
              isLoading && "cursor-not-allowed opacity-50"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default AiAssistant; 
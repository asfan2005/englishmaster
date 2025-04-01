"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronRight, GraduationCap, Book } from "lucide-react";
import { difficultyLevels, grammarTopics } from "../data/grammar-data";
import { GrammarLevel, GrammarCategory } from "../data/types";

interface SidebarProps {
  selectedLevel: GrammarLevel;
  setSelectedLevel: (level: GrammarLevel) => void;
  selectedCategory: GrammarCategory;
  setSelectedCategory: (category: GrammarCategory) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

export default function Sidebar({
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
  selectedTopic,
  setSelectedTopic
}: SidebarProps) {
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-muted/40">
      <div className="p-4 border-b bg-background flex items-center gap-2">
        <Book className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Grammar</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Difficulty Level Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <GraduationCap className="mr-1 h-4 w-4" />
              Difficulty Level
            </h3>
            <div className="space-y-1.5">
              {Object.entries(difficultyLevels).map(([level, label]) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    selectedLevel === level && "font-medium"
                  )}
                  onClick={() => setSelectedLevel(level as GrammarLevel)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Grammar Categories */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Book className="mr-1 h-4 w-4" />
              Grammar Categories
            </h3>
            <div className="space-y-1.5">
              {grammarTopics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedCategory === topic.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    selectedCategory === topic.id && "font-medium"
                  )}
                  onClick={() => {
                    setSelectedCategory(topic.id as GrammarCategory);
                    setSelectedTopic(topic.id);
                  }}
                >
                  <div className="truncate flex-1">{topic.title}</div>
                  {selectedCategory === topic.id && (
                    <ChevronRight className="ml-2 h-4 w-4 shrink-0" />
                  )}
                </Button>
              ))}
              <Button
                variant={selectedCategory === "all" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  selectedCategory === "all" && "font-medium"
                )}
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTopic("all");
                }}
              >
                <div className="truncate flex-1">All Categories</div>
                {selectedCategory === "all" && (
                  <ChevronRight className="ml-2 h-4 w-4 shrink-0" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
} 
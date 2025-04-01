"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, GraduationCap, Book, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { difficultyLevels, grammarTopics } from "../data/grammar-data";
import { GrammarLevel, GrammarCategory } from "../data/types";

interface MobileNavigationProps {
  selectedLevel: GrammarLevel;
  setSelectedLevel: (level: GrammarLevel) => void;
  selectedCategory: GrammarCategory;
  setSelectedCategory: (category: GrammarCategory) => void;
}

export default function MobileNavigation({
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex md:hidden items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Book className="h-5 w-5" />
        <h1 className="font-semibold">Grammar</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Select
          value={selectedLevel}
          onValueChange={(value) => setSelectedLevel(value as GrammarLevel)}
        >
          <SelectTrigger className="w-[120px]">
            <GraduationCap className="mr-1 h-4 w-4" />
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(difficultyLevels).map(([level, label]) => (
              <SelectItem key={level} value={level}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full">
              <div className="py-4 border-b flex items-center gap-2">
                <Book className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Grammar</h2>
              </div>
              
              <div className="flex flex-col gap-6 py-4 overflow-auto">
                {/* Difficulty Level Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    Difficulty Level
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(difficultyLevels).map(([level, label]) => (
                      <Button
                        key={level}
                        variant={selectedLevel === level ? "secondary" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => {
                          setSelectedLevel(level as GrammarLevel);
                          setOpen(false);
                        }}
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
                  <div className="space-y-1">
                    {grammarTopics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={selectedCategory === topic.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => {
                          setSelectedCategory(topic.id as GrammarCategory);
                          setOpen(false);
                        }}
                      >
                        {topic.title}
                      </Button>
                    ))}
                    <Button
                      variant={selectedCategory === "all" ? "secondary" : "ghost"}
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSelectedCategory("all");
                        setOpen(false);
                      }}
                    >
                      All Categories
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
} 
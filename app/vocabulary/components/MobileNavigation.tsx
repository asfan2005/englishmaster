"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyLevel, VocabularyCategory } from "../data/types";
import { categoryIcons } from "../data/vocabulary-data";

interface MobileNavigationProps {
  selectedLevel: VocabularyLevel;
  setSelectedLevel: (level: VocabularyLevel) => void;
  selectedCategory: VocabularyCategory;
  setSelectedCategory: (category: VocabularyCategory) => void;
}

export default function MobileNavigation({
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
}: MobileNavigationProps) {
  return (
    <div className="md:hidden border-b">
      <div className="p-2">
        <Tabs
          value={selectedLevel}
          onValueChange={(value) => setSelectedLevel(value as VocabularyLevel)}
          className="w-full mb-2"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as VocabularyCategory)}
          className="w-full"
        >
          <TabsList className="flex overflow-x-auto">
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <TabsTrigger key={category} value={category} className="flex-1 min-w-[100px]">
                <Icon className="mr-2 h-4 w-4" />
                <span className="capitalize">{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
} 
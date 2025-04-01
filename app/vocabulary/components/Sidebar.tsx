"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topicGroups, categoryIcons, countByLevelAndTopic } from "../data/vocabulary-data";
import { VocabularyLevel, VocabularyCategory } from "../data/types";
import { useRouter } from "next/navigation";

interface SidebarProps {
  selectedLevel: VocabularyLevel;
  setSelectedLevel: (level: VocabularyLevel) => void;
  selectedCategory: VocabularyCategory;
  setSelectedCategory: (category: VocabularyCategory) => void;
  selectedTopic: string;
  setSelectedTopic: (topicId: string) => void;
}

export default function Sidebar({
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
  selectedTopic,
  setSelectedTopic,
}: SidebarProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const counts = countByLevelAndTopic();

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    router.push(`/vocabulary?level=${selectedLevel}&topic=${topicId}`);
  };

  const filteredTopicGroups = topicGroups.filter(
    (group) => group.category === selectedCategory
  );

  return (
    <div
      className={`border-r bg-background transition-all duration-300 ${
        sidebarOpen ? "w-72" : "w-20"
      } flex-shrink-0`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`font-semibold ${sidebarOpen ? "block" : "hidden"}`}>
            Vocabulary
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className={`${sidebarOpen ? "block" : "hidden"}`}>
          <div className="p-4 border-b">
            <h3 className="mb-2 text-sm font-medium">Level</h3>
            <Tabs
              value={selectedLevel}
              onValueChange={(value) => setSelectedLevel(value as VocabularyLevel)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="p-4 border-b">
            <h3 className="mb-2 text-sm font-medium">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {topicGroups.map((group) => {
                const Icon = categoryIcons[group.category];
                return (
                  <Button
                    key={group.category}
                    variant={
                      selectedCategory === group.category ? "default" : "outline"
                    }
                    className="justify-start"
                    onClick={() => setSelectedCategory(group.category)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="capitalize">{group.category}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className={`p-4 ${sidebarOpen ? "block" : "hidden"}`}>
            <h3 className="mb-2 text-sm font-medium">Topics</h3>
            {filteredTopicGroups.map((group) => (
              <div key={group.category} className="mb-4">
                {group.topics.map((topic) => {
                  const count = counts[selectedLevel][topic.id] || 0;
                  return (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? "default" : "ghost"}
                      className="w-full justify-between mb-1"
                      onClick={() => handleTopicChange(topic.id)}
                    >
                      <span className="truncate">{topic.title}</span>
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                        {count}
                      </span>
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>

          {!sidebarOpen && (
            <div className="p-2">
              {topicGroups.map((group) => {
                const Icon = categoryIcons[group.category];
                return (
                  <Button
                    key={group.category}
                    variant={
                      selectedCategory === group.category ? "default" : "ghost"
                    }
                    size="icon"
                    className="mb-1 h-12 w-12"
                    onClick={() => setSelectedCategory(group.category)}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

// Icons
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
} 
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pen, FileText, Mail, BookOpen, GraduationCap } from "lucide-react";
import { 
  TopicGroup, 
  WritingPrompt, 
  WritingType 
} from "../data/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedType: WritingType;
  setSelectedType: (type: WritingType) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  topicGroups: TopicGroup[];
  writingPrompts: WritingPrompt[];
}

export default function Sidebar({
  selectedType,
  setSelectedType,
  selectedTopic,
  setSelectedTopic,
  topicGroups,
  writingPrompts
}: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("prompt");
  const [isOpen, setIsOpen] = useState(true);
  
  // Count prompts by type and topic
  const countByTypeAndTopic: Record<string, Record<string, number>> = {
    essay: {},
    letter: {},
    story: {},
    academic: {}
  };
  
  // Initialize all topics with 0 count for each type
  topicGroups.forEach(group => {
    group.topics.forEach(topic => {
      Object.keys(countByTypeAndTopic).forEach(type => {
        if (!countByTypeAndTopic[type][topic.id]) {
          countByTypeAndTopic[type][topic.id] = 0;
        }
      });
    });
  });
  
  // Count actual prompts
  writingPrompts.forEach(prompt => {
    countByTypeAndTopic[prompt.type][prompt.topicId]++;
  });
  
  // Types with icons
  const types = [
    { id: "essay" as WritingType, label: "Essays", icon: FileText },
    { id: "letter" as WritingType, label: "Letters", icon: Mail },
    { id: "story" as WritingType, label: "Stories", icon: BookOpen },
    { id: "academic" as WritingType, label: "Academic", icon: GraduationCap }
  ];
  
  const relevantTopicGroups = topicGroups.filter(group => 
    group.topics.some(topic => countByTypeAndTopic[selectedType][topic.id] > 0)
  );

  return (
    <div className={cn(
      "border-r bg-muted/40 w-[300px] flex-shrink-0 hidden md:block",
      isOpen ? "block" : "hidden"
    )}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg flex items-center">
          <Pen className="mr-2 h-5 w-5" />
          Writing Practice
        </h2>
      </div>
      
      <div className="flex flex-col h-[calc(100vh-57px)]">
        <div className="p-4 border-b">
          <div className="space-y-1">
            {types.map(type => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setSelectedType(type.id)}
              >
                <type.icon className="h-4 w-4" />
                <span>{type.label}</span>
                <span className="ml-auto text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {Object.values(countByTypeAndTopic[type.id]).reduce((a, b) => a + b, 0)}
                </span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {relevantTopicGroups.map(group => (
              <div key={group.id} className="mb-6">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.topics.filter(topic => 
                    countByTypeAndTopic[selectedType][topic.id] > 0
                  ).map(topic => (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      {topic.title}
                      <span className="ml-auto text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                        {countByTypeAndTopic[selectedType][topic.id] || 0}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground mb-2">
            Your progress
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-primary rounded-full h-2" 
              style={{ width: '25%' }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 completed</span>
            <span>20 total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
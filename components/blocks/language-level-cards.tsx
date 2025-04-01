"use client";

import { cn } from "@/lib/utils";
import { Book, Zap, Trophy, Star, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LevelCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  level?: string;
  iconClassName?: string;
  titleClassName?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

function LevelCard({
  className,
  icon = <Book className="size-4 text-blue-300" />,
  title = "Beginner",
  description = "Ingliz tilini noldan o'rganish",
  level = "A1",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  isSelected = false,
  onSelect,
}: LevelCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex h-36 w-[22rem] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 cursor-pointer after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-primary/50 hover:bg-background [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        isSelected && "border-primary ring-2 ring-primary/20 bg-primary/5",
        className
      )}
    >
      <div>
        <span className={cn("relative inline-block rounded-full p-1", 
          isSelected ? "bg-primary/20" : "bg-blue-800/20")}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-pre-wrap text-sm text-muted-foreground">{description}</p>
      <div className="flex justify-between w-full">
        <p className="text-muted-foreground font-semibold">{level}</p>
        {isSelected && (
          <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1 flex items-center">
            <Star className="h-3 w-3 mr-1" /> Tanlandi
          </div>
        )}
      </div>
    </div>
  );
}

export function LanguageLevelCards() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  const levelCards = [
    {
      icon: <BookOpen className="size-4 text-emerald-400" />,
      title: "Boshlang'ich",
      description: "Ingliz tilini noldan o'rganmoqchimisiz? Kundalik so'zlashuv va asosiy tushunchalar.",
      level: "A1-A2",
      iconClassName: "text-emerald-500",
      titleClassName: "text-emerald-500",
      id: "beginner",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0"
    },
    {
      icon: <Book className="size-4 text-blue-400" />,
      title: "O'rta",
      description: "Ingliz tilida erkin muloqot qilish va matnlarni tushunish uchun o'rta daraja.",
      level: "B1-B2",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      id: "intermediate",
      className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0"
    },
    {
      icon: <Trophy className="size-4 text-amber-400" />,
      title: "Yuqori",
      description: "Professional darajada ingliz tilini o'zlashtirish va maxsus sohalarda qo'llash.",
      level: "C1-C2",
      iconClassName: "text-amber-500",
      titleClassName: "text-amber-500",
      id: "advanced",
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8"
    },
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  return (
    <div className="w-full">
      <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 mb-6">
        {levelCards.map((cardProps, index) => (
          <LevelCard 
            key={index} 
            {...cardProps} 
            isSelected={selectedLevel === cardProps.id}
            onSelect={() => handleLevelSelect(cardProps.id)}
          />
        ))}
      </div>
      
      {selectedLevel && (
        <div className="flex justify-center mt-10 animate-in slide-in-from-bottom-4 duration-700">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
            Shu daraja bilan boshlash
          </Button>
        </div>
      )}
    </div>
  );
} 
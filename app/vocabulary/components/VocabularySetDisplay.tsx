"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { VocabularySet } from "../data/types";
import VocabularyCard from "./VocabularyCard";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface VocabularySetDisplayProps {
  vocabularySet: VocabularySet;
  savedWords: string[];
  wordProgress: Record<string, { status: "learning" | "familiar" | "mastered" }>;
  onSaveWord: (wordId: string) => void;
  onUpdateProgress: (wordId: string, status: "learning" | "familiar" | "mastered") => void;
}

export default function VocabularySetDisplay({
  vocabularySet,
  savedWords,
  wordProgress,
  onSaveWord,
  onUpdateProgress,
}: VocabularySetDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [displayCount, setDisplayCount] = useState(Math.min(6, vocabularySet.words.length));

  // Check if words array is empty and reset index if needed
  useEffect(() => {
    if (vocabularySet.words.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= vocabularySet.words.length) {
      setCurrentIndex(0);
    }
  }, [vocabularySet.words, currentIndex]);

  const handleNext = () => {
    if (vocabularySet.words.length === 0) return;
    
    setCurrentIndex((prev) => 
      prev + 1 >= vocabularySet.words.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (vocabularySet.words.length === 0) return;
    
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? vocabularySet.words.length - 1 : prev - 1
    );
  };

  // Calculate learning progress
  const learnedCount = Object.values(wordProgress).filter(
    (progress) => progress.status === "familiar" || progress.status === "mastered"
  ).length;
  
  const masteredCount = Object.values(wordProgress).filter(
    (progress) => progress.status === "mastered"
  ).length;

  const progressPercentage = vocabularySet.words.length > 0
    ? (learnedCount / vocabularySet.words.length) * 100
    : 0;

  const masteredPercentage = vocabularySet.words.length > 0
    ? (masteredCount / vocabularySet.words.length) * 100
    : 0;

  // Get current word safely
  const currentWord = vocabularySet.words.length > 0 && currentIndex < vocabularySet.words.length
    ? vocabularySet.words[currentIndex]
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">{vocabularySet.title}</h2>
        <p className="text-muted-foreground">{vocabularySet.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Progress: {learnedCount} of {vocabularySet.words.length} words learned
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "card" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("card")}
            >
              Card View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List View
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <Progress value={progressPercentage} className="h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <Progress value={masteredPercentage} className="h-1 bg-muted" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {masteredPercentage.toFixed(0)}% mastered
          </span>
        </div>
      </div>

      {viewMode === "card" && (
        <div className="relative h-[320px] w-full max-w-md mx-auto">
          {currentWord ? (
            <VocabularyCard
              word={currentWord}
              onSave={onSaveWord}
              onMarkLearned={onUpdateProgress}
              isSaved={savedWords.includes(currentWord.id)}
              learningStatus={
                wordProgress[currentWord.id]?.status || null
              }
            />
          ) : (
            <div className="h-full flex items-center justify-center border rounded-lg p-4">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No vocabulary words</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  This set doesn't contain any vocabulary words yet.
                </p>
              </div>
            </div>
          )}
          
          {vocabularySet.words.length > 0 && (
            <div className="absolute inset-x-0 bottom-[-60px] flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentIndex + 1} / {vocabularySet.words.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {viewMode === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vocabularySet.words.length > 0 ? (
            <>
              {vocabularySet.words.slice(0, displayCount).map((word) => (
                <div key={word.id} className="h-[280px]">
                  <VocabularyCard
                    word={word}
                    onSave={onSaveWord}
                    onMarkLearned={onUpdateProgress}
                    isSaved={savedWords.includes(word.id)}
                    learningStatus={wordProgress[word.id]?.status || null}
                  />
                </div>
              ))}
              
              {displayCount < vocabularySet.words.length && (
                <div className="col-span-full flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => 
                      setDisplayCount(
                        Math.min(displayCount + 6, vocabularySet.words.length)
                      )
                    }
                  >
                    Load More Words
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full h-[280px] flex items-center justify-center border rounded-lg p-4">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No vocabulary words</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  This vocabulary set doesn't contain any words yet.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
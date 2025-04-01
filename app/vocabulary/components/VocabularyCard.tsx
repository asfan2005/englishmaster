"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VocabularyWord } from "../data/types";
import { Volume2, Star, Bookmark } from "lucide-react";

interface VocabularyCardProps {
  word: VocabularyWord;
  onSave: (wordId: string) => void;
  onMarkLearned: (wordId: string, status: "learning" | "familiar" | "mastered") => void;
  isSaved: boolean;
  learningStatus: "learning" | "familiar" | "mastered" | null;
}

export default function VocabularyCard({
  word,
  onSave,
  onMarkLearned,
  isSaved,
  learningStatus,
}: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped) {
      setShowExample(false);
    }
  };

  const handlePlayPronunciation = () => {
    // In a real implementation, this would play the pronunciation audio
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className={`h-full w-full ${isFlipped ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{word.word}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <span className="text-sm italic">{word.pronunciation}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2 h-6 w-6" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPronunciation();
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {word.partOfSpeech}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{word.definition}</p>
            {showExample && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="italic">"{word.example}"</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                setShowExample(!showExample);
              }}
            >
              {showExample ? "Hide Example" : "Show Example"}
            </Button>
            <Button variant="ghost" onClick={handleFlip}>
              See Synonyms
            </Button>
          </CardFooter>
        </div>
        
        <div className="flip-card-back">
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Synonyms for "{word.word}"</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((synonym, index) => (
                <Badge key={index} variant="secondary">
                  {synonym}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <Button variant="ghost" onClick={handleFlip}>
              Back to Definition
            </Button>
          </CardFooter>
        </div>
      </div>
      
      <div className="absolute top-3 right-3 flex space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className={isSaved ? "text-yellow-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            onSave(word.id);
          }}
        >
          <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={learningStatus === "mastered" ? "text-yellow-500" : ""}
          onClick={(e) => {
            e.stopPropagation();
            const nextStatus = !learningStatus 
              ? "learning" 
              : learningStatus === "learning" 
                ? "familiar" 
                : learningStatus === "familiar" 
                  ? "mastered" 
                  : "learning";
            onMarkLearned(word.id, nextStatus);
          }}
        >
          <Star 
            className="h-5 w-5" 
            fill={learningStatus ? "currentColor" : "none"} 
            strokeWidth={learningStatus === "mastered" ? 0 : 2}
          />
        </Button>
      </div>
      
      <style jsx>{`
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </Card>
  );
} 
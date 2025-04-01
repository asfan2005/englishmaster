"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { GrammarExercise as ExerciseType } from "../data/types";

interface GrammarExerciseProps {
  exercise: ExerciseType;
}

export default function GrammarExercise({ exercise }: GrammarExerciseProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  
  const handleSubmit = () => {
    // Simple check - could be enhanced for more complex exercises
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
  };
  
  const resetExercise = () => {
    setUserAnswer("");
    setIsSubmitted(false);
    setIsCorrect(false);
  };
  
  const renderExerciseForm = () => {
    switch (exercise.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={userAnswer}
            onValueChange={setUserAnswer}
            className="mt-3 space-y-3"
          >
            {exercise.options?.map((option, index) => (
              <div key={index} className="flex items-start space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "fill-in-blank":
        // Format question to show where the blank is
        const parts = exercise.question.split(/(__+|\(\S+\))/);
        return (
          <div className="mt-3">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {parts.map((part, index) => {
                if (part.match(/(__+|\(\S+\))/)) {
                  return (
                    <Input
                      key={index}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-40 inline-block"
                      placeholder="Your answer"
                    />
                  );
                }
                return <span key={index}>{part}</span>;
              })}
            </div>
          </div>
        );
        
      case "reorder":
        // This would need more complex UI for drag-and-drop
        return (
          <div className="mt-3">
            <p className="mb-2">Arrange the words in the correct order:</p>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full"
              placeholder="Type the full sentence with proper word order"
            />
          </div>
        );
        
      case "correct-errors":
        return (
          <div className="mt-3">
            <p className="mb-2">Correct the errors in this sentence:</p>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full"
              placeholder="Type the corrected sentence"
            />
          </div>
        );
        
      default:
        return <p>Exercise type not supported.</p>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 font-medium">{exercise.question}</p>
        {!isSubmitted ? (
          renderExerciseForm()
        ) : (
          <Alert className={isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <AlertDescription className="flex-1">
                {isCorrect ? (
                  <span className="text-green-700">Correct!</span>
                ) : (
                  <>
                    <span className="text-red-700">Not quite right.</span>
                    <div className="mt-1 text-gray-700">
                      Correct answer: <strong>{exercise.correctAnswer}</strong>
                    </div>
                  </>
                )}
                <div className="mt-2 text-gray-600">{exercise.explanation}</div>
              </AlertDescription>
            </div>
          </Alert>
        )}
      </div>
      
      <div className="flex justify-end">
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!userAnswer}
            className="flex items-center"
          >
            Check Answer
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={resetExercise} 
            variant="outline"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
} 
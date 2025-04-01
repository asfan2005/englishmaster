"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle, ArrowLeft, ArrowRight, Trophy, Loader2 } from "lucide-react";
import { GrammarRule, GrammarExercise } from "../data/types";

// Extended GrammarExercise type with additional properties used in this component
interface ExtendedGrammarExercise extends GrammarExercise {
  ruleId?: string;
  ruleTitle?: string;
  rule?: {
    title: string;
  };
}

interface PracticeResult {
  ruleId: string;
  correct: boolean;
}

interface GrammarPracticeProps {
  selectedRules: GrammarRule[];
  onComplete: (results: PracticeResult[]) => void;
}

export default function GrammarPractice({ selectedRules, onComplete }: GrammarPracticeProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<"intro" | "exercise" | "result">("intro");
  const [exercises, setExercises] = useState<ExtendedGrammarExercise[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [results, setResults] = useState<PracticeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Setup exercises from selected rules
  useEffect(() => {
    if (selectedRules.length > 0) {
      // Get one exercise from each rule
      const practiceExercises = selectedRules.flatMap((rule) => {
        if (rule.exercises && rule.exercises.length > 0) {
          // Pick a random exercise from each rule
          const randomIndex = Math.floor(Math.random() * rule.exercises.length);
          return {
            ...rule.exercises[randomIndex],
            ruleId: rule.id,
            ruleTitle: rule.title
          } as ExtendedGrammarExercise;
        }
        return [];
      });
      
      // Shuffle the exercises
      const shuffled = [...practiceExercises].sort(() => 0.5 - Math.random());
      setExercises(shuffled);
    }
  }, [selectedRules]);
  
  const startPractice = () => {
    setCurrentStep("exercise");
    setCurrentExerciseIndex(0);
    setResults([]);
  };
  
  const handleSubmitAnswer = () => {
    if (!userAnswer) return;
    
    const currentExercise = exercises[currentExerciseIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    
    setIsAnswerCorrect(isCorrect);
    setIsAnswerSubmitted(true);
    
    // Add result with proper type safety
    setResults([
      ...results,
      {
        ruleId: currentExercise.ruleId || currentExercise.id || "",
        correct: isCorrect
      }
    ]);
  };
  
  const handleNextExercise = () => {
    setUserAnswer("");
    setIsAnswerSubmitted(false);
    
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // End of practice
      setIsLoading(true);
      setTimeout(() => {
        onComplete(results);
        setCurrentStep("result");
        setIsLoading(false);
      }, 1000); // Simulate API delay
    }
  };
  
  const calculateScore = () => {
    const correct = results.filter((result) => result.correct).length;
    return {
      score: correct,
      total: results.length,
      percentage: Math.round((correct / results.length) * 100)
    };
  };
  
  const renderExerciseForm = () => {
    if (!exercises[currentExerciseIndex]) return null;
    
    const exercise = exercises[currentExerciseIndex];
    
    switch (exercise.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={userAnswer}
            onValueChange={setUserAnswer}
            className="mt-3 space-y-3"
            disabled={isAnswerSubmitted}
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
                      disabled={isAnswerSubmitted}
                    />
                  );
                }
                return <span key={index}>{part}</span>;
              })}
            </div>
          </div>
        );
        
      default:
        return (
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full mt-3"
            placeholder="Type your answer"
            disabled={isAnswerSubmitted}
          />
        );
    }
  };
  
  if (currentStep === "intro") {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">Grammar Practice</CardTitle>
          <CardDescription>
            Test your understanding of grammar rules with these practice exercises.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1">
          <div className="space-y-4">
            <p>
              You'll be practicing with {exercises.length} exercises covering the following grammar topics:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {selectedRules.map((rule) => (
                <li key={rule.id}>{rule.title}</li>
              ))}
            </ul>
            <p>
              Answer each question to test your knowledge. You'll receive feedback on each answer
              and a final score at the end.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={startPractice} 
            className="w-full"
            disabled={exercises.length === 0}
          >
            Start Practice
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (currentStep === "result") {
    const { score, total, percentage } = calculateScore();
    
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Practice Results
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold">{percentage}%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {score} out of {total} correct
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {percentage >= 80
                  ? "Excellent job!"
                  : percentage >= 60
                  ? "Good progress!"
                  : "Keep practicing!"}
              </h3>
              <p className="text-muted-foreground">
                {percentage >= 80
                  ? "You have a strong understanding of these grammar rules."
                  : percentage >= 60
                  ? "You're doing well, but could benefit from more practice."
                  : "You might want to review these grammar rules again."}
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentStep("intro")}
            >
              Back to Start
            </Button>
            <Button 
              className="flex-1"
              onClick={startPractice}
            >
              Practice Again
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
  
  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-primary/60" />
            <p className="text-lg font-medium">Evaluating your progress...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Exercise {currentExerciseIndex + 1} of {exercises.length}</CardTitle>
            <CardDescription className="mt-1">
              {exercises[currentExerciseIndex]?.rule?.title || exercises[currentExerciseIndex]?.ruleTitle || "Grammar Rule"}
            </CardDescription>
          </div>
          <div className="text-sm font-medium">
            Progress: {Math.round(((currentExerciseIndex) / exercises.length) * 100)}%
          </div>
        </div>
        <Progress 
          value={((currentExerciseIndex) / exercises.length) * 100} 
          className="h-2 mt-2"
        />
      </CardHeader>
      
      <CardContent className="flex-1">
        {exercises[currentExerciseIndex] ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{exercises[currentExerciseIndex].question}</h3>
            
            {renderExerciseForm()}
            
            {isAnswerSubmitted && (
              <Alert className={isAnswerCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                <div className="flex items-start gap-3">
                  {isAnswerCorrect ? (
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <AlertDescription className="flex-1">
                    {isAnswerCorrect ? (
                      <span className="text-green-700">Correct!</span>
                    ) : (
                      <>
                        <span className="text-red-700">Not quite right.</span>
                        <div className="mt-1 text-gray-700">
                          Correct answer: <strong>{exercises[currentExerciseIndex].correctAnswer}</strong>
                        </div>
                      </>
                    )}
                    <div className="mt-2 text-gray-600">{exercises[currentExerciseIndex].explanation}</div>
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        ) : (
          <div className="text-center py-8">No exercises available.</div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("intro")}
            className="flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Cancel
          </Button>
          
          {!isAnswerSubmitted ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!userAnswer}
              className="flex items-center"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextExercise}
              className="flex items-center"
            >
              {currentExerciseIndex < exercises.length - 1 ? (
                <>
                  Next Exercise
                  <ArrowRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Finish Practice
                  <Trophy className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 
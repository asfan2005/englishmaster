"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { VocabularyWord, VocabularySet } from "../data/types";
import { CheckCircle2, XCircle, RefreshCw, Award, RotateCw, Dumbbell, Brain, ArrowRight, Trophy, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Define proper types for each exercise type
interface FillInBlankExercise {
  type: "fill-in-blank";
  word: string;
  sentence: string;
  answer: string;
  options: string[];
}

interface MatchDefinitionExercise {
  type: "match-definition";
  word: string;
  definition: string;
  options: string[];
}

interface ContextExercise {
  type: "context";
  word: string;
  question: string;
  options: string[];
  answer: number;
}

// Union type for all exercise types
type Exercise = FillInBlankExercise | MatchDefinitionExercise | ContextExercise;

// Type guard functions
function isFillInBlank(exercise: Exercise): exercise is FillInBlankExercise {
  return exercise.type === "fill-in-blank";
}

function isMatchDefinition(exercise: Exercise): exercise is MatchDefinitionExercise {
  return exercise.type === "match-definition";
}

function isContext(exercise: Exercise): exercise is ContextExercise {
  return exercise.type === "context";
}

interface AiPracticeProps {
  vocabularySet?: VocabularySet;
  selectedWords: VocabularyWord[];
  onComplete: (results: { wordId: string; correct: boolean }[]) => void;
}

type QuestionType = 'definition' | 'synonym' | 'context';

interface Question {
  type: QuestionType;
  word: VocabularyWord;
  options: string[];
  correctAnswer: string;
}

const AiPractice: React.FC<AiPracticeProps> = ({ vocabularySet, selectedWords, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<Array<{ wordId: string; correct: boolean }>>([]);
  const [practiceComplete, setPracticeComplete] = useState(false);

  useEffect(() => {
    if (selectedWords.length > 0) {
      const generatedQuestions = generateQuestions(selectedWords);
      setQuestions(generatedQuestions);
      resetPractice();
    }
  }, [selectedWords]);

  const generateQuestions = (words: VocabularyWord[]): Question[] => {
    const questionTypes: QuestionType[] = ['definition', 'synonym', 'context'];
    return words.flatMap((word) => {
      return questionTypes.map((type) => {
        const otherWords = words.filter((w) => w.id !== word.id);
        let options: string[] = [];
        let correctAnswer = '';

        switch (type) {
          case 'definition':
            correctAnswer = word.definition;
            options = [
              word.definition,
              ...otherWords
                .map((w) => w.definition)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3),
            ];
            break;
          case 'synonym':
            correctAnswer = word.synonyms[0];
            options = [
              word.synonyms[0],
              ...otherWords
                .flatMap((w) => w.synonyms)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3),
            ];
            break;
          case 'context':
            correctAnswer = word.example;
            options = [
              word.example,
              ...otherWords
                .map((w) => w.example)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3),
            ];
            break;
        }

        return {
          type,
          word,
          options: options.sort(() => Math.random() - 0.5),
          correctAnswer,
        };
      });
    });
  };

  const resetPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setResults([]);
    setPracticeComplete(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    const newResults = [
      ...results,
      { wordId: currentQuestion.word.id, correct: isCorrect },
    ];
    setResults(newResults);

    if (currentQuestionIndex === questions.length - 1) {
      setPracticeComplete(true);
      onComplete(newResults);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getQuestionPrompt = (type: QuestionType, word: VocabularyWord) => {
    switch (type) {
      case 'definition':
        return `What is the definition of "${word.word}"?`;
      case 'synonym':
        return `Which word is a synonym for "${word.word}"?`;
      case 'context':
        return `Which sentence correctly uses "${word.word}"?`;
      default:
        return '';
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (questions.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Practice Words</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Save some words or select a vocabulary set to start practicing
          </p>
        </div>
      </Card>
    );
  }

  if (practiceComplete) {
    const correctAnswers = results.filter((r) => r.correct).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <Card className="h-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Trophy className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
          <p className="text-lg text-muted-foreground mb-4">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
          <div className="w-full max-w-md mb-6">
            <Progress value={percentage} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">{percentage}% Accuracy</p>
          </div>
          <Button onClick={resetPractice} className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Practice Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Practice Session</h2>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {getQuestionPrompt(currentQuestion.type, currentQuestion.word)}
            </h3>
            <p className="text-sm text-muted-foreground">
              Select the correct answer:
            </p>
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "h-auto py-3 px-4 justify-start font-normal",
                  isAnswered && option === currentQuestion.correctAnswer && "border-green-500",
                  isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && "border-red-500"
                )}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                <div className="flex items-start">
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  )}
                  {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                  )}
                  <span className="text-left">{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {isAnswered && !practiceComplete && (
        <div className="p-4 border-t">
          <Button onClick={handleNextQuestion} className="w-full">
            Next Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AiPractice; 
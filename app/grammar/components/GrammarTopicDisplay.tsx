"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Bot, ChevronDown, ChevronUp, Star, Check, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GrammarRule, UserGrammarProgress } from "../data/types";
import GrammarExercise from "./GrammarExercise";

interface GrammarTopicDisplayProps {
  rule: GrammarRule;
  savedRules: string[];
  ruleProgress: Record<string, UserGrammarProgress>;
  onSaveRule: (ruleId: string) => void;
  onUpdateProgress: (ruleId: string, status: "learning" | "familiar" | "mastered") => void;
  onSelectForAi: (rule: GrammarRule) => void;
}

export default function GrammarTopicDisplay({
  rule,
  savedRules,
  ruleProgress,
  onSaveRule,
  onUpdateProgress,
  onSelectForAi
}: GrammarTopicDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
  const isSaved = savedRules.includes(rule.id);
  const progress = ruleProgress[rule.id];
  const learningStatus = progress?.status || null;
  
  const progressColors = {
    learning: "bg-yellow-500",
    familiar: "bg-blue-500",
    mastered: "bg-green-500"
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{rule.title}</CardTitle>
            <CardDescription className="mt-1">{rule.description}</CardDescription>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSaveRule(rule.id)}
              className="text-muted-foreground hover:text-primary"
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="bg-primary/10">
            {rule.level === "all" ? "All Levels" : rule.level}
          </Badge>
          <Badge variant="outline" className="bg-secondary/10">
            {rule.category === "all" ? "All Categories" : rule.category.replace(/-/g, " ")}
          </Badge>
          {learningStatus && (
            <Badge variant="outline" className={`${progressColors[learningStatus]} text-white`}>
              {learningStatus.charAt(0).toUpperCase() + learningStatus.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={`pt-2 ${isExpanded ? "" : "pb-0"}`}>
        <div className="space-y-4">
          {/* Short explanation always visible */}
          <p>{rule.simpleExplanation || rule.explanation}</p>
          
          {/* Expanded content */}
          {isExpanded && (
            <div className="space-y-6 mt-4">
              {rule.explanation !== rule.simpleExplanation && (
                <div>
                  <h4 className="font-medium mb-2">Detailed Explanation</h4>
                  <p>{rule.explanation}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Examples</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {rule.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              
              {rule.commonMistakes && (
                <div>
                  <h4 className="font-medium mb-2">Common Mistakes</h4>
                  <p>{rule.commonMistakes}</p>
                </div>
              )}
              
              {rule.comparisonNotes && (
                <div>
                  <h4 className="font-medium mb-2">Comparison with Related Rules</h4>
                  <p>{rule.comparisonNotes}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Practice Exercises</h4>
                <Accordion type="single" collapsible className="w-full">
                  {rule.exercises.map((exercise) => (
                    <AccordionItem key={exercise.id} value={exercise.id}>
                      <AccordionTrigger>
                        Exercise: {exercise.question.substring(0, 40)}
                        {exercise.question.length > 40 ? "..." : ""}
                      </AccordionTrigger>
                      <AccordionContent>
                        <GrammarExercise exercise={exercise} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectForAi(rule)}
            className="flex items-center"
          >
            <Bot className="mr-1 h-4 w-4" />
            Ask AI about this
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          {!isExpanded && (
            <div className="flex space-x-1 mr-2">
              <Button
                variant={learningStatus === "learning" ? "default" : "outline"}
                size="sm"
                className="text-xs px-2.5 py-1 h-8"
                onClick={() => onUpdateProgress(rule.id, "learning")}
              >
                Learning
              </Button>
              <Button
                variant={learningStatus === "familiar" ? "default" : "outline"}
                size="sm"
                className="text-xs px-2.5 py-1 h-8"
                onClick={() => onUpdateProgress(rule.id, "familiar")}
              >
                Familiar
              </Button>
              <Button
                variant={learningStatus === "mastered" ? "default" : "outline"}
                size="sm"
                className="text-xs px-2.5 py-1 h-8"
                onClick={() => onUpdateProgress(rule.id, "mastered")}
              >
                Mastered
              </Button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Show More
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
import React from "react";
import { Bot, RefreshCw, AlertCircle, CheckCircle, Award, Headphones, ArrowRight } from "lucide-react";
import { ReadingExercise } from "../data/types";

interface AIFeedbackProps {
  score: number | null;
  mistakes: string[];
  loading: boolean;
  exercise: ReadingExercise;
  onRetry: () => void;
}

export default function AIFeedback({ score, mistakes, loading, exercise, onRetry }: AIFeedbackProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h3 className="text-lg font-medium mb-2">Analyzing Your Reading...</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Our AI is listening to your recording and analyzing your pronunciation, 
          fluency, and accuracy.
        </p>
      </div>
    );
  }

  // Helper function to get feedback message based on score
  const getFeedbackMessage = () => {
    if (score === null) return "";
    
    if (score >= 95) {
      return "Excellent! Your pronunciation is very clear and natural.";
    } else if (score >= 85) {
      return "Very good! You have a few minor areas to improve, but overall your pronunciation is clear.";
    } else if (score >= 75) {
      return "Good job! You have some areas to work on, but your pronunciation is generally understandable.";
    } else {
      return "Keep practicing! There are several areas where you can improve your pronunciation.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Score display */}
      <div className="p-5 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Bot size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            AI Pronunciation Analysis
          </h3>
          
          <button
            onClick={onRetry}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <RefreshCw size={16} className="mr-1" />
            Try Again
          </button>
        </div>
        
        {score !== null && (
          <>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    className="dark:stroke-gray-700"
                  />
                  
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={
                      score >= 95 ? "#10b981" : 
                      score >= 85 ? "#3b82f6" : 
                      score >= 75 ? "#f59e0b" : 
                      "#ef4444"
                    }
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 45 * score / 100} ${2 * Math.PI * 45 * (1 - score / 100)}`}
                    strokeDashoffset={(2 * Math.PI * 45) / 4}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold">{score}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">out of 100</div>
                </div>
              </div>
            </div>
            
            <p className="text-center mb-6 font-medium text-lg">{getFeedbackMessage()}</p>
          </>
        )}
      </div>
      
      {/* Detailed feedback */}
      {mistakes.length > 0 && (
        <div className="p-5 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 text-amber-500" />
            Areas for Improvement
          </h3>
          
          <ul className="space-y-3">
            {mistakes.map((mistake, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Strengths */}
      {score !== null && score >= 75 && (
        <div className="p-5 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2 text-green-500" />
            Your Strengths
          </h3>
          
          <ul className="space-y-3">
            {[
              "Good overall rhythm and pacing",
              "Clear articulation of most consonant sounds",
              "Appropriate use of stress on important words"
            ].map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Improvement suggestions */}
      <div className="p-5 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Award size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
          Recommended Practice
        </h3>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center text-blue-800 dark:text-blue-200">
              <Headphones size={16} className="mr-2" />
              Listen and Repeat Exercise
            </h4>
            
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              {score !== null && score < 85 
                ? "Focus on these specific phrases to improve your pronunciation:"
                : "Practice these challenging phrases to maintain your skills:"}
            </p>
            
            <ul className="space-y-2 mb-3">
              {exercise.pronunciation && exercise.pronunciation.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-center">
                  <ArrowRight size={14} className="mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-800 dark:text-gray-200">"{item.text.substring(0, 60)}..."</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium flex items-center justify-center">
              <Headphones size={16} className="mr-2" />
              Start Focused Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
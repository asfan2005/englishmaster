import React, { useRef } from "react";
import { Check, XCircle, CheckCircle2, RotateCcw, RefreshCcw, Loader2 } from "lucide-react";
import { Question } from "../data/types";

interface ExerciseQuestionsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  showAnswers: boolean;
  showResults: boolean;
  score: number | null;
  isSubmitting: boolean;
  onAnswerSelect: (questionId: string, answer: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onTryAnother: () => void;
}

export default function ExerciseQuestions({
  questions,
  userAnswers,
  showAnswers,
  showResults,
  score,
  isSubmitting,
  onAnswerSelect,
  onSubmit,
  onReset,
  onTryAnother
}: ExerciseQuestionsProps) {
  const exerciseListRef = useRef<HTMLDivElement>(null);
  
  // Get exercise completion percentage
  const completionPercentage = Math.round((Object.keys(userAnswers).length / questions.length) * 100);

  // Determine if all questions are answered
  const allQuestionsAnswered = Object.keys(userAnswers).length >= questions.length;
  
  return (
    <div className="p-6">
      {/* Results section - shown after submission */}
      {showResults && (
        <div className="mb-6">
          <div className={`p-4 rounded-lg mb-4 ${
            score !== null && score >= 80
              ? "bg-green-50 dark:bg-green-900/20"
              : score !== null && score >= 60
                ? "bg-yellow-50 dark:bg-yellow-900/20"
                : "bg-red-50 dark:bg-red-900/20"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                score !== null && score >= 80
                  ? "text-green-800 dark:text-green-300"
                  : score !== null && score >= 60
                    ? "text-yellow-800 dark:text-yellow-300"
                    : "text-red-800 dark:text-red-300"
              }`}>
                Your Results
              </h3>
              
              <div className="text-2xl font-bold flex items-center gap-2">
                {score !== null && score >= 80 ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : score !== null && score >= 60 ? (
                  <CheckCircle2 size={20} className="text-yellow-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
                
                <span className={
                  score !== null && score >= 80
                    ? "text-green-600 dark:text-green-400"
                    : score !== null && score >= 60
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                }>
                  {score}%
                </span>
              </div>
            </div>
            
            <p className={`text-sm ${
              score !== null && score >= 80
                ? "text-green-700 dark:text-green-200"
                : score !== null && score >= 60
                  ? "text-yellow-700 dark:text-yellow-200"
                  : "text-red-700 dark:text-red-200"
            }`}>
              {score !== null && score >= 80
                ? "Excellent! You have a strong understanding of the listening material."
                : score !== null && score >= 60
                  ? "Good job! You understood most of the content, but there's still room for improvement."
                  : "You seem to have some difficulty with this listening exercise. Try listening again and pay close attention to the details."
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={onTryAnother}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCcw size={16} />
              <span>Try Another Exercise</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Questions list */}
      <div ref={exerciseListRef} className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-750 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                {index + 1}. {question.text}
              </h3>
            </div>
            
            <div className="p-4">
              {question.type === "mcq" && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        id={`${question.id}-option-${optionIndex}`}
                        name={question.id}
                        value={option}
                        checked={userAnswers[question.id] === option}
                        onChange={() => onAnswerSelect(question.id, option)}
                        className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
                        disabled={showAnswers}
                      />
                      <label
                        htmlFor={`${question.id}-option-${optionIndex}`}
                        className={`ml-2 block text-sm cursor-pointer ${
                          showAnswers && option === question.correctAnswer
                            ? "text-green-600 dark:text-green-400 font-medium"
                            : showAnswers && userAnswers[question.id] === option && option !== question.correctAnswer
                              ? "text-red-600 dark:text-red-400 line-through"
                              : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option}
                        
                        {showAnswers && option === question.correctAnswer && (
                          <span className="ml-2 text-green-600 dark:text-green-400">
                            <Check size={16} className="inline" />
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {showAnswers && userAnswers[question.id] !== question.correctAnswer && (
              <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Correct answer:</strong> {question.correctAnswer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Submit button */}
      {!showResults && (
        <div className="mt-6">
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  completionPercentage === 100
                    ? "bg-green-500 dark:bg-green-600"
                    : "bg-blue-500 dark:bg-blue-600"
                }`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onSubmit}
              disabled={isSubmitting || !allQuestionsAnswered}
              className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 ${
                isSubmitting || !allQuestionsAnswered
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin">
                    <RefreshCcw size={16} />
                  </div>
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Submit Answers</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
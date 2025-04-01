import React, { useState } from "react";
import { BarChart, CheckCircle, XCircle } from "lucide-react";
import { ReadingExercise, ReadingQuestion } from "../data/types";

interface ReadingQuestionsProps {
  exercise: ReadingExercise;
  onComplete: (score: number) => void;
}

export default function ReadingQuestions({ exercise, onComplete }: ReadingQuestionsProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (showResults) return; // Prevent changing answers after submission
    
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    if (!exercise.questions || exercise.questions.length === 0) return;
    
    // Calculate score
    let correctCount = 0;
    exercise.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const calculatedScore = Math.round((correctCount / exercise.questions.length) * 100);
    setScore(calculatedScore);
    onComplete(calculatedScore);
    setShowResults(true);
  };

  const allQuestionsAnswered = exercise.questions && 
    exercise.questions.every(q => userAnswers[q.id]);

  if (!exercise.questions || exercise.questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No questions available for this reading exercise.
        </p>
      </div>
    );
  }

  return (
    <div>
      {showResults && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <BarChart size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            Your Score: {score}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You answered {Object.keys(userAnswers).filter(qId => {
              const q = exercise.questions?.find(q => q.id === qId);
              return q && userAnswers[qId] === q.correctAnswer;
            }).length} out of {exercise.questions.length} questions correctly.
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        {exercise.questions.map((question, index) => (
          <div 
            key={question.id} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex mb-3">
              <span className="flex items-center justify-center rounded-full w-6 h-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium mr-2">
                {index + 1}
              </span>
              <h4 className="font-medium">{question.text}</h4>
            </div>
            
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => (
                <label 
                  key={optionIndex} 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    showResults
                      ? userAnswers[question.id] === option
                        ? option === question.correctAnswer
                          ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
                          : "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800"
                        : option === question.correctAnswer
                          ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
                          : "border-gray-200 dark:border-gray-700"
                      : userAnswers[question.id] === option
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800" 
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                    disabled={showResults}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500"
                  />
                  <span className="ml-2">{option}</span>
                  
                  {showResults && (
                    <>
                      {userAnswers[question.id] === option && option !== question.correctAnswer && (
                        <span className="ml-auto text-red-600 dark:text-red-400 flex items-center">
                          <XCircle size={16} className="mr-1" />
                          Incorrect
                        </span>
                      )}
                      
                      {option === question.correctAnswer && (
                        <span className="ml-auto text-green-600 dark:text-green-400 flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          Correct answer
                        </span>
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>
            
            {showResults && question.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Explanation:</h5>
                <p className="text-blue-700 dark:text-blue-300">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!showResults && (
        <button
          onClick={handleSubmit}
          disabled={!allQuestionsAnswered}
          className={`mt-6 px-4 py-2 rounded-lg font-medium ${
            allQuestionsAnswered
              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {allQuestionsAnswered 
            ? "Submit Answers" 
            : `Answer all questions (${Object.keys(userAnswers).length}/${exercise.questions.length})`}
        </button>
      )}
      
      {showResults && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => {
              setUserAnswers({});
              setShowResults(false);
            }}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
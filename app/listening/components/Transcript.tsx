import React from "react";

interface TranscriptProps {
  transcript: string;
  showAnswers: boolean;
}

export default function Transcript({ transcript, showAnswers }: TranscriptProps) {
  return (
    <div className="p-6">
      {!showAnswers ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-yellow-800 dark:text-yellow-300 font-medium mb-1">Transcript Locked</h3>
              <p className="text-yellow-700 dark:text-yellow-200 text-sm">The transcript will be available after you complete the exercise. Try to answer the questions based on your listening first!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line p-2 max-h-[500px] overflow-y-auto">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
}
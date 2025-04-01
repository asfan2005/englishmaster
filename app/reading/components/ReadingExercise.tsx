import React, { useState } from "react";
import { Book, Bookmark, BookmarkPlus, ExternalLink, List } from "lucide-react";
import { ReadingExercise as ReadingExerciseType } from "../data/types";

interface ReadingExerciseProps {
  exercise: ReadingExerciseType;
}

export default function ReadingExercise({ exercise }: ReadingExerciseProps) {
  const [fontSize, setFontSize] = useState("medium");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);

  // Function to highlight vocabulary words in the text
  const highlightVocabulary = (text: string) => {
    if (!exercise.vocabulary || exercise.vocabulary.length === 0) {
      return text;
    }

    // Split text into paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      let processedParagraph = paragraph;
      
      // Process each vocabulary word
      exercise.vocabulary?.forEach(vocab => {
        // Create a regex with word boundaries to match whole words only
        const regex = new RegExp(`\\b${vocab.word}\\b`, 'gi');
        processedParagraph = processedParagraph.replace(regex, 
          `<span class="relative group">
             <span class="text-blue-600 dark:text-blue-400 underline cursor-pointer">${vocab.word}</span>
             <span class="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-sm rounded p-2 bottom-full mb-1 left-0 min-w-[200px] max-w-[300px] shadow-lg">
               <strong>${vocab.word}</strong>: ${vocab.definition}
             </span>
           </span>`
        );
      });
      
      return (
        <p 
          key={index} 
          className="mb-4" 
          dangerouslySetInnerHTML={{ __html: processedParagraph }}
        />
      );
    });
  };

  // Font size classes based on selection
  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl"
  };

  return (
    <div>
      {/* Reading controls */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Book size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium">Reading Text</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowVocabulary(!showVocabulary)}
            className={`flex items-center text-sm px-2 py-1 rounded ${
              showVocabulary 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <List size={16} className="mr-1" />
            Vocabulary
          </button>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <button
              onClick={() => setFontSize("small")}
              className={`px-2 py-1 rounded ${fontSize === "small" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("medium")}
              className={`px-2 py-1 rounded ${fontSize === "medium" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2 py-1 rounded ${fontSize === "large" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2 py-1 rounded ${fontSize === "xlarge" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              A
            </button>
          </div>
          
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isBookmarked ? (
              <Bookmark size={18} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <BookmarkPlus size={18} />
            )}
          </button>
        </div>
      </div>
      
      {/* Reading content */}
      <div className={`mb-6 leading-relaxed ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}`}>
        {highlightVocabulary(exercise.text)}
      </div>
      
      {/* Vocabulary section */}
      {showVocabulary && exercise.vocabulary && exercise.vocabulary.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200 flex items-center">
            <List size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
            Key Vocabulary
          </h4>
          
          <ul className="space-y-3">
            {exercise.vocabulary.map((vocab, index) => (
              <li key={index} className="flex">
                <span className="font-medium text-blue-600 dark:text-blue-400 min-w-[120px]">{vocab.word}</span>
                <span className="text-gray-700 dark:text-gray-300">{vocab.definition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Source attribution if available */}
      {exercise.source && (
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <span>Source: </span>
          <a 
            href={exercise.sourceUrl || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            {exercise.source}
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}
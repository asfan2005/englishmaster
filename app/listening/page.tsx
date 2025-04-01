"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Radio, BookOpen, FileText, Bot, 
  ArrowLeft, HelpCircle, Settings, Menu, X, PenTool,
  Mic
} from "lucide-react";

// Components
import AudioPlayer from "./components/AudiPlayer";
import ExerciseQuestions from "./components/ExerciseQuestions";
import AIHelp from "./components/AIHelp";
import Transcript from "./components/Transcript";
import Sidebar from "./components/Sidebar";
import MobileNavigation from "./components/MobileNavigation";

// Data
import { mockExercises, listeningLevels, exerciseTypes } from "./data/exercises";
import { ListeningExercise } from "./data/types";

export default function ListeningPage() {
  // State variables
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedType, setSelectedType] = useState("conversations");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("player"); // player, exercises, transcript, ai-help
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Add icons to exerciseTypes
  const exerciseTypesWithIcons = exerciseTypes.map(type => {
    let icon;
    switch (type.id) {
      case "conversations": icon = <Radio size={16} />; break;
      case "lectures": icon = <BookOpen size={16} />; break;
      case "news": icon = <FileText size={16} />; break;
      case "interviews": icon = <Mic size={16} />; break;
      default: icon = <Radio size={16} />;
    }
    return { ...type, icon };
  });
  
  // Filter exercises based on selected level and type
  const filteredExercises = mockExercises.filter(
    ex => ex.level === selectedLevel && ex.type === selectedType
  );
  
  // Default mashq yaratish funksiyasi
  const getDefaultExercise = (level: string, type: string) => {
    const defaultExercise: ListeningExercise = {
      id: `default-${level}-${type}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Practice`,
      level: level,
      type: type,
      audioSrc: "/audio/default-audio.mp3",
      description: `This is a default ${type} exercise for ${level} level.`,
      duration: 120,
      transcript: `This is a placeholder transcript for the ${level} level ${type} exercise. 
      
      In a real application, this would contain the actual transcript of the audio.`,
      questions: [
        {
          id: `default-q1-${level}-${type}`,
          type: "mcq",
          text: "This is a sample question for this exercise. What would be your answer?",
          options: [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ],
          correctAnswer: "Option A"
        },
        {
          id: `default-q2-${level}-${type}`,
          type: "mcq",
          text: "Here's another sample question. Which option is correct?",
          options: [
            "First choice",
            "Second choice",
            "Third choice",
            "Fourth choice"
          ],
          correctAnswer: "Second choice"
        }
      ]
    };
    
    return defaultExercise;
  };
  
  // currentExerciseData ni yangilash
  const currentExerciseData = filteredExercises.length > 0 
    ? filteredExercises[currentExercise] 
    : getDefaultExercise(selectedLevel, selectedType);
  
  // Handle level change
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setCurrentExercise(0);
    resetExercise();
  };
  
  // Handle type change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentExercise(0);
    resetExercise();
  };
  
  // Reset exercise
  const resetExercise = () => {
    setUserAnswers({});
    setScore(null);
    setShowResults(false);
    setShowAnswers(false);
  };
  
  // Try another exercise
  const tryAnotherExercise = () => {
    resetExercise();
    
    // If there are more exercises of this type/level, go to the next one
    if (currentExercise < filteredExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Otherwise, reset to the first exercise
      setCurrentExercise(0);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  // Submit answers for grading
  const submitAnswers = () => {
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Calculate score
      let correct = 0;
      const totalQuestions = currentExerciseData.questions.length;
      
      currentExerciseData.questions.forEach(question => {
        if (userAnswers[question.id] === question.correctAnswer) {
          correct++;
        }
      });
      
      const percentage = Math.round((correct / totalQuestions) * 100);
      setScore(percentage);
      setShowResults(true);
      setShowAnswers(true);
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    // Reset current exercise when level or type changes
    setCurrentExercise(0);
    
    // Don't automatically change the type if there are no exercises
    // Let user select any type, even if there are no exercises yet
  }, [selectedLevel, selectedType]);

  useEffect(() => {
    // Ensure there are exercises for the selected combination
    if (filteredExercises.length === 0) {
      // Try to find any exercises for this level
      const exercisesForLevel = mockExercises.filter(ex => ex.level === selectedLevel);
      
      if (exercisesForLevel.length > 0) {
        // If there are exercises for this level, select the first available type
        setSelectedType(exercisesForLevel[0].type);
      } else {
        // If no exercises for this level, default to the first exercise's level and type
        setSelectedLevel(mockExercises[0].level);
        setSelectedType(mockExercises[0].type);
      }
    }
  }, [selectedLevel, selectedType, filteredExercises]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 md:hidden"
            >
              <Menu size={20} />
            </button>
            
            <Link href="/get-started" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowLeft size={20} />
              <span className="font-medium hidden sm:inline">Back to Dashboard</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Listening Practice</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Improve your listening skills with interactive exercises</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <HelpCircle size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar 
            mobile={true}
            listeningLevels={listeningLevels}
            exerciseTypes={exerciseTypesWithIcons}
            filteredExercises={filteredExercises}
            selectedLevel={selectedLevel}
            selectedType={selectedType}
            currentExercise={currentExercise}
            onLevelChange={handleLevelChange}
            onTypeChange={handleTypeChange}
            onExerciseChange={(index) => {
              setCurrentExercise(index);
              resetExercise();
              setSidebarOpen(false);
            }}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <main className="flex-1 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <Sidebar 
                mobile={false}
                listeningLevels={listeningLevels}
                exerciseTypes={exerciseTypesWithIcons}
                filteredExercises={filteredExercises}
                selectedLevel={selectedLevel}
                selectedType={selectedType}
                currentExercise={currentExercise}
                onLevelChange={handleLevelChange}
                onTypeChange={handleTypeChange}
                onExerciseChange={(index) => {
                  setCurrentExercise(index);
                  resetExercise();
                }}
              />
            </div>
            
            {/* Main exercise content */}
            <div className="flex-1">
              {/* Exercise header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentExerciseData.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{currentExerciseData.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                      {listeningLevels.find(l => l.id === currentExerciseData.level)?.name}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                      {exerciseTypesWithIcons.find(t => t.id === currentExerciseData.type)?.icon}
                      <span>{exerciseTypesWithIcons.find(t => t.id === currentExerciseData.type)?.name}</span>
                    </span>
                  </div>
                </div>
                
                {/* Exercise tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-2 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveTab("player")}
                      className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "player"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Play size={16} />
                        <span>Audio Player</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("exercises")}
                      className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "exercises"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <PenTool size={16} />
                        <span>Questions</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("transcript")}
                      className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "transcript"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText size={16} />
                        <span>Transcript</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("ai-help")}
                      className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === "ai-help"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Bot size={16} />
                        <span>AI Help</span>
                      </div>
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Tab content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                {activeTab === "player" && (
                  <AudioPlayer 
                    duration={currentExerciseData.duration} 
                    audioSrc={currentExerciseData.audioSrc} 
                  />
                )}
                
                {activeTab === "exercises" && (
                  <ExerciseQuestions 
                    questions={currentExerciseData.questions}
                    userAnswers={userAnswers}
                    showAnswers={showAnswers}
                    showResults={showResults}
                    score={score}
                    isSubmitting={isSubmitting}
                    onAnswerSelect={handleAnswerSelect}
                    onSubmit={submitAnswers}
                    onReset={resetExercise}
                    onTryAnother={tryAnotherExercise}
                  />
                )}
                
                {activeTab === "transcript" && (
                  <Transcript 
                    transcript={currentExerciseData.transcript}
                    showAnswers={showAnswers}
                  />
                )}
                
                {activeTab === "ai-help" && (
                  <AIHelp exercise={currentExerciseData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
    
      
      {/* Mobile navigation */}
      <MobileNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {/* CSS for the page */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Dark mode enhancements */
        .dark .bg-gray-850 {
          background-color: #1a1c23;
        }
        .dark .bg-gray-750 {
          background-color: #252836;
        }
        
        /* Improved textarea autogrow */
        textarea {
          overflow-y: hidden;
        }
        
        /* Custom animations */
        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
}
          
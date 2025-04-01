"use client";

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  MoveRight, 
  BarChart, 
  Headphones, 
  User, 
  Bot, 
  Clock 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import ReadingExercise from "./components/ReadingExercise";
import AIFeedback from "./components/AIFeedback";
import MobileNavigation from "./components/MobileNavigation";
import { ReadingExercise as ReadingExerciseType } from "./data/types";
import { readingExercises, readingLevels, readingTypes } from "./data/reading-exercises";

export default function ReadingPage() {
  // State variables for managing the reading experience
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedType, setSelectedType] = useState("stories");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [readingCompleted, setReadingCompleted] = useState(false);
  const [userRecording, setUserRecording] = useState<string | null>(null);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiMistakes, setAiMistakes] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Filter exercises based on selected level and type
  const filteredExercises = readingExercises.filter(
    (exercise) => exercise.level === selectedLevel && exercise.type === selectedType
  );

  // Set current exercise data or use a default one if none available
  const currentExerciseData: ReadingExerciseType = filteredExercises.length > 0
    ? filteredExercises[currentExercise]
    : {
        id: "default",
        title: "Default Reading Exercise",
        level: selectedLevel,
        type: selectedType,
        text: "This is a placeholder for a reading exercise. Please select a different level or type.",
        description: "No exercises available for this selection yet.",
        estimatedTime: 5,
        difficulty: "easy",
        vocabulary: [],
        questions: [],
        pronunciation: []
      };

  // Reset current exercise index when level or type changes
  useEffect(() => {
    setCurrentExercise(0);
    setReadingCompleted(false);
    setShowAIFeedback(false);
    setAiScore(null);
    setAiMistakes([]);
    setUserAnswers({});
    setShowResults(false);
  }, [selectedLevel, selectedType]);

  // Handle AI feedback generation when reading is completed
  const handleReadingComplete = (recordingUrl: string) => {
    setUserRecording(recordingUrl);
    setReadingCompleted(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 31) + 70; // 70-100 range
      setAiScore(randomScore);
      
      // Simulate detecting pronunciation mistakes
      if (randomScore < 95) {
        const possibleMistakes = [
          "Stress on wrong syllable in 'comfortable'",
          "The 'th' sound in 'through' needs more practice",
          "The vowel sound in 'world' was not clear",
          "The 'r' sound in 'bright' needs improvement",
          "Intonation dropped at the end of questions"
        ];
        
        // Select 1-3 random mistakes
        const numMistakes = Math.floor(Math.random() * 3) + 1;
        const selectedMistakes = [...possibleMistakes]
          .sort(() => 0.5 - Math.random())
          .slice(0, numMistakes);
          
        setAiMistakes(selectedMistakes);
      } else {
        setAiMistakes([]);
      }
      
      setShowAIFeedback(true);
    }, 2000);
  };

  // Handle answers to reading comprehension questions
  const handleAnswerSubmit = (answers: Record<string, string>) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  // Calculate reading score based on correct answers
  const calculateScore = () => {
    if (!currentExerciseData.questions || currentExerciseData.questions.length === 0) {
      return 0;
    }
    
    const totalQuestions = currentExerciseData.questions.length;
    let correctAnswers = 0;
    
    currentExerciseData.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar for navigation and filtering */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto bg-white dark:bg-gray-800"
          >
            <Sidebar
              levels={readingLevels}
              types={readingTypes}
              exercises={readingExercises}
              selectedLevel={selectedLevel}
              selectedType={selectedType}
              onLevelChange={setSelectedLevel}
              onTypeChange={setSelectedType}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header with title and sidebar toggle */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 bg-white dark:bg-gray-800">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <MoveRight size={20} className={`transform transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </button>
          <h1 className="ml-2 font-semibold text-xl">Reading Practice</h1>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-1" />
              <span>{currentExerciseData.estimatedTime} min</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {readingLevels.find(l => l.id === selectedLevel)?.name || selectedLevel}
              </span>
            </div>
          </div>
        </header>

        {/* Exercise content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Exercise title and description */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-2">{currentExerciseData.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{currentExerciseData.description}</p>
              </div>

              {/* Tabs for different views */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("content")}
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "content"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Reading Content
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("questions")}
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "questions"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <BarChart size={16} className="mr-2" />
                    Questions
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("pronunciation")}
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "pronunciation"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <Headphones size={16} className="mr-2" />
                    Pronunciation Practice
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("ai-feedback")}
                    disabled={!showAIFeedback}
                    className={`px-4 py-3 font-medium text-sm flex items-center ${
                      activeTab === "ai-feedback"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : showAIFeedback 
                          ? "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
                          : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    <Bot size={16} className="mr-2" />
                    AI Feedback {showAIFeedback && <span className="ml-1 px-1.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-xs">New</span>}
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === "content" && (
                  <ReadingExercise 
                    exercise={currentExerciseData} 
                  />
                )}
                
                {activeTab === "questions" && (
                  <div>
                    {currentExerciseData.questions && currentExerciseData.questions.length > 0 ? (
                      <div className="space-y-6">
                        {showResults ? (
                          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Your Score: {calculateScore()}%</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              You answered {Object.keys(userAnswers).filter(qId => {
                                const q = currentExerciseData.questions?.find(q => q.id === qId);
                                return q && userAnswers[qId] === q.correctAnswer;
                              }).length} out of {currentExerciseData.questions?.length || 0} questions correctly.
                            </p>
                          </div>
                        ) : (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Reading Comprehension Questions</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Answer the following questions based on the text you just read.
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-4">
                          {currentExerciseData.questions.map((question, index) => (
                            <div key={question.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex mb-2">
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
                                      onChange={() => {
                                        if (!showResults) {
                                          setUserAnswers({
                                            ...userAnswers,
                                            [question.id]: option
                                          });
                                        }
                                      }}
                                      disabled={showResults}
                                      className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500"
                                    />
                                    <span className="ml-2">{option}</span>
                                    
                                    {showResults && userAnswers[question.id] === option && option !== question.correctAnswer && (
                                      <span className="ml-auto text-red-600 dark:text-red-400 flex items-center">
                                        Incorrect
                                      </span>
                                    )}
                                    
                                    {showResults && option === question.correctAnswer && (
                                      <span className="ml-auto text-green-600 dark:text-green-400 flex items-center">
                                        Correct answer
                                      </span>
                                    )}
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {!showResults && (
                          <button
                            onClick={() => handleAnswerSubmit(userAnswers)}
                            disabled={Object.keys(userAnswers).length < (currentExerciseData.questions?.length || 0)}
                            className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                              Object.keys(userAnswers).length < (currentExerciseData.questions?.length || 0)
                                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                            }`}
                          >
                            Submit Answers
                          </button>
                        )}
                        
                        {showResults && (
                          <button
                            onClick={() => {
                              setActiveTab("pronunciation");
                            }}
                            className="mt-4 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                          >
                            Try Pronunciation Practice
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          No questions available for this reading exercise.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === "pronunciation" && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Pronunciation Practice</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Read the following passages aloud and get AI feedback on your pronunciation.
                      </p>
                    </div>
                    
                    {currentExerciseData.pronunciation && currentExerciseData.pronunciation.length > 0 ? (
                      <div className="space-y-4">
                        {currentExerciseData.pronunciation.map((item, index) => (
                          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-medium mb-2">{index + 1}. {item.title}</h4>
                            <p className="text-lg leading-relaxed mb-4 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                              {item.text}
                            </p>
                            
                            <div className="mt-4">
                              <button
                                onClick={() => {
                                  // Simulate recording and passing it to AI
                                  // In a real app, this would start recording
                                  handleReadingComplete("simulated-recording-url");
                                  setActiveTab("ai-feedback");
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                              >
                                <User size={16} className="mr-2" />
                                Start Reading Aloud
                              </button>
                            </div>
                            
                            {item.focusPoints && (
                              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Focus Points:</h5>
                                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300">
                                  {item.focusPoints.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          No pronunciation exercises available for this reading.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === "ai-feedback" && (
                  <AIFeedback
                    score={aiScore}
                    mistakes={aiMistakes}
                    loading={readingCompleted && !showAIFeedback}
                    exercise={currentExerciseData}
                    onRetry={() => {
                      setActiveTab("pronunciation");
                      setShowAIFeedback(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation - visible only on small screens */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <MobileNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showAIFeedback={showAIFeedback}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
}
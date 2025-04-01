"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, MicOff, Play, Pause, SkipForward, RefreshCcw, ThumbsUp, 
  ThumbsDown, HelpCircle, Settings, ArrowLeft, Check, Loader2,
  Menu, X, Send, ChevronRight, MessageSquare, Brain, Bot
} from "lucide-react";
import Link from "next/link";
import AudioRecorder from "@/components/ui/audio-recorder";
import AudioPlayer from "@/components/ui/audi-player";
import { 
  speakingTopics, 
  speakingLevels, 
  initialFeedback, 
  sampleCorrections 
} from "./speaking-data";
import { generateRandomTopic, scoreResponseBasedOnLevel } from "./speaking-utils";

export default function SpeakingPage() {
  // State variables for main practice mode
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("intermediate");
  const [currentTopic, setCurrentTopic] = useState(speakingTopics[0]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showTopicSelection, setShowTopicSelection] = useState(false);
  const [currentStep, setCurrentStep] = useState("prepare"); // "prepare", "record", "feedback"
  const [prepTime, setPrepTime] = useState(30); // 30 seconds to prepare
  
  // AI conversation mode states
  const [showAIConversation, setShowAIConversation] = useState(false);
  const [conversationMessage, setConversationMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<{role: string, content: string, isAudio?: boolean}[]>([
    {role: "assistant", content: "Hello! I'm your AI speaking partner. What would you like to talk about today? Choose a topic or suggest your own."}
  ]);
  const [isConversationProcessing, setIsConversationProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversationRecording, setConversationRecording] = useState(false);
  const [conversationAudio, setConversationAudio] = useState<string | null>(null);
  
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Suggested conversation topics
  const conversationStarters = [
    "Let's talk about travel destinations",
    "Can we discuss movies and entertainment?",
    "I'd like to practice job interview questions",
    "Let's discuss current global events",
    "I want to improve my vocabulary about technology"
  ];

  // Scroll to bottom of conversation
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationHistory]);

  // Start preparation timer
  const startPrepTimer = () => {
    setCurrentStep("prepare");
    setPrepTime(30);
    
    timerRef.current = setInterval(() => {
      setPrepTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Reset current session
  const resetSession = () => {
    setRecordedAudio(null);
    setShowFeedback(false);
    setIsRecording(false);
    setIsPlaying(false);
    setCountdown(0);
    setCurrentTopic(generateRandomTopic(speakingTopics));
    startPrepTimer();
  };

  // Handle level change
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    resetSession();
  };

  // Start recording
  const startRecording = () => {
    setIsRecording(true);
    setCurrentStep("record");
    setCountdown(60); // 60 seconds to talk
    
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleStopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop recording
  const handleStopRecording = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulasiya: AI serverga audio yuborilishi va javob olishni
    setTimeout(() => {
      setIsProcessing(false);
      setShowFeedback(true);
      setCurrentStep("feedback");
      
      // Level bo'yicha AI feedback generatsiya qilish
      const newFeedback = scoreResponseBasedOnLevel(selectedLevel);
      setFeedback(newFeedback);
    }, 2000);
  };

  // Handle audio recording completion
  const handleAudioRecorded = (audioUrl: string, blob: Blob) => {
    setRecordedAudio(audioUrl);
    setAudioBlob(blob);
  };

  // Load new topic
  const loadNewTopic = () => {
    setCurrentTopic(generateRandomTopic(speakingTopics));
    resetSession();
  };
  
  // AI conversation handlers
  const sendMessage = () => {
    if (!conversationMessage.trim() && !conversationAudio) return;
    
    // Add user message to conversation
    if (conversationMessage.trim()) {
      setConversationHistory(prev => [
        ...prev, 
        {role: "user", content: conversationMessage}
      ]);
    }
    
    // Add audio message if exists
    if (conversationAudio) {
      setConversationHistory(prev => [
        ...prev, 
        {role: "user", content: "🎤 Audio message", isAudio: true}
      ]);
    }
    
    // Clear input
    setConversationMessage("");
    setConversationAudio(null);
    setIsConversationProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate appropriate response based on user message
      let aiResponse = generateAIResponse(conversationMessage);
      
      setConversationHistory(prev => [
        ...prev, 
        {role: "assistant", content: aiResponse}
      ]);
      
      setIsConversationProcessing(false);
    }, 1500);
  };
  
  // Generate AI response based on user input
  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple response logic based on keywords
    if (lowerMessage.includes("travel") || lowerMessage.includes("destination")) {
      return "That's a great topic! Let's talk about travel destinations. Have you traveled abroad before? If yes, which country did you enjoy the most and why? If not, where would you like to go?";
    }
    else if (lowerMessage.includes("movie") || lowerMessage.includes("film") || lowerMessage.includes("entertainment")) {
      return "Movies are a wonderful topic for conversation! What kind of movies do you enjoy watching? Do you have a favorite director or actor? Tell me about a film that really impressed you recently.";
    }
    else if (lowerMessage.includes("job") || lowerMessage.includes("interview") || lowerMessage.includes("work")) {
      return "Job interviews can be challenging to navigate. Let's practice! Can you tell me about your background and skills? What kind of position would be ideal for you?";
    }
    else if (lowerMessage.includes("technology") || lowerMessage.includes("tech") || lowerMessage.includes("digital")) {
      return "Technology is changing our lives rapidly! How do you use technology in your daily life? What technological advancement are you most excited about for the future?";
    }
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage === "") {
      return "Hello there! It's great to chat with you. What topic would you like to discuss today to practice your English speaking skills?";
    }
    else {
      return "That's an interesting topic! Could you elaborate more? What aspects of this subject would you like to explore in our conversation? The more details you provide, the better I can help you practice your speaking skills.";
    }
  };
  
  // Handle conversation audio recording
  const handleConversationAudioRecorded = (audioUrl: string, blob: Blob) => {
    setConversationAudio(audioUrl);
  };
  
  // Toggle between practice mode and conversation mode
  const toggleAIConversation = () => {
    setShowAIConversation(!showAIConversation);
    if (!showAIConversation) {
      setSidebarOpen(false);
    }
  };

  // Clear timer on component unmount
  useEffect(() => {
    startPrepTimer();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Clear timer when prep time ends
  useEffect(() => {
    if (prepTime === 0 && currentStep === "prepare") {
      setCurrentStep("record");
    }
  }, [prepTime, currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
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
              <span className="font-medium hidden sm:inline">Orqaga</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {showAIConversation ? "AI Conversation Mode" : "AI Speaking Practice"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Practice your English speaking skills with our AI tutor</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleAIConversation}
              className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium ${
                showAIConversation 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              }`}
            >
              {showAIConversation ? <MessageSquare size={16} /> : <Bot size={16} />}
              <span className="hidden sm:inline">
                {showAIConversation ? "Practice Mode" : "Conversation Mode"}
              </span>
            </button>
            
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="fixed inset-0 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div 
              className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setShowAIConversation(false);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      !showAIConversation
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Brain size={18} />
                    <span>Speaking Practice</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowAIConversation(true);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      showAIConversation
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Bot size={18} />
                    <span>AI Conversation</span>
                  </button>
                  
                  <Link
                    href="/get-started"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                  </Link>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 pb-6">
        {/* AI Conversation Mode */}
        {showAIConversation ? (
          <div className="h-full flex flex-col max-w-3xl mx-auto px-4 sm:px-6 pt-6">
            {/* Conversation history */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 p-4">
              <div className="space-y-4">
                {conversationHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user" 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {msg.isAudio ? (
                        <div className="flex items-center gap-2">
                          <Play size={16} className="text-white" />
                          <span>{msg.content}</span>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isConversationProcessing && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={conversationEndRef} />
              </div>
            </div>
            
            {/* Suggested topics */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggested topics:</h3>
              <div className="flex flex-wrap gap-2">
                {conversationStarters.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setConversationMessage(topic);
                      sendMessage();
                    }}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Message input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              {conversationAudio && (
                <div className="mb-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Mic size={16} />
                    <span className="text-sm">Audio message recorded</span>
                  </div>
                  <button 
                    onClick={() => setConversationAudio(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <textarea
                    value={conversationMessage}
                    onChange={(e) => setConversationMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  ></textarea>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setConversationRecording(!conversationRecording)}
                    className={`p-3 rounded-full ${
                      conversationRecording
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {conversationRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={(!conversationMessage.trim() && !conversationAudio) || isConversationProcessing}
                    className={`p-3 rounded-full ${
                      (!conversationMessage.trim() && !conversationAudio) || isConversationProcessing
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Original Speaking Practice Mode
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Level selection */}
            <div className="mt-6 mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Speaking Level</h2>
              <div className="flex flex-wrap gap-2">
                {speakingLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleLevelChange(level.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedLevel === level.id
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Current state display */}
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {/* Topic display */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Speaking Topic</h2>
                  <button 
                    onClick={loadNewTopic}
                    className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <RefreshCcw size={14} />
                    <span>New Topic</span>
                  </button>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{currentTopic.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{currentTopic.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentTopic.keyPoints.map((point, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                      {point}
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Speak for 1-2 minutes on this topic
                </div>
              </div>

              {/* Current step display */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentStep === "prepare" && "Preparation Time"}
                    {currentStep === "record" && "Recording Time"}
                    {currentStep === "feedback" && "Feedback"}
                  </h2>
                  
                  {(currentStep === "prepare" || currentStep === "record") && (
                    <div className={`px-4 py-2 rounded-full font-mono font-bold ${
                      (prepTime < 10 || countdown < 10) ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : 
                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    }`}>
                      {currentStep === "prepare" ? prepTime : countdown} seconds
                    </div>
                  )}
                </div>

                {/* Recording interface */}
                {currentStep === "prepare" && (
                  <div className="text-center py-8">
                    <div className="mb-6 text-gray-700 dark:text-gray-300">
                      <p>Prepare your answer. Think about what you will say.</p>
                      <p className="mt-2">You can start recording when you're ready or wait for the timer.</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (timerRef.current) {
                          clearInterval(timerRef.current);
                        }
                        startRecording();
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      I'm Ready
                    </button>
                  </div>
                )}

                {/* Recording UI */}
                {currentStep === "record" && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <AudioRecorder 
                      isRecording={isRecording}
                      onRecordingStart={() => setIsRecording(true)}
                      onRecordingStop={handleStopRecording}
                      onAudioRecorded={handleAudioRecorded}
                    />
                    
                    <div className="mt-4 flex gap-3">
                      {!isRecording ? (
                        <button
                          onClick={startRecording}
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                        >
                          <Mic size={18} />
                          <span>Start Recording</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleStopRecording}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors"
                        >
                          <MicOff size={18} />
                          <span>Stop Recording</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Loader2 size={40} className="animate-spin text-blue-600 dark:text-blue-400 mb-4" />
                    <p className="text-lg text-gray-700 dark:text-gray-300">Processing your response...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Our AI is analyzing your speaking</p>
                  </div>
                )}

                {/* Feedback display */}
                {currentStep === "feedback" && showFeedback && (
                  <div className="space-y-6">
                    {/* Audio playback */}
                    {recordedAudio && (
                      <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Your Recording</h3>
                        <AudioPlayer 
                          audioUrl={recordedAudio} 
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                    )}

                    {/* Score display */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Score</h3>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="text-center mb-4 sm:mb-0 sm:flex-1">
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{feedback.overallScore}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overall</div>
                          </div>
                          
                          <div className="hidden sm:block border-l border-gray-200 dark:border-gray-700"></div>
                          
                          <div className="grid grid-cols-2 gap-4 sm:flex-[2]">
                            {Object.entries(feedback.categoryScores).map(([category, score]) => (
                              <div key={category} className="text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{score}/10</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">{category}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed feedback */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed Feedback</h3>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Strengths</h4>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                              {feedback.strengths.map((strength, idx) => (
                                <li key={idx} className="pl-1">{strength}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Areas to Improve</h4>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                              {feedback.areasToImprove.map((area, idx) => (
                                <li key={idx} className="pl-1">{area}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Corrections</h4>
                            <div className="space-y-3">
                              {feedback.corrections.map((correction, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                                  <div className="flex items-start">
                                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-sm font-medium">
                                      Incorrect
                                    </div>
                                    <div className="ml-3 text-gray-700 dark:text-gray-300">
                                      "{correction.incorrect}"
                                    </div>
                                  </div>
                                  <div className="flex items-start mt-2">
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-sm font-medium">
                                      Correct
                                    </div>
                                    <div className="ml-3 text-gray-700 dark:text-gray-300">
                                      "{correction.correct}"
                                    </div>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    {correction.explanation}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
                      <button 
                        onClick={loadNewTopic}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Try a Different Topic
                      </button>
                      <button 
                        onClick={resetSession}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Practice Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

     

      {/* AI Conversation Audio Recorder - hidden but functional */}
      {conversationRecording && (
        <div className="hidden">
          <AudioRecorder 
            isRecording={conversationRecording}
            onRecordingStart={() => {}}
            onRecordingStop={() => setConversationRecording(false)}
            onAudioRecorded={handleConversationAudioRecorded}
          />
        </div>
      )}
    </div>
  );
}
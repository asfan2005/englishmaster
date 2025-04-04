"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  PlayCircle, 
  PauseCircle, 
  ChevronRight, 
  CheckCircle, 
  Star, 
  Users,
  BookOpen,
  MessageSquare,
  Headphones,
  PenTool,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import YoutubePlayer from '../components/YoutubePlayer';

// Demo Components
const DemoHero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // YouTube video IDs for English learning tutorials
  // This is a popular English learning video from YouTube
  const videoId = "juKd26qkNAw"; // "English Conversation Practice - Learn English Speaking"

  return (
    <section ref={ref} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className={`transition-all duration-1000 ease-out transform ${inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Experience EnglishMaster in Action
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              See how our platform can transform your English learning journey with interactive lessons, AI conversation practice, and personalized feedback.
            </p>
            
            <div className="mb-10 space-y-4">
              {[
                "Interactive lessons with real-time feedback",
                "AI-powered conversation practice available 24/7",
                "Personalized learning path based on your goals",
                "Progress tracking and detailed analytics"
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center transition-all duration-500"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-5">
              <Link 
                href="/dashboard" 
                className="group flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Try Dashboard
              </Link>
              
              <Link 
                href="/get-started" 
                className="flex items-center px-6 py-3 border border-white/50 rounded-lg text-white hover:bg-white/10 transition-all"
              >
                Try It Yourself
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Right column - Video Demo */}
          <div className={`transition-all duration-1000 ease-out delay-300 transform ${inView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <YoutubePlayer 
              videoId={videoId}
              title="EnglishMaster Demo"
              description="See how our platform works to help you master English"
              className="border border-white/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureShowcase = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
      title: "Interactive Lessons",
      description: "Engaging content with audio, video, and interactive exercises to develop all language skills.",
      color: "bg-blue-50 border-blue-100",
      iconBg: "bg-blue-100",
      delay: 0
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
      title: "AI Conversation Practice",
      description: "Practice speaking English with our AI partner that adapts to your level and gives instant feedback.",
      color: "bg-indigo-50 border-indigo-100",
      iconBg: "bg-indigo-100",
      delay: 150
    },
    {
      icon: <Headphones className="h-10 w-10 text-purple-500" />,
      title: "Listening Exercises",
      description: "Improve your comprehension with podcasts, dialogues, and real-world audio content.",
      color: "bg-purple-50 border-purple-100",
      iconBg: "bg-purple-100",
      delay: 300
    },
    {
      icon: <PenTool className="h-10 w-10 text-pink-500" />,
      title: "Writing Feedback",
      description: "Get detailed feedback on your writing with suggestions for improvement.",
      color: "bg-pink-50 border-pink-100",
      iconBg: "bg-pink-100",
      delay: 450
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive Features for Complete Learning
          </h2>
          <p className="text-xl text-gray-600">
            Our platform covers all aspects of language learning with tools designed for maximum effectiveness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border shadow-lg p-6 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} ${feature.color}`}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState("conversation");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Chat conversation state
  const [conversation, setConversation] = useState([
    { role: "ai", text: "Hello! I'm your AI language partner. How can I help you practice English today?" },
  ]);
  
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Pronunciation state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Define feedback type
  type PronunciationFeedback = {
    accuracy: number;
    feedback: string;
  } | null;
  
  const [pronunciationFeedback, setPronunciationFeedback] = useState<PronunciationFeedback>(null);
  
  // Vocabulary state
  const [currentWord, setCurrentWord] = useState(0);
  const vocabularyWords = [
    { word: "Ambiguous", definition: "Open to more than one interpretation; not having one obvious meaning", example: "The politician gave an ambiguous answer to the reporter's question." },
    { word: "Pragmatic", definition: "Dealing with things sensibly and realistically", example: "We took a pragmatic approach to solving the problem." },
    { word: "Meticulous", definition: "Showing great attention to detail; very careful and precise", example: "She is meticulous about keeping records of all transactions." },
    { word: "Redundant", definition: "Not or no longer needed or useful; superfluous", example: "The extra coat of paint was redundant." }
  ];
  const [wordState, setWordState] = useState({ flipped: false, completed: Array(vocabularyWords.length).fill(false) });
  
  // Chat functions
  const addMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    setConversation([...conversation, { role: "user", text: userInput }]);
    setUserInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "That's a great question! Let's practice talking about that topic.",
        "I understand what you're saying. Your grammar is good, but try using more varied vocabulary.",
        "Nice job! Your pronunciation is improving. Let's try a more challenging conversation.",
        "I see what you mean. Could you elaborate more on that point?",
      ];
      
      setConversation(prev => [
        ...prev, 
        { 
          role: "ai", 
          text: responses[Math.floor(Math.random() * responses.length)] 
        }
      ]);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMessage();
    }
  };

  // Pronunciation functions
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and show feedback
      setIsRecording(false);
      setPronunciationFeedback({
        accuracy: 87,
        feedback: "Good pronunciation! Try to emphasize the 'th' sound more clearly."
      });
    } else {
      // Start recording
      setIsRecording(true);
      setPronunciationFeedback(null);
      setRecordingTime(0);
      
      // Simulate recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 5) {
            clearInterval(timer);
            toggleRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };
  
  // Vocabulary functions
  const flipCard = () => {
    setWordState(prev => ({ ...prev, flipped: !prev.flipped }));
  };
  
  const markLearned = () => {
    setWordState(prev => {
      const newCompleted = [...prev.completed];
      newCompleted[currentWord] = true;
      return { ...prev, completed: newCompleted, flipped: false };
    });
    
    // Move to next word
    setCurrentWord(prev => (prev + 1) % vocabularyWords.length);
  };
  
  const nextWord = () => {
    setCurrentWord(prev => (prev + 1) % vocabularyWords.length);
    setWordState(prev => ({ ...prev, flipped: false }));
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Try Our Interactive Features
          </h2>
          <p className="text-xl text-gray-600">
            Get a taste of what EnglishMaster offers with these interactive demos.
          </p>
        </div>
        
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-1000 ease-out transform ${inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: "conversation", label: "AI Conversation" },
              { id: "pronunciation", label: "Pronunciation Check" },
              { id: "vocabulary", label: "Vocabulary Builder" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {activeTab === "conversation" && (
              <div className="h-96 flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-3/4 rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-3 focus:outline-none"
                  />
                  <button
                    onClick={addMessage}
                    className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "pronunciation" && (
              <div className="h-96 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4">Pronunciation Checker</h3>
                    <p className="text-gray-600 mb-8">
                      Practice pronouncing the phrase below, then click to record your voice and get instant feedback.
                    </p>
                    
                    <div className="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-100">
                      <h4 className="font-medium text-indigo-800 mb-2">Practice phrase:</h4>
                      <p className="text-lg font-medium text-indigo-900">
                        "The thoughtful thirty-three thieves thought that they thrilled the throne throughout Thursday."
                      </p>
                    </div>
                    
                    <button
                      onClick={toggleRecording}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        isRecording
                          ? "bg-red-600 text-white animate-pulse"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <span className="inline-block w-3 h-3 rounded-full bg-white"></span>
                          Stop Recording ({5 - recordingTime}s)
                        </>
                      ) : (
                        <>
                          <Headphones className="h-5 w-5" />
                          Start Recording
                        </>
                      )}
                    </button>
                    
                    {pronunciationFeedback && (
                      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100 animate-fadeIn">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-green-800">Your pronunciation score:</h4>
                          <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-md font-bold">
                            {pronunciationFeedback.accuracy}%
                          </span>
                        </div>
                        <p className="text-green-700">
                          {pronunciationFeedback.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {isRecording ? (
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center animate-pulse mb-4">
                              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-red-700"></div>
                              </div>
                            </div>
                            <p className="text-gray-700 font-medium">Recording your voice...</p>
                          </div>
                        ) : (
                          <div className="text-center px-6">
                            <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                              <Headphones className="h-10 w-10 text-indigo-600" />
                            </div>
                            <p className="text-gray-600 mb-2">
                              {pronunciationFeedback 
                                ? "Recording complete! Check your feedback." 
                                : "Click the record button to start practicing."}
                            </p>
                          </div>
                        )}
                        
                        {/* Audio visualization */}
                        {isRecording && (
                          <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center gap-1 px-4">
                            {[...Array(40)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 bg-indigo-500 rounded-t-md animate-sound"
                                style={{
                                  height: `${Math.random() * 100}%`,
                                  animationDelay: `${i * 0.05}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "vocabulary" && (
              <div className="h-96 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4">Vocabulary Builder</h3>
                    <p className="text-gray-600 mb-8">
                      Expand your vocabulary with our spaced repetition system. Click the card to reveal the definition.
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <h4 className="font-medium text-gray-700">Progress:</h4>
                        <div className="ml-4 flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-500" 
                            style={{ width: `${(wordState.completed.filter(Boolean).length / vocabularyWords.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {wordState.completed.filter(Boolean).length}/{vocabularyWords.length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={markLearned}
                        className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                        disabled={wordState.completed[currentWord]}
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Mark as Learned
                      </button>
                      <button
                        onClick={nextWord}
                        className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Next Word
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div 
                      className={`w-full max-w-sm h-64 perspective-1000 cursor-pointer ${wordState.completed[currentWord] ? 'opacity-50' : ''}`}
                      onClick={flipCard}
                    >
                      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${wordState.flipped ? 'rotate-y-180' : ''}`}>
                        {/* Front of card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-200 backface-hidden">
                          <div className="flex flex-col h-full justify-center items-center">
                            <h3 className="text-3xl font-bold text-blue-800 mb-2">{vocabularyWords[currentWord].word}</h3>
                            <p className="text-blue-600 text-center italic">Click to reveal definition</p>
                            
                            {wordState.completed[currentWord] && (
                              <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Back of card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-indigo-200 backface-hidden rotate-y-180">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-indigo-400 mb-1">DEFINITION</h4>
                              <p className="text-indigo-900 font-medium mb-4">{vocabularyWords[currentWord].definition}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-indigo-400 mb-1">EXAMPLE</h4>
                              <p className="text-indigo-800 italic">{vocabularyWords[currentWord].example}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Professional",
      image: "/images/avatars/avatar-1.jpg",
      content: "EnglishMaster helped me improve my business English skills significantly. The AI conversation practice was particularly helpful for preparing for international meetings.",
      rating: 5
    },
    {
      id: 2,
      name: "Takashi Yamamoto",
      role: "University Student",
      image: "/images/avatars/avatar-2.jpg",
      content: "I've tried many English learning apps, but EnglishMaster stands out with its personalized approach. My TOEFL score improved by 15 points after just two months!",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Petrova",
      role: "Software Engineer",
      image: "/images/avatars/avatar-3.jpg",
      content: "The technical vocabulary courses helped me communicate more effectively with my international team. The AI provides excellent feedback on pronunciation.",
      rating: 4
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Thousands of learners have transformed their English skills with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Ready to Master English?
          </h2>
          <p className="text-xl text-blue-100 mb-10 mx-auto max-w-2xl">
            Join thousands of successful learners who are achieving their language goals with EnglishMaster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-started" 
              className="group bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-all flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing" 
              className="border border-white bg-transparent text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-blue-200">
            No credit card required. Start with our free plan today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function DemoPage() {
  return (
    <AppLayout>
      <DemoHero />
      <FeatureShowcase />
      <InteractiveDemo />
      <TestimonialSection />
      <CTASection />
    </AppLayout>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    "Personalized learning paths",
    "Professional teacher support",
    "AI-powered conversation practice",
    "Comprehensive skill development"
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column with text */}
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master English with Confidence
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              Join millions of learners worldwide who are achieving fluency through our personalized courses, expert teachers, and AI-powered practice tools.
            </p>
            
            <div className="space-y-4 mb-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center transition-all duration-500" 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0 mr-3 bg-blue-500/20 rounded-full p-1">
                    <CheckCircle size={20} className="text-blue-200" />
                  </div>
                  <span className="text-blue-50">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-5">
              <Link 
                href="/get-started" 
                className="group px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo" 
                className="group px-8 py-4 border border-white/50 rounded-lg text-white hover:bg-white/10 transition-all flex items-center"
              >
                <Play className="mr-2 h-4 w-4" fill="currentColor" />
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* Right column with interactive element */}
          <div className={`hidden lg:block transition-all duration-1000 ease-out delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-indigo-500/30 backdrop-blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-500/30 backdrop-blur-sm animate-pulse delay-1000"></div>
              
              <div className="w-full h-[480px] rounded-xl bg-white/10 backdrop-blur-md overflow-hidden border border-white/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🎓</span>
                  </div>
                  <p className="text-2xl font-medium">Interactive Learning Experience</p>
                  <p className="text-blue-200 mt-4">
                    Placeholder for hero image of students learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import Link from "next/link";
import { ChevronRight, Play, CheckCircle2 } from "lucide-react";

export default function HeroBanner() {
  const benefits = [
    "Personalized learning paths",
    "Professional teacher support",
    "AI-powered conversation practice",
    "Comprehensive skill development"
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column with text */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master English with Confidence
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Join millions of learners worldwide who are achieving fluency through our personalized courses, expert teachers, and AI-powered practice tools.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/get-started" 
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/demo" 
                className="border border-white bg-transparent text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Watch Demo
                <Play className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Right column with image or illustration */}
          <div className="relative hidden lg:block">
            <div className="w-full h-[480px] rounded-lg bg-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {/* This is a placeholder. In a real implementation, 
                  you would include an actual image or illustration of students learning */}
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">🎓</span>
                </div>
                <p className="text-xl font-medium">Interactive Learning Experience</p>
                <p className="text-blue-200 mt-2">
                  Placeholder for hero image of students learning
                </p>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-indigo-500/30 backdrop-blur-sm"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-500/30 backdrop-blur-sm"></div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 pt-16 border-t border-blue-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5M+", label: "Active Learners" },
              { number: "180+", label: "Countries" },
              { number: "500+", label: "Expert Teachers" },
              { number: "50K+", label: "5-Star Reviews" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                <div className="text-blue-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
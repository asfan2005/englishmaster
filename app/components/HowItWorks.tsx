"use client";

import { useEffect, useState, useRef } from "react";
import { 
  BookOpen, 
  MessageSquare, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Lightbulb,
  BarChart4
} from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function HowItWorks() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
      iconBg: "bg-blue-100",
      title: "Learn",
      description: "Access comprehensive courses designed by language experts covering grammar, vocabulary, and all essential skills.",
      highlights: ["Expert-designed curriculum", "Progressive difficulty levels", "Multimedia learning materials"]
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
      iconBg: "bg-indigo-100",
      title: "Practice",
      description: "Engage in conversations with our AI language partner or connect with native speakers for real-world practice.",
      highlights: ["24/7 AI conversation partner", "Real-time pronunciation feedback", "Native speaker matching"]
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-purple-500" />,
      iconBg: "bg-purple-100",
      title: "Master",
      description: "Track your progress, receive personalized feedback, and achieve fluency at your own pace.",
      highlights: ["Detailed progress analytics", "Personalized learning path", "Skill mastery certification"]
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorations */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
        
        <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            How <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">EnglishMaster</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach combines expert instruction, interactive practice, and innovative technology to deliver results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-8">
                <div className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-3">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`h-2 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
            </div>
          ))}
        </div>
        
        {/* Additional learning path visualization */}
        <div className={`mt-20 transition-all duration-1000 ease-out delay-500 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Learning Journey</h3>
            
            <div className="flex flex-col md:flex-row items-start justify-between relative">
              {/* Connection line */}
              <div className="absolute top-10 left-12 right-12 hidden md:block">
                <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-full"></div>
                <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-purple-500 transform translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {[
                { 
                  icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
                  title: "Begin Your Journey", 
                  description: "Take our placement test and get a personalized learning plan." 
                },
                { 
                  icon: <Brain className="h-8 w-8 text-indigo-500" />,
                  title: "Build Your Skills", 
                  description: "Complete interactive lessons and practice with our AI conversation partner." 
                },
                { 
                  icon: <BarChart4 className="h-8 w-8 text-purple-500" />,
                  title: "Track Your Progress", 
                  description: "See your improvement over time and adjust your learning strategy." 
                }
              ].map((step, idx) => (
                <div key={idx} className="flex-1 mb-6 md:mb-0 flex flex-col items-center text-center px-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    idx === 0 ? 'bg-yellow-100' : idx === 1 ? 'bg-indigo-100' : 'bg-purple-100'
                  }`}>
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 ease-out delay-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href="/get-started" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Start Your Learning Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
} 
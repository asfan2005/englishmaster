"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BookMarked, MessageSquare, Award, ChevronRight, Users, Clock, Star, TrendingUp, ArrowRight, Play, Heart, Share2, Bookmark, Info, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import YoutubePlayer from './YoutubePlayer';

const popularCourses = [
  {
    id: 'business-english',
    title: 'Business English Essentials',
    description: 'Master professional communication for the workplace',
    level: 'Intermediate',
    levelColor: 'bg-blue-100 text-blue-700',
    lessons: 24,
    hours: 18,
    students: 3420,
    icon: <BookMarked className="h-8 w-8 text-blue-500" />,
    iconBg: 'bg-blue-50',
    borderColor: 'border-blue-100',
    hoverBg: 'hover:bg-blue-50',
    rating: 4.8,
    instructor: "Sarah Thompson",
    instructorTitle: "Business Communication Expert",
    price: "$49.99",
    discountPrice: "$29.99"
  },
  {
    id: 'conversation-skills',
    title: 'Everyday Conversation Skills',
    description: 'Build confidence in daily English interactions',
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-700',
    lessons: 32,
    hours: 24,
    students: 5680,
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    iconBg: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
    hoverBg: 'hover:bg-indigo-50',
    rating: 4.9,
    instructor: "James Wilson",
    instructorTitle: "Conversation Coach",
    price: "$39.99",
    discountPrice: "$24.99"
  },
  {
    id: 'toefl-prep',
    title: 'TOEFL Exam Preparation',
    description: 'Comprehensive preparation for TOEFL success',
    level: 'Advanced',
    levelColor: 'bg-purple-100 text-purple-700',
    lessons: 40,
    hours: 32,
    students: 2950,
    icon: <Award className="h-8 w-8 text-purple-500" />,
    iconBg: 'bg-purple-50',
    borderColor: 'border-purple-100',
    hoverBg: 'hover:bg-purple-50',
    rating: 4.7,
    instructor: "Michael Chen",
    instructorTitle: "TOEFL Examination Expert",
    price: "$69.99",
    discountPrice: "$49.99"
  }
];

export default function PopularCourses() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState("trending");

  // Featured course with video
  const featuredCourse = {
    id: "featured-business-english",
    title: "Master Business English",
    description: "Essential vocabulary and communication skills for professional settings. Learn to communicate confidently in meetings, presentations, and business correspondence.",
    videoId: "MiebCHmiszs", // Business English Vocabulary video
    level: "Intermediate",
    rating: 4.9,
    students: 12456,
    tag: "Most Popular",
    instructor: "Sarah Thompson",
    instructorTitle: "Senior Business English Trainer",
    instructorImage: "/images/instructors/sarah.jpg",
    price: "$69.99",
    discountPrice: "$39.99",
    learningPoints: [
      "Professional email and report writing",
      "Confident presentation skills",
      "Negotiation techniques and vocabulary",
      "International business etiquette"
    ]
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent -z-10"></div>
      <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-60 -right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-40 blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with Tabs */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-700 ease-out transform ${inView ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 inline-block">
              Enhance Your English Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Join thousands of students who are already improving their English skills with our expertly crafted courses.
            </p>
            
            <div className="inline-flex bg-gray-100 p-1 rounded-full mb-8">
              <button 
                onClick={() => setActiveTab("trending")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "trending" 
                  ? "bg-white shadow-md text-blue-600" 
                  : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Trending Courses
              </button>
              <button 
                onClick={() => setActiveTab("new")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "new" 
                  ? "bg-white shadow-md text-blue-600" 
                  : "text-gray-600 hover:text-gray-900"
                }`}
              >
                New Courses
              </button>
              <button 
                onClick={() => setActiveTab("popular")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "popular" 
                  ? "bg-white shadow-md text-blue-600" 
                  : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Popular
              </button>
            </div>
          </div>
        </div>

        {/* Featured Course with Video */}
        <div className={`mb-16 transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 relative">
            {/* Floating badge */}
            <div className="absolute -top-5 left-6 z-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold flex items-center space-x-1 animate-pulse">
                <Star className="h-3.5 w-3.5 fill-white" />
                <span>Editor's Choice</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Video Column - 3/5 width on large screens */}
              <div className="lg:col-span-3 p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="relative">
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                    {featuredCourse.tag}
                  </span>
                  <span className="absolute top-4 right-4 z-10 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                    {featuredCourse.discountPrice} <span className="ml-1 line-through opacity-75 text-xs">{featuredCourse.price}</span>
                  </span>
                  <YoutubePlayer 
                    videoId={featuredCourse.videoId}
                    title="Preview: Business English Course"
                    description="Get a taste of what you'll learn"
                    className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>

              {/* Content Column - 2/5 width on large screens */}
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  {featuredCourse.level} Level
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredCourse.title}</h3>
                <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
                
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(featuredCourse.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">{featuredCourse.rating}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{featuredCourse.students.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Students</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {featuredCourse.learningPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center mb-8 pb-6 border-b border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                    {/* Instructor image placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{featuredCourse.instructor}</p>
                    <p className="text-sm text-gray-500">{featuredCourse.instructorTitle}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    href={`/courses/${featuredCourse.id}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm group"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button className="p-3 rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  <button className="p-3 rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course, index) => (
            <div
              key={course.id}
              className={`group transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 card-hover">
                {/* Ribbon */}
                <div className="ribbon">
                  <span>{index === 0 ? "Best Seller" : index === 1 ? "Popular" : "High Rated"}</span>
                </div>
                
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 ${course.iconBg} rounded-xl`}>
                      {course.icon}
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${course.levelColor}`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{course.description}</p>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">{course.rating}</span>
                  </div>
                  
                  <div className="flex items-center mb-5">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                      <p className="text-xs text-gray-500">{course.instructorTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-5">
                    <div className="text-lg font-bold text-blue-600">
                      {course.discountPrice} <span className="text-sm text-gray-400 line-through">{course.price}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Info className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                  <div className="flex space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.hours} hours</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookMarked className="h-4 w-4 mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </div>
                </div>
                
                {/* Animated bottom bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 background-animate"></div>
                
                {/* Overlay with button on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                  <Link 
                    href={`/courses/${course.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all transform translate-y-4 group-hover:translate-y-0"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Preview Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className={`mt-16 transition-all duration-1000 ease-out delay-500 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-10 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-40 bg-white opacity-5 rotate-12"></div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 relative">Ready to Master English?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto relative">
              Join thousands of students who have transformed their careers with our industry-leading courses
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
              <Link 
                href="/courses"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-md group"
              >
                <span>Explore All Courses</span>
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/pricing"
                className="inline-flex items-center px-8 py-4 border-2 border-white bg-transparent text-white rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                <span>View Pricing</span>
              </Link>
            </div>
            
            <div className="flex justify-center mt-8 space-x-8 relative">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-blue-100">Premium Courses</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-sm text-blue-100">Active Students</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-white">4.8</div>
                <div className="text-sm text-blue-100">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
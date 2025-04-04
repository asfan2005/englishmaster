"use client";

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Filter, 
  BookOpen, 
  MessageSquare,
  Headphones, 
  PenTool,
  ChevronDown,
  CheckCircle,
  ChevronRight,
  Play,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import YoutubePlayer from '../components/YoutubePlayer';

// Video categories
const categories = [
  { id: 'all', name: 'All Videos', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'speaking', name: 'Speaking', icon: <MessageSquare className="h-5 w-5" /> },
  { id: 'listening', name: 'Listening', icon: <Headphones className="h-5 w-5" /> },
  { id: 'writing', name: 'Writing', icon: <PenTool className="h-5 w-5" /> },
  { id: 'business', name: 'Business English', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'grammar', name: 'Grammar', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'exams', name: 'Exam Prep', icon: <BookOpen className="h-5 w-5" /> },
];

// Difficulty levels
const levels = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

// Video duration options
const durations = [
  { id: 'all', name: 'Any Duration' },
  { id: 'short', name: 'Short (< 10 min)' },
  { id: 'medium', name: 'Medium (10-20 min)' },
  { id: 'long', name: 'Long (> 20 min)' },
];

// Video library data
const videoLibrary = [
  {
    id: 1,
    title: "English Conversation Practice",
    description: "Learn speaking with common everyday situations",
    videoId: "juKd26qkNAw",
    category: "speaking",
    level: "beginner",
    duration: "medium",
    length: "15:23",
    instructor: "Emma Johnson",
    rating: 4.9,
    views: 245890,
    featured: true
  },
  {
    id: 2,
    title: "15 Common English Idioms",
    description: "Understand everyday expressions used by native speakers",
    videoId: "CrK5rppAEa4",
    category: "speaking",
    level: "intermediate",
    duration: "short",
    length: "8:45",
    instructor: "James Wilson",
    rating: 4.7,
    views: 187240,
    featured: false
  },
  {
    id: 3,
    title: "Business English Vocabulary",
    description: "Essential words and phrases for professional settings",
    videoId: "MiebCHmiszs",
    category: "business",
    level: "intermediate",
    duration: "medium",
    length: "12:18",
    instructor: "Sarah Thompson",
    rating: 4.8,
    views: 162430,
    featured: true
  },
  {
    id: 4,
    title: "Perfect Your Pronunciation",
    description: "Master the sounds that non-native speakers find difficult",
    videoId: "dD0RIi4bKUg",
    category: "speaking",
    level: "intermediate",
    duration: "medium",
    length: "14:52",
    instructor: "Emma Johnson",
    rating: 4.9,
    views: 198560,
    featured: false
  },
  {
    id: 5,
    title: "Mastering TOEFL Listening Section",
    description: "Strategies and practice for TOEFL listening comprehension",
    videoId: "q5r6iF9Qzz4",
    category: "exams",
    level: "advanced",
    duration: "long",
    length: "25:37",
    instructor: "Michael Chen",
    rating: 4.8,
    views: 132750,
    featured: false
  },
  {
    id: 6,
    title: "English Grammar: Conditionals",
    description: "Clear explanation of all conditional forms with examples",
    videoId: "CwDsYlPJyj0",
    category: "grammar",
    level: "intermediate",
    duration: "medium",
    length: "18:05",
    instructor: "David Smith",
    rating: 4.7,
    views: 145680,
    featured: false
  },
  {
    id: 7,
    title: "Academic Writing Skills",
    description: "How to structure essays and academic papers in English",
    videoId: "GgkRoYPLhts",
    category: "writing",
    level: "advanced",
    duration: "long",
    length: "22:14",
    instructor: "Lisa Anderson",
    rating: 4.8,
    views: 89720,
    featured: false
  },
  {
    id: 8,
    title: "Listening Practice: Understanding Native Speakers",
    description: "Train your ear to understand fast natural speech",
    videoId: "K-Tn8Xrt4nE",
    category: "listening",
    level: "intermediate",
    duration: "medium",
    length: "16:42",
    instructor: "James Wilson",
    rating: 4.6,
    views: 112540,
    featured: false
  },
  {
    id: 9,
    title: "Business Email Writing",
    description: "Templates and phrases for effective professional emails",
    videoId: "3Tu9ZZrDdzI",
    category: "business",
    level: "intermediate",
    duration: "short",
    length: "9:58",
    instructor: "Sarah Thompson",
    rating: 4.7,
    views: 98460,
    featured: false
  },
  {
    id: 10,
    title: "Job Interview English",
    description: "Prepare for job interviews with common questions and answers",
    videoId: "9FmHLB8awRk",
    category: "business",
    level: "intermediate",
    duration: "medium",
    length: "19:27",
    instructor: "Michael Chen",
    rating: 4.9,
    views: 224180,
    featured: true
  },
  {
    id: 11,
    title: "English Prepositions Made Easy",
    description: "Simple rules to master tricky English prepositions",
    videoId: "-BmZCMV0-is",
    category: "grammar",
    level: "beginner",
    duration: "short",
    length: "7:35",
    instructor: "Emma Johnson",
    rating: 4.8,
    views: 165240,
    featured: false
  },
  {
    id: 12,
    title: "IELTS Speaking Test Tips",
    description: "Strategies to improve your IELTS speaking score",
    videoId: "XyDrz6YAwvw",
    category: "exams",
    level: "advanced",
    duration: "medium",
    length: "15:49",
    instructor: "David Smith",
    rating: 4.9,
    views: 187630,
    featured: false
  }
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(videoLibrary);
  const [featuredVideo, setFeaturedVideo] = useState(videoLibrary.find(video => video.featured));
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Apply filters
  useEffect(() => {
    let filtered = videoLibrary;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(video => video.level === selectedLevel);
    }
    
    // Apply duration filter
    if (selectedDuration !== "all") {
      filtered = filtered.filter(video => video.duration === selectedDuration);
    }
    
    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AppLayout>
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Learning Library</h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Explore our collection of high-quality English learning videos covering all 
                  skills and topics to help you master English.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search videos..."
                    className="w-full md:w-64 px-4 py-3 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-gray-700"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-8 sticky top-0 z-10">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start md:items-center">
              {/* Category Filter */}
              <div className="flex-grow md:flex-grow-0 w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-select block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Level Filter */}
              <div className="flex-grow md:flex-grow-0 w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <div className="relative">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="form-select block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Duration Filter */}
              <div className="flex-grow md:flex-grow-0 w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <div className="relative">
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="form-select block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="flex-grow text-right hidden md:block">
                <div className="text-sm text-gray-600 mt-7">
                  Showing {filteredVideos.length} of {videoLibrary.length} videos
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div ref={ref}>
            {/* Featured Video Section */}
            {featuredVideo && filteredVideos.some(v => v.id === featuredVideo.id) && (
              <div className={`mb-12 transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Video</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-6">
                      <YoutubePlayer 
                        videoId={featuredVideo.videoId}
                        title={featuredVideo.title}
                        description={featuredVideo.description}
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        {categories.find(c => c.id === featuredVideo.category)?.name || featuredVideo.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredVideo.title}</h3>
                      <p className="text-gray-600 mb-6">{featuredVideo.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-gray-700">{featuredVideo.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span className="ml-1 text-gray-700">{featuredVideo.length}</span>
                        </div>
                        <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                          {levels.find(l => l.id === featuredVideo.level)?.name || featuredVideo.level}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-gray-800">{featuredVideo.instructor}</p>
                          <p className="text-sm text-gray-500">English Instructor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Video Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedCategory !== "all" 
                  ? categories.find(c => c.id === selectedCategory)?.name 
                  : "All Videos"}
              </h2>
              
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video, index) => (
                    <div 
                      key={video.id}
                      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="p-1">
                        <YoutubePlayer 
                          videoId={video.videoId}
                          title={video.title}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            video.level === "beginner" ? "bg-green-100 text-green-800" :
                            video.level === "intermediate" ? "bg-blue-100 text-blue-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {levels.find(l => l.id === video.level)?.name || video.level}
                          </span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-500">{video.length}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{video.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                            <span className="text-sm font-medium text-gray-800">{video.instructor}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm text-gray-700">{video.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                        <button className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center">
                          <Play className="h-4 w-4 mr-1" />
                          Watch Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No videos found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedLevel("all");
                      setSelectedDuration("all");
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
            
            {/* Pagination - For future implementation */}
            {filteredVideos.length > 9 && (
              <div className="flex justify-center my-8">
                <nav className="flex items-center">
                  <button className="px-3 py-2 mx-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 mx-1 rounded-lg bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-2 mx-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 mx-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-2 mx-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mt-12 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take your English to the next level?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our premium courses for personalized instruction and comprehensive learning materials.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/courses" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                Browse Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

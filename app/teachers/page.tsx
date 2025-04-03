"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Star, Globe, Award, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Teacher data type
interface Teacher {
  id: string;
  name: string;
  specialization: string[];
  languages: string[];
  rating: number;
  experience: number;
  hourlyRate: number;
  location: string;
  timeZone: string;
  avatar: string;
  verified: boolean;
  bio: string;
  availability: string[];
}

// Sample teacher data
const teachersData: Teacher[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    specialization: ["Conversation", "Business English", "IELTS"],
    languages: ["English", "Spanish"],
    rating: 4.9,
    experience: 7,
    hourlyRate: 25,
    location: "London, UK",
    timeZone: "GMT",
    avatar: "/images/teachers/teacher1.jpg",
    verified: true,
    bio: "Certified TEFL instructor with 7 years of experience teaching business professionals and exam preparation. I focus on conversational fluency and practical language skills.",
    availability: ["Mon-Fri: 9am-5pm", "Sat: 10am-2pm"]
  },
  {
    id: "t2",
    name: "Michael Chen",
    specialization: ["Grammar", "Pronunciation", "TOEFL"],
    languages: ["English", "Mandarin", "Cantonese"],
    rating: 4.8,
    experience: 5,
    hourlyRate: 22,
    location: "Toronto, Canada",
    timeZone: "EST",
    avatar: "/images/teachers/teacher2.jpg",
    verified: true,
    bio: "Specialized in helping students master English pronunciation and grammar. My teaching approach combines structured lessons with interactive activities.",
    availability: ["Mon-Thu: 3pm-9pm", "Sun: 10am-8pm"]
  },
  {
    id: "t3",
    name: "Emma Rodriguez",
    specialization: ["Conversation", "Writing", "Literature"],
    languages: ["English", "French", "Portuguese"],
    rating: 4.7,
    experience: 10,
    hourlyRate: 30,
    location: "Paris, France",
    timeZone: "CET",
    avatar: "/images/teachers/teacher3.jpg",
    verified: true,
    bio: "Literature professor with a passion for teaching creative writing and conversation. I help students develop their unique voice while improving their English skills.",
    availability: ["Tue-Fri: 1pm-8pm", "Sat: 9am-3pm"]
  },
  {
    id: "t4",
    name: "David Kim",
    specialization: ["Business English", "Technical English", "Interview Prep"],
    languages: ["English", "Korean"],
    rating: 4.9,
    experience: 8,
    hourlyRate: 35,
    location: "Seoul, South Korea",
    timeZone: "KST",
    avatar: "/images/teachers/teacher4.jpg",
    verified: true,
    bio: "Former corporate trainer specialized in business and technical English. I help professionals advance their careers through improved communication skills.",
    availability: ["Mon-Fri: 6pm-10pm", "Sat-Sun: 9am-5pm"]
  },
  {
    id: "t5",
    name: "Olivia Patel",
    specialization: ["Conversation", "Pronunciation", "Exam Prep"],
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.6,
    experience: 4,
    hourlyRate: 20,
    location: "Mumbai, India",
    timeZone: "IST",
    avatar: "/images/teachers/teacher5.jpg",
    verified: true,
    bio: "Energetic and patient teacher focused on building student confidence. I specialize in helping beginners become comfortable speaking English.",
    availability: ["Mon-Sat: 10am-7pm"]
  },
  {
    id: "t6",
    name: "James Wilson",
    specialization: ["Academic English", "IELTS", "TOEFL"],
    languages: ["English", "German"],
    rating: 4.8,
    experience: 12,
    hourlyRate: 40,
    location: "Sydney, Australia",
    timeZone: "AEST",
    avatar: "/images/teachers/teacher6.jpg",
    verified: true,
    bio: "Academic English specialist with over a decade of experience preparing students for university studies and language examinations.",
    availability: ["Mon-Fri: 2pm-8pm", "Sat: 10am-2pm"]
  }
];

// All available specializations
const allSpecializations = [
  "Conversation", "Business English", "Grammar", "Pronunciation", 
  "IELTS", "TOEFL", "Academic English", "Writing", "Literature",
  "Technical English", "Interview Prep", "Exam Prep"
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    specialization: [] as string[],
    minRating: 0,
    maxPrice: 100,
    languages: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(teachersData);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Apply filters and search
  useEffect(() => {
    let result = teachersData;
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specialization filter
    if (filters.specialization.length > 0) {
      result = result.filter(teacher => 
        teacher.specialization.some(s => filters.specialization.includes(s))
      );
    }
    
    // Apply minimum rating filter
    if (filters.minRating > 0) {
      result = result.filter(teacher => teacher.rating >= filters.minRating);
    }
    
    // Apply maximum price filter
    if (filters.maxPrice < 100) {
      result = result.filter(teacher => teacher.hourlyRate <= filters.maxPrice);
    }
    
    // Apply languages filter
    if (filters.languages.length > 0) {
      result = result.filter(teacher => 
        teacher.languages.some(l => filters.languages.includes(l))
      );
    }
    
    setFilteredTeachers(result);
  }, [searchTerm, filters]);

  // Toggle specialization in filter
  const toggleSpecialization = (specialization: string) => {
    setFilters(prev => {
      if (prev.specialization.includes(specialization)) {
        return {
          ...prev,
          specialization: prev.specialization.filter(s => s !== specialization)
        };
      } else {
        return {
          ...prev,
          specialization: [...prev.specialization, specialization]
        };
      }
    });
  };

  // Toggle language in filter
  const toggleLanguage = (language: string) => {
    setFilters(prev => {
      if (prev.languages.includes(language)) {
        return {
          ...prev,
          languages: prev.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, language]
        };
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      specialization: [],
      minRating: 0,
      maxPrice: 100,
      languages: []
    });
    setSearchTerm("");
  };

  // Get all unique languages from teachers
  const allLanguages = Array.from(
    new Set(teachersData.flatMap(teacher => teacher.languages))
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Our English Teachers</h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-8">
            Learn from qualified and experienced teachers who will help you achieve your language goals
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden p-1">
              <input
                type="text"
                placeholder="Search by name, specialty, or keyword..."
                className="w-full py-3 px-6 focus:outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 p-3 rounded-full mr-1">
                <Search className="text-white h-5 w-5" />
              </button>
            </div>
            <button 
              className="absolute right-16 top-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-1" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button 
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Reset all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Specialization filter */}
                <div>
                  <h3 className="font-medium mb-3">Specialization</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSpecializations.map(spec => (
                      <button
                        key={spec}
                        onClick={() => toggleSpecialization(spec)}
                        className={`text-sm px-3 py-1 rounded-full ${
                          filters.specialization.includes(spec)
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Rating and price filters */}
                <div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-3">Minimum Rating</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={filters.minRating}
                        onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                        className="w-full accent-blue-600"
                      />
                      <span className="ml-2 min-w-[40px] text-center">{filters.minRating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Maximum Price ($/hour)</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                        className="w-full accent-blue-600"
                      />
                      <span className="ml-2 min-w-[40px] text-center">${filters.maxPrice}</span>
                    </div>
                  </div>
                </div>
                
                {/* Languages filter */}
                <div>
                  <h3 className="font-medium mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {allLanguages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`text-sm px-3 py-1 rounded-full ${
                          filters.languages.includes(lang)
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count and sorting */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}</p>
          <select className="border rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="rating">Sort by: Rating</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        {/* Teachers grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map(teacher => (
              <div 
                key={teacher.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {/* Use a placeholder image with proper sizing */}
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-400">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {teacher.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{teacher.name}</h3>
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        <span className="text-gray-700 mr-2">{teacher.rating}</span>
                        <span className="text-gray-500 text-sm">({teacher.experience} years)</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Globe className="h-3 w-3 mr-1" />
                        <span>{teacher.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">${teacher.hourlyRate}</p>
                      <p className="text-gray-500 text-sm">per hour</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{teacher.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {teacher.specialization.map(spec => (
                        <span key={spec} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        View Profile
                      </button>
                      <Link 
                        href={`/book-lesson?teacher=${teacher.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Book Lesson
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Try adjusting your search or filter criteria to find available teachers.
            </p>
            <button 
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Teacher profile modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">Teacher Profile</h2>
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-400 text-4xl">
                      {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedTeacher.name}
                      {selectedTeacher.verified && (
                        <span className="inline-flex items-center ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
                      <span className="text-gray-700 mr-3">{selectedTeacher.rating}</span>
                      <Award className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-700">{selectedTeacher.experience} years experience</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-4">
                      <div className="w-full sm:w-1/2 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>{selectedTeacher.location} ({selectedTeacher.timeZone})</span>
                      </div>
                      <div className="w-full sm:w-1/2">
                        <span className="font-medium">Languages: </span>
                        {selectedTeacher.languages.join(", ")}
                      </div>
                      <div className="w-full sm:w-1/2">
                        <span className="font-medium">Hourly Rate: </span>
                        ${selectedTeacher.hourlyRate}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeacher.specialization.map(spec => (
                          <span key={spec} className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Availability</h4>
                      <div className="bg-gray-50 p-3 rounded-md">
                        {selectedTeacher.availability.map((slot, i) => (
                          <div key={i} className="text-sm mb-1 last:mb-0">{slot}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-gray-700">{selectedTeacher.bio}</p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <Link
                    href={`/book-lesson?teacher=${selectedTeacher.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Book a Lesson
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

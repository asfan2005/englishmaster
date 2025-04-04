"use client";

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart3, 
  PieChart, 
  Calendar, 
  ChevronRight, 
  BookOpen, 
  GraduationCap,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Activity,
  TrendingUp,
  Zap,
  Play
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import YoutubePlayer from '../components/YoutubePlayer';

const DashboardPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts and statistics
  const courseProgress = [
    { id: 1, title: "Business English", progress: 75, level: "Intermediate", nextLesson: "Negotiation Skills" },
    { id: 2, title: "Conversational Fluency", progress: 42, level: "Advanced", nextLesson: "Cultural Idioms" },
    { id: 3, title: "Grammar Essentials", progress: 89, level: "Beginner", nextLesson: "Past Perfect Tense" }
  ];

  const weeklyActivity = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 65 },
    { day: "Thu", minutes: 20 },
    { day: "Fri", minutes: 50 },
    { day: "Sat", minutes: 80 },
    { day: "Sun", minutes: 35 }
  ];

  const skillScores = [
    { skill: "Reading", score: 82 },
    { skill: "Writing", score: 68 },
    { skill: "Listening", score: 75 },
    { skill: "Speaking", score: 63 }
  ];

  const upcomingLessons = [
    { id: 1, title: "Presentation Skills", time: "Today, 3:00 PM", duration: 45 },
    { id: 2, title: "Idioms in Business", time: "Tomorrow, 10:00 AM", duration: 30 },
    { id: 3, title: "Email Writing Workshop", time: "Friday, 2:00 PM", duration: 60 }
  ];

  // Additional video content
  const recommendedVideos = [
    { 
      id: "juKd26qkNAw", 
      title: "English Conversation Practice",
      description: "Learn speaking with common situations"
    },
    { 
      id: "CrK5rppAEa4", 
      title: "15 Common English Idioms",
      description: "Understand everyday expressions"
    },
    { 
      id: "MiebCHmiszs", 
      title: "Business English Vocabulary",
      description: "Essential words for professional settings"
    }
  ];

  // Find the maximum minutes value for scaling
  const maxMinutes = Math.max(...weeklyActivity.map(day => day.minutes));

  return (
    <AppLayout>
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Your Learning Dashboard</h1>
                <p className="mt-1 text-blue-100">
                  Track your progress and continue your English learning journey
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">17</div>
                  <div className="text-xs text-blue-200">Days Streak</div>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">5.3</div>
                  <div className="text-xs text-blue-200">Hours This Week</div>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-blue-200">Active Courses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
                { id: "courses", label: "My Courses", icon: <BookOpen className="h-4 w-4" /> },
                { id: "statistics", label: "Statistics", icon: <PieChart className="h-4 w-4" /> },
                { id: "schedule", label: "Schedule", icon: <Calendar className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-4 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div ref={ref} className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div className={`transition-all duration-1000 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Welcome and Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Welcome back, Alex!</h2>
                    <p className="text-gray-600 mt-1">You're making good progress. Keep it up!</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href="/demo"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Continue Learning
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Daily Goal</div>
                      <div className="text-xl font-bold text-gray-800">75% Complete</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-green-600 font-medium">Vocabulary</div>
                      <div className="text-xl font-bold text-gray-800">+24 Words</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <div className="bg-purple-100 rounded-full p-3 mr-4">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-purple-600 font-medium">XP Points</div>
                      <div className="text-xl font-bold text-gray-800">3,240 XP</div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 flex items-center">
                    <div className="bg-amber-100 rounded-full p-3 mr-4">
                      <Trophy className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm text-amber-600 font-medium">Achievements</div>
                      <div className="text-xl font-bold text-gray-800">7 Unlocked</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Course Progress */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Course Progress</h3>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="space-y-6">
                  {courseProgress.map((course, index) => (
                    <div key={course.id} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">{course.title}</h4>
                          <div className="text-sm text-gray-500">{course.level} • Next: {course.nextLesson}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">{course.progress}%</div>
                          <div className="text-sm text-gray-500">Completed</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000 rounded-full group-hover:bg-blue-600" 
                          style={{ 
                            width: `${course.progress}%`,
                            backgroundColor: index === 0 ? '#2563EB' : index === 1 ? '#9333EA' : '#10B981',
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/courses" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    View All Courses
                  </Link>
                </div>
              </div>
              
              {/* Activity and Upcoming Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Weekly Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Weekly Activity
                  </h3>
                  
                  <div className="h-48 flex items-end justify-between">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <div 
                          className="w-10 bg-blue-100 rounded-t-md relative overflow-hidden group"
                          style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                        >
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-700"
                            style={{ 
                              height: '0%', 
                              transitionDelay: `${index * 100}ms`
                            }}
                          ></div>
                          
                          <div 
                            className="absolute inset-0 bg-blue-500 transition-all duration-1000" 
                            style={{ 
                              height: inView ? '100%' : '0%',
                              transitionDelay: `${index * 100}ms`
                            }}
                          ></div>
                          
                          <div className="absolute top-0 left-0 right-0 flex justify-center -mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                              {day.minutes} min
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600 font-medium">{day.day}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">Total This Week</div>
                      <div className="text-lg font-bold text-gray-800">
                        {weeklyActivity.reduce((acc, day) => acc + day.minutes, 0)} minutes
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Upcoming Lessons */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Upcoming Lessons
                  </h3>
                  
                  <div className="space-y-4">
                    {upcomingLessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors group">
                        <div className="bg-blue-100 rounded-full p-3 mr-4 group-hover:bg-blue-200 transition-colors">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                          <div className="text-sm text-gray-500">{lesson.time} • {lesson.duration} minutes</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link 
                      href="/schedule" 
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      View Full Schedule
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Recommended Videos - NEW SECTION */}
              <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Recommended Learning Videos</h3>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedVideos.map((video, index) => (
                    <div key={video.id} className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                      <YoutubePlayer 
                        videoId={video.id}
                        title={video.title}
                        description={video.description}
                      />
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-blue-600 font-medium">Recommended for you</div>
                          <div className="text-xs text-gray-500">Beginner friendly</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/library" 
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center"
                  >
                    <span>Browse Full Video Library</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              {/* Skill Assessment */}
              <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Your Skill Assessment</h3>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {skillScores.map((skill, index) => (
                    <div key={skill.skill} className="flex flex-col items-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#EEF2FF"
                            strokeWidth="10"
                          />
                          
                          {/* Progress circle with animation */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={
                              index === 0 ? "#3B82F6" : 
                              index === 1 ? "#8B5CF6" : 
                              index === 2 ? "#10B981" : 
                              "#F59E0B"
                            }
                            strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.score / 100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            style={{
                              transition: "stroke-dashoffset 1.5s ease-in-out",
                              transitionDelay: `${index * 200}ms`
                            }}
                          />
                          
                          {/* Text in center */}
                          <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-2xl font-bold"
                            fill="#1F2937"
                          >
                            {skill.score}%
                          </text>
                        </svg>
                      </div>
                      <div className="mt-2 font-medium text-gray-800">{skill.skill}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-800">Personalized Recommendation</h4>
                      <p className="text-gray-600 mt-1">
                        Based on your skill assessment, we recommend focusing on improving your speaking skills. 
                        Try our "Conversation Confidence" course to practice with AI partners.
                      </p>
                      <Link 
                        href="/courses/speaking" 
                        className="inline-flex items-center mt-2 text-blue-600 font-medium hover:text-blue-800"
                      >
                        View Recommended Course
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs - simplified placeholders */}
          {activeTab === "courses" && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">My Courses Content</h3>
              <p className="text-gray-600 max-w-lg mx-auto">
                This tab would display all your enrolled courses with detailed progress and lessons.
              </p>
            </div>
          )}
          
          {activeTab === "statistics" && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
              <PieChart className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Statistics Content</h3>
              <p className="text-gray-600 max-w-lg mx-auto">
                This tab would display detailed analytics about your learning patterns and achievements.
              </p>
            </div>
          )}
          
          {activeTab === "schedule" && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Schedule Content</h3>
              <p className="text-gray-600 max-w-lg mx-auto">
                This tab would display your weekly calendar with upcoming lessons and events.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage; 
"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  BarChart, 
  ChevronRight, 
  User, 
  Mic, 
  Headphones, 
  PenTool, 
  BookMarked, 
  GraduationCap,
  MessageSquare
} from "lucide-react";

// Mock user data
const userData = {
  name: "Alex Johnson",
  level: "Intermediate",
  streak: 14,
  points: 3750,
  nextLevelPoints: 5000
};

// Mock upcoming lessons
const upcomingLessons = [
  {
    id: "lesson1",
    title: "Business English: Negotiations",
    teacher: "Sarah Johnson",
    date: "Today",
    time: "3:00 PM",
    duration: 60
  },
  {
    id: "lesson2",
    title: "Grammar: Conditional Clauses",
    teacher: "Michael Chen",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: 45
  },
  {
    id: "lesson3",
    title: "Speaking Practice: Job Interviews",
    teacher: "Emma Rodriguez",
    date: "Friday, Apr 5",
    time: "2:00 PM",
    duration: 30
  }
];

// Mock recommended activities
const suggestedActivities = [
  {
    id: "activity1",
    title: "Finish your vocabulary practice",
    description: "You've completed 3/5 exercises",
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    link: "/vocabulary",
    progress: 60
  },
  {
    id: "activity2",
    title: "Take a speaking assessment",
    description: "Practice your pronunciation skills",
    icon: <Mic className="h-8 w-8 text-green-500" />,
    link: "/speaking",
    progress: 0
  },
  {
    id: "activity3",
    title: "Continue your listening exercise",
    description: "You're halfway through 'Understanding Accents'",
    icon: <Headphones className="h-8 w-8 text-purple-500" />,
    link: "/listening",
    progress: 50
  },
  {
    id: "activity4",
    title: "Write today's journal entry",
    description: "Keep your writing streak going",
    icon: <PenTool className="h-8 w-8 text-yellow-500" />,
    link: "/writing",
    progress: 0
  }
];

// Mock recent courses
const recentCourses = [
  {
    id: "course1",
    title: "Business English Essentials",
    progress: 68,
    lastAccessed: "Yesterday",
    image: "/images/courses/business.jpg"
  },
  {
    id: "course2",
    title: "TOEFL Exam Preparation",
    progress: 42,
    lastAccessed: "3 days ago",
    image: "/images/courses/toefl.jpg"
  },
  {
    id: "course3",
    title: "Everyday Conversation Skills",
    progress: 85,
    lastAccessed: "1 week ago",
    image: "/images/courses/conversation.jpg"
  }
];

// Mock achievements
const achievements = [
  {
    id: "achievement1",
    title: "14-Day Streak",
    icon: "🔥",
    date: "Today"
  },
  {
    id: "achievement2",
    title: "Vocabulary Master",
    icon: "📚",
    date: "Yesterday"
  },
  {
    id: "achievement3",
    title: "Grammar Expert",
    icon: "🏆",
    date: "Last week"
  }
];

// Weekly activity data for chart
const weeklyActivity = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 60 },
  { day: "Thu", minutes: 25 },
  { day: "Fri", minutes: 45 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 0 }
];

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState("week");
  
  // Calculate level progress percentage
  const levelProgress = (userData.points / userData.nextLevelPoints) * 100;
  
  return (
    <AppLayout>
      <div className="min-h-screen pb-12">
        {/* Header with welcome message and user info */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {userData.name}!</h1>
                <p className="text-blue-100">
                  You're on a {userData.streak}-day streak. Keep up the good work!
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="mr-4">
                  <p className="text-sm text-blue-100">Your Level</p>
                  <div className="flex items-center">
                    <p className="font-bold">{userData.level}</p>
                    <GraduationCap className="h-5 w-5 ml-1" />
                  </div>
                </div>
                
                <Link 
                  href="/profile" 
                  className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
              </div>
            </div>
            
            {/* Level progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>{userData.points} XP</span>
                <span>{userData.nextLevelPoints} XP</span>
              </div>
              <div className="w-full bg-blue-900/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full" 
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-100 mt-1">
                {userData.nextLevelPoints - userData.points} XP until next level
              </p>
            </div>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Activities and Courses */}
            <div className="lg:col-span-2 space-y-8">
              {/* Suggested Activities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Suggested for You</h2>
                  <Link 
                    href="/activities" 
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    All Activities
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedActivities.map(activity => (
                    <Link 
                      key={activity.id} 
                      href={activity.link}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start"
                    >
                      <div className="flex-shrink-0 mr-4">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{activity.description}</p>
                        
                        {activity.progress > 0 && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${activity.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{activity.progress}% complete</p>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Recent Courses */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
                  <Link 
                    href="/courses" 
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    All Courses
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentCourses.map(course => (
                    <Link 
                      key={course.id} 
                      href={`/courses/${course.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start"
                    >
                      <div className="flex-shrink-0 mr-4 w-16 h-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                        {/* Use a placeholder for the course image */}
                        <BookMarked className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">Last accessed: {course.lastAccessed}</p>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/courses/browse" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
                  >
                    Browse More Courses
                  </Link>
                </div>
              </div>
              
              {/* Study Streak Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Activity</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setTimeFilter("week")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        timeFilter === "week" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Week
                    </button>
                    <button 
                      onClick={() => setTimeFilter("month")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        timeFilter === "month" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Month
                    </button>
                  </div>
                </div>
                
                {/* Simple bar chart for activity */}
                <div className="h-48 flex items-end justify-between">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full max-w-[30px] rounded-t-md ${
                          day.minutes > 0 ? "bg-blue-500" : "bg-gray-200"
                        }`}
                        style={{ 
                          height: `${(day.minutes / 60) * 100}%`,
                          minHeight: day.minutes > 0 ? "4px" : "0" 
                        }}
                      ></div>
                      <p className="text-xs text-gray-500 mt-2">{day.day}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Total this week</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {weeklyActivity.reduce((sum, day) => sum + day.minutes, 0)} min
                    </p>
                  </div>
                  <Link 
                    href="/progress" 
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    View Detailed Stats
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right column - Schedule, Achievements, Chat */}
            <div className="space-y-8">
              {/* Upcoming Lessons */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
                  <Link 
                    href="/schedule" 
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    Full Schedule
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                {upcomingLessons.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingLessons.map(lesson => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              <p className="text-gray-500 text-sm mt-1">with {lesson.teacher}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-900 font-medium">{lesson.date}</p>
                            <p className="text-gray-500">{lesson.time}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration} minutes
                          </div>
                          <Link
                            href={`/lessons/${lesson.id}`}
                            className="text-blue-600 text-sm font-medium"
                          >
                            Join Lesson
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No upcoming lessons</p>
                    <Link
                      href="/teachers"
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Book a Lesson
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Recent Achievements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
                  <Link 
                    href="/achievements" 
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl mr-3">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                        <p className="text-gray-500 text-xs">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Chat Assistant */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Hi {userData.name}! Need help with your studies today?
                      </p>
                      <div className="mt-3 space-y-2">
                        <button className="block w-full text-left px-3 py-2 bg-white rounded-md text-sm border border-gray-200 hover:bg-gray-50">
                          Help me practice speaking
                        </button>
                        <button className="block w-full text-left px-3 py-2 bg-white rounded-md text-sm border border-gray-200 hover:bg-gray-50">
                          Explain a grammar concept
                        </button>
                        <button className="block w-full text-left px-3 py-2 bg-white rounded-md text-sm border border-gray-200 hover:bg-gray-50">
                          Create a vocabulary quiz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/chat"
                  className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat with AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 
"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Settings, Book, MessageSquare, Calendar, BarChart, Edit, ChevronRight, LogOut } from "lucide-react";

// Mock user data
const userData = {
  name: "To'raqulov Asfandiyor",
  email: "asfan.coder@gmail.com",
  level: "Intermediate",
  joinDate: "January 15, 2023",
  completedLessons: 37,
  streak: 14,
  totalHours: 26,
  avatarUrl: null
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* User info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold mb-4">
                    {userData.avatarUrl ? (
                      <img src={userData.avatarUrl} alt={userData.name} className="w-24 h-24 rounded-full" />
                    ) : (
                      userData.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">{userData.email}</p>
                  <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {userData.level} Level
                  </div>
                  <button className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "profile" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>Profile Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "progress" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BarChart className="h-5 w-5 mr-3" />
                  <span>Learning Progress</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "courses" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Book className="h-5 w-5 mr-3" />
                  <span>My Courses</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "sessions" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Scheduled Sessions</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "messages" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  <span>Messages</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "settings" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link 
                    href="/logout" 
                    className="w-full flex items-center p-3 rounded-md text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log Out</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-3">
            {/* Profile Overview */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Overview</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-700">{userData.completedLessons}</p>
                      <p className="text-gray-600 text-sm">Completed Lessons</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-700">{userData.streak} days</p>
                      <p className="text-gray-600 text-sm">Current Streak</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-700">{userData.totalHours} hrs</p>
                      <p className="text-gray-600 text-sm">Total Learning Time</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Account Level</p>
                        <p className="text-gray-600 text-sm">{userData.level}</p>
                      </div>
                      <Link 
                        href="/levels" 
                        className="text-blue-600 text-sm flex items-center"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Member Since</p>
                        <p className="text-gray-600 text-sm">{userData.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Learning Goals</p>
                        <p className="text-gray-600 text-sm">Business English, TOEFL Preparation</p>
                      </div>
                      <Link 
                        href="/goals" 
                        className="text-blue-600 text-sm flex items-center"
                      >
                        Update Goals
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {[
                      { type: "lesson", title: "Completed 'Business Meeting Vocabulary'", date: "2 days ago" },
                      { type: "practice", title: "Practiced speaking with AI tutor", date: "3 days ago" },
                      { type: "achievement", title: "Earned 'Grammar Master' badge", date: "5 days ago" },
                      { type: "session", title: "Completed session with Sarah Johnson", date: "1 week ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          activity.type === "lesson" ? "bg-blue-100 text-blue-600" :
                          activity.type === "practice" ? "bg-green-100 text-green-600" :
                          activity.type === "achievement" ? "bg-yellow-100 text-yellow-600" :
                          "bg-purple-100 text-purple-600"
                        }`}>
                          {activity.type === "lesson" ? <Book className="h-5 w-5" /> :
                           activity.type === "practice" ? <MessageSquare className="h-5 w-5" /> :
                           activity.type === "achievement" ? <BarChart className="h-5 w-5" /> :
                           <Calendar className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-gray-500 text-sm">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      href="/activity" 
                      className="text-blue-600 text-sm font-medium"
                    >
                      View All Activity
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Learning Progress */}
            {activeTab === "progress" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Overall Progress</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Speaking</p>
                        <p className="text-sm text-gray-600">75%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Listening</p>
                        <p className="text-sm text-gray-600">82%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Reading</p>
                        <p className="text-sm text-gray-600">68%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Writing</p>
                        <p className="text-sm text-gray-600">60%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Grammar</p>
                        <p className="text-sm text-gray-600">78%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Vocabulary</p>
                        <p className="text-sm text-gray-600">70%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Recent Achievements</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: "Grammar Master", desc: "Completed all intermediate grammar lessons", icon: "🏆" },
                      { title: "Vocab Builder", desc: "Learned 500 new words", icon: "📚" },
                      { title: "Consistent Learner", desc: "Maintained a 14-day streak", icon: "🔥" },
                      { title: "Conversation Pro", desc: "Completed 20 speaking exercises", icon: "🎯" },
                      { title: "Essay Expert", desc: "Wrote 10 essays", icon: "✍️" },
                      { title: "Listening Ace", desc: "Achieved 90% accuracy in listening tests", icon: "👂" }
                    ].map((achievement, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-gray-500 text-sm">{achievement.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Profile settings */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold mr-4">
                            {userData.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                            Change Avatar
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Language Level</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Beginner</option>
                          <option selected>Intermediate</option>
                          <option>Advanced</option>
                          <option>Proficient</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-3">Learning Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                          Receive daily reminder emails
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="progressReports"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <label htmlFor="progressReports" className="ml-2 text-gray-700">
                          Receive weekly progress reports
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newContent"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <label htmlFor="newContent" className="ml-2 text-gray-700">
                          Notify me about new courses and content
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="darkMode"
                          className="h-4 w-4"
                        />
                        <label htmlFor="darkMode" className="ml-2 text-gray-700">
                          Use dark mode
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-3">Privacy & Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Change Password</label>
                        <div className="space-y-2">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="twoFactor"
                          className="h-4 w-4"
                        />
                        <label htmlFor="twoFactor" className="ml-2 text-gray-700">
                          Enable two-factor authentication
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="publicProfile"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <label htmlFor="publicProfile" className="ml-2 text-gray-700">
                          Make my profile visible to other students
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {(activeTab === "courses" || activeTab === "sessions" || activeTab === "messages") && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
                  {activeTab === "courses" ? <Book className="h-10 w-10" /> :
                   activeTab === "sessions" ? <Calendar className="h-10 w-10" /> :
                   <MessageSquare className="h-10 w-10" />}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === "courses" ? "My Courses" :
                   activeTab === "sessions" ? "Scheduled Sessions" :
                   "Messages"}
                </h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  This section is under development. Check back soon for updates!
                </p>
                <button 
                  onClick={() => setActiveTab("profile")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Back to Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import AppLayout from './components/AppLayout';
import HeroBanner from './components/HeroBanner';
import ComingSoonOverlay from './components/ComingSoonOverlay';
import { BookOpen, GraduationCap, Languages, MessageSquare, BookMarked, Award, Globe, Laptop, Video, Headphones } from 'lucide-react';
import Link from 'next/link';
import HowItWorks from './components/HowItWorks';
import PopularCourses from './components/PopularCourses';

// Sample course data
const popularCourses = [
  {
    id: 'business-english',
    title: 'Business English Essentials',
    description: 'Master professional communication for the workplace',
    level: 'Intermediate',
    lessons: 24,
    students: 3420,
    icon: <BookMarked className="h-8 w-8 text-blue-500" />
  },
  {
    id: 'conversation-skills',
    title: 'Everyday Conversation Skills',
    description: 'Build confidence in daily English interactions',
    level: 'Beginner',
    lessons: 32,
    students: 5680,
    icon: <MessageSquare className="h-8 w-8 text-indigo-500" />
  },
  {
    id: 'toefl-prep',
    title: 'TOEFL Exam Preparation',
    description: 'Comprehensive preparation for TOEFL success',
    level: 'Advanced',
    lessons: 40,
    students: 2950,
    icon: <Award className="h-8 w-8 text-purple-500" />
  }
];

export default function Home() {
  return (
    <AppLayout>
      {/* Hero Banner */}
      <HeroBanner />  
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Popular Courses Section */}
      <PopularCourses />
      
      {/* Upcoming Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tez kunda</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quyidagi yangi xususiyatlar ishlab chiqilmoqda va tez orada bizning platformamizga qo'shiladi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Video className="h-10 w-10 text-blue-500" />,
                title: "Video darslar",
                description: "Professional o'qituvchilar tomonidan yozilgan video darslar",
                message: "Video darslar tez orada qo'shiladi"
              },
              {
                icon: <Globe className="h-10 w-10 text-indigo-500" />,
                title: "Jonli darslarda qatnashing",
                description: "Dunyoning istalgan nuqtasidan o'qituvchilar bilan bog'laning",
                message: "Jonli darslar uchun ro'yxatga olish tez orada ochiladi"
              },
              {
                icon: <Laptop className="h-10 w-10 text-purple-500" />,
                title: "Mobil ilova",
                description: "Qayerda bo'lsangiz ham o'rganishni davom ettiring",
                message: "Mobil ilovamiz ishlab chiqilmoqda"
              },
              {
                icon: <Headphones className="h-10 w-10 text-green-500" />,
                title: "Audio kitoblar",
                description: "Audio formatdagi darslar va kitoblar",
                message: "Audio kitoblar tez orada qo'shiladi"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 relative">
                <ComingSoonOverlay message={feature.message} />
                <div className="p-3 inline-flex bg-gray-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your English Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who are already improving their language skills with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-started" 
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/pricing" 
              className="border border-white bg-transparent text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
} 
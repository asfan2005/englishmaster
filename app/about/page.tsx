"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Layers, Users, Clock, Award, BarChart, GraduationCap, Globe, BookOpen } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Team data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-Founder',
    image: '/images/team/sarah.jpg',
    bio: 'Former language teacher with 15+ years of experience. Started EnglishMaster to make quality language learning accessible to everyone.'
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    image: '/images/team/michael.jpg',
    bio: 'AI and EdTech expert with a passion for creating personalized learning experiences.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head of Curriculum',
    image: '/images/team/emma.jpg',
    bio: 'PhD in Applied Linguistics with expertise in language acquisition and teaching methodologies.'
  },
  {
    name: 'David Park',
    role: 'Head of Product',
    image: '/images/team/david.jpg',
    bio: 'Former product leader at leading EdTech companies, focused on creating intuitive learning experiences.'
  }
];

// Core values
const coreValues = [
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: 'Student-Centered',
    description: 'We put learners at the center of everything we do, focusing on their unique needs, goals, and learning styles.'
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-500" />,
    title: 'Accessibility',
    description: 'We believe quality education should be accessible to everyone, regardless of location or background.'
  },
  {
    icon: <Award className="h-6 w-6 text-purple-500" />,
    title: 'Excellence',
    description: 'We maintain the highest standards in our curriculum, technology, and support services.'
  },
  {
    icon: <BookOpen className="h-6 w-6 text-green-500" />,
    title: 'Innovation',
    description: 'We continually evolve our platform with cutting-edge technology to enhance the learning experience.'
  }
];

// Milestones
const milestones = [
  { year: 2018, title: 'Founded in San Francisco', description: 'EnglishMaster was founded by Sarah Johnson and Michael Chen.' },
  { year: 2019, title: 'First 1,000 students', description: 'Reached our first milestone of 1,000 active students.' },
  { year: 2020, title: 'AI conversation partner launched', description: 'Released our groundbreaking AI-powered conversation practice tool.' },
  { year: 2021, title: 'International expansion', description: 'Expanded services to 10+ countries and 5+ languages.' },
  { year: 2022, title: 'Mobile app released', description: 'Launched native mobile applications for iOS and Android.' },
  { year: 2023, title: 'Reached 50,000 students', description: 'Growing community of learners across the globe.' }
];

export default function AboutPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <CompanyLayout
      title="Biz haqimizda"
      description="EnglishMaster - ingliz tilini o'rganish uchun zamonaviy platforma"
    >
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-indigo/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            EnglishMaster haqida
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Biz 2021-yilda ta'lim sohasidagi muammolarni hal qilish va Uzbekistondagi o'quvchilar uchun ingliz tilini o'rganishni osonlashtirish maqsadida tashkil etilganmiz.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Users className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">10,000+ o'quvchilar</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Layers className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">50+ kurslar</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">3 yillik tajriba</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bizning maqsadimiz</h2>
          <p className="text-gray-600">
            Innovatsion o'qitish usullari orqali Uzbekistondagi har bir o'quvchiga ingliz tilini samarali va qiziqarli tarzda o'rganish imkoniyatini yaratish. Biz o'quvchilarning bilim olishdagi to'siqlarni bartaraf etib, ularga global imkoniyatlarga yo'l ochib berishga intilamiz.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bizning qadriyatlarimiz</h2>
          <p className="text-gray-600">
            Bizning asosiy qadriyatlarimiz - sifatli ta'lim, innovatsiya, qulaylik va shaxsiy yondashuv. Har bir o'quvchining ehtiyojlarini inobatga olgan holda, biz ularning ingliz tilini samarali o'zlashtirishiga yordam beramiz va doimo yangiliklar bilan rivojlanib boramiz.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bizning tarix</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <div className="h-40 bg-gray-200 relative">
              <Image 
                src="/images/company/founding.jpg" 
                alt="EnglishMaster asoschilari"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-indigo-600 font-semibold">2021</p>
              <h3 className="font-medium text-gray-900 mb-2">Asos solinishi</h3>
              <p className="text-sm text-gray-600">
                EnglishMaster ta'lim platformasi 2021-yilda bir guruh til o'qituvchilari va dasturchilar tomonidan asos solingan.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <div className="h-40 bg-gray-200 relative">
              <Image 
                src="/images/company/growth.jpg" 
                alt="EnglishMaster rivojlanishi"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-indigo-600 font-semibold">2022</p>
              <h3 className="font-medium text-gray-900 mb-2">Rivojlanish bosqichi</h3>
              <p className="text-sm text-gray-600">
                2022-yilda biz 5,000 dan ortiq o'quvchilarga ega bo'ldik va 30 dan ortiq kurslarni ishga tushirdik.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <div className="h-40 bg-gray-200 relative">
              <Image 
                src="/images/company/present.jpg" 
                alt="EnglishMaster bugungi kun"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-indigo-600 font-semibold">2023-2024</p>
              <h3 className="font-medium text-gray-900 mb-2">Bugungi kun</h3>
              <p className="text-sm text-gray-600">
                Hozirda 10,000 dan ortiq o'quvchilarga va 50 dan ortiq kurslarga ega bo'lgan zamonaviy ta'lim platformasimiz.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bizning jamoa</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Shohruh Shermatov",
              position: "Asoschisi & CEO",
              image: "/images/team/ceo.jpg"
            },
            {
              name: "Aziza Karimova",
              position: "Bosh o'qituvchi",
              image: "/images/team/teacher.jpg"
            },
            {
              name: "Bobur Alimov",
              position: "Texnik direktor",
              image: "/images/team/cto.jpg"
            },
            {
              name: "Nilufar Ahmedova",
              position: "Marketing menejeri",
              image: "/images/team/marketing.jpg"
            }
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-gray-900 font-medium">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats section */}
      <div className="bg-indigo-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Raqamlarda EnglishMaster</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-indigo-100 rounded-full mx-auto">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">10,000+</p>
            <p className="text-gray-600">O'quvchilar</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-indigo-100 rounded-full mx-auto">
              <Layers className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">50+</p>
            <p className="text-gray-600">Kurslar</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-indigo-100 rounded-full mx-auto">
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">85%</p>
            <p className="text-gray-600">Muvaffaqiyat darajasi</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-indigo-100 rounded-full mx-auto">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">12+</p>
            <p className="text-gray-600">Mukofotlar</p>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
} 
"use client";

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, Users, MapPin, Building, ArrowUpRight, 
  Search, Filter, Clock
} from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Sample job openings data
const jobOpenings = [
  {
    id: "senior-english-teacher",
    title: "Senior English Teacher",
    department: "Education",
    location: "Tashkent, Uzbekistan",
    type: "Full-time",
    experience: "3+ years",
    description: "We are looking for an experienced English teacher to develop curriculum and teach advanced courses."
  },
  {
    id: "content-creator",
    title: "Content Creator",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Create engaging educational content for our platform, including videos, exercises, and learning materials."
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Tashkent, Uzbekistan",
    type: "Full-time",
    experience: "2+ years",
    description: "Develop and maintain user interfaces for our educational platform using modern web technologies."
  },
  {
    id: "customer-support-specialist",
    title: "Customer Support Specialist",
    department: "Support",
    location: "Tashkent, Uzbekistan",
    type: "Full-time",
    experience: "1+ year",
    description: "Provide exceptional customer service to our users, helping them navigate the platform and resolve issues."
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Tashkent, Uzbekistan",
    type: "Full-time",
    experience: "3+ years",
    description: "Lead our marketing efforts to attract and retain users through various channels and campaigns."
  }
];

// Department filters
const departments = [
  "All Departments",
  "Education",
  "Content",
  "Engineering",
  "Support",
  "Marketing"
];

// Location filters
const locations = [
  "All Locations",
  "Tashkent, Uzbekistan",
  "Remote"
];

export default function CareersPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <CompanyLayout
      title="Karyera"
      description="EnglishMaster kompaniyasida ishlash imkoniyatlari"
    >
      <div ref={ref} className="space-y-12">
        {/* Hero Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-indigo/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bizga qo'shiling
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Ta'lim sohasini o'zgartirishga va o'quvchilarning ingliz tilini o'rganish tajribasini yaxshilashga qiziqasizmi? EnglishMaster jamoasiga qo'shiling va ta'lim sohasidagi innovatsiyalarga hissa qo'shing.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-gray-700 font-medium">Ochiq vakansiyalar: {jobOpenings.length}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Users className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-gray-700 font-medium">50+ jamoa a'zolari</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why work with us */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nega bizda ishlash kerak</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Innovatsion muhit",
                description: "Biz har doim yangi g'oyalar va innovatsion yondashuvlarni qo'llab-quvvatlaymiz. Sizning ijodiy fikrlaringiz bizda qadrlanadi.",
                icon: <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              },
              {
                title: "Professional o'sish",
                description: "Biz xodimlarimizning rivojlanishiga investitsiya qilamiz. Treninglar, konferensiyalar va doimiy o'rganish imkoniyatlariga ega bo'lasiz.",
                icon: <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              },
              {
                title: "Ta'sirli ish",
                description: "Sizning ishingiz Uzbekistondagi minglab o'quvchilarning hayotiga ta'sir ko'rsatadi. Biz bilan ishlash orqali ta'lim sohasiga hissa qo'shasiz.",
                icon: <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                {benefit.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Job listings */}
        <section id="openings" className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ochiq vakansiyalar</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Vakansiyalarni qidirish..."
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto appearance-none bg-white"
                >
                  {departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto appearance-none bg-white"
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {jobOpenings.map((job) => (
              <Link 
                key={job.id}
                href={`/careers/${job.id}`}
                className="block bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{job.type}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Building className="h-4 w-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.experience}
                      </div>
                    </div>
                    
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center text-indigo-600 font-medium transition-all group-hover:translate-x-1">
                      Batafsil
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Application process */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ariza berish jarayoni</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Ariza topshiring",
                description: "Siz qiziqtirgan vakansiya uchun onlayn ariza to'ldiring va rezumengizni jo'nating."
              },
              {
                step: "2",
                title: "Dastlabki suhbat",
                description: "Nomzodingiz mos kelsa, sizga dastlabki telefon orqali suhbat uchun bog'lanamiz."
              },
              {
                step: "3",
                title: "Texnik suhbat",
                description: "Keyin tegishli bo'lim rahbari bilan batafsil texnik suhbat o'tkaziladi."
              },
              {
                step: "4",
                title: "Taklifnoma",
                description: "Barcha bosqichlarni muvaffaqiyatli o'tgan nomzodlarga ish taklifi beriladi."
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* No positions? */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-gray-50 rounded-xl p-8 mb-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">O'zingizga mos vakansiya topmadingizmi?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Bizda hozirda siz qidirayotgan vakansiya mavjud bo'lmasa ham, o'zingiz haqingizda ma'lumot qoldirishingiz mumkin. Yangi imkoniyatlar paydo bo'lganda, biz sizga xabar beramiz.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Umumiy ariza jo'natish
            </Link>
          </div>
        </section>
      </div>
    </CompanyLayout>
  );
} 
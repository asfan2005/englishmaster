"use client";

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { 
  Search, 
  LifeBuoy, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight, 
  ChevronRight, 
  Lightbulb, 
  Info, 
  FileQuestion, 
  Video 
} from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Define types for better TypeScript support
type SupportTopicColor = 'blue' | 'indigo' | 'purple' | 'green' | 'rose' | 'amber';

interface SupportTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: SupportTopicColor;
  questions: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

// Support topics data
const supportTopics: SupportTopic[] = [
  {
    id: 'registration',
    title: "Ro'yxatdan o'tish va kirish",
    description: "Platformaga ro'yxatdan o'tish va kirish bilan bog'liq savollarga javoblar.",
    icon: <HelpCircle className="h-6 w-6" />,
    color: 'blue',
    questions: [
      "Qanday qilib ro'yxatdan o'tish mumkin?",
      "Parolni unutdim, nima qilishim kerak?",
      "Profilni qanday o'zgartirish mumkin?"
    ]
  },
  {
    id: 'payment',
    title: "To'lov va obunalar",
    description: "To'lov usullari, obunalar va qaytarib berish siyosati haqida ma'lumot.",
    icon: <FileQuestion className="h-6 w-6" />,
    color: 'indigo',
    questions: [
      "Qanday to'lov usullari mavjud?",
      "Obuna rejalaringiz haqida ma'lumot olsam bo'ladimi?",
      "Pulni qaytarib olish mumkinmi?"
    ]
  },
  {
    id: 'courses',
    title: "Kurslar va o'qish jarayoni",
    description: "Kurslarni tanlash, o'qish jarayoni va sertifikatlar olish haqida ko'rsatmalar.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'purple',
    questions: [
      "Kurslarni qanday tanlashim kerak?",
      "O'qish jarayoni qanday tashkil etilgan?",
      "Sertifikatlarni qanday olishim mumkin?"
    ]
  },
  {
    id: 'technical',
    title: "Texnik yordam",
    description: "Platformadan foydalanish bo'yicha texnik yordam va muammolarni bartaraf etish.",
    icon: <LifeBuoy className="h-6 w-6" />,
    color: 'green',
    questions: [
      "Video darslar yuklanmayapti, nima qilishim kerak?",
      "Mobil ilovada xatolik chiqyapti, qanday hal qilsam bo'ladi?",
      "Brauzer bilan bog'liq muammolar mavjud"
    ]
  },
  {
    id: 'feedback',
    title: "Fikr-mulohaza va takliflar",
    description: "Platformani yaxshilash uchun fikr-mulohaza va takliflar qoldirish.",
    icon: <MessageCircle className="h-6 w-6" />,
    color: 'rose',
    questions: [
      "Yangi kurs bo'yicha taklifim bor",
      "Platformani yaxshilash uchun fikrim bor",
      "Hamkorlik qilmoqchiman"
    ]
  },
  {
    id: 'video-guides',
    title: "Video qo'llanmalar",
    description: "Platformadan foydalanish bo'yicha video qo'llanmalar va yo'riqnomalar.",
    icon: <Video className="h-6 w-6" />,
    color: 'amber',
    questions: [
      "Platformadan foydalanish bo'yicha video",
      "Ro'yxatdan o'tish jarayoni videosi",
      "To'lov qilish bo'yicha video qo'llanma"
    ]
  }
];

// Frequently asked questions
const faqs: FAQ[] = [
  {
    question: "EnglishMaster'dan foydalanish uchun to'lov qilish kerakmi?",
    answer: "EnglishMaster platformasida bepul va pullik kurslar mavjud. Asosiy kurslar va material pullik hisoblanadi, lekin boshlang'ich daraja uchun bepul materiallar ham yetarli miqdorda berilgan. Platforma orqali o'quvchilar o'zlariga qulay obuna rejasini tanlashlari mumkin."
  },
  {
    question: "Kurslarni mobil qurilmalarda ham o'rganish mumkinmi?",
    answer: "Ha, EnglishMaster platformasi mobil qurilmalar uchun ham moslashtirilgan. Shuningdek, iOS va Android qurilmalar uchun maxsus ilovalarimiz ham mavjud bo'lib, offline rejimda ham o'rganish imkoniyatini beradi."
  },
  {
    question: "Ingliz tili darajamni qanday aniqlashim mumkin?",
    answer: "Platformamizda bepul test mavjud bo'lib, siz o'z bilim darajangizni aniqlab olishingiz va o'zingizga mos kurslarni tanlashingiz mumkin. Test natijasi asosida, sizga mos o'quv rejasi tavsiya qilinadi."
  },
  {
    question: "Kurslar davomiyligi qancha?",
    answer: "Har bir kursning davomiyligi uning murakkablik darajasi va hajmiga qarab turlicha bo'ladi. Odatda, kurslar 4-12 hafta davom etishi mumkin. Biroq, o'quvchilar o'z tezligida o'rganish imkoniyatiga ega bo'ladilar."
  },
  {
    question: "Kurslarda o'qituvchilar bilan muloqot qilish mumkinmi?",
    answer: "Ha, premium obuna egalari o'qituvchilar bilan to'g'ridan-to'g'ri muloqot qilish imkoniyatiga ega bo'ladilar. Shuningdek, barcha o'quvchilar uchun forum bo'limida savollar berishlari va javoblar olishlari mumkin."
  }
];

export default function SupportPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  // Color mapping for topic icons
  const colorMap: Record<SupportTopicColor, string> = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <CompanyLayout
      title="Yordam markazi"
      description="EnglishMaster platformasi bo'yicha yo'riqnomalar va ko'p so'raladigan savollar"
    >
      <div ref={ref} className="space-y-12">
        {/* Hero Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-green/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sizga qanday yordam bera olamiz?
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                EnglishMaster platformasi bo'yicha savollaringizga javob toping yoki bizning qo'llab-quvvatlash jamoamiz bilan bog'laning
              </p>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Savollar qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Support Topics */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yordam mavzulari</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {supportTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/support/${topic.id}`}
                className="group flex flex-col bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all"
              >
                <div className={`w-12 h-12 ${colorMap[topic.color]} rounded-lg flex items-center justify-center mb-4`}>
                  {topic.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-4">{topic.description}</p>
                
                <div className="mt-auto">
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <ul className="space-y-1">
                      {topic.questions.slice(0, 2).map((question, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                          </div>
                          <span className="text-sm text-gray-600">{question}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="inline-flex items-center text-green-600 font-medium mt-3 group-hover:translate-x-1 transition-transform">
                      Barcha savollarni ko'rish
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* FAQs */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ko'p so'raladigan savollar</h2>
            
            <Link 
              href="/support/faq" 
              className="text-green-600 hover:text-green-700 transition-colors font-medium inline-flex items-center"
            >
              Barcha savollar
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <Info className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="/support/faq"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Ko'proq savollarni ko'rish
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
        
        {/* Contact Support */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Savolingizga javob topa olmadingizmi?</h2>
                  <p className="text-green-50 mb-6">
                    Savolingiz javobsiz qolmasin! Bizning qo'llab-quvvatlash jamoamiz sizga yordamga tayyor. Istasangiz telefon orqali, istasangiz onlayn chat orqali bog'laning.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Bizga murojaat qiling
                    </Link>
                    
                    <Link
                      href="/help"
                      className="inline-flex items-center px-6 py-3 bg-green-400 bg-opacity-30 text-white border border-green-400 rounded-lg font-medium hover:bg-opacity-40 transition-colors"
                    >
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Yordam markaziga o'tish
                    </Link>
                  </div>
                </div>
                
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-48 h-48 bg-green-400 bg-opacity-30 rounded-full flex items-center justify-center">
                    <LifeBuoy className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CompanyLayout>
  );
}
"use client";

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  Headphones, 
  FileText, 
  Video, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink, 
  ArrowRight, 
  Info,
  HelpCircle, 
  File
} from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Help categories with articles
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Boshlash',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'blue' as const,
    description: 'EnglishMaster platformasidan foydalanishni boshlash bo\'yicha qo\'llanmalar',
    articles: [
      { 
        id: 'account-creation', 
        title: 'Hisobingizni yaratish', 
        excerpt: 'EnglishMaster platformasida ro\'yxatdan o\'tish va hisobingizni sozlash bo\'yicha qo\'llanma.'
      },
      { 
        id: 'placement-test', 
        title: 'Darajani aniqlash testi', 
        excerpt: 'Ingliz tili darajangizni aniqlash va sizga mos kursni tanlash uchun test topshirish.'
      },
      { 
        id: 'learning-path', 
        title: 'O\'quv yo\'lingizni tushunish', 
        excerpt: 'Sizga maxsus tavsiya qilingan o\'quv rejasini tushunish va undan samarali foydalanish.'
      },
      { 
        id: 'dashboard-navigation', 
        title: 'Boshqaruv paneli bilan tanishish', 
        excerpt: 'Asosiy boshqaruv panelidagi funksiyalar va ulardan qanday foydalanish bo\'yicha ma\'lumot.'
      }
    ]
  },
  {
    id: 'account-billing',
    title: 'Hisob va to\'lov',
    icon: <FileText className="h-6 w-6" />,
    color: 'green' as const,
    description: 'To\'lovlar, obunalar va hisob sozlamalari bilan bog\'liq ma\'lumotlar',
    articles: [
      { 
        id: 'subscription-plans', 
        title: 'Obuna rejalari haqida', 
        excerpt: 'Mavjud obuna rejalarining afzalliklari va farqlari haqida batafsil ma\'lumot.'
      },
      { 
        id: 'payment-methods', 
        title: 'To\'lov usullari', 
        excerpt: 'Qabul qilinadigan to\'lov usullari va to\'lovlarni amalga oshirish bo\'yicha ko\'rsatmalar.'
      },
      { 
        id: 'manage-subscription', 
        title: 'Obunani boshqarish', 
        excerpt: 'Obunani yangilash, bekor qilish yoki o\'zgartirish bo\'yicha qo\'llanma.'
      },
      { 
        id: 'download-invoices', 
        title: 'Fakturalarni yuklab olish', 
        excerpt: 'To\'lov fakturalini ko\'rish va yuklab olish bo\'yicha ko\'rsatmalar.'
      }
    ]
  },
  {
    id: 'learning-tools',
    title: 'O\'quv vositalari',
    icon: <Headphones className="h-6 w-6" />,
    color: 'purple' as const,
    description: 'EnglishMaster platformasidagi o\'quv vositalaridan foydalanish',
    articles: [
      { 
        id: 'ai-conversation', 
        title: 'AI suhbatdoshi bilan ishlash', 
        excerpt: 'Sun\'iy intellekt asosidagi suhbatdosh bilan nutq ko\'nikmalaringizni rivojlantirish.'
      },
      { 
        id: 'live-tutors', 
        title: 'Jonli darslar', 
        excerpt: 'Malakali o\'qituvchilar bilan jonli darslarni rejalashtirish va o\'tkazish.'
      },
      { 
        id: 'vocabulary-system', 
        title: 'So\'zlarni yodlash tizimi', 
        excerpt: 'Lug\'at boyligingizni oshirish uchun maxsus tizimdan samarali foydalanish.'
      },
      { 
        id: 'progress-tracking', 
        title: 'O\'sishni kuzatish', 
        excerpt: 'O\'qish jarayonidagi taraqqiyotingizni kuzatish va tahlil qilish usullari.'
      }
    ]
  },
  {
    id: 'technical-support',
    title: 'Texnik yordam',
    icon: <HelpCircle className="h-6 w-6" />,
    color: 'rose' as const,
    description: 'Texnik muammolarni bartaraf etish va platformadan foydalanish',
    articles: [
      { 
        id: 'audio-video', 
        title: 'Audio va video muammolarni hal qilish', 
        excerpt: 'Darslar davomida audio va video bilan bog\'liq muammolarni bartaraf etish usullari.'
      },
      { 
        id: 'mobile-app', 
        title: 'Mobil ilova bilan ishlash', 
        excerpt: 'EnglishMaster mobil ilovasidan samarali foydalanish va muammolarni hal qilish.'
      },
      { 
        id: 'browser-compatibility', 
        title: 'Brauzer mosligi', 
        excerpt: 'Eng yaxshi tajriba uchun tavsiya etiladigan brauzerlar va sozlamalar.'
      },
      { 
        id: 'offline-mode', 
        title: 'Oflayn rejim', 
        excerpt: 'Internet aloqasi bo\'lmaganda ham o\'rganishni davom ettirish usullari.'
      }
    ]
  }
];

// Popular video tutorials
const videoTutorials = [
  {
    id: 'getting-started-video',
    title: 'EnglishMaster bilan ishlashni boshlash',
    duration: '3:45',
    thumbnail: '/images/tutorials/getting-started.jpg'
  },
  {
    id: 'ai-conversation-video',
    title: 'AI suhbatdosh bilan qanday ishlash kerak',
    duration: '4:20',
    thumbnail: '/images/tutorials/ai-conversation.jpg'
  },
  {
    id: 'mobile-app-video',
    title: 'Mobil ilovadan samarali foydalanish',
    duration: '3:10',
    thumbnail: '/images/tutorials/mobile-app.jpg'
  },
  {
    id: 'pronunciation-video',
    title: 'Talaffuzni yaxshilash bo\'yicha mashqlar',
    duration: '5:30',
    thumbnail: '/images/tutorials/pronunciation.jpg'
  }
];

export default function HelpPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Color mapping for help categories
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    rose: 'bg-rose-100 text-rose-600 border-rose-200'
  };

  return (
    <CompanyLayout
      title="Yordam markazi"
      description="EnglishMaster platformasidan foydalanish bo'yicha yo'riqnomalar va qo'llanmalar"
    >
      <div ref={ref} className="space-y-12">
        {/* Hero Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-blue/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                EnglishMaster yordam markazi
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Platformadan foydalanish bo'yicha qo'llanmalar, maslahatlar va javoblar
              </p>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Qo'llanmalar va yordam maqolalarini qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Help Categories */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yordam kategoriyalari</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {helpCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start mb-4">
                  <div className={`rounded-lg w-10 h-10 ${colorMap[category.color]} flex items-center justify-center mr-4`}>
                    {category.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-5">
                  {category.articles.map((article) => (
                    <Link 
                      key={article.id}
                      href={`/help/${category.id}/${article.id}`}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                        <File className="w-3 h-3 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/help/${category.id}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Barcha {category.title.toLowerCase()} maqolalarini ko'rish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Video Tutorials */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Video qo'llanmalar</h2>
            
            <Link 
              href="/help/videos" 
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium inline-flex items-center"
            >
              Barcha video qo'llanmalar
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video) => (
              <Link 
                key={video.id}
                href={`/help/videos/${video.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-36 bg-gray-200 relative">
                  {/* Video thumbnail placeholder - in real implementation, you would use next/image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <Video className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link
              href="/help/videos"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Ko'proq video qo'llanmalarni ko'rish
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
        
        {/* Community Support */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Javobingizni topa olmadingizmi?</h2>
                  <p className="text-blue-50 mb-6">
                    Savol va muammolaringizni EnglishMaster jamoasiga yoki boshqa o'quvchilarga yo'naltiring. Bizning jamoamiz 24 soat ichida javob berishga harakat qiladi.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Jamoaga murojaat qilish
                    </Link>
                    
                    <Link
                      href="/community"
                      className="inline-flex items-center px-6 py-3 bg-blue-400 bg-opacity-30 text-white border border-blue-400 rounded-lg font-medium hover:bg-opacity-40 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Jamiyat forumiga o'tish
                    </Link>
                  </div>
                </div>
                
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-48 h-48 bg-blue-400 bg-opacity-30 rounded-full flex items-center justify-center">
                    <Info className="h-20 w-20 text-white" />
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
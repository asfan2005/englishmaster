"use client";

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, Clock, CalendarDays, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Sample blog posts data
const blogPosts = [
  {
    id: 'effective-english-learning',
    title: "Ingliz tilini effektiv o`rganish: 5 ta muhim qoida",
    excerpt: "Ingliz tilini o`rganish jarayonini yanada samarali qilish uchun qo`llaniladigan asosiy qoidalar va tavsiyalar.",
    image: '/images/blog/effective-learning.jpg',
    category: "O`rganish usullari",
    readTime: '5 daqiqa',
    date: '2024-05-20',
    featured: true
  },
  {
    id: 'grammar-mistakes',
    title: "Ko`p uchraydigan grammatik xatolar va ularni bartaraf etish yo`llari",
    excerpt: "Uzbek tilida so`zlashuvchilar ingliz tilida qiladigan eng ko`p uchraydigan xatolar va ularni to`g`rilash usullari.",
    image: '/images/blog/grammar-mistakes.jpg',
    category: 'Grammatika',
    readTime: '7 daqiqa',
    date: '2024-05-15'
  },
  {
    id: 'vocabulary-building',
    title: "So`z boyligini oshirishning innovatsion usullari",
    excerpt: "Zamonaviy texnologiyalar va metodlardan foydalanib ingliz tili lug`atini kengaytirish yo`llari.",
    image: '/images/blog/vocabulary.jpg',
    category: "Lug`at",
    readTime: '6 daqiqa',
    date: '2024-05-10'
  },
  {
    id: 'speaking-practice',
    title: "Ingliz tilida so`zlashish ko`nikmalarini rivojlantirish",
    excerpt: "Kundalik hayotda ingliz tilida gaplashish mahoratini oshirish uchun amaliy mashqlar va tavsiyalar.",
    image: '/images/blog/speaking.jpg',
    category: 'Nutq',
    readTime: '8 daqiqa',
    date: '2024-05-05'
  },
  {
    id: 'exam-preparation',
    title: "IELTS va TOEFL imtihonlariga tayyorgarlik ko`rish: amaliy qo`llanma",
    excerpt: "Xalqaro ingliz tili imtihonlariga muvaffaqiyatli tayyorgarlik ko`rish uchun strategiyalar va maslahatlar.",
    image: '/images/blog/exam-prep.jpg',
    category: 'Imtihonlar',
    readTime: '10 daqiqa',
    date: '2024-04-30'
  },
  {
    id: 'learning-apps',
    title: "Eng yaxshi ingliz tili o`rganish mobil ilovalar tahlili",
    excerpt: "Ingliz tilini mustaqil o`rganish uchun mo`ljallangan eng samarali mobil ilovalarning qiyosiy tahlili.",
    image: '/images/blog/apps.jpg',
    category: 'Texnologiya',
    readTime: '6 daqiqa',
    date: '2024-04-25'
  }
];

// Blog categories
const categories = [
  'Barcha kategoriyalar',
  "O`rganish usullari",
  'Grammatika',
  "Lug`at",
  'Nutq',
  'Imtihonlar',
  'Texnologiya'
];

export default function BlogPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // For a real implementation, these would be connected to state management
  // and API calls for filtering posts
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barcha kategoriyalar');

  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  // Get remaining posts
  const regularPosts = blogPosts.filter(post => !post.featured);

  // Format date to Uzbek style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <CompanyLayout
      title="Blog"
      description="EnglishMaster blog: ingliz tilini o`rganish bo`yicha foydali maqolalar va maslahatlar"
    >
      <div ref={ref} className="space-y-12">
        {/* Hero Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-indigo/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                EnglishMaster Blog
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Ingliz tilini o`rganishda yordam beradigan foydali maqolalar, amaliy maslahatlar va yangiliklar
              </p>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Maqolalarni qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        
        {/* Featured Post */}
        {featuredPost && (
          <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tavsiya etilgan maqola</h2>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-2 h-60 md:h-auto relative">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Tavsiya etilgan
                  </div>
                </div>
                
                <div className="md:col-span-3 p-6 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(featuredPost.date)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-grow">
                    {featuredPost.excerpt}
                  </p>
                  
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    To'liq o'qish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Regular Posts */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Barcha maqolalar</h2>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>{regularPosts.length} ta maqola</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-48 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <div className="absolute top-3 left-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    To`liq o`qish
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Ko`proq yuklash
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
        
        {/* Subscribe */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Yangiliklardan xabardor bo`ling</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Yangi maqolalar, o`quv materiallari va maxsus takliflar haqida birinchilardan bo`lib xabar topish uchun ro`yxatdan o`ting.
            </p>
            
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap">
                Obuna bo`lish
              </button>
            </div>
          </div>
        </section>
      </div>
    </CompanyLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/blocks/footer";
import { SessionNavBar } from "@/components/ui/sidebar";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { ArrowLeft, ArrowRight, Search, Filter, BookOpen, Clock, User, Tag, Star, Bot, Award, DownloadCloud, Globe, Video, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Kurslar ma'lumotlari - ko'paytirilgan va barchasini bepul qilish
const allCourses = [
  {
    id: "ielts-prep",
    title: "IELTS imtihoniga tayyorgarlik",
    description: "IELTS imtihonidagi barcha bo'limlar uchun maxsus tayyorlangan kurs. AI yordamchingiz Speaking va Writing bo'limlarida real vaqtda yordam beradi.",
    level: "B1-C1",
    duration: "12 hafta",
    lessons: 36,
    price: "Bepul",
    teacher: "Komilova Nilufar",
    rating: 4.8,
    reviewCount: 124,
    category: "imtihon",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "92%",
    students: 3842
  },
  {
    id: "general-english",
    title: "Umumiy ingliz tili kursi",
    description: "Kundalik hayotda qo'llaniladigan ingliz tilini o'rganing. AI yordamchi sizga kunlik mashg'ulotlarni tavsiya qiladi va talaffuzingizni baholaydi.",
    level: "A1-B2",
    duration: "16 hafta",
    lessons: 48,
    price: "Bepul",
    teacher: "Aliyev Jahongir",
    rating: 4.7,
    reviewCount: 216,
    category: "umumiy",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1122&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "88%",
    students: 5210
  },
  {
    id: "business-english",
    title: "Biznes ingliz tili",
    description: "Ish joyida kerak bo'ladigan ingliz tili ko'nikmalarini rivojlantiring. AI yordamchi intervyu simulyatsiyasi va biznes yozishmalarni tahlil qiladi.",
    level: "B1-C1",
    duration: "10 hafta",
    lessons: 30,
    price: "Bepul",
    teacher: "Rasulov Botir",
    rating: 4.9,
    reviewCount: 98,
    category: "biznes",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "94%",
    students: 2183
  },
  {
    id: "conversation",
    title: "Suhbat va nutq ko'nikmalari",
    description: "So'zlashuvga qaratilgan kurs. AI yordamchingiz bilan real vaqtda suhbat qiling va til ko'nikmalaringizni oshiring.",
    level: "A2-C1",
    duration: "8 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "Sarah Johnson",
    rating: 4.6,
    reviewCount: 167,
    category: "suhbat",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "91%",
    students: 3056
  },
  {
    id: "grammar-intensive",
    title: "Grammatika intensiv kursi",
    description: "Ingliz tili grammatikasini chuqur o'rganish. AI yordamchi sizning xatolaringizni aniqlaydi va grammatikani tushunarli qilib tushuntiradi.",
    level: "A2-C1",
    duration: "6 hafta",
    lessons: 18,
    price: "Bepul",
    teacher: "Ahmedov Sanjar",
    rating: 4.5,
    reviewCount: 86,
    category: "grammatika",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "87%",
    students: 1925
  },
  {
    id: "toefl-prep",
    title: "TOEFL imtihoniga tayyorgarlik",
    description: "TOEFL imtihonidan yuqori ball olish uchun maxsus tayyorgarlik kursi. AI yordamchi har bir bo'lim bo'yicha mashg'ulotlarni personalizatsiya qiladi.",
    level: "B2-C1",
    duration: "10 hafta",
    lessons: 30,
    price: "Bepul",
    teacher: "Michael Brown",
    rating: 4.7,
    reviewCount: 103,
    category: "imtihon",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "93%",
    students: 2764
  },
  {
    id: "kids-english",
    title: "Bolalar uchun ingliz tili",
    description: "6-12 yoshli bolalar uchun mo'ljallangan kurs. AI yordamchi o'yin tarzida bolaga ingliz tilini o'rgatishda yordam beradi.",
    level: "Boshlang'ich",
    duration: "12 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "Karimova Nodira",
    rating: 4.9,
    reviewCount: 152,
    category: "bolalar",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1172&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "95%",
    students: 4125
  },
  {
    id: "english-literature",
    title: "Ingliz adabiyoti",
    description: "Ingliz klassik va zamonaviy adabiyoti orqali til o'rganish. AI yordamchi badiiy asarlarni tahlil qilishda va matnlarni tushunishda yordam beradi.",
    level: "B2-C2",
    duration: "14 hafta",
    lessons: 28,
    price: "Bepul",
    teacher: "Emma Wilson",
    rating: 4.8,
    reviewCount: 74,
    category: "adabiyot",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "89%",
    students: 1456
  },
  {
    id: "american-english",
    title: "Amerika ingliz tili",
    description: "Amerika dialekti, talaffuzi va madaniyati haqida chuqur bilim. AI yordamchi sizga Amerika aksenti ustida ishlashda yordam beradi.",
    level: "B1-C1",
    duration: "10 hafta",
    lessons: 30,
    price: "Bepul",
    teacher: "James Patterson",
    rating: 4.7,
    reviewCount: 128,
    category: "dialekt",
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1074&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "90%",
    students: 2211
  },
  {
    id: "british-english",
    title: "Britaniya ingliz tili",
    description: "Britaniya ingliz tili va madaniyati haqida to'liq kurs. AI yordamchi sizga Britaniya talaffuzi va so'z boyligingizni rivojlantirishda yordam beradi.",
    level: "B1-C1",
    duration: "10 hafta",
    lessons: 30,
    price: "Bepul",
    teacher: "Elizabeth Scott",
    rating: 4.8,
    reviewCount: 112,
    category: "dialekt",
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1074&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "91%",
    students: 1987
  },
  {
    id: "english-for-travel",
    title: "Sayohat uchun ingliz tili",
    description: "Sayohat qilayotganda kerak bo'ladigan so'z va iboralar. AI yordamchi sizga real vaziyatlarda qo'llaniladigan dialoglarni o'rgatadi.",
    level: "A1-B1",
    duration: "4 hafta",
    lessons: 12,
    price: "Bepul",
    teacher: "David Clark",
    rating: 4.6,
    reviewCount: 95,
    category: "maxsus",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1035&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "96%",
    students: 3215
  },
  {
    id: "medical-english",
    title: "Tibbiy ingliz tili",
    description: "Tibbiyot sohasida ishlaydigan mutaxassislar uchun maxsus ingliz tili kursi. AI yordamchi tibbiy terminologiya va case-studylar bilan ishlashda yordam beradi.",
    level: "B2-C2",
    duration: "12 hafta",
    lessons: 36,
    price: "Bepul",
    teacher: "Dr. Sarah Miller",
    rating: 4.9,
    reviewCount: 84,
    category: "maxsus",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "92%",
    students: 1625
  },
  {
    id: "legal-english",
    title: "Huquqiy ingliz tili",
    description: "Yuristlar va huquqshunoslar uchun maxsus ingliz tili kursi. AI yordamchi huquqiy hujjatlarni tahlil qilishda va professional terminologiyani o'zlashtirishda yordam beradi.",
    level: "C1-C2",
    duration: "14 hafta",
    lessons: 42,
    price: "Bepul",
    teacher: "Robert Johnson, Esq.",
    rating: 4.8,
    reviewCount: 76,
    category: "maxsus",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "88%",
    students: 1234
  },
  {
    id: "english-for-it",
    title: "IT sohasi uchun ingliz tili",
    description: "Dasturchilar va IT mutaxassislari uchun maxsus kurs. AI yordamchi texnik intervyularga tayyorlanishda va professional kommunikatsiyani rivojlantirishda yordam beradi.",
    level: "B1-C1",
    duration: "8 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "Mark Zuckerberg",
    rating: 4.9,
    reviewCount: 215,
    category: "maxsus",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "94%",
    students: 5241
  },
  {
    id: "academic-writing",
    title: "Akademik yozish",
    description: "Ilmiy maqolalar, esse va dissertatsiyalar yozish uchun ingliz tili kursi. AI yordamchi yozma ishlaringizni tahlil qiladi va takomillashtirish bo'yicha tavsiyalar beradi.",
    level: "B2-C2",
    duration: "10 hafta",
    lessons: 30,
    price: "Bepul",
    teacher: "Prof. Emily Thompson",
    rating: 4.7,
    reviewCount: 98,
    category: "writing",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "86%",
    students: 1876
  },
  {
    id: "creative-writing",
    title: "Ijodiy yozish",
    description: "Ingliz tilida hikoyalar, she'rlar va boshqa badiiy asarlar yaratish ko'nikmalarini o'rganing. AI yordamchi ijodiy g'oyalar beradi va asarlaringizni takomillashtiradi.",
    level: "B1-C2",
    duration: "8 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "John Williams",
    rating: 4.8,
    reviewCount: 112,
    category: "writing",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "89%",
    students: 2134
  },
  {
    id: "english-pronunciation",
    title: "Inglizcha talaffuz",
    description: "Ingliz tili talaffuzini mukammallashtirish kursi. AI yordamchingiz sizning talaffuzingizni real vaqtda tahlil qiladi va yaxshilash bo'yicha individual ko'rsatmalar beradi.",
    level: "A1-C2",
    duration: "6 hafta",
    lessons: 18,
    price: "Bepul",
    teacher: "Victoria Adams",
    rating: 4.9,
    reviewCount: 187,
    category: "talaffuz",
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?q=80&w=1074&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "93%",
    students: 4320
  },
  {
    id: "english-idioms",
    title: "Ingliz tili idioma va iboralari",
    description: "Keng qo'llaniladigan inglizcha idiomalar, iboralar va so'z birikmalari. AI yordamchi kontekstga mos idiomalarni tushuntiradi va qo'llashni o'rgatadi.",
    level: "B1-C2",
    duration: "4 hafta",
    lessons: 12,
    price: "Bepul",
    teacher: "Thomas Brown",
    rating: 4.6,
    reviewCount: 156,
    category: "leksika",
    image: "https://images.unsplash.com/photo-1555431189-0fabf2667795?q=80&w=1074&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "91%",
    students: 3254
  },
  {
    id: "english-for-interviews",
    title: "Intervyular uchun ingliz tili",
    description: "Ish intervyulariga tayyorlanish va muvaffaqiyatli o'tkazish uchun maxsus kurs. AI yordamchingiz bilan intervyu simulyatsiyasini o'tkazing va real vaqtda feedback oling.",
    level: "B1-C1",
    duration: "3 hafta",
    lessons: 9,
    price: "Bepul",
    teacher: "Richard Miller",
    rating: 4.8,
    reviewCount: 142,
    category: "karera",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "95%",
    students: 4125
  },
  {
    id: "english-for-presentations",
    title: "Taqdimotlar uchun ingliz tili",
    description: "Professional taqdimotlar tayyorlash va o'tkazish uchun ingliz tili kursi. AI yordamchi taqdimot matnlaringizni takomillashtiradi va vizual elementlarni tavsiya qiladi.",
    level: "B1-C2",
    duration: "5 hafta",
    lessons: 15,
    price: "Bepul",
    teacher: "Jennifer White",
    rating: 4.7,
    reviewCount: 98,
    category: "karera",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "92%",
    students: 1987
  },
  {
    id: "english-for-exams",
    title: "Imtihonlar uchun ingliz tili",
    description: "Ingliz tili imtihonlarini (TOEFL, IELTS, Cambridge) muvaffaqiyatli topshirish uchun umumiy tayyorgarlik kursi. AI yordamchi sizga individual o'quv rejasi tuzadi.",
    level: "B1-C1",
    duration: "12 hafta",
    lessons: 36,
    price: "Bepul",
    teacher: "Dr. Andrew Thompson",
    rating: 4.9,
    reviewCount: 215,
    category: "imtihon",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    hasAI: true,
    completionRate: "94%",
    students: 5642
  },
  {
    id: "english-for-specific-purposes",
    title: "Maxsus maqsadlar uchun ingliz tili",
    description: "O'z kasbingizga va qiziqishlaringizga mos keladigan ingliz tili kursi. AI yordamchi sizning ehtiyojlaringizga qarab to'liq moslashtirilgan o'quv dasturini yaratadi.",
    level: "A2-C2",
    duration: "8 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "Catherine Evans",
    rating: 4.8,
    reviewCount: 124,
    category: "maxsus",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "91%",
    students: 2187
  },
  {
    id: "australian-english",
    title: "Avstraliya ingliz tili",
    description: "Avstraliya ingliz tili, aksenti va madaniyati haqida kurs. AI yordamchi Avstraliya dialekti va so'z boyligini o'rganishda ko'maklashadi.",
    level: "B1-C1",
    duration: "6 hafta",
    lessons: 18,
    price: "Bepul",
    teacher: "Jake Wilson",
    rating: 4.6,
    reviewCount: 87,
    category: "dialekt",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "89%",
    students: 1456
  },
  {
    id: "english-vocabulary-advanced",
    title: "Yuqori darajadagi inglizcha leksika",
    description: "C1-C2 darajasidagi so'z boyligini kengaytirish kursi. AI yordamchi kontekstga mos so'zlarni tanlashni va ularni to'g'ri qo'llashni o'rgatadi.",
    level: "C1-C2",
    duration: "8 hafta",
    lessons: 24,
    price: "Bepul",
    teacher: "Prof. Philip Anderson",
    rating: 4.8,
    reviewCount: 102,
    category: "leksika",
    image: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?q=80&w=1035&auto=format&fit=crop",
    featured: false,
    hasAI: true,
    completionRate: "87%",
    students: 1754
  },

    {
      id: "travel-basics",
      title: "Sayohat uchun asosiy ingliz tili",
      description: "Sayohat paytida kerak bo'ladigan eng asosiy iboralar va so'zlar. AI yordamchi sizga aeroport, mehmonxona va restoranlarda qo'llaniladigan iboralarni o'rgatadi.",
      level: "A1-B1",
      duration: "4 hafta",
      lessons: 12,
      price: "Bepul",
      teacher: "Samantha Roberts",
      rating: 4.9,
      reviewCount: 245,
      category: "sayohat",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "96%",
      students: 5842,
      topics: ["Aeroport", "Mehmonxona", "Transport", "Restoran", "Do'kon"]
    },
    {
      id: "travel-asia",
      title: "Osiyo mamlakatlarida sayohat",
      description: "Osiyo mamlakatlariga sayohat qilayotganlar uchun maxsus kurs. AI yordamchi har bir mamlakat uchun kerakli iboralar va madaniy xususiyatlarni tushuntiradi.",
      level: "A2-B1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Li Wei",
      rating: 4.8,
      reviewCount: 178,
      category: "sayohat",
      image: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 3421,
      topics: ["Xitoy", "Yaponiya", "Koreya", "Tailand", "Hindiston"]
    },
    {
      id: "travel-europe",
      title: "Yevropa bo'ylab sayohat",
      description: "Yevropa mamlakatlarida sayohat qilish uchun kerakli ingliz tili. AI yordamchi sizga Yevropa madaniyati va turli vaziyatlarda qanday muloqot qilishni o'rgatadi.",
      level: "A2-B2",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Pierre Dubois",
      rating: 4.7,
      reviewCount: 156,
      category: "sayohat",
      image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "91%",
      students: 2984,
      topics: ["Fransiya", "Italiya", "Germaniya", "Ispaniya", "Britaniya"]
    },
    {
      id: "travel-america",
      title: "Amerika bo'ylab sayohat",
      description: "AQSH va Kanada bo'ylab sayohat qilish uchun kerakli ingliz tili. AI yordamchi sizga Amerika ingliz tili xususiyatlari va madaniy farqlarni tushuntiradi.",
      level: "A2-B2",
      duration: "5 hafta",
      lessons: 15,
      price: "Bepul",
      teacher: "John Davidson",
      rating: 4.8,
      reviewCount: 203,
      category: "sayohat",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "94%",
      students: 3156,
      topics: ["New York", "Los Angeles", "Toronto", "Miami", "Las Vegas"]
    },
    {
      id: "business-travel",
      title: "Biznes sayohatlar uchun ingliz tili",
      description: "Xalqaro biznes safarlari uchun zarur bo'lgan ingliz tili. AI yordamchi sizga biznes uchrashuvlar, taqdimotlar va networking uchun kerakli iboralarni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Michael Ross",
      rating: 4.9,
      reviewCount: 167,
      category: "sayohat",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1171&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "92%",
      students: 2574,
      topics: ["Uchrashuvlar", "Prezentatsiyalar", "Networking", "Ishbilarmonlik madaniyati", "Muzokaralar"]
    },
    
    // Tadbirlar va tadbir tashkillash uchun ingliz tili
    {
      id: "event-planning",
      title: "Tadbirlarni tashkil qilish ingliz tili",
      description: "Xalqaro tadbirlarni tashkil qilish uchun kerakli ingliz tili ko'nikmalari. AI yordamchi ssenariylar va rejalashtirish jarayonida sizga yordam beradi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Laura Chen",
      rating: 4.8,
      reviewCount: 142,
      category: "tadbirlar",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1112&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "89%",
      students: 1856,
      topics: ["Tadbir rejalashtirish", "Mehmonlarni kutib olish", "Tadbir boshqarish", "Hamkorlik", "Xizmat ko'rsatish"]
    },
    {
      id: "conference-management",
      title: "Konferensiyalarni boshqarish ingliz tili",
      description: "Xalqaro konferensiyalar va anjumanlarni o'tkazish uchun maxsus kurs. AI yordamchi sizga rasmiy va norasmiy taklif qilish, taqdimot qilish usullarini o'rgatadi.",
      level: "B2-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Dr. Richard Mitchell",
      rating: 4.7,
      reviewCount: 98,
      category: "tadbirlar",
      image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1171&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "88%",
      students: 1247,
      topics: ["Konferensiya dasturlari", "Spikerlarga yordam", "Texnik jihozlar", "Tarjima", "Onlayn translatsiya"]
    },
    {
      id: "wedding-planning",
      title: "To'y marosimlari uchun ingliz tili",
      description: "Xalqaro to'y marosimlarini tashkil qilish va o'tkazish uchun ingliz tili. AI yordamchi to'y rejalarini tuzish va muloqot qilishda yordam beradi.",
      level: "A2-B2",
      duration: "4 hafta",
      lessons: 12,
      price: "Bepul",
      teacher: "Emily Johnson",
      rating: 4.9,
      reviewCount: 214,
      category: "tadbirlar",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "95%",
      students: 3214,
      topics: ["To'y rejalashtirish", "Taklifnomalar", "Marosim o'tkazish", "Fotografiya", "Mehmonlar bilan ishlash"]
    },
    
    // IT sohasidagi ingliz tili kurslari
    {
      id: "programming-english",
      title: "Dasturlash uchun ingliz tili",
      description: "Dasturchilar uchun maxsus ingliz tili kursi. AI yordamchi dasturlash texnologiyalari, algoritmlar va jarayonlarni tushunishda yordam beradi.",
      level: "B1-C1",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "To'raqulov Asfandiyor",
      rating: 4.9,
      reviewCount: 312,
      category: "it",
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1032&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "92%",
      students: 5487,
      topics: ["Frontend", "Backend", "Database", "DevOps", "Mobile Development"]
    },
    {
      id: "tech-startup-english",
      title: "Texnologik startaplar uchun ingliz tili",
      description: "Texnologik startaplar va innovatsion loyihalar uchun maxsus ingliz tili. AI yordamchi pitch va investorlar bilan muloqot qilishni o'rgatadi.",
      level: "B2-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Sandra Miller",
      rating: 4.8,
      reviewCount: 164,
      category: "it",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "90%",
      students: 2341,
      topics: ["Pitch Deck", "Investorlar", "Networking", "Product Development", "Marketing"]
    },
    {
      id: "data-science-english",
      title: "Data Science uchun ingliz tili",
      description: "Ma'lumotlar ilmi va sun'iy intellekt sohasida faoliyat ko'rsatuvchilar uchun maxsus ingliz tili. AI yordamchi maxsus terminologiyani o'zlashtirishda yordam beradi.",
      level: "B2-C2",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Prof. Robert Lee",
      rating: 4.9,
      reviewCount: 187,
      category: "it",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1076&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "88%",
      students: 2645,
      topics: ["Machine Learning", "Big Data", "Statistics", "Python", "Data Visualization"]
    },
    
    // Ta'lim sohasidagi ingliz tili kurslari
    {
      id: "teaching-english",
      title: "O'qituvchilar uchun ingliz tili",
      description: "Ta'lim sohasida faoliyat ko'rsatuvchi o'qituvchilar uchun maxsus ingliz tili kursi. AI yordamchi dars o'tish va pedagogik metodlarni o'zlashtirishda yordam beradi.",
      level: "B1-C1",
      duration: "12 hafta",
      lessons: 36,
      price: "Bepul",
      teacher: "Dr. Amanda White",
      rating: 4.8,
      reviewCount: 214,
      category: "talim",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 3145,
      topics: ["Dars o'tish", "Talabalar bilan ishlash", "Ta'lim psixologiyasi", "Baholash", "Yangi metodikalar"]
    },
    {
      id: "academic-research",
      title: "Ilmiy tadqiqotlar uchun ingliz tili",
      description: "Ilmiy maqolalar yozish, tadqiqotlar o'tkazish va xalqaro konferensiyalarda ishtirok etish uchun ingliz tili. AI yordamchi ilmiy ishlaringizni takomillashtirishda yordam beradi.",
      level: "C1-C2",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "Prof. Elizabeth Taylor",
      rating: 4.9,
      reviewCount: 154,
      category: "talim",
      image: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "87%",
      students: 1865,
      topics: ["Ilmiy maqolalar", "Tadqiqot metodologiyasi", "Konferensiyalar", "Grantlar", "Akademik hamkorlik"]
    },
    
    // Sog'liq va wellbeing uchun ingliz tili
    {
      id: "medical-english",
      title: "Tibbiyot xodimlari uchun ingliz tili",
      description: "Shifokorlar, hamshiralar va tibbiyot sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi tibbiy terminologiya va bemorlar bilan muloqotni o'rgatadi.",
      level: "B2-C2",
      duration: "12 hafta",
      lessons: 36,
      price: "Bepul",
      teacher: "Dr. Sarah Johnson, MD",
      rating: 4.9,
      reviewCount: 187,
      category: "tibbiyot",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1080&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "94%",
      students: 2745,
      topics: ["Tibbiy terminologiya", "Bemorlar bilan suhbat", "Diagnoz qo'yish", "Ilmiy maqolalar", "Xalqaro konferensiyalar"]
    },
    {
      id: "nursing-english",
      title: "Hamshiralar uchun ingliz tili",
      description: "Hamshiralar va tibbiy yordamchilar uchun ingliz tili kursi. AI yordamchi bemorlarga g'amxo'rlik qilish va bemorlar bilan muloqot qilishda yordam beradi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Mary Anderson, RN",
      rating: 4.8,
      reviewCount: 156,
      category: "tibbiyot",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "95%",
      students: 3124,
      topics: ["Bemor parvarishi", "Dori-darmonlar", "Tibbiy hujjatlar", "Shoshilinch yordam", "Protseduralar"]
    },
    {
      id: "psychology-english",
      title: "Psixologlar uchun ingliz tili",
      description: "Psixologlar va ruhiy salomatlik sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi psixologik konsultatsiyalar va terapiya sessiyalari uchun ingliz tilini o'rgatadi.",
      level: "B2-C2",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "Dr. Michael Brown",
      rating: 4.9,
      reviewCount: 124,
      category: "tibbiyot",
      image: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "92%",
      students: 1978,
      topics: ["Psixologik konsultatsiya", "Terapiya", "Diagnostika", "Tadqiqotlar", "Case Studies"]
    },
    
    // Madaniyat va san'at uchun ingliz tili
    {
      id: "arts-culture",
      title: "San'at va madaniyat ingliz tili",
      description: "San'at, muzey va madaniyat sohasida ishlash uchun ingliz tili kursi. AI yordamchi san'at asarlari tahlili va madaniy tadbirlar haqida suhbatlashishni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Isabella Romano",
      rating: 4.8,
      reviewCount: 132,
      category: "sanat",
      image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1035&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "91%",
      students: 1845,
      topics: ["San'at tarixi", "Muzeyshunoslik", "Madaniy tadbirlar", "Ekskursiyalar", "San'at tanqidi"]
    },
    {
      id: "music-english",
      title: "Musiqa sohasidagi ingliz tili",
      description: "Musiqachilar, kompozitorlar va musiqa o'qituvchilari uchun ingliz tili. AI yordamchi musiqa terminologiyasi va professional musiqa muhitida muloqot qilishni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "John Williams",
      rating: 4.7,
      reviewCount: 98,
      category: "sanat",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "89%",
      students: 1567,
      topics: ["Musiqa terminologiyasi", "Konsertlar", "Musiqa nazariyasi", "Asboblar", "Kompozitsiya"]
    },
    {
      id: "film-industry",
      title: "Kino industiriyasi ingliz tili",
      description: "Kino va televideniye sohasida ishlash uchun ingliz tili. AI yordamchi kino ishlab chiqarish jarayoni va film tanqidi haqida suhbatlashishni o'rgatadi.",
      level: "B2-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "David Lynch",
      rating: 4.8,
      reviewCount: 145,
      category: "sanat",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1169&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "90%",
      students: 2154,
      topics: ["Ssenariy yozish", "Rejissura", "Aktyorlik", "Film tanqidi", "Kino festivallari"]
    },
    
    // Sport va fitness uchun ingliz tili
    {
      id: "sports-coaching",
      title: "Sport murabbiylari uchun ingliz tili",
      description: "Sport murabbiylari va instruktorlar uchun ingliz tili kursi. AI yordamchi sport mashg'ulotlarini o'tkazish va sportchilar bilan ishlashda yordam beradi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Mark Johnson",
      rating: 4.8,
      reviewCount: 156,
      category: "sport",
      image: "https://images.unsplash.com/photo-1526232373132-0e4ee16a11bf?q=80&w=1029&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 2124,
      topics: ["Mashg'ulotlar", "Jamoaviy sport", "Individual sport", "Texnikalar", "Sport psixologiyasi"]
    },
    {
      id: "fitness-instructor",
      title: "Fitness instruktorlari uchun ingliz tili",
      description: "Fitness markazlari va shaxsiy instruktorlar uchun ingliz tili. AI yordamchi mashg'ulotlarni o'tkazish va mijozlar bilan ishlashda yordam beradi.",
      level: "B1-B2",
      duration: "5 hafta",
      lessons: 15,
      price: "Bepul",
      teacher: "Jessica Lee",
      rating: 4.9,
      reviewCount: 187,
      category: "sport",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "94%",
      students: 2875,
      topics: ["Jismoniy mashqlar", "Mashg'ulot dasturlari", "Ovqatlanish", "Sog'liq", "Motivatsiya"]
    },
    
    // Turli sohalarga oid qo'shimcha kurslar
    {
      id: "hospitality-english",
      title: "Mehmondo'stlik sohasidagi ingliz tili",
      description: "Mehmonxona, restoran va turizm sohasida ishlash uchun ingliz tili. AI yordamchi mehmonlar bilan muloqot qilish va xizmat ko'rsatishni o'rgatadi.",
      level: "A2-B2",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Maria Garcia",
      rating: 4.8,
      reviewCount: 214,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "95%",
      students: 3254,
      topics: ["Mehmonxona", "Restoran", "Mijozlar bilan ishlash", "Bronlash", "Turpaketlar"]
    },
    {
      id: "customer-service",
      title: "Mijozlar xizmati ingliz tili",
      description: "Mijozlar bilan ishlash va mijozlar xizmati sohasidagilar uchun ingliz tili. AI yordamchi mijozlarga xizmat ko'rsatish va muammolarni hal qilishni o'rgatadi.",
      level: "B1-B2",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Rachel Brown",
      rating: 4.7,
      reviewCount: 165,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1073&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "92%",
      students: 2453,
      topics: ["Mijozlar bilan muloqot", "Muammolarni hal qilish", "Telefondan gaplashish", "Email yozish", "Shikoyatlar bilan ishlash"]
    },
    {
      id: "english-for-kids-advanced",
      title: "Bolalar uchun takomillashgan ingliz tili",
      description: "7-12 yoshli bolalar uchun takomillashgan ingliz tili kursi. AI yordamchi interaktiv o'yinlar va mashqlar orqali bolaga yordam beradi.",
      level: "O'rta",
      duration: "12 hafta",
      lessons: 36,
      price: "Bepul",
      teacher: "Sarah Wilson",
      rating: 4.9,
      reviewCount: 247,
      category: "bolalar",
      image: "https://images.unsplash.com/photo-1602619075660-597dbcfb3e1d?q=80&w=1171&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "97%",
      students: 5124,
      topics: ["O'qish", "Yozish", "Tinglab tushunish", "So'zlashuv", "Grammatika"]
    },
    {
      id: "fashion-industry",
      title: "Moda industriyasi ingliz tili",
      description: "Moda dizaynerlar, modellar va stilistlar uchun ingliz tili. AI yordamchi moda terminologiyasi va kasbiy muloqotni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Victoria Adams",
      rating: 4.8,
      reviewCount: 142,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1035&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "91%",
      students: 1854,
      topics: ["Moda dizayn", "Brendlar", "Moda tarixni", "Moda tadbirlar", "Marketing"]
    },
    {
      id: "immigration-english",
      title: "Immigratsiya uchun ingliz tili",
      description: "Chet elga ko'chib ketish yoki immigratsiya qilmoqchi bo'lganlar uchun kurs. AI yordamchi intervyu va ingliz tili imtihonlariga tayyorlanishda yordam beradi.",
      level: "A2-B2",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "James Rodriguez",
      rating: 4.9,
      reviewCount: 278,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1074&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "96%",
      students: 6542,
      topics: ["Immigratsiya intervyusi", "Hujjatlar to'ldirish", "Madaniyat", "Kundalik hayot", "Ish qidirish"]
    },
    {
      id: "online-business",
      title: "Onlayn biznes uchun ingliz tili",
      description: "Internet orqali biznes yurituvchilar uchun ingliz tili. AI yordamchi marketing, mijozlar bilan ishlash va xalqaro hamkorlar topishni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Alex Brown",
      rating: 4.8,
      reviewCount: 196,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 3421,
      topics: ["Digital Marketing", "E-commerce", "SMM", "Affiliate Marketing", "Client Support"]
    },
    {
      id: "journalism-english",
      title: "Jurnalistika ingliz tili",
      description: "Jurnalistlar va media sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi maqolalar yozish, intervyu olish va reportajlar tayyorlashni o'rgatadi.",
      level: "B2-C2",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "Christine Miller",
      rating: 4.7,
      reviewCount: 132,
      category: "writing",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1064&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "89%",
      students: 1765,
      topics: ["Maqola yozish", "Intervyu", "Reportaj", "Media etika", "Nashrlar"]
    },
    {
      id: "environmental-english",
      title: "Ekologiya va atrof-muhit ingliz tili",
      description: "Ekologiya va atrof-muhit sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi tabiatni muhofaza qilish va ekologik muammolar haqida suhbatlashishni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Dr. Emma Green",
      rating: 4.8,
      reviewCount: 124,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1510279770292-4b34de9f5c23?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "90%",
      students: 1654,
      topics: ["Atrof-muhit", "Iqlim o'zgarishi", "Qayta ishlash", "Barqaror rivojlanish", "Ekologik loyihalar"]
    },
    {
      id: "networking-english",
      title: "Networking va aloqalar o'rnatish ingliz tili",
      description: "Professional aloqalar o'rnatish, networking va biznes hamkorliklar uchun ingliz tili. AI yordamchi tadbirlarda tanishish va biznes munosabatlarni rivojlantirishni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Robert Thompson",
      rating: 4.9,
      reviewCount: 178,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "94%",
      students: 2856,
      topics: ["Professional networking", "Tanishish", "Tadbirlar", "Vizit kartalar", "Linkedin profili"]
    },
    {
      id: "negotiation-skills",
      title: "Muzokaralar olib borish ingliz tili",
      description: "Biznes muzokaralar va kelishuvlar olib borish uchun ingliz tili. AI yordamchi muzokaralar strategiyasi va samarali muloqot usullarini o'rgatadi.",
      level: "B2-C2",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Daniel Scott",
      rating: 4.9,
      reviewCount: 203,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1170&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "92%",
      students: 3124,
      topics: ["Muzokaralar texnikasi", "Narx kelishish", "Win-win strategiyalari", "Shartnomalar", "Hamkorlik"]
    },
    {
      id: "english-for-diplomacy",
      title: "Diplomatiya uchun ingliz tili",
      description: "Diplomatlar va xalqaro munosabatlar sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi protokol va diplomatik muloqotlarni o'rgatadi.",
      level: "C1-C2",
      duration: "12 hafta",
      lessons: 36,
      price: "Bepul",
      teacher: "Ambassador Richard Johnson",
      rating: 4.9,
      reviewCount: 154,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1526635090919-b5d79eb03241?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "91%",
      students: 1542,
      topics: ["Diplomatik protokol", "Xalqaro munosabatlar", "Sammitlar", "Muzokaralar", "Rasmiy nutqlar"]
    },
    {
      id: "english-for-hr",
      title: "HR mutaxassislari uchun ingliz tili",
      description: "Kadrlar bo'limi va HR sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi xodimlarni tanlash, intervyu o'tkazish va xodimlar bilan ishlashni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Olivia Parker",
      rating: 4.8,
      reviewCount: 165,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 2241,
      topics: ["Xodimlarni tanlash", "Intervyu", "Performance review", "Karyera rivojlantirish", "Team building"]
    },
    {
      id: "english-for-banking",
      title: "Bank va moliya sohasi ingliz tili",
      description: "Bank, investitsiyalar va moliya sohasidagilar uchun ingliz tili. AI yordamchi moliyaviy terminologiya va mijozlar bilan ishlashni o'rgatadi.",
      level: "B2-C1",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "William Morgan",
      rating: 4.7,
      reviewCount: 142,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "90%",
      students: 1987,
      topics: ["Banking terms", "Investitsiyalar", "Mijozlar bilan ishlash", "Risk assessment", "Kreditlar"]
    },
    {
      id: "english-for-remote-work",
      title: "Masofaviy ish uchun ingliz tili",
      description: "Remote ishlaydiganlar uchun ingliz tili kursi. AI yordamchi onlayn uchrashuvlar, hamkorlik va masofaviy loyihalarni boshqarishni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Jason Miller",
      rating: 4.9,
      reviewCount: 234,
      category: "biznes",
      image: "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?q=80&w=1170&auto=format&fit=crop",
      featured: true,
      hasAI: true,
      completionRate: "95%",
      students: 4523,
      topics: ["Virtual meetings", "Online collaboration", "Digital tools", "Time management", "Communication"]
    },
    {
      id: "english-for-social-media",
      title: "Ijtimoiy tarmoqlar uchun ingliz tili",
      description: "Ijtimoiy tarmoqlar kontenti yaratuvchilari va SMM mutaxassislari uchun ingliz tili. AI yordamchi kontentni takomillashtirish va auditoriya bilan ishlashni o'rgatadi.",
      level: "B1-C1",
      duration: "5 hafta",
      lessons: 15,
      price: "Bepul",
      teacher: "Emma Roberts",
      rating: 4.8,
      reviewCount: 187,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "93%",
      students: 3154,
      topics: ["Content creation", "Copywriting", "Hashtags", "Engagement", "Analytics"]
    },
    {
      id: "english-for-youtube",
      title: "YouTube uchun ingliz tili",
      description: "YouTube kontenti yaratuvchilari uchun ingliz tili kursi. AI yordamchi video skriptlarni yozish va auditoriya bilan muloqot qilishni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Ryan Collins",
      rating: 4.9,
      reviewCount: 215,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1541877944-ac82a091518a?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "94%",
      students: 3654,
      topics: ["Video scripting", "Thumbnail creation", "Audience engagement", "Monetization", "Video editing lingo"]
    },
    {
      id: "english-for-designers",
      title: "Dizaynerlar uchun ingliz tili",
      description: "Grafik dizaynerlar, UX/UI dizaynerlar va ijodkor mutaxassislar uchun ingliz tili. AI yordamchi portfolio tayyorlash va mijozlar bilan muloqot qilishni o'rgatadi.",
      level: "B1-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Sophia Williams",
      rating: 4.8,
      reviewCount: 168,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1508317469940-e3de49ba902e?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "92%",
      students: 2641,
      topics: ["Design terminology", "Portfolio presentation", "Client communication", "Feedback handling", "Design briefs"]
    },
    {
      id: "mindfulness-english",
      title: "Mindfulness va meditatsiya ingliz tili",
      description: "Meditatisiya o'qituvchilari va mindfulness sohasidagi mutaxassislar uchun ingliz tili. AI yordamchi meditatsiya sessiyalarini o'tkazish va ruhiy holatlarni ifodalashni o'rgatadi.",
      level: "B1-C1",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Dr. Sarah Thompson",
      rating: 4.9,
      reviewCount: 142,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "96%",
      students: 2154,
      topics: ["Meditatsiya texnikalari", "Mindfulness", "Ruhiy holat", "Stress boshqarish", "O'zini anglash"]
    },
    {
      id: "english-for-engineers",
      title: "Muhandislar uchun ingliz tili",
      description: "Muhandislik mutaxassislari va texnik soha xodimlari uchun ingliz tili. AI yordamchi texnik terminlarni, hujjatlashtirish va muhandislik loyihalarini muhokama qilishni o'rgatadi.",
      level: "B1-C2",
      duration: "10 hafta",
      lessons: 30,
      price: "Bepul",
      teacher: "Prof. John Richardson",
      rating: 4.8,
      reviewCount: 187,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1581092921461-6dd30f5de58d?q=80&w=1170&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "89%",
      students: 2453,
      topics: ["Engineering terms", "Technical documentation", "Project meetings", "Blueprints", "Quality assurance"]
    },
    {
      id: "english-for-architects",
      title: "Arxitektorlar uchun ingliz tili",
      description: "Arxitekturaga oid atamalar, loyihalar taqdimoti va professional muloqot uchun ingliz tili. AI yordamchi arxitektura loyihalarini taqdim etishni o'rgatadi.",
      level: "B2-C1",
      duration: "8 hafta",
      lessons: 24,
      price: "Bepul",
      teacher: "Michelle Walker",
      rating: 4.7,
      reviewCount: 124,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "91%",
      students: 1845,
      topics: ["Architectural terms", "Project presentations", "Urban planning", "Sustainability", "Design concepts"]
    },
    {
      id: "cooking-english",
      title: "Oshpazlar uchun ingliz tili",
      description: "Oshpazlar, restoran xodimlari va oziq-ovqat sohasidagilar uchun ingliz tili. AI yordamchi reseptlar yozish va taomlar taqdimotini o'rgatadi.",
      level: "A2-B2",
      duration: "6 hafta",
      lessons: 18,
      price: "Bepul",
      teacher: "Chef Antonio Rossi",
      rating: 4.9,
      reviewCount: 198,
      category: "maxsus",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1167&auto=format&fit=crop",
      featured: false,
      hasAI: true,
      completionRate: "95%",
      students: 2674,
      topics: ["Culinary terms", "Recipes", "Ingredient descriptions", "Menu writing", "Kitchen communication"]
    }
];

// Kurs kategoriyalari - yangi kategoriyalar qo'shildi
const categories = [
  { id: "all", name: "Barcha kurslar" },
  { id: "umumiy", name: "Umumiy ingliz tili" },
  { id: "biznes", name: "Biznes ingliz tili" },
  { id: "imtihon", name: "Imtihonga tayyorgarlik" },
  { id: "suhbat", name: "Suhbat kurslari" },
  { id: "grammatika", name: "Grammatika" },
  { id: "bolalar", name: "Bolalar uchun" },
  { id: "adabiyot", name: "Adabiyot" },
  { id: "dialekt", name: "Dialektlar" },
  { id: "karera", name: "Karera uchun" },
  { id: "maxsus", name: "Maxsus kurslar" },
  { id: "writing", name: "Yozish ko'nikmalari" },
  { id: "talaffuz", name: "Talaffuz" },
  { id: "leksika", name: "Leksika" },
  { id: "sayohat", name: "Sayohat" },
  { id: "tadbirlar", name: "Tadbirlar va taqdimotlar" },
  { id: "it", name: "IT va texnologiya" },
  { id: "talim", name: "Ta'lim sohasi" },
  { id: "tibbiyot", name: "Tibbiyot va salomatlik" },
  { id: "sanat", name: "San'at va madaniyat" },
  { id: "sport", name: "Sport va fitness" }
];

// Kurs darajalari
const levels = [
  { id: "all", name: "Barcha darajalar" },
  { id: "A1-A2", name: "Boshlang'ich (A1-A2)" },
  { id: "B1-B2", name: "O'rta (B1-B2)" },
  { id: "C1-C2", name: "Yuqori (C1-C2)" }
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Sahifa yuklanganda animatsiyani ishga tushirish
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  // Kurslarni filtrlash
  useEffect(() => {
    const filtered = allCourses.filter(course => {
      // Qidiruv bo'yicha filtrlash
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Kategoriya bo'yicha filtrlash
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      
      // Daraja bo'yicha filtrlash
      const matchesLevel = selectedLevel === "all" || course.level.includes(selectedLevel);
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <SessionNavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header - Yangilangan dizayn */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 shadow-lg mb-12 text-white"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold mb-2">Barcha kurslar</h1>
                <p className="text-lg text-blue-100 max-w-2xl">Ingliz tilini o'rganishning eng yaxshi kurslari, endi barchalari <span className="font-bold text-xl">BEPUL!</span> Har bir kursda sizga yordam beruvchi AI hamroh mavjud.</p>
                <div className="flex items-center mt-4 bg-white/10 p-2 rounded-lg inline-block">
                  <Bot className="h-5 w-5 mr-2 text-blue-200" />
                  <span className="text-blue-100">Barcha kurslarda AI yordamchi mavjud</span>
                </div>
            </div>
            <Link href="/">
              <ButtonColorful
                  className="h-11 px-5 mt-6 md:mt-0"
                label="Bosh sahifaga"
                aria-label="Bosh sahifaga"
              >
                <div className="relative flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4 text-white/90 dark:text-zinc-900/90" />
                    <span className="text-white dark:text-zinc-900 font-semibold">Bosh sahifaga</span>
                </div>
              </ButtonColorful>
            </Link>
          </div>
          </motion.div>
          
          {/* Statistika bloki */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md border border-blue-50">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{allCourses.length}+</h3>
                <p className="text-gray-600">Bepul kurslar</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md border border-blue-50">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">100,000+</h3>
                <p className="text-gray-600">O'quvchilar</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex items-center shadow-md border border-blue-50">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">24/7</h3>
                <p className="text-gray-600">AI yordamchisi</p>
              </div>
            </div>
          </motion.div>
          
          {/* Qidiruv va filtrlash - Yangilangan dizayn */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Qidiruv */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Kurslarni qidirish..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-blue-500" />
              </div>
              
              {/* Filter tugmasi (mobil) */}
              <button 
                className="md:hidden flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-5 w-5" />
                <span>Filtrlar</span>
              </button>
              
              {/* Desktop filtrlar */}
              <div className="hidden md:flex gap-4">
                {/* Kategoriya filtri */}
                <select
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                
                {/* Daraja filtri */}
                <select
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Mobil filtrlar paneli */}
            {isFilterOpen && (
              <div className="md:hidden mt-4 p-4 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daraja</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      {levels.map(level => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Kurslar ro'yxati */}
          <div>
            {/* Maxsus tavsiya etilgan kurslar */}
            {filteredCourses.some(course => course.featured) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showAnimation ? 1 : 0, y: showAnimation ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="h-6 w-6 text-yellow-500 mr-2" />
                  Tavsiya etilgan kurslar
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCourses
                    .filter(course => course.featured)
                    .map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all group"
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="md:w-2/5 relative h-48 md:h-auto">
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center">
                              <Award className="h-3.5 w-3.5 mr-1" />
                              Tavsiya etiladi
                            </div>
                          </div>
                          <div className="p-6 md:w-3/5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                                  {course.price}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                  <Tag className="h-4 w-4 text-blue-600" />
                                  <span>{course.level}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-md">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                                  <BookOpen className="h-4 w-4 text-amber-600" />
                                  <span>{course.lessons} dars</span>
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md">
                                  <User className="h-4 w-4 text-green-600" />
                                  <span>{course.teacher}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-4">
                                <Bot className="h-5 w-5 text-indigo-600" />
                                <span className="text-sm font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">
                                  AI yordamchi bilan
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div>
                                <div className="flex items-center">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">{course.rating} ({course.reviewCount})</span>
                                </div>
                                <div className="text-sm text-gray-600 mt-1 flex items-center">
                                  <User className="h-4 w-4 text-blue-500 mr-1" />
                                  <span>{course.students.toLocaleString('en-US')} o'quvchilar</span>
                                </div>
                              </div>
                              <Link href={`/courses/${course.id}`}>
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-1 font-medium shadow-md">
                                  Batafsil
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
            
            {/* Barcha kurslar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showAnimation ? 1 : 0, y: showAnimation ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory !== "all"
                  ? categories.find(c => c.id === selectedCategory)?.name
                  : "Barcha kurslar"}
              </h2>
                <div className="text-blue-600 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg">
                  <DownloadCloud className="h-4 w-4" />
                  <span className="font-medium">Barchasi bepul</span>
                </div>
              </div>
              
              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-md">
                  <p className="text-gray-500">Bu parametrlar bo'yicha kurslar topilmadi.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses
                    .filter(course => !course.featured || selectedCategory !== "all" || selectedLevel !== "all" || searchTerm)
                    .map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * (index % 6) }}
                        className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col h-full group"
                      >
                        <div className="relative h-48">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                            {course.level}
                          </div>
                          {course.hasAI && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <Bot className="h-3 w-3 mr-1" />
                              AI
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                              {course.price}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{course.description}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                              <span>{course.lessons} dars</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-4 w-4 text-blue-600" />
                              <span>{course.completionRate} tugallash</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-end mt-auto">
                            <div>
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                                <span className="ml-1 text-xs text-gray-600">({course.reviewCount})</span>
                              </div>
                              <div className="text-xs text-gray-600 mt-1 flex items-center">
                                <User className="h-3 w-3 text-blue-500 mr-1" />
                                <span>{course.students.toLocaleString('en-US')} o'quvchilar</span>
                              </div>
                            </div>
                            <Link href={`/courses/${course.id}`}>
                              <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm font-medium shadow-sm">
                                Batafsil
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
            </div>
          
          {/* CTA bo'limi */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showAnimation ? 1 : 0, y: showAnimation ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-3xl font-bold mb-3">Hoziroq o'rganishni boshlang!</h2>
                <p className="text-indigo-100 max-w-2xl">Bizning barcha kurslarimiz endi bepul! Shuningdek, har bir kurs AI yordamchi bilan ta'minlangan. Bu sizning bilim olishingizni yanada samarali va qiziqarli qiladi.</p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <Shield className="h-5 w-5 text-indigo-200" />
                    <span>Sertifikat olish imkoniyati</span>
          </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <Video className="h-5 w-5 text-indigo-200" />
                    <span>Video darslar</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <Globe className="h-5 w-5 text-indigo-200" />
                    <span>Istalgan vaqtda kirish</span>
                  </div>
                </div>
              </div>
              <Link href="/register">
                <button className="px-6 py-3 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2 font-bold shadow-lg transform hover:scale-105 transition-transform">
                  Ro'yxatdan o'tish
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
     
    </div>
  );
}
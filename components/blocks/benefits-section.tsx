"use client";

import { 
  Star, 
  Clock, 
  Award, 
  Settings, 
  Zap, 
  Brain, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Globe, 
  Shield, 
  Target 
} from "lucide-react";
import { motion } from "framer-motion";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const benefits = [
  {
    Icon: Star,
    name: "Yuqori sifatli kontentlar",
    description: "Professional o'qituvchilar va lingvistlar tomonidan maxsus ishlab chiqilgan premium materiallar bilan ingliz tilini samarali o'rganing.",
    href: "/courses",
    cta: "Kurslarga o'tish",
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    background: (
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Brain,
    name: "AI texnologiyasi",
    description: "GPT-4 va machine learning algoritmlariga asoslangan AI texnologiyamiz sizning o'rganish uslubingizni tahlil qilib, eng samarali mashqlarni tavsiya qiladi.",
    href: "/ai-features",
    cta: "Batafsil",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    background: (
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Clock,
    name: "Qulaylik va tezlik",
    description: "Kuniga atigi 15 daqiqa vaqt ajratib, 3 oy ichida ravon ingliz tilida so'zlashishni boshlang. Mobil ilovamiz offline rejimida ishlaydi.",
    href: "/register",
    cta: "Boshlash",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    background: (
      <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-gradient-to-br from-green-100 to-green-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Award,
    name: "Yutuqlar tizimi",
    description: "O'rganish jarayonini qiziqarli o'yinga aylantiring! 100+ dan ortiq yutuq va badj kolleksiyasini yig'ing va motivatsiyangizni oshiring.",
    href: "/achievements",
    cta: "Yutuqlarni ko'rish",
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    background: (
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Settings,
    name: "Moslashuvchan rejim",
    description: "Shaxsiy o'rganish uslubingizga moslashgan individual kurs. AI texnologiyamiz sizning kuchli va zaif tomonlaringizni tahlil qiladi.",
    href: "/personalization",
    cta: "Sozlash",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Zap,
    name: "Tezkor natijalar",
    description: "Harvard universitetida o'tkazilgan tadqiqotlarga asoslangan metodika bilan tezkor natijalarga erishing. 2 hafta ichida natijalarni ko'rasiz.",
    href: "/methodology",
    cta: "Metodika haqida",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute left-0 bottom-0 h-52 w-52 rounded-full bg-gradient-to-br from-red-100 to-red-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Users,
    name: "Hamjamiyat qo'llabi",
    description: "50,000+ o'rganuvchilar hamjamiyatiga qo'shiling. Haftalik jonli masterklasslar, o'zaro tajriba almashinuvi va til klublarida qatnashing.",
    href: "/community",
    cta: "Hamjamiyatga qo'shilish",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: Lightbulb,
    name: "Innovatsion yondashuv",
    description: "Neyropsixologiya, gamifikatsiya va sun'iy intellektga asoslangan innovatsion metodika sizning miyangizni optimal tarzda o'rganishga yo'naltiradi.",
    href: "/innovations",
    cta: "Innovatsiyalar",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
    background: (
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
  {
    Icon: BookOpen,
    name: "Ko'p qirrali o'quv rejasi",
    description: "1000+ video darslar, 5000+ interaktiv mashqlar, 200+ audio kitoblar va real hayotiy vaziyatlardan olingan materiallar bilan til o'rganing.",
    href: "/curriculum",
    cta: "O'quv rejasi",
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-4 lg:row-end-5",
    background: (
      <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-gradient-to-br from-pink-100 to-pink-50 blur-3xl opacity-30 -z-10"></div>
    ),
  },
];

export function BenefitsSection() {
  return (
    <div className="w-full py-12 px-4 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">EnglishMaster afzalliklari</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Nima uchun ingliz tilini o'rganish uchun aynan EnglishMaster platformasini tanlashingiz kerak?
        </p>
      </motion.div>
      
      <BentoGrid className="lg:grid-rows-4">
        {benefits.map((benefit) => (
          <BentoCard key={benefit.name} {...benefit} />
        ))}
      </BentoGrid>
    </div>
  );
} 
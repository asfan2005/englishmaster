"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { SessionNavBar } from "@/components/ui/sidebar";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Book, Headphones, Mic, PenTool, BookOpen, Trophy } from "lucide-react";
import { SkillCard } from "@/components/blocks/skill-card";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";
import { LanguageLevelCards } from "@/components/blocks/language-level-cards";
import { FeatureSteps } from "@/components/blocks/feature-section";
import { Blog8 } from "@/components/blocks/blog8";
import { TestimonialsSection } from "@/components/blocks/testimonials-section";
import { BenefitsSection } from "@/components/blocks/benefits-section";
import { CoursesCarousel } from "@/components/blocks/courses-carousel";
import { Footer } from "@/components/blocks/footer";

const skills = [
  { 
    id: "speaking", 
    title: "Speaking", 
    description: "AI bilan jonli suhbatlar orqali notiqlik ko'nikmalaringizni oshiring",
    icon: Mic,
    color: "from-purple-500 to-indigo-500",
    iconBg: "bg-purple-50"
  },
  { 
    id: "listening", 
    title: "Listening", 
    description: "Audio materiallar va podcast'lar orqali tinglash qobiliyatingizni rivojlantiring",
    icon: Headphones,
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-50"
  },
  { 
    id: "reading", 
    title: "Reading", 
    description: "Darajangizga mos matnlar bilan o'qish ko'nikmalaringizni yaxshilang",
    icon: Book,
    color: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-50"
  },
  { 
    id: "writing", 
    title: "Writing", 
    description: "Yozish mashqlari va AI tekshiruvi bilan yozma nutq qobiliyatingizni oshiring",
    icon: PenTool,
    color: "from-amber-500 to-yellow-500",
    iconBg: "bg-amber-50"
  },
];

const levels = [
  { id: "beginner", title: "Boshlang'ich", description: "Ingliz tilini noldan o'rganmoqchimisiz? Biz sizga asoslardan boshlab o'rgatamiz." },
  { id: "intermediate", title: "O'rta", description: "Ingliz tilida muloqot qila olasiz, lekin bilimingizni chuqurlashtirmoqchimisiz? Bu daraja siz uchun." },
  { id: "advanced", title: "Yuqori", description: "Ingliz tilini yaxshi bilasiz, lekin mukammallikka intilasizmi? Unda bu daraja siz uchun." },
  { id: "proficient", title: "Professional", description: "Professional darajada ingliz tilini o'rganish va maxsus sohalarda qo'llash uchun." },
];

export default function GetStartedPage() {
  const [selectedLevel, setSelectedLevel] = useState("");
  
  const levelFeatures = [
    { 
      step: "Boshlang'ich", 
      title: "A1-A2 Daraja",
      content: "Ingliz tilini noldan o'rganmoqchimisiz? Kundalik so'zlashuv va asosiy tushunchalardan boshlang.", 
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      step: "O'rta",
      title: "B1-B2 Daraja",
      content: "Ingliz tilida erkin muloqot qilish va matnlarni tushunish uchun o'rta darajani tanlang.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop"
    },
    { 
      step: "Yuqori",
      title: "C1-C2 Daraja",
      content: "Professional darajada ingliz tilini o'zlashtirish va maxsus sohalarda qo'llash uchun.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
    },
  ];

  const coursesData = [
    {
      id: "ielts-prep",
      title: "IELTS imtihoniga tayyorgarlik",
      description: "IELTS imtihonidagi barcha bo'limlar uchun maxsus tayyorlangan kurs. Reading, Writing, Listening va Speaking ko'nikmalarini rivojlantiring.",
      level: "B1-C1",
      duration: "12 hafta",
      lessons: 36,
      href: "/courses/ielts-prep",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop",
    },
    {
      id: "general-english",
      title: "Umumiy ingliz tili kursi",
      description: "Kundalik hayotda qo'llaniladigan ingliz tilini o'rganing. Asosiy grammatika, so'zlashuv va tinglab tushunish ko'nikmalari.",
      level: "A1-B2",
      duration: "16 hafta",
      lessons: 48,
      href: "/courses/general-english",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1122&auto=format&fit=crop",
    },
    {
      id: "business-english",
      title: "Biznes ingliz tili",
      description: "Ish joyida kerak bo'ladigan ingliz tili ko'nikmalarini rivojlantiring. Ish intervyulari, taqdimotlar va biznes muzokaralar uchun.",
      level: "B1-C1",
      duration: "10 hafta",
      lessons: 30,
      href: "/courses/business-english",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: "conversation",
      title: "Suhbat va nutq ko'nikmalari",
      description: "So'zlashuvga qaratilgan kurs. Native speakerlar bilan suhbatlashish orqali ingliz tilida erkin gaplashishni o'rganing.",
      level: "A2-C1",
      duration: "8 hafta",
      lessons: 24,
      href: "/courses/conversation",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: "grammar-intensive",
      title: "Grammatika intensiv kursi",
      description: "Ingliz tili grammatikasini chuqur o'rganish. Murakkab grammatik tuzilmalar va ularni amalda qo'llash.",
      level: "A2-C1",
      duration: "6 hafta",
      lessons: 18,
      href: "/courses/grammar-intensive",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <SessionNavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Boshlash</h1>
            <Link href="/">
              <ButtonColorful
                className="h-9 px-3"
                label="Bosh sahifaga"
                aria-label="Bosh sahifaga"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5 text-white/90 dark:text-zinc-900/90" />
                  <span className="text-white dark:text-zinc-900">Bosh sahifaga</span>
                </div>
              </ButtonColorful>
            </Link>
          </div>
          
          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
              EnglishMaster bilan ingliz tilini o'rganish
            </h2>
            <p className="text-gray-700 mb-6">
              EnglishMaster platformasi sizga ingliz tilini o'rganishning eng samarali va zamonaviy usullarini taqdim etadi. 
              AI texnologiyalari yordamida til o'rganish jarayoni yanada qiziqarli va samarali bo'ladi.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">24/7 AI bilan suhbatlashish orqali amaliyot</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">Shaxsiy o'quv rejasi va maqsadlarga yo'naltirilgan darslar</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">Talaffuz va grammatikani real vaqtda tekshirish</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">Sizning darajangizga mos keladigan kontentlar</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">Doimiy natijalar tahlili va tavsiyalar</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-left text-gray-700">Mashg'ulotlarni istagan vaqtda va joyda o'tkazish imkoniyati</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Asosiy ko'nikmalar</h2>
            <FeaturesSectionWithHoverEffects />
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Ingliz tili darajangizni tanlang</h2>
            <FeatureSteps 
              features={levelFeatures}
              title="Darajangizni bilasizmi?"
              autoPlayInterval={5000}
              imageHeight="h-[350px]"
            />
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <CoursesCarousel items={coursesData}/>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <BenefitsSection />
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <TestimonialsSection />
          </section>

          <section className="mb-8">
            <Blog8 
              heading="Ingliz tili o'rganish maqolalari"
              description="Ingliz tilini o'rganish jarayoningizda foydali bo'lgan maslahatlar va maqolalarni o'qing"
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}  <Footer/>
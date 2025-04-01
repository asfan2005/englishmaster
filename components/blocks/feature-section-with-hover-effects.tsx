import React from "react";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Headphones, 
  Mic, 
  PenTool, 
  Lightbulb, 
  BookOpen, 
  Trophy, 
  BarChart 
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Speaking",
      description: "AI bilan jonli suhbatlar orqali notiqlik ko'nikmalaringizni oshiring",
      icon: <Mic className="w-6 h-6" />,
      path: "/speaking"
    },
    {
      title: "Listening",
      description: "Audio materiallar va podcast'lar orqali tinglash qobiliyatingizni rivojlantiring",
      icon: <Headphones className="w-6 h-6" />,
      path: "/listening"
    },
    {
      title: "Reading",
      description: "Darajangizga mos matnlar bilan o'qish ko'nikmalaringizni yaxshilang",
      icon: <Book className="w-6 h-6" />,
      path: "/reading"
    },
    {
      title: "Writing",
      description: "Yozish mashqlari va AI tekshiruvi bilan yozma nutq qobiliyatingizni oshiring",
      icon: <PenTool className="w-6 h-6" />,
      path: "/writing"
    },
    {
      title: "Grammar",
      description: "Grammatika qoidalarini interaktiv mashqlar orqali o'rganing",
      icon: <BookOpen className="w-6 h-6" />,
      path: "/grammar"
    },
    {
      title: "Vocabulary",
      description: "So'z boyligingizni oshirish uchun maxsus metodikalar va mashqlar",
      icon: <Lightbulb className="w-6 h-6" />,
      path: "/vocabulary"
    },
    {
      title: "Achievements",
      description: "O'z maqsadlaringizni belgilang va yutuqlarga erishing",
      icon: <Trophy className="w-6 h-6" />,
      path: "/achievements"
    },
    {
      title: "Analytics",
      description: "Natijalaringizni kuzating va tahlil qiling, tez rivojlaning",
      icon: <BarChart className="w-6 h-6" />,
      path: "/analytics"
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-8 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  path,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  index: number;
}) => {
  return (
    <a 
      href={path}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 hover:no-underline",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 dark:from-blue-900/20 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50 dark:from-blue-900/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-blue-200 dark:bg-blue-800 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </a>
  );
}; 
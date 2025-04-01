"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Scroll hodisasi nazorat qilish
  useEffect(() => {
    const handleScroll = () => {
      // 300px pastga tushganda tugmani ko'rsatish
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Scroll foizini hisoblash
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollPercentage(Math.min(Math.round(scrolled), 100));
    };

    // Scroll hodisasini qo'shish
    window.addEventListener("scroll", handleScroll);
    // Dastlabki holatni o'rnatish
    handleScroll();

    // Hodisani tozalash
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Yuqoriga chiqish funksiyasi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center p-2 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-12 w-12",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Tepaga qaytish"
    >
      <div className="relative flex items-center justify-center">
        <ChevronUp size={20} />
        <span className="absolute text-[10px] font-semibold top-6">{scrollPercentage}%</span>
      </div>
    </button>
  );
} 
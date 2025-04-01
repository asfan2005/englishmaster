// components/blocks/footer.tsx
"use client";

import Link from "next/link";
import { Mail, Twitter, Instagram, Facebook, Linkedin, Youtube, ArrowUp, Sun, Moon } from "lucide-react";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  // Tema o'zgartirish uchun hook
  const { theme, setTheme } = useTheme();
  
  // Mounting holatini kuzatish
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Yuqoriga ko'tarish funksiyasi - TO'G'RILANGAN
  const handleScrollTop = () => {
    // Aniq window tepasiga o'tish
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    
    // Alternative usul (agar yuqoridagi ishlamasa)
    // document.body.scrollTop = 0; // Safari uchun
    // document.documentElement.scrollTop = 0; // Chrome, Firefox, IE va Opera uchun
  };

  const socialIcons = [
    { icon: Mail, href: "mailto:info@englishmaster.uz", label: "Email" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Ikonalar qismi */}
        <div className="flex justify-center gap-5 mb-6">
          {socialIcons.map((item) => (
            <Link 
              key={item.label}
              href={item.href} 
              aria-label={item.label}
              className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <item.icon size={20} />
            </Link>
          ))}

          {/* Yuqoriga ko'tarish tugmasi - TO'G'RILANGAN */}
          <button
            onClick={handleScrollTop}
            className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            aria-label="Yuqoriga"
            type="button"
          >
            <ArrowUp size={20} />
          </button>

          {/* Tema almashtirish tugmasi */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
              aria-label={theme === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}
              type="button"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>

        {/* Mualliflik huquqi */}
        <div className="flex justify-center text-xs text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Made with <Heart size={14} className="text-red-500" fill="currentColor" /> by <span className="font-medium">WebUsta</span> - EnglishMaster
          </p>
        </div>
      </div>
    </footer>
  );
}
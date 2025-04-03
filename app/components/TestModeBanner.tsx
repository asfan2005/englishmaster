"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function TestModeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-white banner-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm font-medium">
              Diqqat! Sayt test rejimida ishlayapti (2025). Barcha ma'lumotlar tajriba uchun ishlatilgan.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-amber-600 focus:outline-none"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 
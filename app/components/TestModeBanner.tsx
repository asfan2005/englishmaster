"use client";

import { useState } from "react";

export default function TestModeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">
            Diqqat! Sayt test rejimida ishlayapti (2025). Barcha ma'lumotlar tajriba uchun ishlatilgan.
          </p>
          <button 
            onClick={() => setIsVisible(false)}
            className="ml-2 text-white hover:text-amber-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
} 
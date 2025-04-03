"use client";

import { useState, useEffect } from "react";
import { Code2, X } from "lucide-react";

export default function DevModeIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // Check if we're in development environment
    setIsDev(process.env.NODE_ENV === "development");
  }, []);

  if (!isVisible || !isDev) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-gray-800 text-white rounded-lg shadow-lg p-3 text-sm flex items-center">
      <Code2 className="h-4 w-4 mr-2 text-green-400" />
      <span>Development Mode</span>
      <button 
        onClick={() => setIsVisible(false)}
        className="ml-3 p-1 rounded-full hover:bg-gray-700 focus:outline-none"
        aria-label="Close indicator"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
} 
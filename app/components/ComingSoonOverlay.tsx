"use client";

import { Construction } from "lucide-react";

interface ComingSoonOverlayProps {
  message?: string;
  showIcon?: boolean;
}

export default function ComingSoonOverlay({
  message = "Bu funksiya hozirda ishlab chiqilmoqda",
  showIcon = true
}: ComingSoonOverlayProps) {
  return (
    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
      {showIcon && (
        <Construction className="h-16 w-16 text-yellow-400 mb-4" />
      )}
      <h3 className="text-white text-2xl font-bold mb-2">Tez kunda</h3>
      <p className="text-gray-200 text-center max-w-xs">{message}</p>
    </div>
  );
} 
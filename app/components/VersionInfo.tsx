"use client";

import { Info } from "lucide-react";

interface VersionInfoProps {
  version?: string;
  buildDate?: string;
}

export default function VersionInfo({
  version = "0.1.0-beta",
  buildDate = "2025-04-05"
}: VersionInfoProps) {
  return (
    <div className="fixed bottom-20 left-4 z-50 bg-gray-800 text-white rounded-lg shadow-lg px-3 py-2 text-xs flex items-center">
      <Info className="h-3 w-3 mr-2 text-blue-400" />
      <div>
        <div className="flex space-x-2">
          <span>Versiya: {version}</span>
          <span className="text-gray-400">|</span>
          <span>Sana: {buildDate}</span>
        </div>
        <div className="text-gray-400 text-[10px] mt-0.5">EnglishMaster Test Platform</div>
      </div>
    </div>
  );
} 
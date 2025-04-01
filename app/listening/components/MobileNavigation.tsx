import React from "react";
import { Play, PenTool, FileText, Bot } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-10">
      <div className="flex justify-around">
        <button
          onClick={() => onTabChange("player")}
          className={`flex flex-1 flex-col items-center py-2 px-1 ${
            activeTab === "player"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Play size={20} />
          <span className="text-xs mt-1">Player</span>
        </button>
        
        <button
          onClick={() => onTabChange("exercises")}
          className={`flex flex-1 flex-col items-center py-2 px-1 ${
            activeTab === "exercises"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <PenTool size={20} />
          <span className="text-xs mt-1">Questions</span>
        </button>
        
        <button
          onClick={() => onTabChange("transcript")}
          className={`flex flex-1 flex-col items-center py-2 px-1 ${
            activeTab === "transcript"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <FileText size={20} />
          <span className="text-xs mt-1">Transcript</span>
        </button>
        
        <button
          onClick={() => onTabChange("ai-help")}
          className={`flex flex-1 flex-col items-center py-2 px-1 ${
            activeTab === "ai-help"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Bot size={20} />
          <span className="text-xs mt-1">AI Help</span>
        </button>
      </div>
    </div>
  );
}
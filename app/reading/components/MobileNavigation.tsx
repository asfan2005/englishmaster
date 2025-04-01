import { 
    BookOpen, 
    BarChart, 
    Headphones, 
    Bot, 
    Menu 
  } from "lucide-react";
  
  interface MobileNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showAIFeedback: boolean;
    toggleSidebar: () => void;
  }
  
  export default function MobileNavigation({
    activeTab,
    setActiveTab,
    showAIFeedback,
    toggleSidebar
  }: MobileNavigationProps) {
    return (
      <div className="flex justify-between px-2 py-2">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex flex-1 flex-col items-center justify-center px-2 py-1 ${
            activeTab === "content"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Reading</span>
        </button>
        
        <button
          onClick={() => setActiveTab("questions")}
          className={`flex flex-1 flex-col items-center justify-center px-2 py-1 ${
            activeTab === "questions"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <BarChart size={20} />
          <span className="text-xs mt-1">Questions</span>
        </button>
        
        <button
          onClick={() => setActiveTab("pronunciation")}
          className={`flex flex-1 flex-col items-center justify-center px-2 py-1 ${
            activeTab === "pronunciation"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Headphones size={20} />
          <span className="text-xs mt-1">Practice</span>
        </button>
        
        <button
          onClick={() => setActiveTab("ai-feedback")}
          disabled={!showAIFeedback}
          className={`flex flex-1 flex-col items-center justify-center px-2 py-1 ${
            activeTab === "ai-feedback"
              ? "text-blue-600 dark:text-blue-400"
              : showAIFeedback 
                ? "text-gray-500 dark:text-gray-400" 
                : "text-gray-300 dark:text-gray-600"
          }`}
        >
          <Bot size={20} />
          <span className="text-xs mt-1">AI Help</span>
          {showAIFeedback && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>}
        </button>
        
        <button
          onClick={toggleSidebar}
          className="flex flex-1 flex-col items-center justify-center px-2 py-1 text-gray-500 dark:text-gray-400"
        >
          <Menu size={20} />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    );
  }
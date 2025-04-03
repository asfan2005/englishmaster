"use client";

import { useState } from "react";
import { Terminal, Settings, Code, ChevronUp, ChevronDown, Grid, Layout, Database, Bug } from "lucide-react";

export default function DeveloperToolbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white border-t border-gray-700">
      {/* Toggle button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center bg-gray-800 px-4 py-1 rounded-t-md -mt-6 border border-gray-700 border-b-0"
        >
          <Code className="h-4 w-4 mr-2 text-green-400" />
          <span className="text-xs font-medium">DEVELOPER</span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 ml-2" />
          ) : (
            <ChevronUp className="h-4 w-4 ml-2" />
          )}
        </button>
      </div>
      
      {/* Toolbar content */}
      {isExpanded && (
        <div className="p-3">
          <div className="flex items-center mb-2">
            <Terminal className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-xs font-semibold">ENGLISHMASTER PLATFORM</span>
            <span className="text-xs ml-2 text-gray-400">Development Mode</span>
            <div className="flex-1"></div>
            <div className="px-2 py-0.5 bg-green-800 rounded text-[10px] text-green-300">TEST BUILD</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[
              { icon: <Layout className="h-4 w-4" />, label: "Components" },
              { icon: <Grid className="h-4 w-4" />, label: "Layout" },
              { icon: <Database className="h-4 w-4" />, label: "Data" },
              { icon: <Bug className="h-4 w-4" />, label: "Debug" },
              { icon: <Settings className="h-4 w-4" />, label: "Config" }
            ].map((item, index) => (
              <button 
                key={index}
                className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors text-xs"
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-gray-800 rounded text-xs">
            <div className="flex justify-between text-gray-400 border-b border-gray-700 pb-1 mb-1">
              <span>Environment</span>
              <span>Development</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Server Status</span>
              <span className="text-green-400">Running</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
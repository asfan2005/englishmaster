"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { topicGroups, writingPrompts } from "./data/writing-data";
import { WritingType } from "./data/types";
import Sidebar from "./components/Sidebar";
import { WritingEditor } from "./components/WritingEditor";
import WritingPrompt from "./components/WritingPrompt";
import AiSuggestions from "./components/AiSuggestions";
import WritingFeedback from "./components/WritingFeedback";
import MobileNavigation from "./components/MobileNavigation";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Client component that uses searchParams
function WritingPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("prompt");
  const [currentTab, setCurrentTab] = useState("write");
  const [selectedType, setSelectedType] = useState<WritingType>("essay");
  const [selectedTopic, setSelectedTopic] = useState(topicGroups[0].topics[0].id);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedWritings, setSavedWritings] = useLocalStorage<Record<string, string>>("savedWritings", {});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [feedbackContent, setFeedbackContent] = useState<any>(null);

  // Find current prompt based on URL or default
  const currentPrompt = promptId 
    ? writingPrompts.find(p => p.id === promptId) 
    : writingPrompts.find(p => p.type === selectedType && p.topicId === selectedTopic);

  // Save content when typing stops
  useEffect(() => {
    if (!currentPrompt) return;
    
    const timer = setTimeout(() => {
      if (content && !isSubmitted) {
        const newSavedWritings = { ...savedWritings };
        newSavedWritings[currentPrompt.id] = content;
        setSavedWritings(newSavedWritings);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, currentPrompt]);

  // Load saved content when prompt changes
  useEffect(() => {
    if (currentPrompt && savedWritings[currentPrompt.id] && !isSubmitted) {
      setContent(savedWritings[currentPrompt.id]);
    } else if (currentPrompt && !savedWritings[currentPrompt.id]) {
      setContent("");
    }
    setIsSubmitted(false);
  }, [currentPrompt]);

  // Calculate word count
  useEffect(() => {
    if (!content) {
      setWordCount(0);
      return;
    }
    
    // Even a single character counts as valid for submission
    if (content.trim().length > 0) {
      const words = content.trim().split(/\s+/);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [content]);

  // Change the prompt when type or topic changes
  useEffect(() => {
    if (!promptId) {
      const newPrompt = writingPrompts.find(p => p.type === selectedType && p.topicId === selectedTopic);
      if (newPrompt) {
        router.push(`/writing?prompt=${newPrompt.id}`);
      }
    }
  }, [selectedType, selectedTopic, promptId, router]);

  const handleSubmit = async () => {
    // Always allow submission even if content is short
    setIsSubmitted(true);
    setCurrentTab("feedback");
    setAiLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      
      setFeedbackContent({
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        strengths: [
          "Your introduction effectively introduces the topic",
          "Good use of transition words between paragraphs",
          "Clear thesis statement that guides the essay"
        ],
        improvements: [
          "Consider providing more specific examples to support your arguments",
          "Some sentence structures are repetitive - try varying your syntax",
          "The conclusion could more effectively summarize your main points"
        ],
        suggestions: "To improve this essay, focus on developing your arguments with more concrete evidence. Consider researching additional sources to support your claims. Also, vary your sentence structure to make your writing more engaging.",
        correctedText: content // In a real app, this would include corrections
      });
    } catch (error) {
      console.error("Error getting feedback:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const getAiSuggestions = async () => {
    if (!currentPrompt) return;
    
    setAiLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Simulate AI response based on the current prompt
      let suggestion = "";
      
      if (selectedType === "essay") {
        suggestion = `For this essay on ${currentPrompt.title}, consider structuring your response with these key points:\n\n` +
          `1. Introduction: Define ${currentPrompt.title} and explain its importance in today's world\n` +
          `2. Body Paragraph 1: Discuss the historical context\n` +
          `3. Body Paragraph 2: Analyze current perspectives\n` +
          `4. Body Paragraph 3: Explore potential future developments\n` +
          `5. Conclusion: Summarize your arguments and provide a thoughtful closing statement\n\n` +
          `Some useful vocabulary for this topic includes: perspective, analytical approach, fundamental concept, paradigm shift, compelling evidence.`;
      } else if (selectedType === "letter") {
        suggestion = `For this ${currentPrompt.title}, remember to follow proper letter format:\n\n` +
          `1. Start with an appropriate greeting\n` +
          `2. Introduce yourself and explain your purpose for writing\n` +
          `3. Present your main points clearly and concisely\n` +
          `4. Use a respectful and appropriate tone throughout\n` +
          `5. End with a call to action or clear statement of what you hope to achieve\n` +
          `6. Use a formal closing that matches your relationship with the recipient\n\n` +
          `Remember to use language appropriate to your audience and purpose.`;
      } else {
        suggestion = `For this ${currentPrompt.title}, consider these elements:\n\n` +
          `1. Setting: Establish a clear sense of place and time\n` +
          `2. Characters: Develop distinct personalities and motivations\n` +
          `3. Conflict: Create tension to drive your narrative\n` +
          `4. Description: Use vivid sensory details\n` +
          `5. Dialogue: Let characters speak in authentic voices\n\n` +
          `Try to show rather than tell, and consider using literary devices like metaphor and symbolism to add depth.`;
      }
      
      setAiSuggestions(suggestion);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
    } finally {
      setAiLoading(false);
    }
  };

  // Ensure there's always some content for submission if completely empty
  const ensureContent = () => {
    if (!content.trim()) {
      setContent("My response");
    }
    return true;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topicGroups={topicGroups}
          writingPrompts={writingPrompts}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileNavigation 
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="suggestions">AI Help</TabsTrigger>
                  <TabsTrigger value="feedback" disabled={!isSubmitted}>
                    Feedback
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    {wordCount} words
                  </div>
                  
                  {currentTab === "write" && (
                    <Button 
                      onClick={() => {
                        ensureContent();
                        handleSubmit();
                      }}
                      disabled={isSubmitted}
                    >
                      Submit for Feedback
                    </Button>
                  )}
                  
                  {currentTab === "suggestions" && (
                    <Button 
                      onClick={getAiSuggestions}
                      disabled={aiLoading}
                    >
                      {aiLoading ? "Loading..." : "Get AI Suggestions"}
                    </Button>
                  )}
                </div>
              </div>
              
              <TabsContent value="write" className="mt-0">
                {currentPrompt && (
                  <>
                    <WritingPrompt prompt={currentPrompt} />
                    <WritingEditor 
                      content={content} 
                      setContent={setContent} 
                      isSubmitted={isSubmitted}
                    />
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="suggestions" className="mt-0">
                <AiSuggestions 
                  prompt={currentPrompt}
                  suggestions={aiSuggestions}
                  loading={aiLoading}
                  onGetSuggestions={getAiSuggestions}
                />
              </TabsContent>
              
              <TabsContent value="feedback" className="mt-0">
                <WritingFeedback 
                  loading={aiLoading}
                  feedback={feedbackContent}
                  originalContent={content}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WritingPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading writing page...</div>}>
      <WritingPageClient />
    </Suspense>
  );
}
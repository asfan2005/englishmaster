"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Bookmark, Star, Search, Bot, Dumbbell, BookOpen, ArrowLeft } from "lucide-react";
import { useLocalStorage } from "../vocabulary/hooks/useLocalStorage"; // Reusing hook
import Sidebar from "./components/Sidebar";
import MobileNavigation from "./components/MobileNavigation";
import GrammarTopicDisplay from "./components/GrammarTopicDisplay";
import GrammarExercise from "./components/GrammarExercise";
import GrammarAiAssistant from "./components/GrammarAiAssistant";
import GrammarPractice from "./components/GrammarPractice";
import { difficultyLevels, grammarTopics, grammarRules } from "./data/grammar-data";
import { GrammarLevel, GrammarCategory, UserGrammarProgress, GrammarRule } from "./data/types";

// Interface for practice results
interface PracticeResult {
  ruleId: string;
  correct: boolean;
}

// Client component that uses searchParams
function GrammarPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level") as GrammarLevel || "beginner";
  const categoryParam = searchParams.get("category") as GrammarCategory || "tenses";
  
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>(levelParam);
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory>(categoryParam);
  const [selectedTopic, setSelectedTopic] = useState(grammarTopics[0].id);
  const [currentTab, setCurrentTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  
  // AI related states
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedRuleForAi, setSelectedRuleForAi] = useState<GrammarRule | null>(null);
  const [practiceRules, setPracticeRules] = useState<GrammarRule[]>([]);
  
  // User progress states
  const [savedRules, setSavedRules] = useLocalStorage<string[]>("savedGrammarRules", []);
  const [ruleProgress, setRuleProgress] = useLocalStorage<Record<string, UserGrammarProgress>>(
    "grammarProgress",
    {}
  );
  
  // Update URL when level or category changes
  useEffect(() => {
    router.push(`/grammar?level=${selectedLevel}&category=${selectedCategory}`);
  }, [selectedLevel, selectedCategory, router]);
  
  // Find current grammar rules
  const currentGrammarRules = grammarRules.filter(
    (rule) => (rule.level === selectedLevel || selectedLevel === "all") && 
              (rule.category === selectedCategory || selectedCategory === "all")
  );
  
  // Filter for search results
  const searchResults = searchQuery
    ? grammarRules.filter((rule) =>
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.examples.some(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];
  
  // Get saved rules data
  const savedRulesData = grammarRules.filter((rule) => savedRules.includes(rule.id));
  
  // Select a rule for AI assistance
  const handleSelectRuleForAi = (rule: GrammarRule) => {
    setSelectedRuleForAi(rule);
    setCurrentTab("ai-assistant");
  };
  
  // Handle AI practice completion
  const handlePracticeComplete = (results: PracticeResult[]) => {
    // Update learning progress based on practice results
    const newProgress = { ...ruleProgress };
    
    results.forEach(({ ruleId, correct }) => {
      const currentStatus = ruleProgress[ruleId]?.status || "learning";
      let newStatus = currentStatus;
      
      if (correct) {
        // Progress to the next level if correct
        if (currentStatus === "learning") newStatus = "familiar";
        else if (currentStatus === "familiar") newStatus = "mastered";
      } else {
        // Regress if incorrect and not already at learning level
        if (currentStatus === "mastered") newStatus = "familiar";
      }
      
      newProgress[ruleId] = {
        ruleId,
        status: newStatus,
        lastPracticed: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        practiceCount: (ruleProgress[ruleId]?.practiceCount || 0) + 1
      };
    });
    
    setRuleProgress(newProgress);
  };
  
  // Handle saving and marking rules
  const handleSaveRule = (ruleId: string) => {
    if (savedRules.includes(ruleId)) {
      setSavedRules(savedRules.filter((id) => id !== ruleId));
    } else {
      setSavedRules([...savedRules, ruleId]);
    }
  };
  
  const handleMarkLearned = (ruleId: string, status: "learning" | "familiar" | "mastered") => {
    const newProgress = { ...ruleProgress };
    
    newProgress[ruleId] = {
      ruleId,
      status,
      lastPracticed: new Date().toISOString(),
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      practiceCount: (ruleProgress[ruleId]?.practiceCount || 0) + 1
    };
    
    setRuleProgress(newProgress);
  };
  
  // Handle AI chat submission
  const handleAiSubmit = () => {
    if (!userInput.trim() || isAiLoading) return;
    
    setIsAiLoading(true);
    
    // In a real implementation, this would call an actual API
    setTimeout(() => {
      // Simple mock responses based on the query
      let response = "";
      
      if (selectedRuleForAi) {
        if (userInput.toLowerCase().includes("example")) {
          response = `Here are examples of ${selectedRuleForAi.title}:\n\n`;
          selectedRuleForAi.examples.forEach((example, index) => {
            response += `${index + 1}. ${example}\n\n`;
          });
          response += `Remember: ${selectedRuleForAi.explanation}`;
        } else if (userInput.toLowerCase().includes("explain") || userInput.toLowerCase().includes("clarify")) {
          response = `${selectedRuleForAi.title}:\n\n${selectedRuleForAi.explanation}\n\nHere's a simple way to understand it: ${selectedRuleForAi.simpleExplanation || selectedRuleForAi.explanation}`;
        } else if (userInput.toLowerCase().includes("difference") || userInput.toLowerCase().includes("versus") || userInput.toLowerCase().includes("vs")) {
          response = `To understand the concept of ${selectedRuleForAi.title}, it's important to distinguish it from related concepts.\n\n`;
          response += `${selectedRuleForAi.comparisonNotes || "This grammar rule is used in specific contexts where " + selectedRuleForAi.explanation.toLowerCase()}`;
        } else {
          response = `${selectedRuleForAi.title}: ${selectedRuleForAi.explanation}\n\nFor example: ${selectedRuleForAi.examples[0]}\n\n`;
          response += `Common mistakes: ${selectedRuleForAi.commonMistakes || "Students often confuse when to apply this rule."}`;
        }
      } else {
        response = "I'm an AI grammar assistant. Select a grammar rule from your saved list, and I can help you understand its usage, provide examples, and answer your questions about English grammar.";
      }
      
      setAiResponse(response);
      setIsAiLoading(false);
    }, 1000); // Simulate API delay
  };
  
  // Setup practice rules
  useEffect(() => {
    if (currentTab === "ai-practice" && practiceRules.length === 0) {
      // Select 5 random rules from current sets or saved rules for practice
      const availableRules = currentGrammarRules.length > 0
        ? currentGrammarRules
        : savedRulesData.length > 0
          ? savedRulesData
          : grammarRules;
      
      const shuffled = [...availableRules].sort(() => 0.5 - Math.random());
      setPracticeRules(shuffled.slice(0, 5));
    }
  }, [currentTab, currentGrammarRules, savedRulesData, practiceRules.length, grammarRules]);
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileNavigation
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mb-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => router.push('/get-started')}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved Rules
                    <span className="ml-2 text-xs bg-primary/20 rounded-full px-2 py-0.5">
                      {savedRules.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="ai-assistant" className="flex items-center">
                    <Bot className="mr-1 h-4 w-4" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="ai-practice" className="flex items-center">
                    <Dumbbell className="mr-1 h-4 w-4" />
                    Practice
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="browse" className="mt-0 space-y-8">
                {currentGrammarRules.length > 0 ? (
                  currentGrammarRules.map((rule) => (
                    <GrammarTopicDisplay
                      key={rule.id}
                      rule={rule}
                      savedRules={savedRules}
                      ruleProgress={ruleProgress}
                      onSaveRule={handleSaveRule}
                      onUpdateProgress={handleMarkLearned}
                      onSelectForAi={handleSelectRuleForAi}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No grammar rules found</h3>
                    <p className="text-muted-foreground">
                      There are no grammar rules available for this level and category.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSelectedLevel("beginner")}
                    >
                      Try Beginner Level
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-0">
                {savedRulesData.length > 0 ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Saved Grammar Rules</h2>
                    <div className="grid grid-cols-1 gap-6">
                      {savedRulesData.map((rule) => (
                        <GrammarTopicDisplay
                          key={rule.id}
                          rule={rule}
                          savedRules={savedRules}
                          ruleProgress={ruleProgress}
                          onSaveRule={handleSaveRule}
                          onUpdateProgress={handleMarkLearned}
                          onSelectForAi={handleSelectRuleForAi}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No saved grammar rules yet</h3>
                    <p className="text-muted-foreground">
                      Save grammar rules by clicking the bookmark icon on any rule card.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setCurrentTab("browse")}>
                      Browse Grammar Rules
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="search" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search for grammar rules, examples, or explanations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  
                  {searchQuery && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Search Results ({searchResults.length})
                      </h3>
                      
                      {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                          {searchResults.map((rule) => (
                            <GrammarTopicDisplay
                              key={rule.id}
                              rule={rule}
                              savedRules={savedRules}
                              ruleProgress={ruleProgress}
                              onSaveRule={handleSaveRule}
                              onUpdateProgress={handleMarkLearned}
                              onSelectForAi={handleSelectRuleForAi}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No grammar rules found matching "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!searchQuery && (
                    <div className="text-center py-12">
                      <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Search Grammar Rules</h3>
                      <p className="text-muted-foreground">
                        Type a grammar rule, explanation, or example to search across all grammar topics.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="ai-assistant" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
                  <div className="md:col-span-2">
                    <GrammarAiAssistant
                      selectedRule={selectedRuleForAi || undefined}
                      userInput={userInput}
                      setUserInput={setUserInput}
                      onSubmit={handleAiSubmit}
                      aiResponse={aiResponse}
                      isLoading={isAiLoading}
                    />
                  </div>
                  <div className="border rounded-lg p-4 overflow-auto">
                    <h3 className="font-medium mb-3">Select a grammar rule to discuss:</h3>
                    <div className="space-y-2">
                      {savedRulesData.length > 0 ? (
                        savedRulesData.map((rule) => (
                          <Button
                            key={rule.id}
                            variant={selectedRuleForAi?.id === rule.id ? "default" : "outline"}
                            className="w-full justify-start text-left"
                            onClick={() => setSelectedRuleForAi(rule)}
                          >
                            <div className="truncate">
                              {rule.title}
                            </div>
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No saved grammar rules yet. Save some rules to discuss them with the AI assistant.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-practice" className="mt-0">
                <div className="h-[70vh]">
                  <GrammarPractice
                    selectedRules={practiceRules}
                    onComplete={handlePracticeComplete}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrammarPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading grammar page...</div>}>
      <GrammarPageClient />
    </Suspense>
  );
}

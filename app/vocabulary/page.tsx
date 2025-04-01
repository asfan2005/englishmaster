"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { topicGroups, vocabularySets } from "./data/vocabulary-data";
import { VocabularyLevel, VocabularyCategory, UserVocabularyProgress, VocabularyWord } from "./data/types";
import Sidebar from "./components/Sidebar";
import MobileNavigation from "./components/MobileNavigation";
import VocabularySetDisplay from "./components/VocabularySetDisplay";
import VocabularyCard from "./components/VocabularyCard";
import AiAssistant from "./components/AiAssistant";
import AiPractice from "./components/AiPractice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Bookmark, Star, Search, Bot, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define types for practice results
interface PracticeResult {
  wordId: string;
  correct: boolean;
}

// Create a client component that uses searchParams
function VocabularyPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level") as VocabularyLevel || "beginner";
  const topicParam = searchParams.get("topic") || topicGroups[0].topics[0].id;
  
  const [selectedLevel, setSelectedLevel] = useState<VocabularyLevel>(levelParam);
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory>("everyday");
  const [selectedTopic, setSelectedTopic] = useState(topicParam);
  const [currentTab, setCurrentTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  
  // AI related states
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedWordForAi, setSelectedWordForAi] = useState<VocabularyWord | null>(null);
  const [practiceWords, setPracticeWords] = useState<VocabularyWord[]>([]);
  
  const [savedWords, setSavedWords] = useLocalStorage<string[]>("savedVocabularyWords", []);
  const [wordProgress, setWordProgress] = useLocalStorage<Record<string, UserVocabularyProgress>>(
    "vocabularyProgress",
    {}
  );
  
  // Update URL when level or topic changes
  useEffect(() => {
    router.push(`/vocabulary?level=${selectedLevel}&topic=${selectedTopic}`);
  }, [selectedLevel, selectedTopic, router]);
  
  // Find current vocabulary set
  const currentVocabularySets = vocabularySets.filter(
    (set) => set.level === selectedLevel && set.topicId === selectedTopic
  );
  
  // Filter for search results
  const searchResults = searchQuery
    ? vocabularySets.flatMap((set) =>
        set.words.filter((word) =>
          word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
          word.definition.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
  
  // Get saved words data
  const savedWordsData = vocabularySets
    .flatMap((set) => set.words)
    .filter((word) => savedWords.includes(word.id));
  
  // Select a word for AI assistance
  const handleSelectWordForAi = (word: VocabularyWord) => {
    setSelectedWordForAi(word);
    setCurrentTab("ai-assistant");
  };
  
  // Handle AI practice completion
  const handlePracticeComplete = (results: PracticeResult[]) => {
    // Update learning progress based on practice results
    const newProgress = { ...wordProgress };
    
    results.forEach(({ wordId, correct }) => {
      const currentStatus = wordProgress[wordId]?.status || "learning";
      let newStatus = currentStatus;
      
      if (correct) {
        // Progress to the next level if correct
        if (currentStatus === "learning") newStatus = "familiar";
        else if (currentStatus === "familiar") newStatus = "mastered";
      } else {
        // Regress if incorrect and not already at learning level
        if (currentStatus === "mastered") newStatus = "familiar";
      }
      
      newProgress[wordId] = {
        wordId,
        status: newStatus,
        lastReviewed: new Date().toISOString(),
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        reviewCount: (wordProgress[wordId]?.reviewCount || 0) + 1
      };
    });
    
    setWordProgress(newProgress);
  };
  
  // Handle saving and marking words
  const handleSaveWord = (wordId: string) => {
    if (savedWords.includes(wordId)) {
      setSavedWords(savedWords.filter((id) => id !== wordId));
    } else {
      setSavedWords([...savedWords, wordId]);
    }
  };
  
  const handleMarkLearned = (wordId: string, status: "learning" | "familiar" | "mastered") => {
    const newProgress = { ...wordProgress };
    
    newProgress[wordId] = {
      wordId,
      status,
      lastReviewed: new Date().toISOString(),
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Next day
      reviewCount: (wordProgress[wordId]?.reviewCount || 0) + 1
    };
    
    setWordProgress(newProgress);
  };
  
  // Handle AI chat submission
  const handleAiSubmit = () => {
    if (!userInput.trim() || isAiLoading) return;
    
    setIsAiLoading(true);
    
    // In a real implementation, this would call an actual API
    setTimeout(() => {
      // Simple mock responses
      let response = "";
      
      if (selectedWordForAi) {
        if (userInput.toLowerCase().includes("example")) {
          response = `Here are some examples using the word "${selectedWordForAi.word}":\n\n`;
          response += `1. ${selectedWordForAi.example}\n\n`;
          response += `2. Another context: The ${selectedWordForAi.word} was particularly evident in their approach to the problem.\n\n`;
          response += `3. Alternative usage: She emphasized the importance of ${selectedWordForAi.word} in her presentation.`;
        } else if (userInput.toLowerCase().includes("synonym")) {
          response = `The word "${selectedWordForAi.word}" has several synonyms including: ${selectedWordForAi.synonyms.join(", ")}.`;
        } else {
          response = `The word "${selectedWordForAi.word}" means "${selectedWordForAi.definition}". It is typically used as a ${selectedWordForAi.partOfSpeech}.\n\nExample: ${selectedWordForAi.example}`;
        }
      } else {
        response = "I'm an AI vocabulary assistant. Select a word from your vocabulary lists, and I can help you understand its meaning, usage, and provide examples.";
      }
      
      setAiResponse(response);
      setIsAiLoading(false);
    }, 1000); // Simulate API delay
  };
  
  // Setup practice words
  useEffect(() => {
    if (currentTab === "ai-practice" && practiceWords.length === 0) {
      // Select 5 random words from current sets or saved words for practice
      const availableWords = currentVocabularySets.length > 0
        ? currentVocabularySets.flatMap(set => set.words)
        : savedWordsData.length > 0
          ? savedWordsData
          : vocabularySets.flatMap(set => set.words);
      
      const shuffled = [...availableWords].sort(() => 0.5 - Math.random());
      setPracticeWords(shuffled.slice(0, 5));
    }
  }, [currentTab, currentVocabularySets, savedWordsData, practiceWords.length, vocabularySets]);
  
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
                ← Back
              </Button>
            </div>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved Words
                    <span className="ml-2 text-xs bg-primary/20 rounded-full px-2 py-0.5">
                      {savedWords.length}
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
                {currentVocabularySets.length > 0 ? (
                  currentVocabularySets.map((set) => (
                    <VocabularySetDisplay
                      key={set.id}
                      vocabularySet={set}
                      savedWords={savedWords}
                      wordProgress={wordProgress}
                      onSaveWord={handleSaveWord}
                      onUpdateProgress={handleMarkLearned}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No vocabulary sets found</h3>
                    <p className="text-muted-foreground">
                      There are no vocabulary sets available for this topic and level.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-0">
                {savedWordsData.length > 0 ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Saved Words</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedWordsData.map((word) => (
                        <div key={word.id} className="h-[280px]">
                          <VocabularyCard
                            word={word}
                            onSave={handleSaveWord}
                            onMarkLearned={handleMarkLearned}
                            isSaved={true}
                            learningStatus={wordProgress[word.id]?.status || null}
                          />
                          <div className="mt-2 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSelectWordForAi(word)}
                              className="flex items-center"
                            >
                              <Bot className="mr-1 h-4 w-4" />
                              Ask AI about this word
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No saved words yet</h3>
                    <p className="text-muted-foreground">
                      Save words by clicking the bookmark icon on any vocabulary card.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setCurrentTab("browse")}>
                      Browse Vocabulary
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="search" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search for words or definitions..."
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchResults.map((word) => (
                            <div key={word.id} className="h-[280px]">
                              <VocabularyCard
                                word={word}
                                onSave={handleSaveWord}
                                onMarkLearned={handleMarkLearned}
                                isSaved={savedWords.includes(word.id)}
                                learningStatus={wordProgress[word.id]?.status || null}
                              />
                              <div className="mt-2 flex justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleSelectWordForAi(word)}
                                  className="flex items-center"
                                >
                                  <Bot className="mr-1 h-4 w-4" />
                                  Ask AI about this word
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No words found matching "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!searchQuery && (
                    <div className="text-center py-12">
                      <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Search Vocabulary</h3>
                      <p className="text-muted-foreground">
                        Type a word or definition to search across all vocabulary sets.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="ai-assistant" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
                  <div className="md:col-span-2">
                    <AiAssistant
                      selectedWord={selectedWordForAi || undefined}
                      userInput={userInput}
                      setUserInput={setUserInput}
                      onSubmit={handleAiSubmit}
                      aiResponse={aiResponse}
                      isLoading={isAiLoading}
                    />
                  </div>
                  <div className="border rounded-lg p-4 overflow-auto">
                    <h3 className="font-medium mb-3">Select a word to discuss:</h3>
                    <div className="space-y-2">
                      {savedWordsData.length > 0 ? (
                        savedWordsData.map((word) => (
                          <Button
                            key={word.id}
                            variant={selectedWordForAi?.id === word.id ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => setSelectedWordForAi(word)}
                          >
                            {word.word}
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No saved words yet. Save some words to discuss them with the AI assistant.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-practice" className="mt-0">
                <div className="h-[70vh]">
                  <AiPractice
                    selectedWords={practiceWords}
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

export default function VocabularyPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading vocabulary page...</div>}>
      <VocabularyPageClient />
    </Suspense>
  );
}

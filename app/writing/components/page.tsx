"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WritingEditor } from "./WritingEditor"
import { topicGroups, writingPrompts } from "../data/writing-data"
import { useRouter } from "next/navigation"

export default function WritingPage() {
  const [selectedTab, setSelectedTab] = useState("essays")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [writingContent, setWritingContent] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  // Filter prompts by selected topic and tab
  const filteredPrompts = selectedTopic 
    ? writingPrompts.filter(prompt => prompt.topicId === selectedTopic && prompt.type.startsWith(selectedTab))
    : writingPrompts.filter(prompt => prompt.type.startsWith(selectedTab))

  // Filter topics by selected tab
  const filteredTopics = topicGroups.filter(group => 
    group.id.startsWith(selectedTab)
  )

  const handleSelectPrompt = (promptId: string) => {
    setSelectedPrompt(promptId)
    const prompt = writingPrompts.find(p => p.id === promptId)
    if (prompt) {
      setWritingContent("")
      setIsSubmitted(false)
    }
  }

  const handleSubmit = () => {
    if (writingContent.trim().length < 50) {
      alert("Please write at least 50 characters before submitting.")
      return
    }
    
    setIsSubmitted(true)
    // Here you would typically save the submission to a database
    // For now, we'll just show it as submitted
  }

  const handleAiAssist = () => {
    // This would connect to an AI service to get suggestions
    console.log("AI assist requested")
    // For demo purposes, we'll just show a mock message
    alert("AI writing assistance is being processed. This feature will be available soon!")
  }

  const handleViewFeedback = () => {
    if (selectedPrompt) {
      router.push(`/writing/feedback/${selectedPrompt}`)
    }
  }

  return (
    <div className="container py-6 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Writing Practice</h1>
      
      <Tabs defaultValue="essays" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="essays">Essays</TabsTrigger>
          <TabsTrigger value="letters">Letters</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="space-y-4">
          {!selectedPrompt ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Topics</CardTitle>
                    <CardDescription>Select a topic to see prompts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      {filteredTopics.map(group => (
                        <div key={group.id} className="space-y-2">
                          <h3 className="font-medium text-sm text-muted-foreground">{group.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {group.topics.map(topic => (
                              <Button 
                                key={topic.id}
                                variant={selectedTopic === topic.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTopic(topic.id)}
                              >
                                {topic.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Prompts</CardTitle>
                    <CardDescription>
                      {selectedTopic 
                        ? `Select a prompt to start writing` 
                        : `Select a topic first or browse all ${selectedTab}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredPrompts.length > 0 ? (
                        filteredPrompts.map(prompt => (
                          <Card key={prompt.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                            <CardHeader className="py-3" onClick={() => handleSelectPrompt(prompt.id)}>
                              <CardTitle className="text-base">{prompt.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between py-2 text-xs text-muted-foreground">
                              <div>Difficulty: {prompt.difficulty}</div>
                              <div>Est. Time: {prompt.timeEstimate}</div>
                              <div>{prompt.wordLimit} words</div>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          No prompts available for the selected topic. Please select another topic.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedPrompt(null)}
                className="mb-4"
              >
                ← Back to prompts
              </Button>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {writingPrompts.find(p => p.id === selectedPrompt)?.title}
                  </CardTitle>
                  <CardDescription>
                    {writingPrompts.find(p => p.id === selectedPrompt)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                        Difficulty: {writingPrompts.find(p => p.id === selectedPrompt)?.difficulty}
                      </div>
                      <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                        Est. Time: {writingPrompts.find(p => p.id === selectedPrompt)?.timeEstimate}
                      </div>
                      <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                        Word Limit: {writingPrompts.find(p => p.id === selectedPrompt)?.wordLimit} words
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Writing Tips:</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {writingPrompts.find(p => p.id === selectedPrompt)?.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Response</CardTitle>
                  <CardDescription>
                    {isSubmitted 
                      ? "Your submission has been recorded" 
                      : `Write your response below (${writingPrompts.find(p => p.id === selectedPrompt)?.wordLimit} words max)`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WritingEditor 
                    content={writingContent}
                    setContent={setWritingContent}
                    isSubmitted={isSubmitted}
                    onAiAssist={handleAiAssist}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {!isSubmitted && 
                      `Words: ${writingContent.split(/\s+/).filter(Boolean).length} / 
                      ${writingPrompts.find(p => p.id === selectedPrompt)?.wordLimit}`
                    }
                  </div>
                  <div>
                    {!isSubmitted ? (
                      <Button onClick={handleSubmit} disabled={writingContent.trim().length < 50}>
                        Submit Response
                      </Button>
                    ) : (
                      <Button onClick={handleViewFeedback}>
                        View Feedback
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 
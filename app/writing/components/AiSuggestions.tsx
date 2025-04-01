"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Loader2 } from "lucide-react"
import { WritingPrompt } from "../data/types"

interface AiSuggestionsProps {
  prompt: WritingPrompt | undefined
  suggestions: string
  loading: boolean
  onGetSuggestions: () => void
}

export default function AiSuggestions({
  prompt,
  suggestions,
  loading,
  onGetSuggestions
}: AiSuggestionsProps) {
  if (!prompt) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-muted-foreground">Select a writing prompt first</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            AI Writing Assistance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get AI-powered suggestions to help you structure your response, generate ideas, 
            or overcome writer's block.
          </p>
          
          {!suggestions && !loading && (
            <Button onClick={onGetSuggestions}>
              Get Suggestions for This Prompt
            </Button>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Generating suggestions...
              </span>
            </div>
          )}
          
          {suggestions && !loading && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Suggestions for {prompt.title}:</h3>
              <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                {suggestions}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={onGetSuggestions}>
                  Regenerate Suggestions
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Start with a clear outline to organize your thoughts</li>
            <li>Use specific examples to support your main points</li>
            <li>Vary your sentence structure to keep your writing engaging</li>
            <li>Read your work aloud to catch awkward phrasing</li>
            <li>Take short breaks if you experience writer's block</li>
            <li>Always review your work for clarity and coherence</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
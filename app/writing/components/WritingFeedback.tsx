"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, AlertCircle, CheckCircle, ArrowLeftCircle, Loader2, XCircle } from "lucide-react"
import { WritingFeedback as WritingFeedbackType } from "../data/types"
import { writingPrompts } from "../data/writing-data"
import { useRouter } from "next/navigation"

interface WritingFeedbackProps {
  loading: boolean
  feedback: WritingFeedbackType | null
  originalContent: string
}

export default function WritingFeedback({
  loading,
  feedback,
  originalContent,
}: WritingFeedbackProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Analyzing your writing...</p>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-muted-foreground">Submit your writing to get feedback</p>
      </div>
    );
  }

  // Determine score color based on range
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex justify-between items-center">
            <span>Writing Assessment</span>
            <span className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
              {feedback.score}/100
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-2 pl-7 list-disc text-sm">
                {feedback.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2 pl-7 list-disc text-sm">
                {feedback.improvements.map((improvement, i) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Detailed Suggestions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {feedback.suggestions}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-md whitespace-pre-line">
            {originalContent}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface WritingFeedbackViewProps {
  promptId: string
  submission: string
}

export function WritingFeedbackView({ promptId, submission }: WritingFeedbackViewProps) {
  const [feedback, setFeedback] = useState<WritingFeedbackType | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const prompt = writingPrompts.find(p => p.id === promptId)
  
  // Get feedback (in a real app this would be fetched from an API)
  const getFeedback = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock feedback
      const mockFeedback: WritingFeedbackType = {
        score: Math.floor(Math.random() * 21) + 70, // 70-90 score range
        strengths: [
          "Clear thesis statement and main idea",
          "Good organizational structure",
          "Effective use of examples to support main points",
          "Strong vocabulary choices in key areas"
        ],
        improvements: [
          "Consider varying sentence structure for better rhythm",
          "Some paragraphs could be more concise",
          "A few grammatical errors need correction",
          "Transitions between some paragraphs could be smoother"
        ],
        suggestions: `Your writing demonstrates a solid understanding of the topic and good organizational skills. To further improve:

1. Try to vary your sentence structure more - mix short and long sentences for better rhythm
2. Be more concise in the middle paragraphs where the same point is repeated
3. Pay attention to verb tense consistency throughout
4. Consider adding one more example in your third paragraph to strengthen that point
5. Your conclusion could more explicitly connect back to your thesis statement`,
        correctedText: submission.replace(/(?:^|\s)i(?:\s|$)/g, " I ")
          .replace(/\b(?:dont|cant|wont|isnt|arent)\b/g, match => 
            match.charAt(0) + "o" + match.charAt(1) + "'" + match.slice(2))
          .replace(/\s\s+/g, " ")
          .replace(/\bi think\b/gi, "I believe")
          .replace(/\bvery\b/gi, "significantly")
          .replace(/\balot\b/gi, "a lot")
          .replace(/\bgood\b/gi, "excellent")
          .replace(/\bbad\b/gi, "problematic")
      }
      
      setFeedback(mockFeedback)
    } catch (error) {
      console.error("Error fetching feedback:", error)
    } finally {
      setLoading(false)
    }
  }
  
  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Prompt Not Found</h2>
        <p className="text-muted-foreground mb-4">The writing prompt you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/writing')}>
          <ArrowLeftCircle className="h-4 w-4 mr-2" />
          Return to Writing
        </Button>
      </div>
    )
  }
  
  if (!feedback && !loading) {
    return (
      <div className="container py-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push('/writing')}>
            <ArrowLeftCircle className="h-4 w-4 mr-2" />
            Back to Writing
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">{prompt.title}</h1>
        <p className="text-muted-foreground mb-6">{prompt.description}</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Submission</CardTitle>
            <CardDescription>
              Review your submission before requesting feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={submission} 
              readOnly 
              className="min-h-[300px] font-serif"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              Words: {submission.split(/\s+/).filter(Boolean).length}
            </div>
            <Button onClick={getFeedback} disabled={loading}>
              {loading ? "Analyzing..." : "Get AI Feedback"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="container py-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push('/writing')}>
            <ArrowLeftCircle className="h-4 w-4 mr-2" />
            Back to Writing
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">{prompt.title}</h1>
        <p className="text-muted-foreground mb-6">{prompt.description}</p>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Analyzing Your Writing</CardTitle>
            <CardDescription>
              Our AI is reviewing your submission...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-12">
            <Progress value={45} className="w-1/2 mb-6" />
            <p className="text-muted-foreground text-center">
              Please wait while we analyze your writing for strengths, areas of improvement, and detailed feedback.
              This usually takes about 30 seconds.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push('/writing')}>
          <ArrowLeftCircle className="h-4 w-4 mr-2" />
          Back to Writing
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">{prompt.title}</h1>
      <p className="text-muted-foreground mb-6">{prompt.description}</p>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Writing Assessment</CardTitle>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{feedback?.score}</span>
              <span className="text-muted-foreground text-sm">/100</span>
            </div>
          </div>
          <CardDescription>
            {feedback?.score && feedback.score >= 90 
              ? "Excellent work! Your writing demonstrates mastery."
              : feedback?.score && feedback.score >= 80
                ? "Great job! Your writing is strong with some room for improvement."
                : feedback?.score && feedback.score >= 70
                  ? "Good work! Your writing shows promise with several areas for growth."
                  : "Your writing has potential but needs significant improvement."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm flex items-center">
                  <BadgeCheck className="h-4 w-4 mr-2 text-green-500" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ul className="text-sm space-y-1">
                  {feedback?.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ul className="text-sm space-y-1">
                  {feedback?.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Detailed Feedback</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm whitespace-pre-line">{feedback?.suggestions}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="original">
        <TabsList className="mb-4">
          <TabsTrigger value="original">Your Submission</TabsTrigger>
          <TabsTrigger value="corrected">Corrected Version</TabsTrigger>
          <TabsTrigger value="comparison">Side by Side</TabsTrigger>
        </TabsList>
        
        <TabsContent value="original">
          <Card>
            <CardHeader>
              <CardTitle>Your Original Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={submission} 
                readOnly 
                className="min-h-[300px] font-serif"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="corrected">
          <Card>
            <CardHeader>
              <CardTitle>AI Corrected Version</CardTitle>
              <CardDescription>
                This version includes grammar and style improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={feedback?.correctedText} 
                readOnly 
                className="min-h-[300px] font-serif"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Original</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={submission} 
                  readOnly 
                  className="min-h-[300px] font-serif text-sm"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Corrected</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={feedback?.correctedText} 
                  readOnly 
                  className="min-h-[300px] font-serif text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={() => router.push('/writing')}>
          Return to Writing Practice
        </Button>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { 
  Trophy, 
  Award, 
  Star, 
  Book, 
  MessageCircle, 
  Pencil, 
  GraduationCap,
  BadgeCheck,
  Clock,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  id: string
  title: string
  description: string
  category: 'reading' | 'writing' | 'grammar' | 'vocabulary' | 'speaking' | 'general'
  icon: React.ReactNode
  progress: number
  total: number
  unlocked: boolean
  date?: string
  xp: number
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement[]>([])
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    const mockAchievements: Achievement[] = [
      {
        id: "reading-beginner",
        title: "Reading Rookie",
        description: "Complete 5 reading exercises",
        category: "reading",
        icon: <Book className="h-6 w-6 text-blue-500" />,
        progress: 3,
        total: 5,
        unlocked: false,
        xp: 50
      },
      {
        id: "reading-intermediate",
        title: "Avid Reader",
        description: "Complete 20 reading exercises",
        category: "reading",
        icon: <Book className="h-6 w-6 text-blue-600" />,
        progress: 12,
        total: 20,
        unlocked: false,
        xp: 100
      },
      {
        id: "reading-advanced",
        title: "Bookworm",
        description: "Complete 50 reading exercises",
        category: "reading",
        icon: <Book className="h-6 w-6 text-blue-700" />,
        progress: 8,
        total: 50,
        unlocked: false,
        xp: 200
      },
      {
        id: "writing-beginner",
        title: "Writing Apprentice",
        description: "Submit 5 writing assignments",
        category: "writing",
        icon: <Pencil className="h-6 w-6 text-green-500" />,
        progress: 5,
        total: 5,
        unlocked: true,
        date: "2023-06-12",
        xp: 50
      },
      {
        id: "writing-intermediate",
        title: "Proficient Writer",
        description: "Submit 20 writing assignments",
        category: "writing",
        icon: <Pencil className="h-6 w-6 text-green-600" />,
        progress: 7,
        total: 20,
        unlocked: false,
        xp: 100
      },
      {
        id: "grammar-beginner",
        title: "Grammar Guardian",
        description: "Score 80% or higher on 3 grammar quizzes",
        category: "grammar",
        icon: <GraduationCap className="h-6 w-6 text-purple-500" />,
        progress: 2,
        total: 3,
        unlocked: false,
        xp: 50
      },
      {
        id: "vocabulary-beginner",
        title: "Word Collector",
        description: "Learn 50 new vocabulary words",
        category: "vocabulary",
        icon: <MessageCircle className="h-6 w-6 text-yellow-500" />,
        progress: 42,
        total: 50,
        unlocked: false,
        xp: 50
      },
      {
        id: "vocabulary-intermediate",
        title: "Vocabulary Virtuoso",
        description: "Learn 200 new vocabulary words",
        category: "vocabulary",
        icon: <MessageCircle className="h-6 w-6 text-yellow-600" />,
        progress: 85,
        total: 200,
        unlocked: false,
        xp: 150
      },
      {
        id: "speaking-beginner",
        title: "Confident Speaker",
        description: "Complete 10 speaking exercises",
        category: "speaking",
        icon: <MessageCircle className="h-6 w-6 text-orange-500" />,
        progress: 4,
        total: 10,
        unlocked: false,
        xp: 75
      },
      {
        id: "general-streak",
        title: "Consistency Champion",
        description: "Log in for 7 consecutive days",
        category: "general",
        icon: <Clock className="h-6 w-6 text-red-500" />,
        progress: 7,
        total: 7,
        unlocked: true,
        date: "2023-07-01",
        xp: 100
      },
      {
        id: "general-allrounder",
        title: "English Explorer",
        description: "Try all learning modes at least once",
        category: "general",
        icon: <Star className="h-6 w-6 text-amber-500" />,
        progress: 4,
        total: 5,
        unlocked: false,
        xp: 75
      },
    ]
    
    setAchievements(mockAchievements)
    setRecentlyUnlocked(mockAchievements.filter(a => a.unlocked))
  }, [])
  
  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory)
    
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const inProgressAchievements = achievements.filter(a => !a.unlocked && a.progress > 0)
  const lockedAchievements = achievements.filter(a => !a.unlocked && a.progress === 0)
  
  const totalXP = unlockedAchievements.reduce((sum, a) => sum + a.xp, 0)
  const completionRate = achievements.length > 0 
    ? Math.round((unlockedAchievements.length / achievements.length) * 100) 
    : 0
    
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <Link href="/get-started">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground">Track your progress and unlock rewards as you master English</p>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-amber-500 mr-2" />
                  <span className="text-3xl font-bold">{unlockedAchievements.length}</span>
                </div>
                <span className="text-sm text-muted-foreground">of {achievements.length}</span>
              </div>
              <Progress 
                value={completionRate} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total XP Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-3xl font-bold">{totalXP}</span>
                <span className="text-sm text-muted-foreground ml-2">XP</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-3xl font-bold">{inProgressAchievements.length}</span>
                <span className="text-sm text-muted-foreground ml-2">achievements</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {recentlyUnlocked.length > 0 && (
          <Alert className="mt-6 bg-amber-50 border-amber-200">
            <BadgeCheck className="h-5 w-5 text-amber-500" />
            <AlertTitle>Recent Achievements</AlertTitle>
            <AlertDescription>
              You've recently unlocked {recentlyUnlocked.length} achievement{recentlyUnlocked.length > 1 ? 's' : ''}!
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid grid-cols-7 mb-4">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="reading" onClick={() => setActiveCategory('reading')}>Reading</TabsTrigger>
            <TabsTrigger value="writing" onClick={() => setActiveCategory('writing')}>Writing</TabsTrigger>
            <TabsTrigger value="grammar" onClick={() => setActiveCategory('grammar')}>Grammar</TabsTrigger>
            <TabsTrigger value="vocabulary" onClick={() => setActiveCategory('vocabulary')}>Vocabulary</TabsTrigger>
            <TabsTrigger value="speaking" onClick={() => setActiveCategory('speaking')}>Speaking</TabsTrigger>
            <TabsTrigger value="general" onClick={() => setActiveCategory('general')}>General</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reading" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="writing" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="grammar" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vocabulary" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="speaking" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="general" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Return to Get Started Section */}
        <div className="mt-10 pt-6 border-t">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-xl font-semibold">Ready to continue your learning journey?</h2>
            <p className="text-muted-foreground max-w-md">
              Return to the dashboard to access all your learning modules and continue mastering English
            </p>
            <Link href="/get-started">
              <Button className="mt-2">
                Return to Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating Back Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-10">
        <Link href="/get-started">
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const progressPercentage = Math.round((achievement.progress / achievement.total) * 100)
  
  // Get the appropriate route based on the achievement category
  const getCategoryRoute = (category: string) => {
    switch(category) {
      case 'reading': return '/reading';
      case 'writing': return '/writing';
      case 'grammar': return '/grammar';
      case 'vocabulary': return '/vocabulary';
      case 'speaking': return '/speaking';
      default: return '/get-started';
    }
  };
  
  return (
    <Card className={`${achievement.unlocked ? 'border-amber-300 bg-amber-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {achievement.icon}
            <CardTitle className="ml-2 text-lg">{achievement.title}</CardTitle>
          </div>
          {achievement.unlocked && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Unlocked
            </Badge>
          )}
        </div>
        <CardDescription>{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {achievement.unlocked ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Unlocked on {achievement.date}
            </span>
            <span className="text-amber-600 font-medium">+{achievement.xp} XP</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {achievement.progress} of {achievement.total} completed
              </span>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!achievement.unlocked && (
          <Link href={getCategoryRoute(achievement.category)} className="w-full">
            <Button 
              variant={achievement.progress === 0 ? "default" : "outline"} 
              size="sm" 
              className="w-full"
            >
              {achievement.progress === 0 ? "Start Now" : "View Details"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

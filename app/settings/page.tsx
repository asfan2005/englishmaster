"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Bell,
  Moon,
  Sun,
  Languages,
  Sliders,
  ChevronLeft,
  Save,
  LogOut,
  Book,
  Volume2
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UserSettings {
  profile: {
    name: string
    email: string
    username: string
  }
  language: {
    interface: string
    learning: string
    pronunciation: string
    difficulty: string
  }
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
    progress: boolean
  }
  appearance: {
    theme: "light" | "dark" | "system"
    fontSize: number
    reducedMotion: boolean
  }
  audio: {
    volume: number
    autoplay: boolean
    speed: number
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe123"
    },
    language: {
      interface: "english",
      learning: "english",
      pronunciation: "american",
      difficulty: "intermediate"
    },
    notifications: {
      email: true,
      push: true,
      reminders: true,
      progress: false
    },
    appearance: {
      theme: "system",
      fontSize: 16,
      reducedMotion: false
    },
    audio: {
      volume: 80,
      autoplay: true,
      speed: 1.0
    }
  })
  
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  
  // Handle settings changes
  const updateSettings = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
    setIsSaved(false)
  }
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a database or API
    console.log("Saving settings:", settings)
    setIsSaved(true)
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }
  
  const resetSettings = () => {
    // This would reset to the default settings from the server
    if (confirm("Are you sure you want to reset all settings to default?")) {
      console.log("Resetting settings")
      // This would be a call to load default settings
    }
  }
  
  const difficultyLabels = {
    beginner: "Beginner - Simple exercises and vocabulary",
    intermediate: "Intermediate - More complex sentence structures",
    advanced: "Advanced - Academic and professional content"
  }
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/get-started">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <Link href="/get-started">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {isSaved && (
          <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
            <Save className="h-4 w-4" />
            <AlertTitle>Settings saved</AlertTitle>
            <AlertDescription>
              Your settings have been successfully saved.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar for large screens */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col space-y-1 p-2">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "language" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("language")}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    Language
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === "appearance" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Appearance
                  </Button>
                  <Button 
                    variant={activeTab === "audio" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("audio")}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Audio
                  </Button>
                </nav>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 pt-2">
                <Button className="w-full" onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
                <Button variant="outline" className="w-full" onClick={resetSettings}>
                  Reset to Default
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Mobile tabs */}
          <Tabs 
            className="block md:hidden" 
            defaultValue={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="profile">
                <User className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="language">
                <Languages className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="appearance">
                <Moon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="audio">
                <Volume2 className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Settings Content */}
          <div className="space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={settings.profile.name} 
                      onChange={(e) => updateSettings("profile", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={settings.profile.email} 
                      onChange={(e) => updateSettings("profile", "email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={settings.profile.username} 
                      onChange={(e) => updateSettings("profile", "username", e.target.value)}
                    />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Language Settings */}
            {activeTab === "language" && (
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Configure your language preferences and learning settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="interface-language">Interface Language</Label>
                    <Select 
                      value={settings.language.interface}
                      onValueChange={(value) => updateSettings("language", "interface", value)}
                    >
                      <SelectTrigger id="interface-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="korean">Korean</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="russian">Russian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="learning-language">Learning Language</Label>
                    <Select 
                      value={settings.language.learning}
                      onValueChange={(value) => updateSettings("language", "learning", value)}
                    >
                      <SelectTrigger id="learning-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="korean">Korean</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="russian">Russian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pronunciation">Pronunciation Preference</Label>
                    <RadioGroup 
                      id="pronunciation"
                      value={settings.language.pronunciation}
                      onValueChange={(value) => updateSettings("language", "pronunciation", value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="american" id="american" />
                        <Label htmlFor="american">American English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="british" id="british" />
                        <Label htmlFor="british">British English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="australian" id="australian" />
                        <Label htmlFor="australian">Australian English</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Content Difficulty</Label>
                    <RadioGroup 
                      id="difficulty"
                      value={settings.language.difficulty}
                      onValueChange={(value) => updateSettings("language", "difficulty", value)}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" className="mt-1" />
                        <div>
                          <Label htmlFor="beginner" className="font-medium">Beginner</Label>
                          <p className="text-sm text-muted-foreground">Simple exercises and vocabulary</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" className="mt-1" />
                        <div>
                          <Label htmlFor="intermediate" className="font-medium">Intermediate</Label>
                          <p className="text-sm text-muted-foreground">More complex sentence structures</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" className="mt-1" />
                        <div>
                          <Label htmlFor="advanced" className="font-medium">Advanced</Label>
                          <p className="text-sm text-muted-foreground">Academic and professional content</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates and summaries via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSettings("notifications", "email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notifications in your browser or mobile app
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSettings("notifications", "push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reminder-notifications">Learning Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Daily reminders to practice your language skills
                      </p>
                    </div>
                    <Switch 
                      id="reminder-notifications" 
                      checked={settings.notifications.reminders}
                      onCheckedChange={(checked) => updateSettings("notifications", "reminders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="progress-notifications">Progress Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly summaries of your learning progress
                      </p>
                    </div>
                    <Switch 
                      id="progress-notifications" 
                      checked={settings.notifications.progress}
                      onCheckedChange={(checked) => updateSettings("notifications", "progress", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={settings.appearance.theme === "light" ? "default" : "outline"} 
                        className="flex flex-col items-center justify-center h-20"
                        onClick={() => updateSettings("appearance", "theme", "light")}
                      >
                        <Sun className="h-8 w-8 mb-1" />
                        <span>Light</span>
                      </Button>
                      <Button 
                        variant={settings.appearance.theme === "dark" ? "default" : "outline"} 
                        className="flex flex-col items-center justify-center h-20"
                        onClick={() => updateSettings("appearance", "theme", "dark")}
                      >
                        <Moon className="h-8 w-8 mb-1" />
                        <span>Dark</span>
                      </Button>
                      <Button 
                        variant={settings.appearance.theme === "system" ? "default" : "outline"} 
                        className="flex flex-col items-center justify-center h-20"
                        onClick={() => updateSettings("appearance", "theme", "system")}
                      >
                        <Sliders className="h-8 w-8 mb-1" />
                        <span>System</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="font-size">Font Size</Label>
                      <span className="text-sm font-medium">{settings.appearance.fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      defaultValue={[settings.appearance.fontSize]}
                      onValueChange={(value) => updateSettings("appearance", "fontSize", value[0])}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Default</span>
                      <span>Large</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations throughout the application
                      </p>
                    </div>
                    <Switch 
                      id="reduced-motion" 
                      checked={settings.appearance.reducedMotion}
                      onCheckedChange={(checked) => updateSettings("appearance", "reducedMotion", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Audio Settings */}
            {activeTab === "audio" && (
              <Card>
                <CardHeader>
                  <CardTitle>Audio Settings</CardTitle>
                  <CardDescription>
                    Configure audio playback for language learning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="volume">Volume</Label>
                      <span className="text-sm font-medium">{settings.audio.volume}%</span>
                    </div>
                    <Slider
                      id="volume"
                      min={0}
                      max={100}
                      step={5}
                      defaultValue={[settings.audio.volume]}
                      onValueChange={(value) => updateSettings("audio", "volume", value[0])}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="playback-speed">Playback Speed</Label>
                      <span className="text-sm font-medium">{settings.audio.speed}x</span>
                    </div>
                    <Slider
                      id="playback-speed"
                      min={0.5}
                      max={2}
                      step={0.1}
                      defaultValue={[settings.audio.speed]}
                      onValueChange={(value) => updateSettings("audio", "speed", value[0])}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>0.5x</span>
                      <span>1.0x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoplay">Autoplay Audio</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically play audio when available
                      </p>
                    </div>
                    <Switch 
                      id="autoplay" 
                      checked={settings.audio.autoplay}
                      onCheckedChange={(checked) => updateSettings("audio", "autoplay", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Mobile Save Button */}
        <div className="block md:hidden pt-4">
          <Button className="w-full" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
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

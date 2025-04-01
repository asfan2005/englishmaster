"use client";

import React, { useState, useRef, useEffect } from "react";
import { SessionNavBar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  Mic, 
  ImagePlus, 
  MoreVertical, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  User, 
  Search, 
  Plus, 
  X, 
  Settings,
  RefreshCcw,
  Book,
  Bookmark,
  Share2,
  Download,
  HelpCircle,
  Copy,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

import { TabsContent,Tabs,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Bot javoblarini chiroyli ko'rsatish uchun markdown renderer
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import chat data
import { chatHistory, suggestedPrompts, aiFeatures, initialMessages } from "./chat-data";


// Define interface first, before using initialMessages
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Vaqtni ko'rsatadigan komponentni qo'shing
const TimeDisplay = ({ timestamp }: { timestamp: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Faqat client tomonda render qilish
    setMounted(true);
  }, []);

  if (!mounted) {
    // Server-side rendering paytida hech narsa ko'rsatmang
    return <span className="text-xs opacity-50">•••</span>;
  }

  // Client tomonda formatlaymiz
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return <span className="text-xs opacity-50">{hours}:{minutes}</span>;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages as Message[]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState("new");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  // Yangi xabar qo'shish
  const addMessage = async (content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Agar foydalanuvchi xabar yuborsa, AI javobini taqlid qilish
    if (role === "user") {
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse = getAIResponse(content);
        addMessage(aiResponse, "assistant");
        setIsTyping(false);
      }, 1000 + Math.random() * 2000); // Realistik kechikish
    }
  };

  // Mock AI javob generatsiyasi
  const getAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("salom") || lowerCaseMessage.includes("hello")) {
      return "Salom! Qanday yordam bera olaman?";
    }
    
    if (lowerCaseMessage.includes("present perfect")) {
      return `**Present Perfect tense** ingliz tilida muhim o'rin tutadi. Bu zamon hozirgi vaqt bilan bog'liq bo'lgan o'tmishdagi harakatlarni ifodalash uchun ishlatiladi.

### Tuzilishi:
- Subject + have/has + V3 (past participle)

### Misollar:
- I **have visited** London three times.
- She **has learned** English for five years.
- They **have not finished** their homework yet.

### Qo'llanilishi:
1. Tugallangan harakatlar, lekin aniq vaqti ko'rsatilmagan:
   - I **have seen** that movie.
   
2. Yaqinda tugallangan harakatlar:
   - She **has just arrived**.
   
3. Hali davom etayotgan harakatlar:
   - He **has lived** here for ten years.
   
4. "ever", "never", "already", "yet", "just", "since", "for" so'zlari bilan:
   - Have you **ever been** to Japan?
   - I haven't finished **yet**.

Qo'shimcha mashqlar uchun so'rasangiz bo'ladi!`;
    }
    
    if (lowerCaseMessage.includes("ielts") || lowerCaseMessage.includes("speaking")) {
      return `# IELTS Speaking imtihonida yuqori ball olish uchun maslahatlar:

1. **Talaffuzga e'tibor bering** - aniq va tushunarli talaffuz qiling, lekin mukammal Britaniya yoki Amerika aksenti shart emas.

2. **Grammatik xilma-xillik** - har xil grammatik konstruksiyalar va zamonlardan foydalaning.

3. **Boy lug'atdan foydalaning** - oddiy so'zlar o'rniga aniqroq va murakkab so'zlarni ishlatishga harakat qiling.

4. **Lexical resource** - mavzuga oid maxsus atamalarni, idiomalarni va iboralarni qo'llang.

5. **Fikrlaringizni tuzilishli qiling** - javoblaringizni mantiqiy tarzda tashkil eting (introduction, body, conclusion).

6. **Misollar keltiring** - fikringizni qo'llab-quvvatlash uchun shaxsiy misollar keltiring.

7. **Natural transitions** - so'zlarni bog'lovchi "Furthermore", "However", "In addition" kabi iboralardan foydalaning.

8. **Savol bilan cheklanmang** - beriladigan javobingizni kengaytiring va chuqurlashtiring.

9. **Ishonch bilan gapiring** - hatto xato qilsangiz ham, ishonch bilan va to'xtamasdan gapiring.

10. **Mashq qiling** - imtihon oldi doimiy mashq qiling, o'zingizni yozib oling.

Qaysi band bo'yicha ko'proq yordam kerak?`;
    }
    
    if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("intervyu")) {
      return `## Biznes ingliz tilida intervyu uchun 10 ta muhim ibora:

1. **"I have extensive experience in..."** - "Men ... sohasida keng tajribaga egaman"
   
2. **"I'm particularly skilled at..."** - "Men ayniqsa ... da mahoratli/tajribali"
   
3. **"I thrive in fast-paced environments"** - "Men tez sur'atli muhitda samarali ishlayman"
   
4. **"I'm a proactive problem-solver"** - "Men muammolarni oldindan hal qilishga intiladigan odamman"
   
5. **"I'm results-oriented"** - "Men natijaga yo'naltirilganman"
   
6. **"I'm looking for an opportunity to further develop my skills"** - "Men ko'nikmalarimni yanada rivojlantirish imkoniyatini qidiryapman"
   
7. **"Could you tell me more about the day-to-day responsibilities of this position?"** - "Bu lavozimning kundalik majburiyatlari haqida ko'proq ma'lumot bera olasizmi?"
   
8. **"What are the biggest challenges facing your company/team right now?"** - "Hozirgi kunda kompaniyangiz/jamoangiz oldida turgan eng katta qiyinchiliklar qanday?"
   
9. **"I'm a strong believer in continuous learning"** - "Men doimiy o'rganishning kuchli tarafdoriman"
   
10. **"I value clear communication and teamwork"** - "Men aniq muloqot va jamoaviy ishni qadrlayman"

Qo'shimcha maslahatlar:
- Intervyu vaqtida professional ko'rinishda bo'ling
- Intervyudan oldin kompaniya haqida tadqiqot o'tkazing
- Ko'zga qarab gapiring
- STAR (Situation, Task, Action, Result) metodidan foydalanib, misollar keltiring`;
    }
    
    if (lowerCaseMessage.includes("sayohat") || lowerCaseMessage.includes("travel")) {
      return `# Sayohat mavzusidagi foydali dialog

## Mehmonxonada ro'yxatdan o'tish:

**Receptionist:** Good afternoon. Welcome to Grand Hotel. How may I help you?  
**You:** Hello. I have a reservation under the name [Your Name].  
**Receptionist:** Let me check that for you. Could I see your passport, please?  
**You:** Yes, here it is.  
**Receptionist:** Thank you. I can see your reservation for 3 nights in a double room with breakfast included.  
**You:** That's correct.  
**Receptionist:** Perfect. Could you fill out this form, please? And how would you like to pay?  
**You:** I'll pay by credit card.  
**Receptionist:** Thank you. Here's your room key. Your room is 304 on the third floor. The elevator is just around the corner. Breakfast is served from 7 to 10 AM in the restaurant on the ground floor.  
**You:** What time is check-out?  
**Receptionist:** Check-out time is 12 noon. If you need any assistance with your luggage or anything else during your stay, please dial 0 from your room phone.  
**You:** Great, thank you very much.  
**Receptionist:** Enjoy your stay with us!

## Foydali iboralar:

- I'd like to book a room - Xona band qilmoqchiman
- Is breakfast included? - Nonushta kiradimi?
- Do you have room service? - Xona xizmati bormi?
- Could you recommend a good restaurant nearby? - Yaqin atrofda yaxshi restoranni tavsiya qila olasizmi?
- How do I get to the city center? - Shahar markaziga qanday borish mumkin?
- I'd like to extend my stay - Men qolish muddatimni uzaytirmoqchiman
- Could I have a wake-up call at 7 AM tomorrow? - Ertaga ertalab soat 7 da uyg'otish qo'ng'irog'ini qila olasizmi?`;
    }
    
    return `Savolingiz uchun rahmat! Bu mavzuda sizga yordam berishdan xursandman.

${userMessage} haqida muhim ma'lumotlarni tayyorladim:

1. Ingliz tilini o'rganish jarayonida bu juda muhim mavzu hisoblanadi.
2. Bu ko'nikma kun sayin rivojlantirilishi kerak.
3. Muntazam mashq qilish eng yaxshi natija beradi.
4. Audio materiallar va video darslardan foydalanish ham juda foydali.

Qo'shimcha ma'lumot yoki aniqroq savol bersangiz, batafsilroq javob berishim mumkin. Yana qanday yordam kerak?`;
  };

  // Xabar yuborish
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue.trim(), "user");
      setInputValue("");
    }
  };

  // Enter tugmasi bosilganda yuborish
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Template savol tanlash
  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
  };

  // Avtomatik pastga scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Xabarni kengaytirish
  const toggleExpand = (messageId: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SessionNavBar />
      
      <main className="flex-1 flex flex-col ml-[3.05rem]">
        {/* Header */}
        <header className="h-14 px-4 flex items-center justify-between bg-white border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <ChevronRight className={cn("h-5 w-5", isSidebarOpen && "rotate-180")} />
            </Button>
            <h1 className="text-xl font-semibold">AI Suhbat</h1>
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
              Beta
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ingliz tili</DropdownMenuItem>
                <DropdownMenuItem>O'zbek tili</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sozlamalar</DropdownMenuItem>
                <DropdownMenuItem>Yordam</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user-avatar.png" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white border-r flex flex-col h-full"
              >
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Suhbatlar qidirish..." className="pl-9" />
                  </div>
                  <Button className="w-full mt-3 gap-2" onClick={() => setActiveChatId("new")}>
                    <Plus className="h-4 w-4" />
                    Yangi suhbat
                  </Button>
                </div>
                
                <Tabs defaultValue="recent" className="flex-1 flex flex-col">
                  <TabsList className="mx-4 mt-2 grid grid-cols-2">
                    <TabsTrigger value="recent">Suhbatlar</TabsTrigger>
                    <TabsTrigger value="features">Imkoniyatlar</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recent" className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-2 space-y-1">
                        {chatHistory.map(chat => (
                          <button
                            key={chat.id}
                            className={cn(
                              "w-full text-left p-3 rounded-lg transition-colors",
                              activeChatId === chat.id
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100"
                            )}
                            onClick={() => setActiveChatId(chat.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="font-medium truncate max-w-[200px]">{chat.title}</div>
                              <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.date}</div>
                            </div>
                            <div className="text-sm text-gray-500 truncate mt-1 flex items-center">
                              {chat.unread && (
                                <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                              )}
                              {chat.preview}
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="features" className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4 space-y-4">
                        <div className="text-sm text-gray-500 mb-2">
                          AI yordamchisi sizga quyidagi imkoniyatlarni taklif qiladi:
                        </div>
                        
                        {aiFeatures.map((feature, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex gap-3">
                              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg h-fit">
                                <feature.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                          <h3 className="font-medium text-blue-700 flex items-center gap-2">
                            <HelpCircle className="h-4 w-4" />
                            Ko'proq yordam kerakmi?
                          </h3>
                          <p className="text-sm text-blue-600/80 mt-1">
                            AI yordamchisi sizga ingliz tilini o'rganishda barcha savollarga javob beradi
                          </p>
                          <Button variant="outline" className="mt-3 w-full text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100">
                            <Book className="h-4 w-4 mr-2" />
                            Qo'llanmani ko'rish
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-white relative">
            {/* Messages container */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto">
                {/* Welcome header for new chat */}
                {activeChatId === "new" && messages.length <= 1 && (
                  <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <Bot className="h-8 w-8" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">EnglishMaster AI Yordamchisi</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                      Ingliz tili o'rganishda yordamchi AI assistentingiz. Grammar, vocabulary, pronunciation 
                      va boshqa sohalarda savollarga javob beradi.
                    </p>
                  </div>
                )}
                
                {/* Messages */}
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-9 w-9 mt-1">
                          <AvatarImage src="/bot-avatar.png" alt="AI avatar" />
                          <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={cn(
                          "rounded-2xl p-4 max-w-[85%] text-sm relative group",
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        )}
                      >
                        <div className={cn(
                          "prose prose-sm max-w-none",
                          message.role === "user" ? "prose-invert" : "",
                          !isExpanded[message.id] && message.content.length > 500 ? "max-h-60 overflow-hidden" : ""
                        )}>
                          {message.role === "assistant" ? (
                            <ReactMarkdown
                              components={{
                                code({node, inline, className, children, ...props}: {
                                  node?: any;
                                  inline?: boolean;
                                  className?: string;
                                  children?: React.ReactNode;
                                }) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                    <SyntaxHighlighter
                                      language={match[1]}
                                      style={atomDark as any}
                                      PreTag="div"
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                                }
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                        
                        {message.content.length > 500 && (
                          <button
                            onClick={() => toggleExpand(message.id)}
                            className={cn(
                              "text-xs mt-2 flex items-center",
                              message.role === "user" ? "text-blue-100" : "text-blue-600"
                            )}
                          >
                            {isExpanded[message.id] ? (
                              <>
                                <ChevronUp className="h-3 w-3 mr-1" />
                                Qisqartirish
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3 w-3 mr-1" />
                                To'liq ko'rish
                              </>
                            )}
                          </button>
                        )}
                        
                        <div className="absolute -bottom-5 right-2 text-xs text-gray-400">
                          <TimeDisplay timestamp={message.timestamp} />
                        </div>
                        
                        {message.role === "assistant" && (
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Copy className="h-4 w-4" />
                                  <span>Nusxa olish</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Bookmark className="h-4 w-4" />
                                  <span>Saqlab qo'yish</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Share2 className="h-4 w-4" />
                                  <span>Ulashish</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Download className="h-4 w-4" />
                                  <span>Yuklab olish</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                      
                      {message.role === "user" && (
                        <Avatar className="h-9 w-9 mt-1">
                          <AvatarImage src="/user-avatar.png" alt="User avatar" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {/* Bot typing indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 mt-1">
                        <AvatarImage src="/bot-avatar.png" alt="AI typing" />
                        <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-2xl p-4 bg-gray-100 text-gray-800 flex items-center">
                        <div className="flex space-x-1 items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Auto scroll reference */}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Suggested prompts */}
                {messages.length <= 2 && (
                  <div className="mt-6 mb-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Tavsiya etilgan savollar:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt.id}
                          className="bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors rounded-xl p-3 text-left group"
                          onClick={() => handlePromptSelect(prompt.text)}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{prompt.text}</span>
                            <Badge variant="outline" className="bg-gray-50 text-xs font-normal text-gray-500">
                              {prompt.category}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input area */}
            <div className="border-t p-4 bg-white">
              <div className="max-w-3xl mx-auto relative">
                <Textarea
                  placeholder="Savolingizni yozing..."
                  className="resize-none pr-20 min-h-[60px] max-h-[200px] border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 rounded-xl"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-3 bottom-3 flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-50 hover:bg-gray-100"
                  >
                    <Mic className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-50 hover:bg-gray-100"
                  >
                    <ImagePlus className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-0"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
              <div className="max-w-3xl mx-auto mt-2 text-xs text-gray-400 flex items-center justify-center">
                <Info className="h-3 w-3 mr-1" />
                <span>EnglishMaster AI faqat ingliz tili o'rganish va mashq qilish uchun yaratilgan</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
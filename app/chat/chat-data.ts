import { Book, Mic, Bookmark, RefreshCcw } from "lucide-react";

// Oldingi suhbatlar ro'yxati
export const chatHistory = [
  {
    id: "1",
    title: "Ingliz tili grammatikasi",
    preview: "Present Perfect tense haqida ma'lumot",
    date: "Bugun",
    unread: false
  },
  {
    id: "2",
    title: "IELTS imtihoniga tayyorgarlik",
    preview: "Writing bo'limi maslahatlari",
    date: "Kecha",
    unread: true
  },
  {
    id: "3",
    title: "Business ingliz tili",
    preview: "Intervyu savollari va javoblari",
    date: "2 kun oldin",
    unread: false
  },
  {
    id: "4",
    title: "Sayohat uchun iboralar",
    preview: "Mehmonxonada kerakli so'zlar",
    date: "4 kun oldin",
    unread: false
  },
  {
    id: "5",
    title: "Ingliz tilida so'zlashuv",
    preview: "Kundalik gaplashuv mavzulari",
    date: "1 hafta oldin",
    unread: false
  }
];

// Template mavzular
export const suggestedPrompts = [
  {
    id: "1",
    text: "Present Perfect tense qanday hollarda ishlatiladi?",
    category: "Grammar"
  },
  {
    id: "2",
    text: "IELTS Speaking imtihonida yuqori ball olish uchun maslahatlar bering",
    category: "Exams"
  },
  {
    id: "3",
    text: "Biznes ingliz tilida intervyu uchun 10 ta muhim ibora o'rgating",
    category: "Business"
  },
  {
    id: "4",
    text: "Ingliz tilida sayohat mavzusida dialog tuzishda yordam bering",
    category: "Travel"
  },
  {
    id: "5",
    text: "Ingliz tilida so'zlashuvda qo'llaniladigan kundalik iboralar",
    category: "Speaking"
  },
  {
    id: "6",
    text: "Inglizcha talaffuzni yaxshilash uchun mashqlar tavsiya qiling",
    category: "Pronunciation"
  }
];

// AI xususiyatlari
export const aiFeatures = [
  {
    title: "Grammatika bo'yicha yordam",
    description: "Ingliz tili grammatikasini tushunishda yordam",
    icon: Book
  },
  {
    title: "Talaffuz mashqlari",
    description: "To'g'ri talaffuz qilishni o'rganish",
    icon: Mic
  },
  {
    title: "Lug'at boyitish",
    description: "Yangi so'z va iboralarni o'rganish",
    icon: Bookmark
  },
  {
    title: "Xatolarni tuzatish",
    description: "Yozishda va gaprishda xatolarni topish",
    icon: RefreshCcw
  }
];

// Misol suhbat
export const initialMessages = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "👋 Salom! Men EnglishMaster'ning AI assistentiman. Ingliz tili o'rganishda sizga qanday yordam bera olaman?",
    timestamp: new Date(Date.now() - 1000 * 60).toISOString()
  }
];
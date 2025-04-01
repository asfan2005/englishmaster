import { Testimonial } from "@/components/ui/testimonial-card"

const testimonials = [
  {
    name: "Dilnoza Abdukarimova",
    role: "O'qituvchi",
    company: "Toshkent",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=dilnoza",
    testimonial: "EnglishMaster platformasi orqali o'quvchilarim bilan ishlash juda ham qulay bo'ldi. Platformaning interaktiv mashqlari va qiziqarli o'yinlari tufayli, o'quvchilarning ingliz tiliga qiziqishi sezilarli darajada oshdi."
  },
  {
    name: "Alisher Xolmurodov",
    role: "IT mutaxassisi",
    company: "Fargo Digital",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=alisher",
    testimonial: "Ishim uchun ingliz tili juda muhim. EnglishMaster platformasi menga kasbiy sohamga oid ingliz tilini o'rganishda juda katta yordam berdi. AI bilan suhbat qilish imkoniyati talaffuzimni yaxshilashga yordam berdi."
  },
  {
    name: "Fotima Rahimova",
    role: "Talaba",
    company: "TDYU",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=fotima",
    testimonial: "Men IELTS imtihoniga tayyorlanish uchun EnglishMaster platformasidan foydalanaman. Bepul platformalar orasida eng yaxshisi. Maqsadli va aniq o'quv dasturi tufayli imtihonga tayyorgarlik jarayonim ancha osonlashdi."
  }
]

export function TestimonialsSection() {
  return (
    <div className="py-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Foydalanuvchilar fikrlari</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          EnglishMaster platformasidan foydalangan o'quvchilarimizning fikrlarini o'qing va ularga qo'shiling.
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </div>
  )
} 
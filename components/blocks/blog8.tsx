import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}

interface Blog8Props {
  heading?: string;
  description?: string;
  posts?: Post[];
}

const Blog8 = ({
  heading = "Blog maqolalari",
  description = "Ingliz tili o'rganish haqida so'nggi maqolalar, maslahatlar va eng yaxshi amaliyotlar haqida ma'lumotlar.",
  posts = [
    {
      id: "post-1",
      title: "Ingliz tilini o'rganishning eng samarali usullari",
      summary: "Ingliz tilini o'rganish jarayonini tezlashtirish uchun ekspertlar tomonidan tavsiya etilgan eng samarali usullar haqida bilib oling.",
      label: "O'quv uslublari",
      author: "Aziza Karimova",
      published: "15 Fevral 2024",
      url: "/blog/effective-learning",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop",
      tags: ["O'rganish", "Samaradorlik"],
    },
    {
      id: "post-2",
      title: "Ingliz tilida so'zlashish ko'nikmalarini oshirish yo'llari",
      summary: "Ingliz tilida ravon so'zlashishni o'rganmoqchimisiz? Ushbu maqolada biz so'zlashish ko'nikmalarini oshirish uchun eng yaxshi mashqlar va usullar haqida gaplashamiz.",
      label: "So'zlashuv",
      author: "Jahongir Rahimov",
      published: "22 Fevral 2024",
      url: "/blog/speaking-skills",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      tags: ["So'zlashuv", "Nutq"],
    },
    {
      id: "post-3",
      title: "AI yordamida ingliz tili grammatikasini o'rganish",
      summary: "Sun'iy intellekt qanday qilib grammatikani o'rganishni osonlashtiradi va samarali qiladi. Zamonaviy o'qitish usullari va AI texnologiyalari haqida.",
      label: "Grammatika",
      author: "Dilshod Aliyev",
      published: "5 Mart 2024",
      url: "/blog/ai-grammar-learning",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop",
      tags: ["AI", "Grammatika"],
    },
    {
      id: "post-4",
      title: "Ingliz tilini o'rganishda uchraydigan 10 ta asosiy xato",
      summary: "Ko'pchilik ingliz tili o'rganuvchilari duch keladigan eng keng tarqalgan xatolar va ularni qanday bartaraf etish haqida maslahatlar.",
      label: "Maslahatlar",
      author: "Sarvinoz Qosimova",
      published: "18 Mart 2024",
      url: "/blog/common-mistakes",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      tags: ["Maslahatlar", "Xatolar"],
    },
  ],
}: Blog8Props) => {
  return (
    <section className="py-12">
      <div className="container flex flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="mx-auto mb-4 text-pretty text-2xl font-semibold md:text-3xl lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-y-8 sm:grid-cols-12 sm:gap-y-10 md:gap-y-12 lg:gap-y-16">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                <div className="sm:col-span-5">
                  <div className="mb-4 md:mb-4">
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-4 lg:gap-5">
                      {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold md:text-xl lg:text-2xl">
                    <Link
                      href={post.url}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm md:text-base">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-xs md:mt-6 md:text-sm">
                    <span className="text-muted-foreground">{post.author}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {post.published}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center space-x-2 md:mt-6">
                    <Link
                      href={post.url}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline md:text-base"
                    >
                      <span>Batafsil o'qish</span>
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <Link href={post.url} className="block">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover transition-all duration-200 hover:scale-105 hover:opacity-90"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog8 }; 
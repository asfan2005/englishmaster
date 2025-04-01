"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  subheading?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Tavsiya etilgan kurslar",
  subheading = "Sizga mos kurslarni tanlang",
  items = [
    {
      id: "course-1",
      title: "Boshlang'ich ingliz tili kursi",
      summary: "Ingliz tilini noldan o'rganmoqchimisiz? Grammatika, so'zlashuv va tinglab tushunish ko'nikmalari.",
      url: "/courses/beginner",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
    },
    {
      id: "course-2",
      title: "Ingliz tilida so'zlashuv amaliyoti",
      summary: "AI bilan ingliz tilida so'zlashib, talaffuzingizni yaxshilang va so'z boyligingizni oshiring.",
      url: "/courses/speaking",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "course-3",
      title: "IELTS va TOEFL imtihoniga tayyorgarlik",
      summary: "Xalqaro imtihonlarga tayyorgarlik ko'ring va yuqori ball oling. Maxsus mashqlar va sinovlar.",
      url: "/courses/exams",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "course-4",
      title: "Biznes ingliz tili",
      summary: "Ishda va biznes muhitida kerak bo'ladigan maxsus atamalar va nutq ko'nikmalarini o'rganing.",
      url: "/courses/business",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2087&auto=format&fit=crop",
    },
    {
      id: "course-5",
      title: "Ingliz tili grammatikasi",
      summary: "Ingliz tili grammatikasini chuqur o'rganish va murakkab grammatik tuzilmalarni o'zlashtirish.",
      url: "/courses/grammar",
      image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="mb-6 flex flex-col justify-between md:mb-8 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-2xl font-semibold md:mb-3 md:text-3xl">
              {heading}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {subheading}
            </p>
          </div>
          <div className="mt-6 flex shrink-0 items-center justify-start gap-2 md:mt-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="h-9 w-9 disabled:pointer-events-auto"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="h-9 w-9 disabled:pointer-events-auto"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-0 md:left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-4 md:ml-8 md:mr-0">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link
                  href={item.url}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="relative h-full w-full origin-center transition duration-300 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-4">
                    <div className="mb-2 line-clamp-2 font-semibold md:text-lg">
                      {item.title}
                    </div>
                    <div className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {item.summary}
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Kursni o'rganish{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 }; 
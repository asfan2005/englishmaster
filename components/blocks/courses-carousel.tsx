"use client";

import { ArrowLeft, ArrowRight, BookOpen, Clock, Award } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  href: string;
  image: string;
}

export interface CoursesCarouselProps {
  title?: string;
  description?: string;
  items: CourseItem[];
}

const coursesData = [
  {
    id: "ielts-prep",
    title: "IELTS imtihoniga tayyorgarlik",
    description: "IELTS imtihonidagi barcha bo'limlar uchun maxsus tayyorlangan kurs. Reading, Writing, Listening va Speaking ko'nikmalarini rivojlantiring.",
    level: "B1-C1",
    duration: "12 hafta",
    lessons: 36,
    href: "/courses/ielts-prep",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop",
  },
  {
    id: "general-english",
    title: "Umumiy ingliz tili kursi",
    description: "Kundalik hayotda qo'llaniladigan ingliz tilini o'rganing. Asosiy grammatika, so'zlashuv va tinglab tushunish ko'nikmalari.",
    level: "A1-B2",
    duration: "16 hafta",
    lessons: 48,
    href: "/courses/general-english",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1122&auto=format&fit=crop",
  },
  {
    id: "business-english",
    title: "Biznes ingliz tili",
    description: "Ish joyida kerak bo'ladigan ingliz tili ko'nikmalarini rivojlantiring. Ish intervyulari, taqdimotlar va biznes muzokaralar uchun.",
    level: "B1-C1",
    duration: "10 hafta",
    lessons: 30,
    href: "/courses/business-english",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "conversation",
    title: "Suhbat va nutq ko'nikmalari",
    description: "So'zlashuvga qaratilgan kurs. Native speakerlar bilan suhbatlashish orqali ingliz tilida erkin gaplashishni o'rganing.",
    level: "A2-C1",
    duration: "8 hafta",
    lessons: 24,
    href: "/courses/conversation",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "grammar-intensive",
    title: "Grammatika intensiv kursi",
    description: "Ingliz tili grammatikasini chuqur o'rganish. Murakkab grammatik tuzilmalar va ularni amalda qo'llash.",
    level: "A2-C1",
    duration: "6 hafta",
    lessons: 18,
    href: "/courses/grammar-intensive",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop",
  },
];

export function CoursesCarousel({
  title = "Tavsiya etilgan kurslar",
  description = "Ingliz tilini o'rganish uchun eng samarali va zamonaviy kurslar. Har bir kurs tajribali o'qituvchilar tomonidan ishlab chiqilgan bo'lib, amaliy ko'nikmalarni rivojlantirishga qaratilgan.",
  items = coursesData,
}: CoursesCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="w-full py-8">
      <div className="mb-8 flex items-end justify-between md:mb-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            {title}
          </h2>
          <p className="max-w-lg text-muted-foreground">{description}</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="rounded-full h-10 w-10 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="rounded-full h-10 w-10 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          breakpoints: {
            "(max-width: 768px)": {
              dragFree: true,
            },
          },
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((course) => (
            <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full overflow-hidden border border-blue-100 hover:border-blue-300 transition-all hover:shadow-md group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {course.level}
                  </div>
                </div>
                <CardHeader className="p-5 pb-0">
                  <CardTitle className="line-clamp-1 text-xl">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 h-10 mt-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-4">
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span>{course.lessons} dars</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between items-center">
                  <Link 
                    href={course.href} 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Batafsil
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Ro'yxatdan o'tish</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-blue-600" : "bg-blue-200"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 
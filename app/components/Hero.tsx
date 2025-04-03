"use client";

// this is a client component
import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas"
import { DIcons } from "@/lib/dicons";
import { AppleStyleDock } from "./AppleStyleDock";

export function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="w-full h-screen overflow-hidden relative flex flex-col">
      {/* Test Mode Notification Banner */}
      <div className="bg-yellow-500 text-white p-2 text-center font-medium sticky top-0 z-50">
        Diqqat! Sayt test rejimida ishlamoqda. Ba'zi funksiyalar vaqtinchalik ishlamasligi mumkin.
      </div>
      
      <div className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center flex-grow w-full px-4 text-center py-4">
        <div className="z-10 mb-3 sm:justify-center">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-green-50 px-3 py-1 text-xs leading-6 text-green-600">
            <DIcons.Shapes className="h-4 p-0.5" /> 24/7 AI bilan o'rganish
          </div>
        </div>

        <div className="w-full flex-grow flex flex-col justify-center">
          <div className="px-2">
            <div className="relative mx-auto h-full max-w-7xl p-2 md:px-8 md:py-4">
              <h1 className="select-none px-3 py-1 text-center text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
                Sun'iy intellekt bilan
                <br />
                ingliz tilini o'zlashtirib oling
              </h1>
              
              <p className="mx-auto mt-4 max-w-3xl px-4 text-base text-gray-600 sm:px-4 md:text-lg">
                Zamonaviy AI texnologiyalari yordamida istagan vaqtda, istagan joyda
                ingliz tilini mutlaqo yangi darajada o'rganing
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <Link href="/get-started" className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm md:text-base md:px-8 md:py-3">
                  Hoziroq boshlash
                </Link>
                <Link href="/login" className="px-6 py-2 bg-white text-black border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm md:text-base md:px-8 md:py-3">
                  Tizimga kirish
                </Link>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-5 max-w-lg mx-auto">
                <p className="text-blue-800 font-medium text-sm md:text-base">
                  AI yordamchingiz kunning istalgan vaqtida, doimiy sizning xizmatingizda. Jonli suhbat, talaffuz mashqlari, grammatika tuzatish — hammasi bir joyda!
                </p>
              </div>
              
             
              
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-gray-500 text-xs md:text-sm">
                <Link href="#speaking" className="hover:text-black">Speaking</Link>
                <span>/</span>
                <Link href="#listening" className="hover:text-black">Listening</Link>
                <span>/</span>
                <Link href="#reading" className="hover:text-black">Reading</Link>
                <span>/</span>
                <Link href="#writing" className="hover:text-black">Writing</Link>
                <span>/</span>
                <Link href="#grammar" className="hover:text-black">Grammar</Link>
                <span>/</span>
                <Link href="#vocabulary" className="hover:text-black">Vocabulary</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apple-style dock */}
      <div className="mb-2">
        <AppleStyleDock />
      </div>
      
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto z-0"
        id="canvas"
      ></canvas>
    </section>
  );
}; 
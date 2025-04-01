"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "Qanday boshlash kerak",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval, isPaused])

  const handleStepClick = (index: number) => {
    setCurrentFeature(index)
    setProgress(0)
    setIsPaused(true)
    
    // Resume autoplay after 5 seconds
    setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

  return (
    <div className={cn("p-4 md:p-6", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-center">
          {title}
        </h3>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-center gap-6 md:gap-8 p-4 rounded-lg cursor-pointer",
                  index === currentFeature && "bg-blue-50 dark:bg-blue-950/20"
                )}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: 1,
                  scale: index === currentFeature ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(index)}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                    index === currentFeature
                      ? "bg-blue-500 border-blue-600 text-white"
                      : index < currentFeature
                      ? "bg-blue-100 border-blue-200 text-blue-700"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  )}
                >
                  {index < currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {feature.title || feature.step}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-center mt-8">
              <Link href="/test" className="inline-block">
                <Button size="lg" className="px-8 py-6 h-auto text-base">
                  Til bilish darajangizni tekshiring
                </Button>
              </Link>
            </div>
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm uppercase tracking-wider opacity-80">
                          {feature.step}
                        </p>
                        <h3 className="text-2xl font-bold">
                          {feature.title}
                        </h3>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div
                className="h-full bg-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
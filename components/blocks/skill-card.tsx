"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  hoverColor?: string;
  iconBg: string;
}

export function SkillCard({
  id,
  title,
  description,
  icon: Icon,
  color,
  hoverColor,
  iconBg,
}: SkillProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group overflow-hidden relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300",
        color
      )}></div>
      
      <div className="flex items-start">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300",
          iconBg
        )}>
          <div className={cn(
            "w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center transition-colors duration-300",
            color
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <Link href={`/${id}`}>
            <Button 
              className={cn(
                "rounded-lg transition-all duration-300 bg-white hover:text-white group-hover:shadow-md border border-gray-200 hover:border-transparent",
                `hover:bg-gradient-to-r hover:${color}`
              )}
            >
              <span>Tanlash</span> 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 rounded-tl-full bg-gradient-to-tl from-current to-transparent pointer-events-none"></div>
    </motion.div>
  );
} 
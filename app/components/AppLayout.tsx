"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestModeBanner from "./TestModeBanner";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TestModeBanner />
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}
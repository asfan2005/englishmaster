"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestModeBanner from "./TestModeBanner";
import DevModeIndicator from "./DevModeIndicator";
import VersionInfo from "./VersionInfo";
import DeveloperToolbar from "./DeveloperToolbar";
import { AppleStyleDock } from "./AppleStyleDock";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isDev, setIsDev] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    // Check if we're in development environment
    setIsDev(process.env.NODE_ENV === "development");
    
    // Get banner height if visible
    const banner = document.querySelector('.banner-notification');
    if (banner) {
      setBannerHeight(banner.clientHeight);
    }
    
    // Listen for banner visibility changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          setIsBannerVisible(!!document.querySelector('.banner-notification'));
        }
      });
    });
    
    const body = document.body;
    observer.observe(body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="banner-notification">
        <TestModeBanner />
      </div>
      
      <header className="fixed w-full z-50">
        <Navbar />
      </header>
      
      <main className="flex-grow pt-16 overflow-hidden">
        {children}
      </main>
      
      <AppleStyleDock />
      <Footer />
      <DevModeIndicator />
      <VersionInfo version="0.1.0-beta" buildDate="2025-04-05" />
      {isDev && <DeveloperToolbar />}
    </div>
  );
}
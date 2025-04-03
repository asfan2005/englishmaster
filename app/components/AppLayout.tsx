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

  useEffect(() => {
    // Check if we're in development environment
    setIsDev(process.env.NODE_ENV === "development");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TestModeBanner />
      <Navbar />
      <div className="pt-16 flex-grow">{children}</div>
      <AppleStyleDock />
      <Footer />
      <DevModeIndicator />
      <VersionInfo version="0.1.0-beta" buildDate="2023-04-05" />
      {isDev && <DeveloperToolbar />}
    </div>
  );
} 
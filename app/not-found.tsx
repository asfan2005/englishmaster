"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Construction, ChevronLeft, Home } from 'lucide-react';
import AppLayout from './components/AppLayout';

export default function NotFound() {
  const pathname = usePathname() || '';
  
  // Extract section name from path
  const pathParts = pathname.split('/').filter(Boolean);
  const sectionName = pathParts.length > 0 ? pathParts[0] : '';
  
  // Format section name for display
  const formatSectionName = (name: string) => {
    if (!name) return '';
    
    // Convert kebab-case or camelCase to space-separated words and capitalize first letter
    return name
      .replace(/[-_]/g, ' ')  // Replace hyphens and underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Convert camelCase to space-separated
      .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize first letter of each word
  };
  
  const displayName = formatSectionName(sectionName);
  
  return (
    <AppLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <Construction className="h-24 w-24 text-yellow-500 mb-6 animate-pulse" />
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Bu Bo'lim Ustida Ishlanyapti
        </h1>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-xl md:text-2xl font-bold mb-4">
          {displayName || 'Bu sahifa'}
        </div>
        
        <p className="text-gray-600 max-w-md mb-8 text-lg">
          Hozirda ushbu bo'lim ustida ish olib borilyapti. Tez orada yangilangan ma'lumotlar bilan to'ldiriladi.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Bosh sahifaga qaytish
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Orqaga qaytish
          </button>
        </div>
      </div>
    </AppLayout>
  );
} 
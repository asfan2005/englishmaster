"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, ChevronLeft, Home } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function AboutNotFound() {
  const pathname = usePathname() || '';
  
  // Extract subsection name from path
  const pathParts = pathname.split('/').filter(Boolean);
  const subsectionName = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format subsection name for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(subsectionName);
  
  return (
    <CompanyLayout
      title="Tez kunda"
      description="Hozirda ishlab chiqilmoqda"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="h-20 w-20 text-blue-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Kompaniya sahifasi ustida ishlanyapti
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-xl font-bold mb-4">
            {displayName}
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Hozirda ushbu bo'lim ustida ish olib borilyapti. Biz tez orada yangi ma'lumotlar qo'shamiz.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            "Biz haqimizda" sahifasiga qayting
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
    </CompanyLayout>
  );
} 
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, ChevronLeft, Briefcase } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function CareersNotFound() {
  const pathname = usePathname() || '';
  
  // Extract job position from path
  const pathParts = pathname.split('/').filter(Boolean);
  const positionName = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format position name for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(positionName);
  
  return (
    <CompanyLayout
      title="Vakansiya mavjud emas"
      description="Siz qidirayotgan ish o'rni topilmadi"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Briefcase className="h-20 w-20 text-indigo-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ushbu vakansiya hozirda mavjud emas
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl font-bold mb-4">
            {displayName}
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Siz qidirayotgan ish o'rni hozirda mavjud emas yoki yangilanmoqda. Iltimos, keyinroq qayta urinib ko'ring yoki boshqa vakansiyalarni ko'rib chiqing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/careers"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Users className="mr-2 h-5 w-5" />
            Barcha vakansiyalarni ko'rish
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Umumiy ariza jo'natish
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
} 
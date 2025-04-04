"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpCircle, Search, ArrowLeft, Book } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function HelpNotFound() {
  const pathname = usePathname() || '';
  
  // Extract help topic from path
  const pathParts = pathname.split('/').filter(Boolean);
  const helpTopic = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format help topic for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(helpTopic);
  
  return (
    <CompanyLayout
      title="Yordam mavzusi topilmadi"
      description="Siz qidirayotgan yordam maqolasi mavjud emas"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <HelpCircle className="h-20 w-20 text-amber-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Yordam mavzusi topilmadi
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent text-xl font-bold mb-4">
            "{displayName}"
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Siz izlayotgan yordam maqolasi mavjud emas yoki boshqa bo'limga ko'chirilgan bo'lishi mumkin. Quyidagi havolalardan foydalaning.
        </p>
        
        <div className="w-full max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Yordam maqolasini qidirish..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/help"
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            <Book className="mr-2 h-5 w-5" />
            Barcha yordam mavzularini ko'rish
          </Link>
          
          <Link
            href="/support"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Qo'llab-quvvatlash sahifasiga qaytish
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
} 
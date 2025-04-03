"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ChevronLeft, Search } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function BlogNotFound() {
  const pathname = usePathname() || '';
  
  // Extract article name from path
  const pathParts = pathname.split('/').filter(Boolean);
  const articleSlug = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format article name for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(articleSlug);
  
  return (
    <CompanyLayout
      title="Maqola topilmadi"
      description="Siz qidirayotgan blog maqolasi mavjud emas"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-20 w-20 text-blue-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Maqola topilmadi
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-xl font-bold mb-4">
            "{displayName}"
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Siz izlayotgan maqola mavjud emas, o'chirilgan yoki boshqa manzilga ko'chirilgan bo'lishi mumkin. Iltimos, quyidagi havolalar orqali blogimizga tashrif buyuring.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Barcha maqolalarni ko'rish
          </Link>
          
          <div className="relative">
            <Link
              href="/blog?search=true"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Maqola qidirish
            </Link>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
} 
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LifeBuoy, HelpCircle, MessageCircle } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function SupportNotFound() {
  const pathname = usePathname() || '';
  
  // Extract topic from path
  const pathParts = pathname.split('/').filter(Boolean);
  const topicName = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format topic name for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(topicName);
  
  return (
    <CompanyLayout
      title="Yordam mavzusi topilmadi"
      description="Siz qidirayotgan yordam mavzusi mavjud emas"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <LifeBuoy className="h-20 w-20 text-green-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Yordam mavzusi topilmadi
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent text-xl font-bold mb-4">
            "{displayName}"
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Siz izlayotgan yordam mavzusi mavjud emas yoki yangilangan bo'lishi mumkin. Quyidagi havolalardan foydalaning yoki qo'llab-quvvatlash jamoasi bilan bog'laning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/support"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Yordam markaziga qaytish
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Bizga murojaat qiling
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
} 
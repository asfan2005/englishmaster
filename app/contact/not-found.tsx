"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MessagesSquare } from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

export default function ContactNotFound() {
  const pathname = usePathname() || '';
  
  // Extract contact type from path
  const pathParts = pathname.split('/').filter(Boolean);
  const contactType = pathParts.length > 1 ? pathParts[pathParts.length - 1] : '';
  
  // Format contact type for display
  const formatName = (name: string) => {
    if (!name) return '';
    
    return name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const displayName = formatName(contactType);
  
  return (
    <CompanyLayout
      title="Aloqa sahifasi topilmadi"
      description="Siz qidirayotgan aloqa sahifasi mavjud emas"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Phone className="h-20 w-20 text-purple-500 mb-6 animate-pulse" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Aloqa sahifasi topilmadi
        </h2>
        
        {displayName && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent text-xl font-bold mb-4">
            "{displayName}"
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mb-8">
          Siz izlayotgan aloqa sahifasi mavjud emas. Iltimos, asosiy aloqa sahifamizga tashrif buyuring yoki quyidagi aloqa usullaridan birini tanlang.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Mail className="h-10 w-10 text-purple-500 mr-4" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Email orqali</h3>
              <p className="text-sm text-gray-600">info@englishmaster.uz</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Phone className="h-10 w-10 text-purple-500 mr-4" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Telefon orqali</h3>
              <p className="text-sm text-gray-600">+998 71 123 45 67</p>
            </div>
          </div>
        </div>
        
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <MessagesSquare className="mr-2 h-5 w-5" />
          Aloqa sahifasiga o'tish
        </Link>
      </div>
    </CompanyLayout>
  );
} 
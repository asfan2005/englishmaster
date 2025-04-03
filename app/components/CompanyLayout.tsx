"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Users, BookOpen, LifeBuoy, Phone, HelpCircle, ChevronRight } from 'lucide-react';
import AppLayout from './AppLayout';

interface CompanyLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

type CompanyNavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
};

const companyNav: CompanyNavItem[] = [
  {
    name: 'About Us',
    href: '/about',
    icon: <Building2 className="h-5 w-5" />,
    description: 'Learn about our mission, values, and team'
  },
  {
    name: 'Careers',
    href: '/careers',
    icon: <Users className="h-5 w-5" />,
    description: 'Join our team and grow with us'
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'News, articles, and language learning tips'
  },
  {
    name: 'Support',
    href: '/support',
    icon: <LifeBuoy className="h-5 w-5" />,
    description: 'Get help with your account and courses'
  },
  {
    name: 'Contact Us',
    href: '/contact',
    icon: <Phone className="h-5 w-5" />,
    description: 'Reach out to our team for any inquiries'
  },
  {
    name: 'Help Center',
    href: '/help',
    icon: <HelpCircle className="h-5 w-5" />,
    description: 'Answers to frequently asked questions'
  }
];

export default function CompanyLayout({ children, title, description }: CompanyLayoutProps) {
  const pathname = usePathname();
  
  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="font-medium text-gray-800">Company</h2>
              </div>
              <nav className="p-2 space-y-1">
                {companyNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={`inline-flex mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-4 mt-4 bg-blue-50 border-t border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-3">Need more help?</h3>
                <Link
                  href="/contact"
                  className="flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
                >
                  Contact our team
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start learning?</h2>
            <p className="text-gray-600 max-w-2xl">
              Join thousands of students who are already improving their English skills with our platform.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 
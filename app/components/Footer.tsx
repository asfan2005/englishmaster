"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    learning: [
      { name: "Courses", href: "/courses" },
      { name: "Speaking Practice", href: "/speaking" },
      { name: "Listening", href: "/listening" },
      { name: "Grammar", href: "/grammar" },
      { name: "Vocabulary", href: "/vocabulary" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Pricing", href: "/pricing" },
    ]
  };
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-600">English</span>
              <span className="text-xl font-bold text-indigo-700">Master</span>
            </Link>
            
            <p className="text-gray-600 mb-4">
              Empowering language learners to achieve fluency and confidence.
            </p>
          </div>
          
          {/* Learning links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Learning</h3>
            <ul className="space-y-2">
              {footerLinks.learning.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-blue-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-blue-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-blue-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} EnglishMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
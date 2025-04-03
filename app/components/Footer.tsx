"use client";

import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  GraduationCap,
  BookOpen,
  Clock,
  Languages,
  MessageSquare,
  CreditCard
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    learning: [
      { name: "Courses", href: "/courses" },
      { name: "Speaking Practice", href: "/speaking" },
      { name: "Listening", href: "/listening" },
      { name: "Grammar", href: "/grammar" },
      { name: "Vocabulary", href: "/vocabulary" },
      { name: "Reading", href: "/reading" },
      { name: "Writing", href: "/writing" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" }
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Pricing", href: "/pricing" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };
  
  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, text: "+1 (888) 123-4567" },
    { icon: <Mail className="h-5 w-5" />, text: "support@englishmaster.com" },
    { icon: <MapPin className="h-5 w-5" />, text: "123 Language Street, New York, NY 10001" }
  ];
  
  const socialMedia = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/englishmaster" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/englishmaster" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/englishmaster" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/englishmaster" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/c/englishmaster" }
  ];

  const features = [
    { icon: <GraduationCap className="h-5 w-5 text-blue-500" />, text: "Certified Teachers" },
    { icon: <BookOpen className="h-5 w-5 text-indigo-500" />, text: "Comprehensive Courses" },
    { icon: <Clock className="h-5 w-5 text-purple-500" />, text: "24/7 Learning Access" },
    { icon: <MessageSquare className="h-5 w-5 text-green-500" />, text: "AI Conversation Practice" }
  ];
  
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Top section with features */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 mr-3">{feature.icon}</div>
              <span className="text-gray-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <hr className="border-gray-200 mb-12" />
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-600">English</span>
              <span className="text-xl font-bold text-indigo-700">Master</span>
            </Link>
            
            <p className="text-gray-600 mb-6">
              Empowering language learners with cutting-edge technology and expert guidance to achieve fluency and confidence.
            </p>
            
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Learning links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Learning</h3>
            <ul className="space-y-2">
              {footerLinks.learning.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
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
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support and contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3 text-gray-500">{info.icon}</div>
                  <span className="text-gray-600">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom section with newsletter, copyright, and payment info */}
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex md:flex-1">
              <p className="text-sm text-gray-500">
                &copy; {currentYear} EnglishMaster. All rights reserved.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-sm text-gray-500 mr-2">We accept:</span>
              <div className="flex items-center space-x-2 text-gray-400">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm font-medium">Visa / Mastercard / PayPal / Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
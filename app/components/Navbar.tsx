"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Courses", href: "/courses" },
  { name: "Teachers", href: "/teachers" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">English</span>
                <span className="text-xl font-bold text-indigo-700">Master</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={isActive(item.href) 
                    ? "px-3 py-2 text-blue-600 font-medium" 
                    : "px-3 py-2 text-gray-600 hover:text-blue-600"}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <Link href="/login" className="px-3 py-2 text-gray-600 hover:text-blue-600">
              Log in
            </Link>
            <Link href="/register" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sign up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={isActive(item.href) 
                  ? "block px-3 py-2 text-blue-600 font-medium" 
                  : "block px-3 py-2 text-gray-600 hover:text-blue-600"}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t">
              <div className="flex flex-col px-3 space-y-2">
                <Link 
                  href="/login" 
                  className="py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/register"
                  className="py-2 px-4 bg-blue-600 text-white rounded text-center hover:bg-blue-700" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
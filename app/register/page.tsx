"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Parollar bir xil emas");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login or home page
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <ButtonColorful
              className="h-9 px-3"
              label="Orqaga"
              aria-label="Orqaga"
            >
              <div className="relative flex items-center justify-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5 text-white/90 dark:text-zinc-900/90" />
                <span className="text-white dark:text-zinc-900">Orqaga</span>
              </div>
            </ButtonColorful>
          </Link>
          <div></div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            EnglishMaster
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Yangi hisob yarating
          </p>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                To'liq ism
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Ismingiz Familiyangiz"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email manzil
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="sizning@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Parol
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Parolni tasdiqlang
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                <span>
                  Men <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">Foydalanish shartlari</Link> va{" "}
                  <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">Maxfiylik siyosati</Link>ga roziman
                </span>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Ro'yxatdan o'tmoqda..." : "Ro'yxatdan o'tish"}
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <div className="mx-4 flex-shrink text-sm text-gray-500">yoki</div>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col gap-2">
              <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90">
                <span className="pointer-events-none me-2 flex-1">
                  <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
                </span>
                Google orqali ro'yxatdan o'tish
              </Button>
              <Button className="bg-[#14171a] text-white after:flex-1 hover:bg-[#14171a]/90">
                <span className="pointer-events-none me-2 flex-1">
                  <RiTwitterXFill className="opacity-60" size={16} aria-hidden="true" />
                </span>
                X orqali ro'yxatdan o'tish
              </Button>
              <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
                <span className="pointer-events-none me-2 flex-1">
                  <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
                </span>
                Facebook orqali ro'yxatdan o'tish
              </Button>
              <Button className="bg-[#333333] text-white after:flex-1 hover:bg-[#333333]/90">
                <span className="pointer-events-none me-2 flex-1">
                  <RiGithubFill className="opacity-60" size={16} aria-hidden="true" />
                </span>
                GitHub orqali ro'yxatdan o'tish
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Allaqachon hisobingiz bormi?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Tizimga kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
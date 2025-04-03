"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, Send,
  CheckCircle, AlertCircle, Globe, Building, ArrowRight
} from 'lucide-react';
import CompanyLayout from '../components/CompanyLayout';

// Company contact information
const contactInfo = {
  email: "info@englishmaster.uz",
  phone: "+998 71 123-45-67",
  address: "Toshkent shahri, Mirobod tumani, Amir Temur shoh ko'chasi, 108-uy",
  workHours: "Dushanba - Juma: 9:00 - 18:00",
  socialMedia: [
    { name: "Facebook", url: "https://facebook.com/englishmaster" },
    { name: "Instagram", url: "https://instagram.com/englishmasteruz" },
    { name: "Telegram", url: "https://t.me/englishmaster_uz" }
  ]
};

export default function ContactPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <CompanyLayout
      title="Biz bilan bog'lanish"
      description="EnglishMaster jamoasi bilan bog'lanish uchun ma'lumotlar va forma"
    >
      <div ref={ref} className="space-y-12">
        {/* Hero Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-blue/[0.2] [mask-image:linear-gradient(0deg,transparent,#fff,transparent)]"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Biz bilan bog'laning
              </h1>
              <p className="text-lg text-gray-700">
                Savollaringiz, takliflaringiz yoki fikr-mulohazalaringiz bo'lsa, bizga murojaat qiling. EnglishMaster jamoasi sizga yordam berishdan mamnun.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information and Form */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Bog'lanish ma'lumotlari</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                      <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Manzil</h3>
                      <p className="text-gray-900">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Ish vaqti</h3>
                      <p className="text-gray-900">
                        {contactInfo.workHours}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Ijtimoiy tarmoqlar</h3>
                  <div className="flex space-x-4">
                    {contactInfo.socialMedia.map((social) => (
                      <a 
                        key={social.name}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors text-sm"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Murojaat yuborish</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                    <div className="mb-4 flex justify-center">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Murojaat yuborildi!</h3>
                    <p className="text-gray-600 mb-4">
                      Murojaatingiz uchun rahmat. Tez orada sizga javob beramiz.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Yangi murojaat
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Ism va familiya <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon raqami
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Mavzu <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="">Mavzuni tanlang</option>
                          <option value="general">Umumiy savol</option>
                          <option value="pricing">Narxlar haqida</option>
                          <option value="technical">Texnik yordam</option>
                          <option value="billing">To'lov masalalari</option>
                          <option value="partnership">Hamkorlik taklifi</option>
                          <option value="other">Boshqa</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Xabar <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    
                    {errorMessage && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600">
                        {errorMessage}
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                        } transition-colors`}
                      >
                        {isSubmitting ? 'Yuborilmoqda...' : 'Xabarni yuborish'}
                        <Send className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bizning joylashuv</h2>
            
            {/* Map placeholder - in a real implementation, you would use an actual map component */}
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-blue/[0.1]"></div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-md z-10 border border-gray-200">
                <MapPin className="h-5 w-5 text-blue-600" />
                <p className="text-gray-900 font-medium mt-2">{contactInfo.address}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className={`transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ko'p so'raladigan savollar</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Qanday qilib kursga ro'yxatdan o'tish mumkin?</h3>
                <p className="text-gray-600">
                  Kurslarimizga ro'yxatdan o'tish uchun saytimizda ro'yxatdan o'ting, keyin "Kurslar" sahifasiga o'tib, o'zingizga mos kursni tanlang va "Ro'yxatdan o'tish" tugmasini bosing.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">To'lovni qanday amalga oshirish mumkin?</h3>
                <p className="text-gray-600">
                  Biz turli to'lov usullarini qabul qilamiz: bank kartasi, Click, Payme, Uzcard va naqd pul. To'lov sahifasida o'zingizga qulay usulni tanlashingiz mumkin.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Kurslarni mobil qurilmada o'rganish mumkinmi?</h3>
                <p className="text-gray-600">
                  Ha, albatta! Bizning kurslar mobil qurilmalarda ham ishlaydi. Bundan tashqari, iOS va Android uchun maxsus ilovalarimiz mavjud bo'lib, ular orqali oflayn rejimda ham o'qish imkoniyati mavjud.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Barcha savollar va javoblarni ko'rish
              </Link>
            </div>
          </div>
        </section>
      </div>
    </CompanyLayout>
  );
} 
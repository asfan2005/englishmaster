"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, X, ChevronDown, ChevronUp, CreditCard, Calendar, Zap, Award, BookOpen, MessageSquare, Video } from "lucide-react";
import AppLayout from "../components/AppLayout";

// Pricing plan data
const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for beginners starting their language journey",
    price: 9.99,
    billingPeriod: "monthly",
    features: [
      { name: "Access to foundational courses", included: true },
      { name: "Vocabulary practice tools", included: true },
      { name: "Grammar exercises", included: true },
      { name: "1 AI practice session per week", included: true },
      { name: "Progress tracking", included: true },
      { name: "Community forum access", included: true },
      { name: "Live lessons with teachers", included: false },
      { name: "Personalized study plan", included: false },
      { name: "Speaking assessment", included: false },
      { name: "Certificate of completion", included: false }
    ],
    cta: "Get Started",
    popular: false,
    color: "blue"
  },
  {
    id: "standard",
    name: "Standard",
    description: "Our most popular plan for serious learners",
    price: 19.99,
    billingPeriod: "monthly",
    features: [
      { name: "Access to all courses", included: true },
      { name: "Vocabulary practice tools", included: true },
      { name: "Grammar exercises", included: true },
      { name: "Unlimited AI practice sessions", included: true },
      { name: "Progress tracking", included: true },
      { name: "Community forum access", included: true },
      { name: "2 live lessons with teachers monthly", included: true },
      { name: "Personalized study plan", included: true },
      { name: "Speaking assessment", included: false },
      { name: "Certificate of completion", included: false }
    ],
    cta: "Get Started",
    popular: true,
    color: "indigo"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Complete language learning experience",
    price: 39.99,
    billingPeriod: "monthly",
    features: [
      { name: "Access to all courses", included: true },
      { name: "Vocabulary practice tools", included: true },
      { name: "Grammar exercises", included: true },
      { name: "Unlimited AI practice sessions", included: true },
      { name: "Progress tracking", included: true },
      { name: "Community forum access", included: true },
      { name: "8 live lessons with teachers monthly", included: true },
      { name: "Personalized study plan", included: true },
      { name: "Speaking assessment", included: true },
      { name: "Certificate of completion", included: true }
    ],
    cta: "Get Started",
    popular: false,
    color: "purple"
  }
];

// Feature highlights
const featureHighlights = [
  {
    title: "Learn from Expert Teachers",
    description: "Get personalized feedback and guidance from certified language instructors",
    icon: <Award className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Interactive Courses",
    description: "Engage with dynamic lessons that adapt to your learning style and pace",
    icon: <BookOpen className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "AI Conversation Practice",
    description: "Practice speaking anytime with our advanced AI language partner",
    icon: <MessageSquare className="h-10 w-10 text-purple-500" />
  },
  {
    title: "Live Group Classes",
    description: "Join interactive group sessions focused on conversation and real-world skills",
    icon: <Video className="h-10 w-10 text-green-500" />
  }
];

// FAQ data
const faqItems = [
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your subscription at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 7-day free trial for all our plans. You can explore all the features included in your chosen plan during the trial period without any charge."
  },
  {
    question: "How do I book lessons with teachers?",
    answer: "Once subscribed, you can book lessons through our scheduling system in the dashboard. Select your preferred teacher, date, and time from the available slots based on your subscription allowance."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "You can cancel your subscription anytime. Your access will continue until the end of your current billing period, and you won't be charged again."
  },
  {
    question: "Are there any discounts for annual plans?",
    answer: "Yes, we offer a 20% discount when you choose annual billing for any of our subscription plans, helping you save while committing to your language learning journey."
  },
  {
    question: "What languages do you offer?",
    answer: "Currently, we focus exclusively on English language learning, with specializations in business English, academic English, conversation, exam preparation, and more."
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };
  
  // Calculate price with annual discount
  const getPrice = (basePrice: number, period: "monthly" | "annual") => {
    if (period === "annual") {
      // 20% discount for annual billing
      return (basePrice * 0.8).toFixed(2);
    }
    return basePrice.toFixed(2);
  };
  
  return (
    <AppLayout>
      <div className="bg-gray-50 min-h-screen pb-16">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Perfect Plan for Your Learning Journey</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose a subscription that fits your goals and learning style. Start improving your English today.
            </p>
            
            {/* Billing period toggle */}
            <div className="inline-flex items-center bg-white/10 rounded-full p-1 mb-8">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`py-2 px-4 rounded-full text-sm font-medium ${
                  billingPeriod === "monthly" 
                    ? "bg-white text-blue-700" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`py-2 px-4 rounded-full text-sm font-medium ${
                  billingPeriod === "annual" 
                    ? "bg-white text-blue-700" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                Annual <span className="text-xs font-normal opacity-80">(Save 20%)</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular ? "ring-4 ring-indigo-500 ring-opacity-50" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-extrabold text-gray-900">${getPrice(plan.price, billingPeriod)}</span>
                    <span className="text-gray-500 ml-2">
                      /{billingPeriod === "monthly" ? "month" : "month, billed annually"}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/signup?plan=${plan.id}`}
                    className={`w-full flex justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular 
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  
                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5 mr-3" />
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Feature highlights section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureHighlights.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Every Plan Includes</h2>
                <p className="text-gray-600 mb-4">
                  No matter which plan you choose, you'll get access to these core benefits that make our platform effective for language learners at any level.
                </p>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                >
                  Start your free trial 
                  <Zap className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <CreditCard className="h-6 w-6 text-blue-500" />,
                    title: "No credit card required",
                    description: "Start your 7-day free trial without payment info"
                  },
                  { 
                    icon: <Calendar className="h-6 w-6 text-indigo-500" />,
                    title: "Cancel anytime",
                    description: "No long-term commitments or hidden fees"
                  },
                  { 
                    icon: <BookOpen className="h-6 w-6 text-purple-500" />,
                    title: "Learning resources",
                    description: "Access to basic learning materials and exercises"
                  },
                  { 
                    icon: <Award className="h-6 w-6 text-green-500" />,
                    title: "Progress tracking",
                    description: "Monitor your improvement with detailed analytics"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start bg-white p-5 rounded-lg shadow-sm">
                    <div className="mr-4 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to know about our subscription plans</p>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 mt-8">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your English Learning Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who are already improving their language skills with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-transparent text-white border border-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 
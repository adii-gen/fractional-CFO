'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Briefcase, ComputerIcon, DollarSign, LineChart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Testimonials from "./Homepage/Testimonals";
import CTASection from "./Homepage/contactsec";
import Footer from "./Homepage/footer";

import SegmentsAndPricing from "./Homepage/pricingAndSegmentation";
import FAQSection from "./Homepage/FAQ";
import TrustedSection from "./Homepage/FinancialTools";
import TourismChatbot from "./Homepage/chatbot";
import ConsultationBookingModal from "./ConsultationBooking";

export default function FractionalCFOPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
<div className="py-4">
  <Link href="/">
    <div className="flex items-center space-x-1 cursor-pointer">
      <span className="tracking-widest text-lg md:text-lg font-medium text-gray-700">
        FRACTIONAL
      </span>
      <div className="bg-[#CFE4D1] rounded-md px-2 py-1 flex items-center justify-center">
        <span className="text-gray-700 text-lg md:text-lg font-semibold">CXO</span>
      </div>
    </div>
  </Link>
</div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#expertise" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                Our Expertise
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                Pricing
              </a>
              <a href="#demo" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                Demo
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                Contact
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                FAQs
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-green-700 text-green-700 hover:bg-primary hover:text-white text-sm"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-green-800 hover:bg-green-900 text-white text-sm">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white pb-3 px-4 z-50 absolute top-16 left-0 w-full shadow-lg">
            <div className="flex flex-col space-y-2 pt-2">
              {/* Links */}
              {['features', 'pricing', 'demo', 'contact'].map(section => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}

              {/* Auth Buttons */}
              <div className="pt-2 border-t border-gray-200">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/auth/login">
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

      </nav>


      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div id="logo">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Illustration */}
              <div className="relative pl-4 order-2 md:order-1 rounded-3xl">
                <img src="/image.png" alt="" width={500} />
              </div>

              {/* Right side - Content */}
              <div className="order-1 md:order-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  Strategic Leadership at a Fractional Cost <br />

                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                  Get access to world-class CFO & CTO with or without experienced team              </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={"/book-consultation"}>
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8"
                  >
                    Book a Consultation
                  </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id= "expertise" >
      <section className="py-8 bg-gray-50">
        

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">Our Expertise</h2>
          <p className="text-gray-600 mb-12 max-w-7xl mx-auto">
            Get the financial clarity and control you need to scale your business — all without hiring a full-time CFO.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              { icon: <DollarSign className="h-10 w-10 text-emerald-600" />, title: "Financial Strategy", desc: "We design forward-looking strategies that align finances with your business goals." },
              { icon: <BarChart3 className="h-10 w-10 text-emerald-600" />, title: "Budgeting & Forecasting", desc: "Plan ahead with detailed cash flow projections and performance insights." },
              { icon: <LineChart className="h-10 w-10 text-emerald-600" />, title: "KPI & Growth Metrics", desc: "Track what truly matters and drive accountability through smart financial metrics." },
              { icon: <Briefcase className="h-10 w-10 text-emerald-600" />, title: "Investor Reporting", desc: "We create polished reports and financial decks that impress investors." },
              { icon: <ComputerIcon className="h-10 w-10 text-emerald-600" />, title: "IT Solutions", desc: "Standard tools and applications with a facility to customise as per business requirement." },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
      </div>
      {/* About Section */}
      <section className="py-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">Why Partner With Us?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-10">
            Our team of experienced CFOs & CTOs brings over 3 decades of expertise in financial modeling,
            performance optimization, investor communications and IT Strategies and Solutions , CRM & ERP Implementation — helping you to scale confidently and sustainably.
          </p>

        </div>
      </section>


      <div id="pricing"><SegmentsAndPricing /></div>
      <TrustedSection />
      <TourismChatbot />
      <CTASection />
      <div id="faqs"><FAQSection /></div>


      <Footer />
    </main >
  );
}

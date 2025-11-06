'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Briefcase, ComputerIcon, DollarSign, LineChart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PricingSection from "./pricing";
import Testimonials from "./Homepage/Testimonals";
import CTASection from "./Homepage/contactsec";
import Footer from "./Homepage/footer";
import MarketingStrategy from "./Homepage/MarketingStrategy";
import ClientSegmentation from "./Homepage/ClientSegmentation";
import SegmentsAndPricing from "./Homepage/pricingAndSegmentation";

export default function FractionalCFOPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-md bg-green-900 flex items-center justify-center">
                </div>
                <span className="ml-2 text-lg md:text-xl font-bold text-green-700">
                  Fractional CFO
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
                Features
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
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm"
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
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Businesses with Strategic Financial Leadership
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
            We offer fractional CFO services that help startups and growing companies
            make smarter financial decisions, manage cash flow, and scale sustainably.
          </p>
          <Button
            size="lg"
            className="bg-white text-emerald-700 font-semibold hover:bg-emerald-100 transition-all"
          >
            Schedule a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </section> */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
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
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8"
                >
                  Book a Consultation
                </Button>
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
      </section>
      {/* Services Section */}
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

      {/* <MarketingStrategy /> */}
      {/* Testimonials Section */}
      {/* <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">Client Success Stories</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from founders and business owners who’ve experienced the transformation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Riya Sharma",
                feedback:
                  "We went from chaos to clarity in under two months. Their team streamlined everything — from budgeting to investor decks.",
              },
              {
                name: "Arjun Patel",
                feedback:
                  "They helped us prepare for funding and gave us a complete understanding of our burn rate and profitability.",
              },
              {
                name: "Neha Singh",
                feedback:
                  "The insights we now get monthly are priceless. They feel like an in-house finance team — just smarter.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition-all"
              >
                <p className="italic text-gray-600 mb-4">“{t.feedback}”</p>
                <h4 className="font-semibold text-emerald-700">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <Testimonials />
      {/* CTA Section */}
      {/* <section className="py-8 bg-emerald-700 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Ready to Unlock Financial Clarity?
          </h2>
          <p className="text-lg text-emerald-100 mb-10">
            Let’s discuss how we can help you scale smarter and grow sustainably with fractional CFO expertise.
          </p>
          <Button
            size="lg"
            className="bg-white text-emerald-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Get Started Today
          </Button>
        </div>
      </section> */}
      {/* <ClientSegmentation />
<div><PricingSection />
</div>  */}
      <SegmentsAndPricing />
      <CTASection />
      {/* Footer */}
      {/* <footer className="py-8 bg-gray-900 text-gray-400 text-center text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Fractional CFO | Financial Strategy. Growth. Success.
      </footer> */}
      <Footer />
    </main>
  );
}

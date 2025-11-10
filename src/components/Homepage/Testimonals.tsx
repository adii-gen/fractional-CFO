'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    // {
    //   name: "Riya Sharma",
    //   role: "Founder & CEO",
    //   company: "TechStart India",
    //   image: "RS",
    //   feedback: "We went from chaos to clarity in under two months. Their team streamlined everything — from budgeting to investor decks. The ROI has been incredible.",
    //   rating: 5,
    //   color: "from-pink-500 to-rose-500"
    // },
    // {
    //   name: "Arjun Patel",
    //   role: "Co-founder",
    //   company: "GrowthLabs",
    //   image: "AP",
    //   feedback: "They helped us prepare for funding and gave us a complete understanding of our burn rate and profitability. We secured Series A thanks to their detailed financial models.",
    //   rating: 5,
    //   color: "from-blue-500 to-cyan-500"
    // },
    // {
    //   name: "Neha Singh",
    //   role: "Managing Director",
    //   company: "Retail Solutions Co",
    //   image: "NS",
    //   feedback: "The insights we now get monthly are priceless. They feel like an in-house finance team — just smarter. Our decision-making has improved dramatically.",
    //   rating: 5,
    //   color: "from-emerald-500 to-teal-500"
    // },
    {
      name: "Vikram Malhotra",
      role: "Operations Head",
      company: "Manufacturing Plus",
      image: "VM",
      feedback: "Outstanding service! They transformed our financial operations and helped us identify cost-saving opportunities worth millions. Highly recommend their expertise.",
      rating: 5,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Priya Kapoor",
      role: "Director",
      company: "Digital Ventures",
      image: "PK",
      feedback: "Professional, responsive, and incredibly knowledgeable. They've become an integral part of our strategic planning and have helped us scale confidently.",
      rating: 5,
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Rahul Verma",
      role: "CFO",
      company: "Enterprise Solutions",
      image: "RV",
      feedback: "Their fractional CFO service gave us enterprise-level financial expertise without the full-time cost. Game-changer for our mid-sized business.",
      rating: 5,
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Client Success Stories
          </h2>
          <p className="text-gray-600 mb-4 max-w-3xl mx-auto text-lg">
            Hear from founders and business owners who've experienced the transformation
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-emerald-600" />
              ))}
            </div>
            <span className="font-semibold">4.9/5 from 500+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-16 w-16 text-emerald-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
                "{testimonial.feedback}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-emerald-600 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 shadow-md">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-700 mb-2">500+</div>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-700 mb-2">98%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-700 mb-2">₹50Cr+</div>
            <p className="text-gray-600">Revenue Managed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-700 mb-2">10+</div>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
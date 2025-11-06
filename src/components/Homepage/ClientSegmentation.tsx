'use client';

import React, { useState } from 'react';
import { Rocket, Building2, Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientSegmentation() {
  const [activeSegment, setActiveSegment] = useState(0);

  const segments = [
    {
      type: "Startups",
      icon: Rocket,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      goal: "Start & Establish",
      structure: "Simple",
      headCount: "Less than 5",
      transactions: "500 Nos",
      revenue: "≤ AED 600 K",
      budget: "≤ AED 6 K",
      compliance: "Low",
      description: "Perfect for early-stage companies looking to establish solid financial foundations"
    },
    {
      type: "SME",
      icon: Building2,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      goal: "Stabilize & Control",
      structure: "Moderate",
      headCount: "0-25",
      transactions: "2000 Nos",
      revenue: "≤ AED 5 M",
      budget: "≤ AED 60 K",
      compliance: "Moderate",
      description: "Ideal for growing businesses seeking financial stability and control"
    },
    {
      type: "Corporates",
      icon: Scale,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      goal: "Sustain & Grow",
      structure: "Complex",
      headCount: "Over 25",
      transactions: "Over 2000",
      revenue: "Over AED 5M",
      budget: "Over AED 120 K",
      compliance: "High",
      description: "Comprehensive solutions for established enterprises focusing on sustainable growth"
    }
  ];

  const currentSegment = segments[activeSegment];
  const Icon = currentSegment.icon;

  return (
    <section id="segments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Tailored Solutions for Every Business Stage
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We understand that every business is unique. Our services are customized based on your company's size, complexity, and growth stage.
          </p>
        </div>

        {/* Segment Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {segments.map((segment, index) => {
            const SegmentIcon = segment.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveSegment(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSegment === index
                    ? `bg-gradient-to-r ${segment.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SegmentIcon className="h-5 w-5" />
                {segment.type}
              </button>
            );
          })}
        </div>

        {/* Active Segment Details */}
        <div className={`${currentSegment.bgColor} rounded-3xl p-8 md:p-12 border-2 ${currentSegment.borderColor} transition-all duration-500`}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Icon and Description */}
            <div className="flex flex-col justify-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentSegment.color} flex items-center justify-center mb-6`}>
                <Icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                {currentSegment.type}
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                {currentSegment.description}
              </p>
              <Button className={`bg-gradient-to-r ${currentSegment.color} text-white hover:opacity-90 w-fit`}>
                Get Started with {currentSegment.type}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Right Side - Specifications Table */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h4 className="text-xl font-bold mb-6 text-gray-900">Segment Specifications</h4>
              <div className="space-y-4">
                {[
                  { label: "Goals", value: currentSegment.goal },
                  { label: "Structure", value: currentSegment.structure },
                  { label: "Head Count", value: currentSegment.headCount },
                  { label: "Annual Transactions", value: currentSegment.transactions },
                  { label: "Annual Revenue", value: currentSegment.revenue },
                  { label: "Annual Budget", value: currentSegment.budget },
                  { label: "Compliance Need", value: currentSegment.compliance }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className={`font-semibold bg-gradient-to-r ${currentSegment.color} bg-clip-text text-transparent`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Note */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold">💡</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Our Growth Strategy</h4>
              <p className="text-gray-700">
                We start with the lowest tier in each segment to build trust and demonstrate value, then help you scale up as your business grows. Our approach ensures you get exactly what you need at every stage of your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
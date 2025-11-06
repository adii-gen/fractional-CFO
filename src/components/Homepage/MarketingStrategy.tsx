'use client';

import React from 'react';
import { Target, Users, TrendingUp, Heart, Sparkles } from 'lucide-react';

export default function MarketingStrategy() {
  const strategies = [
    {
      step: "01",
      icon: Target,
      title: "Attraction",
      description: "Drawing in ideal clients, partners, or investors by identifying their needs and providing value through channels like content marketing, social media, and a strong website.",
      focus: "Creating genuine interest and qualified leads",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      tactics: [
        "Targeted content marketing",
        "SEO optimization",
        "Social media presence",
        "Value-driven messaging"
      ]
    },
    {
      step: "02",
      icon: Users,
      title: "Engagement",
      description: "Building and maintaining relationships with customers through meaningful interactions that go beyond a single transaction.",
      focus: "Fostering emotional and practical connections",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      tactics: [
        "Personalized communication",
        "Regular touchpoints",
        "Educational content",
        "Responsive support"
      ]
    },
    {
      step: "03",
      icon: TrendingUp,
      title: "Upscaling",
      description: "Encouraging customers to upgrade to more premium services that better meet their evolving needs and increase the overall value of the relationship.",
      focus: "Growing revenue per client",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      tactics: [
        "Value demonstration",
        "Tiered service offerings",
        "Growth consultations",
        "Performance reporting"
      ]
    },
    {
      step: "04",
      icon: Heart,
      title: "Retention",
      description: "Consistently delivering value and exceptional service, building strong relationships through communication and empathy, and actively seeking feedback.",
      focus: "Reducing churn and building loyalty",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      tactics: [
        "Loyalty programs",
        "Proactive support",
        "Regular check-ins",
        "Continuous improvement"
      ]
    }
  ];

  return (
    <section id="strategy" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span className="text-emerald-700 font-semibold text-sm">Our Marketing Approach</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            4-Step Client Success Strategy
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our proven methodology for building lasting client relationships and driving sustainable growth
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="space-y-8">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Connector Line (except for last item) */}
                {index < strategies.length - 1 && (
                  <div className="hidden lg:block absolute left-12 top-32 w-0.5 h-16 bg-gradient-to-b from-emerald-300 to-transparent"></div>
                )}

                <div className={`${strategy.bgColor} rounded-3xl p-8 md:p-10 border-2 border-transparent hover:border-emerald-300 transition-all duration-300 hover:shadow-xl`}>
                  <div className="grid md:grid-cols-[auto_1fr] gap-8">
                    {/* Left Side - Step Number and Icon */}
                    <div className="flex flex-col items-center md:items-start">
                      <div className="relative mb-4">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${strategy.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-gray-100">
                          <span className={`font-bold text-sm bg-gradient-to-r ${strategy.color} bg-clip-text text-transparent`}>
                            {strategy.step}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                      <h3 className="text-3xl font-bold mb-3 text-gray-900">
                        {strategy.title}
                      </h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r ${strategy.color} text-white`}>
                        {strategy.focus}
                      </div>
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {strategy.description}
                      </p>

                      {/* Tactics */}
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${strategy.color}`}></span>
                          Key Tactics
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {strategy.tactics.map((tactic, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${strategy.color}`}></div>
                              <span className="text-gray-700 text-sm">{tactic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Our Proven Strategy?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Let us help you attract, engage, upscale, and retain more clients with our comprehensive approach.
            </p>
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl">
              Schedule a Strategy Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
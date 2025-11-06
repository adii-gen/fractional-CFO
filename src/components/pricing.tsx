'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      name: "Startup",
      tagline: "For Early-Stage Companies",
      price: { monthly: "6,000", annual: "60,000" },
      currency: "AED",
      popular: false,
      features: [
        "Basic financial statements",
        "Monthly reconciliation",
        "Tax registration support",
        "Up to 500 transactions/month",
        "Quarterly financial reviews",
        "Email support",
        "Cloud-based access"
      ],
      cta: "Start Free Trial",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "SME",
      tagline: "For Growing Businesses",
      price: { monthly: "60,000", annual: "600,000" },
      currency: "AED",
      popular: true,
      features: [
        "Everything in Startup",
        "Advanced financial modeling",
        "Monthly financial reviews",
        "Up to 2000 transactions/month",
        "Cash flow forecasting",
        "Investor reporting",
        "Priority support",
        "Dedicated CFO consultant"
      ],
      cta: "Get Started",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Corporate",
      tagline: "For Established Enterprises",
      price: { monthly: "120,000", annual: "1,200,000" },
      currency: "AED",
      popular: false,
      features: [
        "Everything in SME",
        "Unlimited transactions",
        "Weekly financial reviews",
        "Strategic planning sessions",
        "Board presentation materials",
        "Multi-entity consolidation",
        "24/7 priority support",
        "On-site consultations"
      ],
      cta: "Contact Sales",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="pricing" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 bg-emerald-100 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span className="text-emerald-700 font-semibold text-sm">Flexible Pricing</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Choose the Right Plan for Your Business
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-8">
            Transparent pricing with no hidden fees. Start with the plan that fits your needs and scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-500 shadow-2xl scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`bg-gradient-to-r ${plan.color} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.tagline}</p>
                
                <div className="mb-6">
                  <span className="text-gray-600 text-sm">{plan.currency}</span>
                  <span className="text-5xl font-bold text-gray-900 mx-1">
                    {billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                  </span>
                  <span className="text-gray-600 text-sm">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-semibold text-gray-900 mb-4">What's included:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">30 Days</div>
              <p className="text-gray-600">Money-back guarantee</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">24/7</div>
              <p className="text-gray-600">Customer support</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">Free</div>
              <p className="text-gray-600">Initial consultation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// 'use client';

// import React, { useState } from 'react';
// import { Rocket, Building2, Scale, Check, ArrowRight, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function SegmentsAndPricing() {
//   const [activeSegment, setActiveSegment] = useState(1);
//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [hoveredFeature, setHoveredFeature] = useState(null);

//   const segments = [
//     {
//       type: "Startups",
//       icon: Rocket,
//       color: "from-blue-500 to-blue-600",
//       bgColor: "bg-blue-50",
//       borderColor: "border-blue-200",
//       goal: "Start & Establish",
//       structure: "Simple",
//       headCount: "Less than 3",
//       transactions: "Less than 200/yr",
//       revenue: "Less than AED 600K/yr",
//       budget: "Less than AED 6,000/yr",
//       compliance: "Low",
//       price: { monthly: "300", annual: "3,000" },
//       features: [
//         {
//           name: "Business Setup",
//           description: "Free Zone & Mainland in Dubai, Sharjah, Ajman, RAK, UAQ, Fujairah & Abu Dhabi."
//         },
//         {
//           name: "Finding Virtual, Rented & Owned Office",
//           description: "Corporate Tax & VAT Registration & Filing"
//         },
//         {
//           name: "Book Keeping",
//           description: "200 Annual Transactions of Sales, Purchase, Receipts, Payments & other business transactions. For additional transactions a charge of AED 5 per transaction."
//         },
//         {
//           name: "Bank Account Opening Assistance",
//           description: "Corporate Tax & VAT Registration & Filing"
//         },
//         {
//           name: "Payroll",
//           description: "Details of up to 2 employees with personal, educational, skills & knowledge, salaries, benefits & attendance with monthly salary processing. For additional employees, a charge of AED 100 per year."
//         },
//         {
//           name: "Collecting & Storing Digital Documents & Transaction Records",
//           description: "Corporate Tax & VAT Registration & Filing"
//         },

//         {
//           name: "Corporate Tax & VAT Registration & Filing",
//           description: "Corporate Tax & VAT Registration & Filing"
//         },
//         {
//           name: "Providing Accounting Software Tally on Cloud",
//           description: "Corporate Tax & VAT Registration & Filing"
//         }
//       ]

//     },
//     {
//       type: "SME",
//       icon: Building2,
//       color: "from-emerald-500 to-emerald-600",
//       bgColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       goal: "Stabilize & Control",
//       structure: "Moderate",
//       headCount: "0-10",
//       transactions: "Less than 800/yr",
//       revenue: "Less than AED 5M/yr",
//       budget: "Less than AED 60K/yr",
//       compliance: "Moderate",
//       popular: true,
//       price: { monthly: "1,200", annual: "12,000" },
//       features: [
//         "Everything in Startup",
//         "Advanced financial modeling",
//         "Monthly financial reviews",
//         "Up to 65 transactions/month",
//         "Cash flow forecasting",
//         "Investor reporting",
//         "Dedicated CFO consultant"
//       ]
//     },
//     {
//       type: "Corporates",
//       icon: Scale,
//       color: "from-purple-500 to-purple-600",
//       bgColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       goal: "Sustain & Grow",
//       structure: "Complex",
//       headCount: "Over 25",
//       transactions: "Over 2000",
//       revenue: "Over AED 5M",
//       budget: "Over AED 120K",
//       compliance: "High",
//       price: { monthly: "120,000", annual: "1,200,000" },
//       features: [
//         "Everything in SME",
//         "Unlimited transactions",
//         "Weekly financial reviews",
//         "Strategic planning sessions",
//         "Board presentations",
//         "Multi-entity consolidation",
//         "24/7 priority support"
//       ]
//     }
//   ];

//   const currentSegment = segments[activeSegment];
//   const Icon = currentSegment.icon;

//   return (
//     <section id="segments" className="py-8 bg-white">
//       <div className="max-w-full mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4 text-gray-900">
//             Choose Your Perfect Plan
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto text-lg">
//             Tailored solutions for every business stage with transparent pricing
//           </p>
//         </div>

//         {/* Segment Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {segments.map((segment, index) => {
//             const SegmentIcon = segment.icon;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setActiveSegment(index)}
//                 className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeSegment === index
//                   ? `bg-gradient-to-r ${segment.color} text-white shadow-lg scale-105`
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//               >
//                 <SegmentIcon className="h-5 w-5" />
//                 {segment.type}
//               </button>
//             );
//           })}
//         </div>

//         {/* Billing Toggle */}


//         {/* Combined Segment Details & Pricing */}
//         <div className={`${currentSegment.bgColor} rounded-3xl p-8 border-2 ${currentSegment.borderColor} relative`}>
//           {/* Popular Badge */}
//           {currentSegment.popular && (
//             <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//               <div className={`bg-gradient-to-r ${currentSegment.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
//                 <Sparkles className="h-4 w-4" />
//                 Most Popular
//               </div>
//             </div>
//           )}

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Left Side - Segment Specifications */}
//             <div>
//               <div className="flex items-center gap-4 mb-6">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSegment.color} flex items-center justify-center`}>
//                   <Icon className="h-8 w-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-4xl font-bold text-gray-900">{currentSegment.type}</h3>
//                   <p className={`text-sm font-semibold bg-gradient-to-r ${currentSegment.color} bg-clip-text text-transparent`}>
//                     {currentSegment.goal}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
//                 {[
//                   { label: "Structure", value: currentSegment.structure },
//                   { label: "Head Count", value: currentSegment.headCount },
//                   { label: "Transactions", value: currentSegment.transactions },
//                   { label: "Revenue", value: currentSegment.revenue },
//                   { label: "Budget", value: currentSegment.budget },
//                   { label: "Compliance", value: currentSegment.compliance }
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                     <span className="text-sm text-gray-600">{item.label}</span>
//                     <span className="font-semibold text-gray-900">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Side - Pricing & Features */}
//             <div className=" rounded-xl px-6 py-2">
//               <div className="flex justify-center mb-8">
//                 <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
//                   <button
//                     onClick={() => setBillingCycle('monthly')}
//                     className={`px-6 py-2 rounded-md font-semibold transition-all ${billingCycle === 'monthly'
//                       ? 'bg-white text-emerald-700 shadow-md'
//                       : 'text-gray-600'
//                       }`}
//                   >
//                     Monthly
//                   </button>
//                   <button
//                     onClick={() => setBillingCycle('annual')}
//                     className={`px-6 py-2 rounded-md font-semibold transition-all ${billingCycle === 'annual'
//                       ? 'bg-white text-emerald-700 shadow-md'
//                       : 'text-gray-600'
//                       }`}
//                   >
//                     Annual
//                     <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
//                       Save 20%
//                     </span>
//                   </button>
//                 </div>
//               </div>
//               {/* Price */}
//               <div className='bg-white  rounded-xl px-6 py-2 shadow-sm'>
//                 <div className="text-center mb-6 pb-18 border-b border-gray-200">
//                   <div className="mb-2">
//                     <span className="text-gray-600 text-sm">AED</span>
//                     <span className="text-5xl font-bold text-gray-900 mx-1">
//                       {billingCycle === 'monthly' ? currentSegment.price.monthly : currentSegment.price.annual}
//                     </span>
//                     <span className="text-gray-600 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
//                   </div>
//                   <Button
//                     className={`w-full mt-4 bg-gradient-to-r ${currentSegment.color} text-white hover:opacity-90`}
//                     size="lg"
//                   >
//                     Get Started
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </div>

//                 {/* Features */}
//                 {/* <div>
//                 <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
//                 <div className="space-y-3">
//                   {currentSegment.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-start gap-3">
//                       <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                         <Check className="h-3 w-3 text-white" />
//                       </div>
//                       <span className="text-sm text-gray-700">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
//                   <div className="space-y-3">
//                     {currentSegment.features.reduce((rows: any[], feature, idx) => {
//                       if (idx % 2 === 0) rows.push([feature, currentSegment.features[idx + 1]]);
//                       return rows;
//                     }, []).map((pair, rowIdx) => (
//                       <div key={rowIdx} className="flex justify-between">
//                         {/* Left feature */}
//                         <div
//                           className="flex items-start gap-2 relative group flex-1 pr-2"
//                           onMouseEnter={() => setHoveredFeature(pair[0].name || pair[0])}
//                           onMouseLeave={() => setHoveredFeature(null)}
//                         >
//                           <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                             <Check className="h-3 w-3 text-white" />
//                           </div>
//                           <span className="text-sm text-gray-700 cursor-help">
//                             {pair[0].name || pair[0]}
//                           </span>

//                           {/* Tooltip */}
//                           {hoveredFeature === (pair[0].name || pair[0]) && (
//                             <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
//                               <p className="font-semibold mb-1">{pair[0].name || pair[0]}</p>
//                               <p>{pair[0].description || `Detailed information about ${pair[0].toLowerCase()}`}</p>
//                               <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Right feature */}
//                         {pair[1] && (
//                           <div
//                             className="flex items-start gap-2 relative group flex-1 pl-2"
//                             onMouseEnter={() => setHoveredFeature(pair[1].name || pair[1])}
//                             onMouseLeave={() => setHoveredFeature(null)}
//                           >
//                             <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                               <Check className="h-3 w-3 text-white" />
//                             </div>
//                             <span className="text-sm text-gray-700 cursor-help">
//                               {pair[1].name || pair[1]}
//                             </span>

//                             {/* Tooltip */}
//                             {hoveredFeature === (pair[1].name || pair[1]) && (
//                               <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
//                                 <p className="font-semibold mb-1">{pair[1].name || pair[1]}</p>
//                                 <p>{pair[1].description || `Detailed information about ${pair[1].toLowerCase()}`}</p>
//                                 <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Info */}
//         <div className="mt-8 grid md:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
//             <div className="text-3xl font-bold text-emerald-700 mb-2">30 Days</div>
//             <p className="text-gray-600 text-sm">Money-back guarantee</p>
//           </div>
//           <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
//             <div className="text-3xl font-bold text-emerald-700 mb-2">24/7</div>
//             <p className="text-gray-600 text-sm">Customer support</p>
//           </div>
//           <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
//             <div className="text-3xl font-bold text-emerald-700 mb-2">Free</div>
//             <p className="text-gray-600 text-sm">Initial consultation</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { Rocket, Building2, Scale, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  id: string;
  planName: string;
  tagline: string;
  structure: string;
  headCount: string;
  transactions: string;
  revenue: string;
  budget: string;
  compliance: string;
  monthlyPrice: string;
  annualPrice: string;
  currency: string;
  discountPercentage: number;
  includedFeatures: string[];
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

interface Segment {
  id: string;
  type: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  goal: string;
  structure: string;
  headCount: string;
  transactions: string;
  revenue: string;
  budget: string;
  compliance: string;
  popular: boolean;
  price: {
    monthly: string;
    annual: string;
  };
  discountPercentage: number;
  currency: string;
  features: Array<{
    name: string;
    description: string;
  }>;
  isActive: boolean;
}

export default function SegmentsAndPricing() {
  const [activeSegment, setActiveSegment] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/pricing-plans');
      const result = await response.json();

      if (!result.success) {
        throw new Error('Failed to fetch plans');
      }

      const mappedSegments = mapApiDataToSegments(result.data);
      setSegments(mappedSegments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const mapApiDataToSegments = (apiPlans: PricingPlan[]): Segment[] => {
    const iconMap = {
      'Startups': Rocket,
      'SME': Building2,
      'Corporates': Scale
    };

    const colorMap = {
      'Startups': {
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      'SME': {
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200"
      },
      'Corporates': {
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      }
    };

    return apiPlans
      .sort((a, b) => a.order - b.order)
      .map(plan => {
        const planName = plan.planName as keyof typeof colorMap;
        
        return {
          id: plan.id,
          type: plan.planName,
          icon: iconMap[planName] || Building2,
          color: colorMap[planName]?.color || "from-gray-500 to-gray-600",
          bgColor: colorMap[planName]?.bgColor || "bg-gray-50",
          borderColor: colorMap[planName]?.borderColor || "border-gray-200",
          goal: plan.tagline,
          structure: plan.structure,
          headCount: plan.headCount,
          transactions: plan.transactions,
          revenue: plan.revenue,
          budget: plan.budget,
          compliance: plan.compliance,
          popular: plan.isFeatured,
          price: {
            monthly: parseFloat(plan.monthlyPrice).toLocaleString(),
            annual: parseFloat(plan.annualPrice).toLocaleString()
          },
          discountPercentage: plan.discountPercentage,
          currency: plan.currency,
          features: plan.includedFeatures.map(feature => ({
            name: feature.split(' - ')[0],
            description: feature.split(' - ')[1] || feature
          })),
          isActive: plan.isActive
        };
      });
  };

  if (loading) {
    return (
      <section id="segments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="segments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading pricing plans: {error}</p>
            <Button onClick={fetchPlans} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (segments.length === 0) {
    return (
      <section id="segments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p>No pricing plans available</p>
          </div>
        </div>
      </section>
    );
  }

  const currentSegment = segments[activeSegment];
  const Icon = currentSegment.icon;

  const specificationItems = [
    { label: "Structure", value: currentSegment.structure },
    { label: "Head Count", value: currentSegment.headCount },
    { label: "Transactions", value: currentSegment.transactions },
    { label: "Revenue", value: currentSegment.revenue },
    { label: "Budget", value: currentSegment.budget },
    { label: "Compliance", value: currentSegment.compliance }
  ];

  const featurePairs = [];
  for (let i = 0; i < currentSegment.features.length; i += 2) {
    featurePairs.push([
      currentSegment.features[i],
      currentSegment.features[i + 1]
    ]);
  }

  return (
    <section id="segments" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Tailored solutions for every business stage with transparent pricing
          </p>
        </div>

        {/* Segment Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {segments.map((segment, index) => {
            const SegmentIcon = segment.icon;
            return (
              <button
                key={segment.id}
                onClick={() => setActiveSegment(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
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

        {/* Main Content */}
        <div className={`${currentSegment.bgColor} rounded-3xl px-8 py-8 pb-2 border-2 ${currentSegment.borderColor} relative`}>
          {currentSegment.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className={`bg-gradient-to-r ${currentSegment.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
                <Sparkles className="h-4 w-4" />
                Most Popular
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Specifications */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSegment.color} flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-gray-900">{currentSegment.type}</h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${currentSegment.color} bg-clip-text text-transparent`}>
                    {currentSegment.goal}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
                {specificationItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Pricing & Features */}
            <div className="rounded-xl px-6 py-2">
              {/* Billing Toggle */}
              <div className="flex justify-center mb-8">
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
                      Save {currentSegment.discountPercentage}%
                    </span>
                  </button>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white rounded-xl px-6 py-2 shadow-sm">
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="mb-2">
                    <span className="text-gray-600 text-sm">{currentSegment.currency}</span>
                    <span className="text-5xl font-bold text-gray-900 mx-1">
                      {billingCycle === 'monthly' ? currentSegment.price.monthly : currentSegment.price.annual}
                    </span>
                    <span className="text-gray-600 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${currentSegment.color} text-white hover:opacity-90`}
                    size="lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  <div className="space-y-3">
                    {featurePairs.map((pair, rowIndex) => (
                      <div key={rowIndex} className="flex justify-between">
                        {pair.map((feature, featureIndex) => (
                          feature && (
                            <div
                              key={featureIndex}
                              className="flex items-start gap-2 relative group flex-1 px-2"
                              onMouseEnter={() => setHoveredFeature(feature.name)}
                              onMouseLeave={() => setHoveredFeature(null)}
                            >
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-sm text-gray-700 cursor-help">
                                {feature.name}
                              </span>

                              {hoveredFeature === feature.name && (
                                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                                  <p className="font-semibold mb-1">{feature.name}</p>
                                  <p>{feature.description}</p>
                                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                                </div>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        {/* <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-emerald-700 mb-2">30 Days</div>
            <p className="text-gray-600 text-sm">Money-back guarantee</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-emerald-700 mb-2">24/7</div>
            <p className="text-gray-600 text-sm">Customer support</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-emerald-700 mb-2">Free</div>
            <p className="text-gray-600 text-sm">Initial consultation</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
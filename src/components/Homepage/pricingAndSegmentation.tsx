// 'use client';

// import { useState, useEffect } from 'react';
// import { Rocket, Building2, Scale, Check, ArrowRight, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface PricingPlan {
//   id: string;
//   planName: string;
//   tagline: string;
//   structure: string;
//   headCount: string;
//   transactions: string;
//   revenue: string;
//   budget: string;
//   compliance: string;
//   monthlyPrice: string;
//   annualPrice: string;
//   currency: string;
//   discountPercentage: number;
//   includedFeatures: string[];
//   order: number;
//   isActive: boolean;
//   isFeatured: boolean;
// }

// interface Segment {
//   id: string;
//   type: string;
//   icon: any;
//   color: string;
//   bgColor: string;
//   borderColor: string;
//   goal: string;
//   structure: string;
//   headCount: string;
//   transactions: string;
//   revenue: string;
//   budget: string;
//   compliance: string;
//   popular: boolean;
//   price: {
//     monthly: string;
//     annual: string;
//   };
//   discountPercentage: number;
//   currency: string;
//   features: Array<{
//     name: string;
//     description: string;
//   }>;
//   isActive: boolean;
// }

// export default function SegmentsAndPricing() {
//   const [activeSegment, setActiveSegment] = useState(0);
//   const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
//   const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
//   const [segments, setSegments] = useState<Segment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await fetch('/api/pricing-plans');
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error('Failed to fetch plans');
//       }

//       const mappedSegments = mapApiDataToSegments(result.data);
//       setSegments(mappedSegments);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const mapApiDataToSegments = (apiPlans: PricingPlan[]): Segment[] => {
//     const iconMap = {
//       'Startups': Rocket,
//       'SME': Building2,
//       'Corporates': Scale
//     };

//     const colorMap = {
//       'Startups': {
//         color: "from-blue-500 to-blue-600",
//         bgColor: "bg-blue-50",
//         borderColor: "border-blue-200"
//       },
//       'SME': {
//         color: "from-emerald-500 to-emerald-600",
//         bgColor: "bg-emerald-50",
//         borderColor: "border-emerald-200"
//       },
//       'Corporates': {
//         color: "from-purple-500 to-purple-600",
//         bgColor: "bg-purple-50",
//         borderColor: "border-purple-200"
//       }
//     };

//     return apiPlans
//       .sort((a, b) => a.order - b.order)
//       .map(plan => {
//         const planName = plan.planName as keyof typeof colorMap;
        
//         return {
//           id: plan.id,
//           type: plan.planName,
//           icon: iconMap[planName] || Building2,
//           color: colorMap[planName]?.color || "from-gray-500 to-gray-600",
//           bgColor: colorMap[planName]?.bgColor || "bg-gray-50",
//           borderColor: colorMap[planName]?.borderColor || "border-gray-200",
//           goal: plan.tagline,
//           structure: plan.structure,
//           headCount: plan.headCount,
//           transactions: plan.transactions,
//           revenue: plan.revenue,
//           budget: plan.budget,
//           compliance: plan.compliance,
//           popular: plan.isFeatured,
//           price: {
//             monthly: parseFloat(plan.monthlyPrice).toLocaleString(),
//             annual: parseFloat(plan.annualPrice).toLocaleString()
//           },
//           discountPercentage: plan.discountPercentage,
//           currency: plan.currency,
//           features: plan.includedFeatures.map(feature => ({
//             name: feature.split(' - ')[0],
//             description: feature.split(' - ')[1] || feature
//           })),
//           isActive: plan.isActive
//         };
//       });
//   };

//   if (loading) {
//     return (
//       <section id="segments" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section id="segments" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center text-red-600">
//             <p>Error loading pricing plans: {error}</p>
//             <Button onClick={fetchPlans} className="mt-4">
//               Retry
//             </Button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (segments.length === 0) {
//     return (
//       <section id="segments" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <p>No pricing plans available</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const currentSegment = segments[activeSegment];
//   const Icon = currentSegment.icon;

//   const specificationItems = [
//     { label: "Structure", value: currentSegment.structure },
//     { label: "Head Count", value: currentSegment.headCount },
//     { label: "Transactions", value: currentSegment.transactions },
//     { label: "Revenue", value: currentSegment.revenue },
//     { label: "Budget", value: currentSegment.budget },
//     { label: "Compliance", value: currentSegment.compliance }
//   ];

//   const featurePairs = [];
//   for (let i = 0; i < currentSegment.features.length; i += 2) {
//     featurePairs.push([
//       currentSegment.features[i],
//       currentSegment.features[i + 1]
//     ]);
//   }

//   return (
//     <section id="segments" className="py-10 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Choose Your Perfect Plan
//           </h2>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             Tailored solutions for every business stage with transparent pricing
//           </p>
//         </div>

//         {/* Segment Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {segments.map((segment, index) => {
//             const SegmentIcon = segment.icon;
//             return (
//               <button
//                 key={segment.id}
//                 onClick={() => setActiveSegment(index)}
//                 className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                   activeSegment === index
//                     ? `bg-gradient-to-r ${segment.color} text-white shadow-lg scale-105`
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <SegmentIcon className="h-5 w-5" />
//                 {segment.type}
//               </button>
//             );
//           })}
//         </div>

//         {/* Main Content */}
//         <div className={`${currentSegment.bgColor} rounded-3xl px-8 py-8 pb-2 border-2 ${currentSegment.borderColor} relative`}>
//           {currentSegment.popular && (
//             <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//               <div className={`bg-gradient-to-r ${currentSegment.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
//                 <Sparkles className="h-4 w-4" />
//                 Most Popular
//               </div>
//             </div>
//           )}

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Left Column - Specifications */}
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
//                 {specificationItems.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                     <span className="text-sm text-gray-600">{item.label}</span>
//                     <span className="font-semibold text-gray-900">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Column - Pricing & Features */}
//             <div className="rounded-xl px-6 py-2">
//               {/* Billing Toggle */}
//               <div className="flex justify-center mb-8">
//                 <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
//                   <button
//                     onClick={() => setBillingCycle('monthly')}
//                     className={`px-6 py-2 rounded-md font-semibold transition-all ${
//                       billingCycle === 'monthly'
//                         ? 'bg-white text-emerald-700 shadow-md'
//                         : 'text-gray-600'
//                     }`}
//                   >
//                     Monthly
//                   </button>
//                   <button
//                     onClick={() => setBillingCycle('annual')}
//                     className={`px-6 py-2 rounded-md font-semibold transition-all ${
//                       billingCycle === 'annual'
//                         ? 'bg-white text-emerald-700 shadow-md'
//                         : 'text-gray-600'
//                     }`}
//                   >
//                     Annual
//                     <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
//                       Save {currentSegment.discountPercentage}%
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               {/* Pricing Card */}
//               <div className="bg-white rounded-xl px-6 py-2 shadow-sm">
//                 <div className="text-center mb-6 pb-6 border-b border-gray-200">
//                   <div className="mb-2">
//                     <span className="text-gray-600 text-sm">{currentSegment.currency}</span>
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
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
//                   <div className="space-y-3">
//                     {featurePairs.map((pair, rowIndex) => (
//                       <div key={rowIndex} className="flex justify-between">
//                         {pair.map((feature, featureIndex) => (
//                           feature && (
//                             <div
//                               key={featureIndex}
//                               className="flex items-start gap-2 relative group flex-1 px-2"
//                               onMouseEnter={() => setHoveredFeature(feature.name)}
//                               onMouseLeave={() => setHoveredFeature(null)}
//                             >
//                               <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                                 <Check className="h-3 w-3 text-white" />
//                               </div>
//                               <span className="text-sm text-gray-700 cursor-help">
//                                 {feature.name}
//                               </span>

//                               {hoveredFeature === feature.name && (
//                                 <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
//                                   <p className="font-semibold mb-1">{feature.name}</p>
//                                   <p>{feature.description}</p>
//                                   <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
//                                 </div>
//                               )}
//                             </div>
//                           )
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Info Cards */}
//         {/* <div className="mt-12 grid md:grid-cols-3 gap-6">
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
//         </div> */}
//       </div>
//     </section>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { 
//   Rocket, 
//   Building2, 
//   Scale, 
//   Check, 
//   ArrowRight, 
//   Sparkles,
//   Home, 
//   BookOpen, 
//   Landmark, 
//   FolderArchive, 
//   Calculator,
//   FileText,
//   Settings
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface PricingPlan {
//   id: string;
//   planName: string;
//   tagline: string;
//   structure: string;
//   headCount: string;
//   transactions: string;
//   revenue: string;
//   budget: string;
//   compliance: string;
//   monthlyPrice: string;
//   annualPrice: string;
//   currency: string;
//   discountPercentage: number;
//   includedFeatures: string[];
//   order: number;
//   isActive: boolean;
//   isFeatured: boolean;
// }

// interface Segment {
//   id: string;
//   type: string;
//   icon: any;
//   color: string;
//   bgColor: string;
//   borderColor: string;
//   goal: string;
//   structure: string;
//   headCount: string;
//   transactions: string;
//   revenue: string;
//   budget: string;
//   compliance: string;
//   popular: boolean;
//   price: {
//     monthly: string;
//     annual: string;
//   };
//   discountPercentage: number;
//   currency: string;
//   features: Array<{
//     name: string;
//     description: string;
//   }>;
//   isActive: boolean;
//   serviceFeatures: ServiceFeature[];
// }

// interface ServiceFeature {
//   title: string;
//   description: string;
//   icon: any;
// }

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
// }

// const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color }) => (
//   <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200 group">
//     <div className="flex flex-col items-center text-center">
//       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 ${color}`}>
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   </div>
// );

// // Icon mapping for service features
// const serviceIconMap: { [key: string]: any } = {
//   'Business Setup': Building2,
//   'Finding Virtual, Rented & Owned Office': Home,
//   'Book Keeping': BookOpen,
//   'Bank Account Opening Assistance': Landmark,
//   'Payroll': Calculator,
//   'Collecting & Storing Digital Documents & Transaction Records': FolderArchive,
//   'Corporate Tax & VAT Registration & Filing': FileText,
//   'Providing Accounting Software': Settings,
//   'Advanced financial modeling': Calculator,
//   'Monthly financial reviews': FileText,
//   'Cash flow forecasting': Calculator,
//   'Investor reporting': FileText,
//   'Dedicated CFO consultant': Settings,
//   'Weekly financial reviews': FileText,
//   'Strategic planning sessions': Settings,
//   'Board presentations': FileText,
//   'Multi-entity consolidation': Building2,
//   '24/7 priority support': Settings
// };

// // Default color mapping for service icons
// const defaultServiceColors: { [key: string]: string } = {
//   'Startups': 'bg-gradient-to-br from-blue-500 to-blue-600',
//   'SME': 'bg-gradient-to-br from-emerald-500 to-emerald-600',
//   'Corporates': 'bg-gradient-to-br from-purple-500 to-purple-600'
// };

// export default function CombinedPricingServices() {
//   const [activeSegment, setActiveSegment] = useState(0);
//   const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
//   const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
//   const [segments, setSegments] = useState<Segment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await fetch('/api/pricing-plans');
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error('Failed to fetch plans');
//       }

//       const mappedSegments = mapApiDataToSegments(result.data);
//       setSegments(mappedSegments);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseServiceFeature = (featureString: string): { title: string; description: string } => {
//     // Handle different formats of feature strings
//     if (featureString.includes(' - ')) {
//       const [title, ...descriptionParts] = featureString.split(' - ');
//       return {
//         title: title.trim(),
//         description: descriptionParts.join(' - ').trim()
//       };
//     } else if (featureString.includes(':')) {
//       const [title, ...descriptionParts] = featureString.split(':');
//       return {
//         title: title.trim(),
//         description: descriptionParts.join(':').trim()
//       };
//     } else {
//       // For simple feature names, use them as title and add a generic description
//       return {
//         title: featureString.trim(),
//         description: `Included in your ${featureString.toLowerCase()} services`
//       };
//     }
//   };

//   const mapApiDataToSegments = (apiPlans: PricingPlan[]): Segment[] => {
//     const iconMap = {
//       'Startups': Rocket,
//       'SME': Building2,
//       'Corporates': Scale
//     };

//     const colorMap = {
//       'Startups': {
//         color: "from-blue-500 to-blue-600",
//         bgColor: "bg-blue-50",
//         borderColor: "border-blue-200",
//         serviceColor: "bg-gradient-to-br from-blue-500 to-blue-600"
//       },
//       'SME': {
//         color: "from-emerald-500 to-emerald-600",
//         bgColor: "bg-emerald-50",
//         borderColor: "border-emerald-200",
//         serviceColor: "bg-gradient-to-br from-emerald-500 to-emerald-600"
//       },
//       'Corporates': {
//         color: "from-purple-500 to-purple-600",
//         bgColor: "bg-purple-50",
//         borderColor: "border-purple-200",
//         serviceColor: "bg-gradient-to-br from-purple-500 to-purple-600"
//       }
//     };

//     return apiPlans
//       .sort((a, b) => a.order - b.order)
//       .map(plan => {
//         const planName = plan.planName as keyof typeof colorMap;
        
//         // Map included features to service features
//         const serviceFeatures: ServiceFeature[] = plan.includedFeatures.map(feature => {
//           const { title, description } = parseServiceFeature(feature);
//           const IconComponent = serviceIconMap[title] || Settings;
          
//           return {
//             title,
//             description,
//             icon: IconComponent
//           };
//         });

//         return {
//           id: plan.id,
//           type: plan.planName,
//           icon: iconMap[planName] || Building2,
//           color: colorMap[planName]?.color || "from-gray-500 to-gray-600",
//           bgColor: colorMap[planName]?.bgColor || "bg-gray-50",
//           borderColor: colorMap[planName]?.borderColor || "border-gray-200",
//           goal: plan.tagline,
//           structure: plan.structure,
//           headCount: plan.headCount,
//           transactions: plan.transactions,
//           revenue: plan.revenue,
//           budget: plan.budget,
//           compliance: plan.compliance,
//           popular: plan.isFeatured,
//           price: {
//             monthly: parseFloat(plan.monthlyPrice).toLocaleString(),
//             annual: parseFloat(plan.annualPrice).toLocaleString()
//           },
//           discountPercentage: plan.discountPercentage,
//           currency: plan.currency,
//           features: plan.includedFeatures.map(feature => ({
//             name: feature.split(' - ')[0],
//             description: feature.split(' - ')[1] || feature
//           })),
//           isActive: plan.isActive,
//           serviceFeatures
//         };
//       });
//   };

//   if (loading) {
//     return (
//       <section className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0f7f2]">
//         <div className="max-w-7xl mx-auto px-4 py-20">
//           <div className="text-center">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0f7f2]">
//         <div className="max-w-7xl mx-auto px-4 py-20">
//           <div className="text-center text-red-600">
//             <p>Error loading pricing plans: {error}</p>
//             <Button onClick={fetchPlans} className="mt-4">
//               Retry
//             </Button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const currentSegment = segments[activeSegment] || segments[0];
//   const Icon = currentSegment?.icon || Building2;

//   const specificationItems = currentSegment ? [
//     { label: "Structure", value: currentSegment.structure },
//     { label: "Head Count", value: currentSegment.headCount },
//     { label: "Transactions", value: currentSegment.transactions },
//     { label: "Revenue", value: currentSegment.revenue },
//     { label: "Budget", value: currentSegment.budget },
//     { label: "Compliance", value: currentSegment.compliance }
//   ] : [];

//   const featurePairs = [];
//   if (currentSegment) {
//     for (let i = 0; i < currentSegment.features.length; i += 2) {
//       featurePairs.push([
//         currentSegment.features[i],
//         currentSegment.features[i + 1]
//       ]);
//     }
//   }

//   const getServiceColor = (segmentType: string) => {
//     return defaultServiceColors[segmentType] || 'bg-gradient-to-br from-gray-500 to-gray-600';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0f7f2]">
//       {/* Header Section */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Services & Pricing
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Comprehensive business solutions with transparent pricing for every stage of your growth
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Segment Tabs */}
//       {segments.length > 0 && (
//         <div className="bg-white py-8 border-b">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex flex-wrap justify-center gap-4">
//               {segments.map((segment, index) => {
//                 const SegmentIcon = segment.icon;
//                 return (
//                   <button
//                     key={segment.id}
//                     onClick={() => setActiveSegment(index)}
//                     className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                       activeSegment === index
//                         ? `bg-gradient-to-r ${segment.color} text-white shadow-lg scale-105`
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     <SegmentIcon className="h-5 w-5" />
//                     {segment.type}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Dynamic Services Grid */}
//       {currentSegment && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className={`w-12 h-12 rounded-xl ${getServiceColor(currentSegment.type)} flex items-center justify-center`}>
//                 <Icon className="h-6 w-6 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Services for {currentSegment.type}
//               </h2>
//             </div>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               {currentSegment.goal} - Tailored services for your business needs
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentSegment.serviceFeatures.map((service, index) => (
//               <ServiceCard
//                 key={index}
//                 title={service.title}
//                 description={service.description}
//                 icon={<service.icon size={32} />}
//                 color={getServiceColor(currentSegment.type)}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Pricing Section */}
//       {currentSegment && (
//         <div className="bg-white py-16">
//           <div className="max-w-7xl mx-auto px-4">
//             {/* Pricing Header */}
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold text-gray-900 mb-4">
//                 Pricing for {currentSegment.type}
//               </h2>
//               <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//                 {currentSegment.goal} - Get all the services above at one transparent price
//               </p>
//             </div>

//             {/* Main Pricing Content */}
//             <div className={`${currentSegment.bgColor} rounded-3xl px-8 py-8 pb-2 border-2 ${currentSegment.borderColor} relative max-w-4xl mx-auto`}>
//               {currentSegment.popular && (
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                   <div className={`bg-gradient-to-r ${currentSegment.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
//                     <Sparkles className="h-4 w-4" />
//                     Most Popular
//                   </div>
//                 </div>
//               )}

//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Left Column - Specifications */}
//                 <div>
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSegment.color} flex items-center justify-center`}>
//                       <Icon className="h-8 w-8 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-4xl font-bold text-gray-900">{currentSegment.type}</h3>
//                       <p className={`text-sm font-semibold bg-gradient-to-r ${currentSegment.color} bg-clip-text text-transparent`}>
//                         {currentSegment.goal}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
//                     {specificationItems.map((item, index) => (
//                       <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//                         <span className="text-sm text-gray-600">{item.label}</span>
//                         <span className="font-semibold text-gray-900">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right Column - Pricing & Features */}
//                 <div className="rounded-xl px-6 py-2">
//                   {/* Billing Toggle */}
//                   <div className="flex justify-center mb-8">
//                     <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
//                       <button
//                         onClick={() => setBillingCycle('monthly')}
//                         className={`px-6 py-2 rounded-md font-semibold transition-all ${
//                           billingCycle === 'monthly'
//                             ? 'bg-white text-emerald-700 shadow-md'
//                             : 'text-gray-600'
//                         }`}
//                       >
//                         Monthly
//                       </button>
//                       <button
//                         onClick={() => setBillingCycle('annual')}
//                         className={`px-6 py-2 rounded-md font-semibold transition-all ${
//                           billingCycle === 'annual'
//                             ? 'bg-white text-emerald-700 shadow-md'
//                             : 'text-gray-600'
//                         }`}
//                       >
//                         Annual
//                         <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
//                           Save {currentSegment.discountPercentage}%
//                         </span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Pricing Card */}
//                   <div className="bg-white rounded-xl px-6 py-2 shadow-sm">
//                     <div className="text-center mb-6 pb-6 border-b border-gray-200">
//                       <div className="mb-2">
//                         <span className="text-gray-600 text-sm">{currentSegment.currency}</span>
//                         <span className="text-5xl font-bold text-gray-900 mx-1">
//                           {billingCycle === 'monthly' ? currentSegment.price.monthly : currentSegment.price.annual}
//                         </span>
//                         <span className="text-gray-600 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
//                       </div>
//                       <Button
//                         className={`w-full mt-4 bg-gradient-to-r ${currentSegment.color} text-white hover:opacity-90`}
//                         size="lg"
//                       >
//                         Get Started
//                         <ArrowRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </div>

//                     {/* Features */}
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
//                       <div className="space-y-3">
//                         {featurePairs.map((pair, rowIndex) => (
//                           <div key={rowIndex} className="flex justify-between">
//                             {pair.map((feature, featureIndex) => (
//                               feature && (
//                                 <div
//                                   key={featureIndex}
//                                   className="flex items-start gap-2 relative group flex-1 px-2"
//                                   onMouseEnter={() => setHoveredFeature(feature.name)}
//                                   onMouseLeave={() => setHoveredFeature(null)}
//                                 >
//                                   <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${currentSegment.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
//                                     <Check className="h-3 w-3 text-white" />
//                                   </div>
//                                   <span className="text-sm text-gray-700 cursor-help">
//                                     {feature.name}
//                                   </span>

//                                   {hoveredFeature === feature.name && (
//                                     <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
//                                       <p className="font-semibold mb-1">{feature.name}</p>
//                                       <p>{feature.description}</p>
//                                       <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
//                                     </div>
//                                   )}
//                                 </div>
//                               )
//                             ))}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CTA Section */}
//       <div className="bg-gradient-to-br from-gray-50 to-[#f0f7f2] border-t">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <Rocket size={64} className="mx-auto mb-6 text-gray-700" />
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//               Ready to Get Started?
//             </h2>
//             <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
//               Choose the perfect plan for your business and get started today
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link
//                 href="/contact"
//                 className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 href="/about"
//                 className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  Building2, 
  Scale, 
  Check, 
  ArrowRight, 
  Sparkles,
  Home, 
  BookOpen, 
  Landmark, 
  FolderArchive, 
  Calculator,
  FileText,
  Settings
} from 'lucide-react';
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
  serviceFeatures: ServiceFeature[];
}

interface ServiceFeature {
  title: string;
  description: string;
  icon: any;
}

const serviceIconMap: { [key: string]: any } = {
  'Business Setup': Building2,
  'Finding Virtual, Rented & Owned Office': Home,
  'Book Keeping': BookOpen,
  'Bank Account Opening Assistance': Landmark,
  'Payroll': Calculator,
  'Collecting & Storing Digital Documents & Transaction Records': FolderArchive,
  'Corporate Tax & VAT Registration & Filing': FileText,
  'Providing Accounting Software': Settings,
  'Advanced financial modeling': Calculator,
  'Monthly financial reviews': FileText,
  'Cash flow forecasting': Calculator,
  'Investor reporting': FileText,
  'Dedicated CFO consultant': Settings,
  'Weekly financial reviews': FileText,
  'Strategic planning sessions': Settings,
  'Board presentations': FileText,
  'Multi-entity consolidation': Building2,
  '24/7 priority support': Settings
};

export default function MinimalPricingServices() {
  const [activeSegment, setActiveSegment] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
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

  const parseServiceFeature = (featureString: string): { title: string; description: string } => {
    if (featureString.includes(' - ')) {
      const [title, ...descriptionParts] = featureString.split(' - ');
      return {
        title: title.trim(),
        description: descriptionParts.join(' - ').trim()
      };
    } else if (featureString.includes(':')) {
      const [title, ...descriptionParts] = featureString.split(':');
      return {
        title: title.trim(),
        description: descriptionParts.join(':').trim()
      };
    } else {
      return {
        title: featureString.trim(),
        description: `Included in your ${featureString.toLowerCase()} services`
      };
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
        
        const serviceFeatures: ServiceFeature[] = plan.includedFeatures.map(feature => {
          const { title, description } = parseServiceFeature(feature);
          const IconComponent = serviceIconMap[title] || Settings;
          
          return {
            title,
            description,
            icon: IconComponent
          };
        });

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
          isActive: plan.isActive,
          serviceFeatures
        };
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchPlans}>Retry</Button>
        </div>
      </div>
    );
  }

  const currentSegment = segments[activeSegment] || segments[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Pricing & Services
          </h1>
          <p className="text-gray-600 text-center">
            Transparent pricing for every stage of growth
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      {segments.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3">
              <span className="text-sm text-gray-600">Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900 font-medium">Annual</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  -20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {segments.map((segment, index) => {
              const SegmentIcon = segment.icon;
              return (
                <div
                  key={segment.id}
                  className={`relative bg-white rounded-2xl border-2 p-6 ${
                    segment.popular ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  {segment.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{segment.type}</h3>
                    <p className="text-sm text-gray-600">{segment.goal}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {billingCycle === 'monthly' ? segment.price.monthly : segment.price.annual}
                      </span>
                      <span className="text-gray-600 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Billed {billingCycle === 'monthly' ? 'monthly' : 'annually'}
                    </p>
                  </div>

                  <Button 
                    className={`w-full mb-6 ${
                      segment.popular 
                        ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900'
                    }`}
                  >
                    Get Started
                  </Button>

                  {/* Specifications */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Structure</span>
                        <span className="font-medium text-gray-900">{segment.structure}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Head Count</span>
                        <span className="font-medium text-gray-900">{segment.headCount}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Transactions</span>
                        <span className="font-medium text-gray-900">{segment.transactions}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-medium text-gray-900">{segment.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Budget</span>
                        <span className="font-medium text-gray-900">{segment.budget}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Compliance</span>
                        <span className="font-medium text-gray-900">{segment.compliance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Services Section with Tabs */}
      {segments.length > 0 && (
        <div className="border-t bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What's Included
            </h2>

            {/* Service Plan Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {segments.map((segment, index) => {
                const SegmentIcon = segment.icon;
                return (
                  <button
                    key={segment.id}
                    onClick={() => setActiveSegment(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSegment === index
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <SegmentIcon className="h-4 w-4" />
                    {segment.type}
                  </button>
                );
              })}
            </div>
            
            {currentSegment && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentSegment.serviceFeatures.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border hover:border-gray-300 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentSegment.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{service.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Minimal CTA */}
     
    </div>
  );
}
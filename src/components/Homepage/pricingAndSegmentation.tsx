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
                  onClick={() => setActiveSegment(index)}
                  className={`relative bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    activeSegment === index ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
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
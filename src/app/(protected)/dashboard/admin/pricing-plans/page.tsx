'use client';

import { useState, useEffect } from 'react';
import { Edit, Save, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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

export default function PricingPlansEditor() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/pricing-plans');
      const result = await response.json();
      
      if (result.success) {
        setPlans(result.data.sort((a: PricingPlan, b: PricingPlan) => a.order - b.order));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan({ ...plan });
  };

  const handleSave = async () => {
  if (!editingPlan) return;

//   setSaving(true);
  try {
    const response = await fetch(`/api/pricing-plans/${editingPlan.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planName: editingPlan.planName,
        tagline: editingPlan.tagline,
        structure: editingPlan.structure,
        headCount: editingPlan.headCount,
        transactions: editingPlan.transactions,
        revenue: editingPlan.revenue,
        budget: editingPlan.budget,
        compliance: editingPlan.compliance,
        monthlyPrice: editingPlan.monthlyPrice,
        annualPrice: editingPlan.annualPrice,
        currency: editingPlan.currency,
        discountPercentage: editingPlan.discountPercentage,
        includedFeatures: editingPlan.includedFeatures,
        order: editingPlan.order,
        isActive: editingPlan.isActive,
        isFeatured: editingPlan.isFeatured
      }),
    });

    const result = await response.json();

    if (result.success) {
      await fetchPlans();
      setEditingPlan(null);
      setNewFeature('');
    } else {
      console.error('Failed to update plan:', result.error);
      alert('Failed to update plan: ' + result.error);
    }
  } catch (error) {
    console.error('Error updating plan:', error);
    alert('Error updating plan');
  } finally {
    // setSaving(false);
  }
};

  const handleCancel = () => {
    setEditingPlan(null);
    setNewFeature('');
  };

  const handleMoveOrder = async (id: string, direction: 'up' | 'down') => {
    const planIndex = plans.findIndex(p => p.id === id);
    if (planIndex === -1) return;

    const newIndex = direction === 'up' ? planIndex - 1 : planIndex + 1;
    if (newIndex < 0 || newIndex >= plans.length) return;

    const updatedPlans = [...plans];
    const [movedPlan] = updatedPlans.splice(planIndex, 1);
    updatedPlans.splice(newIndex, 0, movedPlan);

    const reorderedPlans = updatedPlans.map((plan, index) => ({
      ...plan,
      order: index + 1
    }));

    setPlans(reorderedPlans);

    try {
      await fetch('/api/pricing-plans/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orders: reorderedPlans.map(p => ({ id: p.id, order: p.order }))
        }),
      });
    } catch (error) {
      console.error('Error reordering plans:', error);
      await fetchPlans();
    }
  };

  const addFeature = () => {
    if (!editingPlan || !newFeature.trim()) return;

    setEditingPlan({
      ...editingPlan,
      includedFeatures: [...editingPlan.includedFeatures, newFeature.trim()]
    });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    if (!editingPlan) return;

    setEditingPlan({
      ...editingPlan,
      includedFeatures: editingPlan.includedFeatures.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Pricing Plans</h1>
          <p className="text-gray-600 mt-2">Manage your existing pricing plans</p>
        </div>

        {/* Plans List */}
        <div className="space-y-6">
          {plans.map((plan, index) => (
            <div key={plan.id} className="bg-white rounded-lg shadow border p-6">
              {editingPlan?.id === plan.id ? (
                /* Edit Form */
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Editing: {plan.planName}</h3>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="planName">Plan Name</Label>
                        <Input
                          id="planName"
                          value={editingPlan.planName}
                          onChange={(e) => setEditingPlan({ ...editingPlan, planName: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                          id="tagline"
                          value={editingPlan.tagline}
                          onChange={(e) => setEditingPlan({ ...editingPlan, tagline: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="structure">Structure</Label>
                        <select
                          id="structure"
                          value={editingPlan.structure}
                          onChange={(e) => setEditingPlan({ ...editingPlan, structure: e.target.value })}
                          className="w-full border rounded-md px-3 py-2"
                        >
                          <option value="Simple">Simple</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Complex">Complex</option>
                        </select>
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingPlan.isActive}
                            onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, isActive: checked })}
                          />
                          <Label>Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingPlan.isFeatured}
                            onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, isFeatured: checked })}
                          />
                          <Label>Featured</Label>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="monthlyPrice">Monthly Price (AED)</Label>
                        <Input
                          id="monthlyPrice"
                          type="number"
                          value={editingPlan.monthlyPrice}
                          onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="annualPrice">Annual Price (AED)</Label>
                        <Input
                          id="annualPrice"
                          type="number"
                          value={editingPlan.annualPrice}
                          onChange={(e) => setEditingPlan({ ...editingPlan, annualPrice: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="discountPercentage">Discount Percentage</Label>
                        <Input
                          id="discountPercentage"
                          type="number"
                          value={editingPlan.discountPercentage}
                          onChange={(e) => setEditingPlan({ ...editingPlan, discountPercentage: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="headCount">Head Count</Label>
                      <Input
                        id="headCount"
                        value={editingPlan.headCount}
                        onChange={(e) => setEditingPlan({ ...editingPlan, headCount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="transactions">Transactions</Label>
                      <Input
                        id="transactions"
                        value={editingPlan.transactions}
                        onChange={(e) => setEditingPlan({ ...editingPlan, transactions: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="revenue">Revenue</Label>
                      <Input
                        id="revenue"
                        value={editingPlan.revenue}
                        onChange={(e) => setEditingPlan({ ...editingPlan, revenue: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        value={editingPlan.budget}
                        onChange={(e) => setEditingPlan({ ...editingPlan, budget: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <Label>Included Features</Label>
                    <div className="mt-2 space-y-2">
                      {editingPlan.includedFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <span className="flex-1">{feature}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Input
                        placeholder="Add new feature..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                      />
                      <Button onClick={addFeature}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Plan Display */
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleMoveOrder(plan.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(plan.id, 'down')}
                        disabled={index === plans.length - 1}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{plan.planName}</h3>
                        {plan.isFeatured && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {!plan.isActive && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{plan.tagline}</p>
                      <div className="flex space-x-4 mt-1 text-sm text-gray-500">
                        <span>AED {plan.monthlyPrice}/month</span>
                        <span>•</span>
                        <span>{plan.discountPercentage}% discount</span>
                        <span>•</span>
                        <span>Order: {plan.order}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleEdit(plan)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


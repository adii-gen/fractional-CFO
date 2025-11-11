// app/api/pricing-plans/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { PricingPlanTable } from '@/drizzle/schema';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log('Updating plan:', id, body);

    // Update the pricing plan
    const updatedPlan = await db
      .update(PricingPlanTable)
      .set({
        planName: body.planName,
        tagline: body.tagline,
        structure: body.structure,
        headCount: body.headCount,
        transactions: body.transactions,
        revenue: body.revenue,
        budget: body.budget,
        compliance: body.compliance,
        monthlyPrice: body.monthlyPrice,
        annualPrice: body.annualPrice,
        currency: body.currency,
        discountPercentage: body.discountPercentage,
        includedFeatures: body.includedFeatures,
        order: body.order,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        updatedAt: new Date()
      })
      .where(eq(PricingPlanTable.id, id))
      .returning();

    if (updatedPlan.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Pricing plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedPlan[0] 
    });

  } catch (error) {
    console.error('Error updating pricing plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update pricing plan' },
      { status: 500 }
    );
  }
}
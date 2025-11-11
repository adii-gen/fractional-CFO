import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Your database connection
import { eq, asc, and } from 'drizzle-orm';
import { PricingPlanTable } from '@/drizzle/schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');

    // Build where conditions
    // const conditions = [];
    
    // if (isActive !== null) {
    //   conditions.push(eq(PricingPlanTable.isActive, isActive === 'true'));
    // }
    
    // if (isFeatured !== null) {
    //   conditions.push(eq(PricingPlanTable.isFeatured, isFeatured === 'true'));
    // }

    // // Default: only show active plans if no filters specified
    // if (conditions.length === 0) {
    //   conditions.push(eq(PricingPlanTable.isActive, true));
    // }

    const pricingPlans = await db
      .select()
      .from(PricingPlanTable)
    //   .where(and(...conditions))
      .orderBy(asc(PricingPlanTable.order));

    return NextResponse.json({ success: true, data: pricingPlans });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'planName', 'tagline', 'structure', 'headCount', 'transactions',
      'revenue', 'budget', 'compliance', 'monthlyPrice', 'annualPrice',
      'currency', 'discountPercentage', 'includedFeatures', 'order',
      'isActive', 'isFeatured'
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

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
// app/api/pricing-plans/reorder/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { PricingPlanTable } from '@/drizzle/schema';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orders } = body;

    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json(
        { success: false, error: 'Invalid orders data' },
        { status: 400 }
      );
    }

    // Update each plan's order individually
    for (const { id, order } of orders) {
      await db
        .update(PricingPlanTable)
        .set({ 
          order,
          updatedAt: new Date()
        })
        .where(eq(PricingPlanTable.id, id));
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Plans reordered successfully' 
    });

  } catch (error) {
    console.error('Error reordering pricing plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder pricing plans' },
      { status: 500 }
    );
  }
}
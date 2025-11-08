import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { UserTable } from '@/drizzle/schema';

// GET /api/consultants - Get all active consultants
export async function GET(request: NextRequest) {
  try {
    const consultants = await db
      .select({
        id: UserTable.id,
        name: UserTable.name,
        email: UserTable.email,
        profilePic: UserTable.profilePic,
        pricePerMinute: UserTable.pricePerMinute,
        phone: UserTable.phone,
      })
      .from(UserTable)
      .where(eq(UserTable.role, 'CONSULTANT'));

    return NextResponse.json({ consultants });
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq, and, gte, lte } from 'drizzle-orm';
import { ConsultationBookingTable } from '@/drizzle/schema';

// GET /api/bookings - Get user's bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let conditions = [eq(ConsultationBookingTable.userEmail, userEmail)];

    if (startDate && endDate) {
      conditions.push(
        gte(ConsultationBookingTable.startTime, new Date(startDate)),
        lte(ConsultationBookingTable.endTime, new Date(endDate))
      );
    }

    const bookings = await db
      .select()
      .from(ConsultationBookingTable)
      .where(and(...conditions))
      .orderBy(ConsultationBookingTable.startTime);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      title,
      description,
      startTime,
      endTime,
      timezone = 'UTC',
      userEmail,
      userName,
      userPhone,
    } = body;

    // Validate required fields
    if (!type || !title || !startTime || !endTime || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slot is available
    const conflictingBookings = await db
      .select()
      .from(ConsultationBookingTable)
      .where(
        and(
          gte(ConsultationBookingTable.startTime, new Date(startTime)),
          lte(ConsultationBookingTable.endTime, new Date(endTime)),
          eq(ConsultationBookingTable.status, 'CONFIRMED')
        )
      );

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Time slot is no longer available' },
        { status: 409 }
      );
    }

    // Create booking
    const [booking] = await db
      .insert(ConsultationBookingTable)
      .values({
        type,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        timezone,
        userEmail,
        userName: userName || userEmail,
        userPhone,
        status: 'PENDING',
      })
      .returning();

    // TODO: Send confirmation email
    // TODO: Send notification to admin

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
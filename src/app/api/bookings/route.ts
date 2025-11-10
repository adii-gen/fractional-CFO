import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq, and, gte, lte } from 'drizzle-orm';
import { ConsultationBookingTable, UserTable } from '@/drizzle/schema';

// GET /api/bookings - Get user's bookings
export async function GET(request: NextRequest) {
  try {
   

    // if (startDate && endDate) {
    //   conditions.push(
    //     gte(ConsultationBookingTable.startTime, new Date(startDate)),
    //     lte(ConsultationBookingTable.endTime, new Date(endDate))
    //   );
    // }

    const bookings = await db
      .select()
      .from(ConsultationBookingTable)
    
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
      consultantId,
      type,
      title,
      description,
      date,
      startTime,
      endTime,
      timezone = 'UTC',
      userEmail,
      userName,
      userPhone,
      userId,
    } = body;

    // Validate required fields
    if (!consultantId || !date || !startTime || !endTime || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get consultant's price
    const [consultant] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, consultantId));

    if (!consultant) {
      return NextResponse.json({ error: 'Consultant not found' }, { status: 404 });
    }

    // Parse times and calculate duration
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startDateTime = new Date(date);
    startDateTime.setHours(startHour, startMin, 0, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMin, 0, 0);

    const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
    const pricePerMinute = consultant.pricePerMinute ? parseFloat(consultant.pricePerMinute as any) : 0;
    const totalPrice = durationMinutes * pricePerMinute;

    // Check if slot is still available
    const conflictingBookings = await db
      .select()
      .from(ConsultationBookingTable)
      .where(
        and(
          eq(ConsultationBookingTable.consultantId, consultantId),
          gte(ConsultationBookingTable.startTime, startDateTime),
          lte(ConsultationBookingTable.startTime, endDateTime),
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
        userId: userId || null,
        consultantId,
        type: type || 'DISCOVERY_CALL',
        title: title || 'Consultation',
        description: description || '',
        startTime: startDateTime,
        endTime: endDateTime,
        timezone,
        durationMinutes,
        pricePerMinute: pricePerMinute.toString(),
        totalPrice: totalPrice.toString(),
        currency: 'AED',
        userEmail,
        userName: userName || userEmail,
        userPhone,
        status: 'CONFIRMED',
      })
      .returning();

    return NextResponse.json({ booking, message: 'Booking created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

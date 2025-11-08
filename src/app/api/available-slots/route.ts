// app/api/available-slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AvailableSlotTable, ConsultationBookingTable } from '@/drizzle/schema';
import { and, gte, lte, eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const consultationType = searchParams.get('type');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);

    // Get available slots for the date
    const availableSlots = await db
      .select()
      .from(AvailableSlotTable)
      .where(
        and(
          eq(AvailableSlotTable.date, targetDate),
          eq(AvailableSlotTable.isAvailable, true),
          consultationType 
            ? eq(AvailableSlotTable.consultationType, consultationType as any)
            : undefined
        )
      )
      .orderBy(AvailableSlotTable.startTime);

    // Get existing bookings for the date to check availability
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBookings = await db
      .select()
      .from(ConsultationBookingTable)
      .where(
        and(
          gte(ConsultationBookingTable.startTime, startOfDay),
          lte(ConsultationBookingTable.endTime, endOfDay),
          eq(ConsultationBookingTable.status, 'CONFIRMED')
        )
      );

    // Filter out slots that are fully booked
    const availableSlotsWithCount = availableSlots.map(slot => {
      const slotBookings = existingBookings.filter(
        booking => 
          booking.startTime.getTime() === slot.startTime.getTime() &&
          booking.endTime.getTime() === slot.endTime.getTime()
      );
      
      return {
        ...slot,
        availableSpots: slot.maxBookings - slotBookings.length,
        isFullyBooked: slotBookings.length >= slot.maxBookings,
      };
    });

    return NextResponse.json({ 
      slots: availableSlotsWithCount.filter(slot => !slot.isFullyBooked)
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
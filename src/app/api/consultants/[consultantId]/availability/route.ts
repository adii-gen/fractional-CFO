import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq, and, gte, lte, between } from 'drizzle-orm';
import {
  ConsultantWeeklyScheduleTable,
  ConsultantBlockedDatesTable,
  ConsultationBookingTable,
} from '@/drizzle/schema';

type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

const DAY_MAP: Record<number, DayOfWeek> = {
  1: 'MONDAY',
  2: 'TUESDAY',
  3: 'WEDNESDAY',
  4: 'THURSDAY',
  5: 'FRIDAY',
  6: 'SATURDAY',
  0: 'SUNDAY',
};

// Helper function to check if time overlaps with booking
function isTimeSlotAvailable(
  date: Date,
  startTime: string,
  endTime: string,
  bookings: any[]
): boolean {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const slotStart = new Date(date);
  slotStart.setHours(startHour, startMin, 0, 0);

  const slotEnd = new Date(date);
  slotEnd.setHours(endHour, endMin, 0, 0);

  for (const booking of bookings) {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    // Check for overlap
    if (
      (slotStart >= bookingStart && slotStart < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (slotStart <= bookingStart && slotEnd >= bookingEnd)
    ) {
      return false;
    }
  }

  return true;
}

// Helper to generate time slots
function generateTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number = 30
): string[] {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const timeSlot = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
    slots.push(timeSlot);

    currentMin += slotDuration;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }

  return slots;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { consultantId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode'); // 'dates' or 'slots'
    const dateStr = searchParams.get('date'); // For 'slots' mode

    const consultantId = params.consultantId;

    if (mode === 'dates') {
      // Get available dates for next 60 days
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 60);

      // Get consultant's weekly schedule
      const weeklySchedule = await db
        .select()
        .from(ConsultantWeeklyScheduleTable)
        .where(
          and(
            eq(ConsultantWeeklyScheduleTable.consultantId, consultantId),
            eq(ConsultantWeeklyScheduleTable.isActive, true)
          )
        );

      if (weeklySchedule.length === 0) {
        return NextResponse.json({ availableDates: [] });
      }

      // Get blocked dates
      const blockedDates = await db
        .select()
        .from(ConsultantBlockedDatesTable)
        .where(
          and(
            eq(ConsultantBlockedDatesTable.consultantId, consultantId),
            gte(ConsultantBlockedDatesTable.blockedDate, today.toISOString().split('T')[0]),
            lte(ConsultantBlockedDatesTable.blockedDate, endDate.toISOString().split('T')[0])
          )
        );

      const blockedDateSet = new Set(
        blockedDates
          .filter((bd) => bd.isFullDayBlock)
          .map((bd) => bd.blockedDate)
      );

      // Get days that consultant works
      const workingDays = new Set(weeklySchedule.map((s) => s.dayOfWeek));

      // Generate available dates
      const availableDates: string[] = [];
      const currentDate = new Date(today);

      while (currentDate <= endDate) {
        const dayOfWeek = DAY_MAP[currentDate.getDay()];
        const dateString = currentDate.toISOString().split('T')[0];

        if (workingDays.has(dayOfWeek) && !blockedDateSet.has(dateString)) {
          availableDates.push(dateString);
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return NextResponse.json({ availableDates });
    } else if (mode === 'slots' && dateStr) {
      // Get available time slots for specific date
      const date = new Date(dateStr);
      const dayOfWeek = DAY_MAP[date.getDay()];

      // Get consultant's schedule for this day
      const daySchedule = await db
        .select()
        .from(ConsultantWeeklyScheduleTable)
        .where(
          and(
            eq(ConsultantWeeklyScheduleTable.consultantId, consultantId),
            eq(ConsultantWeeklyScheduleTable.dayOfWeek, dayOfWeek),
            eq(ConsultantWeeklyScheduleTable.isActive, true)
          )
        );

      if (daySchedule.length === 0) {
        return NextResponse.json({ timeSlots: [] });
      }

      // Check if date is blocked
      const blockedDate = await db
        .select()
        .from(ConsultantBlockedDatesTable)
        .where(
          and(
            eq(ConsultantBlockedDatesTable.consultantId, consultantId),
            eq(ConsultantBlockedDatesTable.blockedDate, dateStr)
          )
        );

      if (blockedDate.length > 0 && blockedDate[0].isFullDayBlock) {
        return NextResponse.json({ timeSlots: [] });
      }

      // Get existing bookings for this date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const bookings = await db
        .select()
        .from(ConsultationBookingTable)
        .where(
          and(
            eq(ConsultationBookingTable.consultantId, consultantId),
            gte(ConsultationBookingTable.startTime, startOfDay),
            lte(ConsultationBookingTable.startTime, endOfDay),
            eq(ConsultationBookingTable.status, 'CONFIRMED')
          )
        );

      // Generate available time slots
      const timeSlots: any[] = [];

      for (const schedule of daySchedule) {
        const slots = generateTimeSlots(schedule.startTime, schedule.endTime, 30);

        for (let i = 0; i < slots.length - 1; i++) {
          const slotStart = slots[i];
          const slotEnd = slots[i + 1];

          if (isTimeSlotAvailable(date, slotStart + ':00', slotEnd + ':00', bookings)) {
            timeSlots.push({
              startTime: slotStart,
              endTime: slotEnd,
              pricePerMinute: schedule.pricePerMinute,
              duration: 30, // minutes
              totalPrice: (schedule.pricePerMinute ? parseFloat(schedule.pricePerMinute as any) : 0) * 30,
            });
          }
        }
      }

      return NextResponse.json({ timeSlots, date: dateStr });
    } else {
      return NextResponse.json(
        { error: 'Invalid mode or missing date parameter' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

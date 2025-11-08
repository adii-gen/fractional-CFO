import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { ConsultantWeeklyScheduleTable, UserTable } from '@/drizzle/schema';

// GET /api/consultant/schedule - Get consultant's weekly schedule
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const consultantId = searchParams.get('consultantId');

    if (!consultantId) {
      return NextResponse.json({ error: 'Consultant ID required' }, { status: 400 });
    }

    // Verify consultant exists and has correct role
    const [consultant] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, consultantId));

    if (!consultant || consultant.role !== 'CONSULTANT') {
      return NextResponse.json({ error: 'Consultant not found' }, { status: 404 });
    }

    const schedules = await db
      .select()
      .from(ConsultantWeeklyScheduleTable)
      .where(eq(ConsultantWeeklyScheduleTable.consultantId, consultantId))
      .orderBy(ConsultantWeeklyScheduleTable.dayOfWeek);

    return NextResponse.json({ 
      schedules,
      consultant: {
        id: consultant.id,
        name: consultant.name,
        pricePerMinute: consultant.pricePerMinute
      }
    });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/consultant/schedule - Create new schedule slots
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      consultantId,
      schedules, // Array of schedule objects
    } = body;

    // Validate required fields
    if (!consultantId || !schedules || !Array.isArray(schedules)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify consultant exists and has correct role
    const [consultant] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, consultantId));

    if (!consultant || consultant.role !== 'CONSULTANT') {
      return NextResponse.json(
        { error: 'Unauthorized or invalid consultant' },
        { status: 403 }
      );
    }

    // Validate each schedule entry
    for (const schedule of schedules) {
      if (!schedule.dayOfWeek || !schedule.startTime || !schedule.endTime) {
        return NextResponse.json(
          { error: 'Each schedule must have dayOfWeek, startTime, and endTime' },
          { status: 400 }
        );
      }

      // Validate time format (HH:MM:SS)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(schedule.startTime) || !timeRegex.test(schedule.endTime)) {
        return NextResponse.json(
          { error: 'Invalid time format. Use HH:MM:SS' },
          { status: 400 }
        );
      }

      // Validate start time is before end time
      if (schedule.startTime >= schedule.endTime) {
        return NextResponse.json(
          { error: 'Start time must be before end time' },
          { status: 400 }
        );
      }
    }

    // Insert all schedules
    const insertedSchedules = await db
      .insert(ConsultantWeeklyScheduleTable)
      .values(
        schedules.map((schedule: any) => ({
          consultantId,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          pricePerMinute: schedule.pricePerMinute || consultant.pricePerMinute,
          consultationType: schedule.consultationType || 'DISCOVERY_CALL',
          isActive: schedule.isActive !== undefined ? schedule.isActive : true,
        }))
      )
      .returning();

    return NextResponse.json({ 
      schedules: insertedSchedules,
      message: 'Schedules created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/consultant/schedule - Delete a schedule slot
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get('scheduleId');
    const consultantId = searchParams.get('consultantId');

    if (!scheduleId || !consultantId) {
      return NextResponse.json(
        { error: 'Schedule ID and Consultant ID required' },
        { status: 400 }
      );
    }

    // Delete the schedule
    await db
      .delete(ConsultantWeeklyScheduleTable)
      .where(
        and(
          eq(ConsultantWeeklyScheduleTable.id, scheduleId),
          eq(ConsultantWeeklyScheduleTable.consultantId, consultantId)
        )
      );

    return NextResponse.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

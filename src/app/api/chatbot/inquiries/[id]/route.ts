// app/api/chatbot/inquiries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { chatbotInquiries } from '@/drizzle/schema';

// Valid status values
const VALID_STATUSES = ['new_inquiry', 'contacted', 'qualified', 'converted', 'closed'] as const;
type InquiryStatus = typeof VALID_STATUSES[number];

interface UpdateBody {
  status: string;
}

// PUT - Update inquiry status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json() as UpdateBody;
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate status value
    if (!VALID_STATUSES.includes(status as InquiryStatus)) {
      return NextResponse.json(
        { 
          error: 'Invalid status value',
          validStatuses: VALID_STATUSES 
        },
        { status: 400 }
      );
    }

    const [updatedInquiry] = await db
      .update(chatbotInquiries)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(chatbotInquiries.id, id))
      .returning();

    if (!updatedInquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const [deletedInquiry] = await db
      .delete(chatbotInquiries)
      .where(eq(chatbotInquiries.id, id))
      .returning();

    if (!deletedInquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get single inquiry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const [inquiry] = await db
      .select()
      .from(chatbotInquiries)
      .where(eq(chatbotInquiries.id, id))
      .limit(1);

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq, desc, sql } from 'drizzle-orm';
import { chatbotInquiries } from '@/drizzle/schema';
import { sendInquiryNotification } from '@/lib/mail';

// Types
interface InquiryBody {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

interface UpdateBody {
  status: string;
}

// Valid status values
const VALID_STATUSES = ['new_inquiry', 'contacted', 'qualified', 'converted', 'closed'] as const;
type InquiryStatus = typeof VALID_STATUSES[number];

// POST - Create new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as InquiryBody;
    
    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create inquiry
    const [inquiry] = await db
      .insert(chatbotInquiries)
      .values({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: message || null,
        status: 'new_inquiry',
        source: 'chatbot',
        userData: {
          name,
          email,
          phone,
          company,
          collectedAt: new Date().toISOString()
        }
      })
      .returning();

    // Notify admin (non-blocking)
    notifyAdmin(inquiry).catch(err => 
      console.error('Failed to notify admin:', err)
    );

    return NextResponse.json({
      success: true,
      message: 'Inquiry created successfully',
      data: inquiry
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating inquiry:', error);
    
    // Handle specific errors
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

// GET - Fetch inquiries with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const offset = (page - 1) * limit;

    // Build WHERE conditions
    const whereConditions = [];
    if (status && status !== 'all') {
      whereConditions.push(eq(chatbotInquiries.status, status));
    }

    // Execute queries in parallel
    const [inquiries, countResult] = await Promise.all([
      // Get paginated data
      db
        .select()
        .from(chatbotInquiries)
        .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
        .orderBy(desc(chatbotInquiries.createdAt))
        .limit(limit)
        .offset(offset),
      
      // Get total count efficiently
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(chatbotInquiries)
        .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
    ]);

    const total = countResult[0]?.count || 0;

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update inquiry status
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
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
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
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

// Admin notification helper
// Admin notification helper
async function notifyAdmin(inquiry: any): Promise<void> {
  try {
    console.log('🎯 New Chatbot Inquiry:', {
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      time: new Date().toLocaleString()
    });

    // Send email notifications (non-blocking)
    sendInquiryNotification(inquiry).catch(err => 
      console.error('Failed to send email notifications:', err)
    );

    // Add other notifications here (Slack, etc.)
    // await sendSlackNotification(inquiry);

  } catch (error) {
    console.error('Error in admin notification:', error);
    // Don't throw - notification failures shouldn't break the API
  }
}


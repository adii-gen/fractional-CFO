// app/api/UserTable/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { UserTable } from '@/drizzle/schema';

const VALID_ROLES = ['USER', 'CONSULTANT', 'ADMIN'] as const;
type UserRole = typeof VALID_ROLES[number];

interface UpdateBody {
  role?: string;
  isActive?: boolean;
  isVerified?: boolean;
  pricePerMinute?: number;
  name?: string;
  mobile?: string;
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    console.log(`PUT request for user ID: ${id}`);
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let body: UpdateBody;
    try {
      body = await request.json();
      console.log('Request body:', body);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    const { role, isActive, isVerified, pricePerMinute, name, mobile } = body;

    // Validate at least one field is provided
    const updateFields = { role, isActive, isVerified, pricePerMinute, name, mobile };
    const hasValidFields = Object.values(updateFields).some(value => 
      value !== undefined && value !== null
    );

    if (!hasValidFields) {
      return NextResponse.json(
        { 
          error: 'At least one field is required for update',
          validFields: ['role', 'isActive', 'isVerified', 'pricePerMinute', 'name', 'mobile']
        },
        { status: 400 }
      );
    }

    // Validate role value if provided
    if (role && !VALID_ROLES.includes(role as UserRole)) {
      return NextResponse.json(
        { 
          error: 'Invalid role value',
          validRoles: VALID_ROLES 
        },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = {
      updatedAt: new Date()
    };

    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (pricePerMinute !== undefined) updateData.pricePerMinute = pricePerMinute;
    if (name) updateData.name = name;
    if (mobile) updateData.mobile = mobile;

    console.log('Updating user with data:', updateData);

    const [updatedUser] = await db
      .update(UserTable)
      .set(updateData)
      .where(eq(UserTable.id, id))
      .returning();

    if (!updatedUser) {
      console.log(`User with ID ${id} not found`);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove sensitive data
    const { password, emailVerifToken, ...safeUser } = updatedUser;

    console.log('User updated successfully:', safeUser.id);
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: safeUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    
    // Database errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ... rest of your methods remain the same
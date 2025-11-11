import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust path to your db instance
import { ExpertiseTable } from "@/drizzle/schema"; // Adjust path to your schema
import { eq, asc } from "drizzle-orm";

// GET /api/expertise - Get all expertise entries
export async function GET() {
  try {
    const expertise = await db
      .select()
      .from(ExpertiseTable)
      .where(eq(ExpertiseTable.isActive, true))
      .orderBy(asc(ExpertiseTable.order));

    return NextResponse.json({
      success: true,
      data: expertise,
    });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch expertise entries",
      },
      { status: 500 }
    );
  }
}

// POST /api/expertise - Create new expertise entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { header, description, iconImage, order } = body;

    // Validation
    if (!header || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Header and description are required",
        },
        { status: 400 }
      );
    }

    const newExpertise = await db
      .insert(ExpertiseTable)
      .values({
        header,
        description,
        iconImage: iconImage || null,
        order: order || 0,
        isActive: true,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newExpertise[0],
        message: "Expertise entry created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating expertise:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create expertise entry",
      },
      { status: 500 }
    );
  }
}




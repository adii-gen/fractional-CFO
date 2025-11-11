import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust path to your db instance
import { FAQTable } from "@/drizzle/schema"; // Adjust path to your schema
import { eq, asc } from "drizzle-orm";

// GET /api/faqs - Get all FAQ entries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = db
      .select()
      .from(FAQTable)
      .where(eq(FAQTable.isActive, true))
      .orderBy(asc(FAQTable.order));

    // Filter by category if provided
    if (category) {
      query = db
        .select()
        .from(FAQTable)
        .where(eq(FAQTable.category, category))
        .orderBy(asc(FAQTable.order));
    }

    const faqs = await query;

    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch FAQ entries",
      },
      { status: 500 }
    );
  }
}

// POST /api/faqs - Create new FAQ entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, question, answers, order } = body;

    // Validation
    if (!question || !answers) {
      return NextResponse.json(
        {
          success: false,
          error: "Question and answers are required",
        },
        { status: 400 }
      );
    }

    // Validate answers is an array or object
    if (typeof answers !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Answers must be a valid JSON object or array",
        },
        { status: 400 }
      );
    }

    const newFAQ = await db
      .insert(FAQTable)
      .values({
        category: category || null,
        question,
        answers,
        order: order || 0,
        isActive: true,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newFAQ[0],
        message: "FAQ entry created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create FAQ entry",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/faqs/[id] - Delete FAQ entry (soft delete)


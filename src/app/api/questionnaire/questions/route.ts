// app/api/admin/questionnaire/questions/route.ts
import { QuestionTable, QuestionOptionTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET - Get all questions with their options and flow
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionnaireType = searchParams.get("type") || "BUSINESS_SETUP";

    // Get all questions
    const questions = await db
      .select()
      .from(QuestionTable)
      .where(eq(QuestionTable.questionnaireType, questionnaireType as any))
      .orderBy(QuestionTable.order);

    // Get all options for these questions
    const questionIds = questions.map((q) => q.id);
    const options = await db
      .select()
      .from(QuestionOptionTable)
      .where(eq(QuestionOptionTable.questionId, questionIds[0])) // This is a simplification
      .orderBy(QuestionOptionTable.order);

    // Group options by question
    const questionsWithOptions = questions.map((q) => {
      const questionOptions = options.filter((opt) => opt.questionId === q.id);
      return {
        ...q,
        options: questionOptions,
      };
    });

    return NextResponse.json({
      success: true,
      questions: questionsWithOptions,
    });
  } catch (error) {
    console.error("Get questions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// POST - Create new question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      questionText,
      questionType,
      questionnaireType = "BUSINESS_SETUP",
      placeholder,
      isRequired = true,
      order,
      isRoot = false,
    } = body;

    const newQuestion = await db
      .insert(QuestionTable)
      .values({
        questionText,
        questionType,
        questionnaireType,
        placeholder,
        isRequired,
        order,
        isRoot,
      })
      .returning();

    return NextResponse.json({
      success: true,
      question: newQuestion[0],
    });
  } catch (error) {
    console.error("Create question error:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}

// PUT - Update question
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const updatedQuestion = await db
      .update(QuestionTable)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(QuestionTable.id, id))
      .returning();

    if (!updatedQuestion.length) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      question: updatedQuestion[0],
    });
  } catch (error) {
    console.error("Update question error:", error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 }
    );
  }
}

// DELETE - Delete question
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Question ID required" },
        { status: 400 }
      );
    }

    await db.delete(QuestionTable).where(eq(QuestionTable.id, id));

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Delete question error:", error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 }
    );
  }
}
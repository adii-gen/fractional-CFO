// app/api/questionnaire/start/route.ts
import { QuestionnaireSessionTable, QuestionOptionTable, QuestionTable } from "@/drizzle/schema";
import { db } from "@/lib/db";

import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionnaireType = "BUSINESS_SETUP" } = body;

    // Get the root question
    const rootQuestion = await db
      .select()
      .from(QuestionTable)
      .where(
        and(
          eq(QuestionTable.isRoot, true),
          eq(QuestionTable.questionnaireType, questionnaireType),
          eq(QuestionTable.isActive, true)
        )
      )
      .limit(1);

    if (!rootQuestion.length) {
      return NextResponse.json(
        { error: "No questionnaire found" },
        { status: 404 }
      );
    }

    // Get options for root question
    const options = await db
      .select()
      .from(QuestionOptionTable)
      .where(eq(QuestionOptionTable.questionId, rootQuestion[0].id))
      .orderBy(QuestionOptionTable.order);

    // Create a new session
    const session = await db
      .insert(QuestionnaireSessionTable)
      .values({
        userId: userId || null,
        questionnaireType,
        currentQuestionId: rootQuestion[0].id,
      })
      .returning();

    return NextResponse.json({
      success: true,
      sessionToken: session[0].sessionToken,
      sessionId: session[0].id,
      question: {
        id: rootQuestion[0].id,
        text: rootQuestion[0].questionText,
        type: rootQuestion[0].questionType,
        placeholder: rootQuestion[0].placeholder,
        isRequired: rootQuestion[0].isRequired,
        order: rootQuestion[0].order,
      },
      options: options.map((opt) => ({
        id: opt.id,
        text: opt.optionText,
        value: opt.optionValue,
      })),
    });
  } catch (error) {
    console.error("Start questionnaire error:", error);
    return NextResponse.json(
      { error: "Failed to start questionnaire" },
      { status: 500 }
    );
  }
}

// GET - Resume existing session
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionToken = searchParams.get("sessionToken");

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Session token required" },
        { status: 400 }
      );
    }

    // Get session
    const session = await db
      .select()
      .from(QuestionnaireSessionTable)
      .where(eq(QuestionnaireSessionTable.sessionToken, sessionToken))
      .limit(1);

    if (!session.length) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (session[0].isCompleted) {
      return NextResponse.json({
        success: true,
        completed: true,
        message: "Questionnaire already completed",
      });
    }

    // Get current question
    const currentQuestion = await db
      .select()
      .from(QuestionTable)
      .where(eq(QuestionTable.id, session[0].currentQuestionId!))
      .limit(1);

    if (!currentQuestion.length) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Get options
    const options = await db
      .select()
      .from(QuestionOptionTable)
      .where(eq(QuestionOptionTable.questionId, currentQuestion[0].id))
      .orderBy(QuestionOptionTable.order);

    return NextResponse.json({
      success: true,
      sessionId: session[0].id,
      question: {
        id: currentQuestion[0].id,
        text: currentQuestion[0].questionText,
        type: currentQuestion[0].questionType,
        placeholder: currentQuestion[0].placeholder,
        isRequired: currentQuestion[0].isRequired,
        order: currentQuestion[0].order,
      },
      options: options.map((opt) => ({
        id: opt.id,
        text: opt.optionText,
        value: opt.optionValue,
      })),
    });
  } catch (error) {
    console.error("Resume questionnaire error:", error);
    return NextResponse.json(
      { error: "Failed to resume questionnaire" },
      { status: 500 }
    );
  }
}
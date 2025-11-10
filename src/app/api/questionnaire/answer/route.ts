// app/api/questionnaire/answer/route.ts
import {
  QuestionTable,
  QuestionOptionTable,
  QuestionnaireSessionTable,
  QuestionnaireResponseTable,
  QuestionnaireResultTable,
  UserTable,
} from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionToken,
      questionId,
      selectedOptionId, // For choice questions
      textAnswer, // For text/email/phone inputs
    } = body;

    // Validate session
    const session = await db
      .select()
      .from(QuestionnaireSessionTable)
      .where(eq(QuestionnaireSessionTable.sessionToken, sessionToken))
      .limit(1);

    if (!session.length) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 404 }
      );
    }

    if (session[0].isCompleted) {
      return NextResponse.json(
        { error: "Questionnaire already completed" },
        { status: 400 }
      );
    }

    // Get current question
    const question = await db
      .select()
      .from(QuestionTable)
      .where(eq(QuestionTable.id, questionId))
      .limit(1);

    if (!question.length) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Save response
    await db.insert(QuestionnaireResponseTable).values({
      sessionId: session[0].id,
      questionId,
      selectedOptionId: selectedOptionId || null,
      textAnswer: textAnswer || null,
    });

    // Update session with contact info if it's Q3, Q4, or Q5
    const questionOrder = question[0].order;
    if (questionOrder === 3 && textAnswer) {
      // Q3: Name
      await db
        .update(QuestionnaireSessionTable)
        .set({ userName: textAnswer })
        .where(eq(QuestionnaireSessionTable.id, session[0].id));
    } else if (questionOrder === 4 && textAnswer) {
      // Q4: Phone
      await db
        .update(QuestionnaireSessionTable)
        .set({ userPhone: textAnswer })
        .where(eq(QuestionnaireSessionTable.id, session[0].id));
    } else if (questionOrder === 5 && textAnswer) {
      // Q5: Email
      await db
        .update(QuestionnaireSessionTable)
        .set({ userEmail: textAnswer })
        .where(eq(QuestionnaireSessionTable.id, session[0].id));

      // Optional: Auto-create user account
      const existingUser = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, textAnswer))
        .limit(1);

      if (!existingUser.length && session[0].userName && session[0].userPhone) {
        // Create new user
        const newUser = await db
          .insert(UserTable)
          .values({
            name: session[0].userName,
            email: textAnswer,
            mobile: session[0].userPhone,
            role: "USER",
            isActive: true,
          })
          .returning();

        // Link session to user
        await db
          .update(QuestionnaireSessionTable)
          .set({ userId: newUser[0].id })
          .where(eq(QuestionnaireSessionTable.id, session[0].id));
      }
    }

    // Determine next question
    let nextQuestionId = null;
    let isTerminal = false;
    let resultMessage = null;

    if (selectedOptionId) {
      // Choice-based question
      const selectedOption = await db
        .select()
        .from(QuestionOptionTable)
        .where(eq(QuestionOptionTable.id, selectedOptionId))
        .limit(1);

      if (!selectedOption.length) {
        return NextResponse.json(
          { error: "Invalid option" },
          { status: 400 }
        );
      }

      nextQuestionId = selectedOption[0].nextQuestionId;
      isTerminal = selectedOption[0].isTerminal || false;
      resultMessage = selectedOption[0].resultMessage;
    } else {
      // Text input - get next question by order
      const nextQuestion = await db
        .select()
        .from(QuestionTable)
        .where(
          and(
            eq(QuestionTable.questionnaireType, session[0].questionnaireType),
            eq(QuestionTable.isActive, true)
          )
        )
        .orderBy(QuestionTable.order);

      const currentIndex = nextQuestion.findIndex((q) => q.id === questionId);
      if (currentIndex !== -1 && currentIndex < nextQuestion.length - 1) {
        nextQuestionId = nextQuestion[currentIndex + 1].id;
      }
    }

    // Check if questionnaire is complete
    if (isTerminal || !nextQuestionId) {
      // Mark session as completed
      await db
        .update(QuestionnaireSessionTable)
        .set({
          isCompleted: true,
          completedAt: new Date(),
        })
        .where(eq(QuestionnaireSessionTable.id, session[0].id));

      // Get all responses for result generation
      const allResponses = await db
        .select({
          questionId: QuestionnaireResponseTable.questionId,
          question: QuestionTable,
          selectedOption: QuestionOptionTable,
          textAnswer: QuestionnaireResponseTable.textAnswer,
        })
        .from(QuestionnaireResponseTable)
        .leftJoin(
          QuestionTable,
          eq(QuestionnaireResponseTable.questionId, QuestionTable.id)
        )
        .leftJoin(
          QuestionOptionTable,
          eq(QuestionnaireResponseTable.selectedOptionId, QuestionOptionTable.id)
        )
        .where(eq(QuestionnaireResponseTable.sessionId, session[0].id));

      // Parse results
      const results: any = {
        businessType: null,
        country: null,
        facilityType: null,
        budgetRange: null,
        expectedRevenue: null,
      };

      allResponses.forEach((resp) => {
        if (resp.question?.order === 6) results.businessType = resp.selectedOption?.optionValue;
        if (resp.question?.order === 9) results.country = resp.selectedOption?.optionValue;
        if (resp.question?.order === 14) results.facilityType = resp.selectedOption?.optionValue;
        if (resp.question?.order === 15) results.budgetRange = resp.selectedOption?.optionValue;
        if (resp.question?.order === 13) results.expectedRevenue = resp.selectedOption?.optionValue;
      });

      // Save result
      await db.insert(QuestionnaireResultTable).values({
        sessionId: session[0].id,
        businessType: results.businessType,
        country: results.country,
        facilityType: results.facilityType,
        budgetRange: results.budgetRange,
        expectedRevenue: results.expectedRevenue,
        recommendations: results,
      });

      return NextResponse.json({
        success: true,
        completed: true,
        message: resultMessage || "Thank you for completing the questionnaire!",
        results,
      });
    }

    // Update session with current question
    await db
      .update(QuestionnaireSessionTable)
      .set({ currentQuestionId: nextQuestionId })
      .where(eq(QuestionnaireSessionTable.id, session[0].id));

    // Get next question details
    const nextQuestion = await db
      .select()
      .from(QuestionTable)
      .where(eq(QuestionTable.id, nextQuestionId))
      .limit(1);

    const nextOptions = await db
      .select()
      .from(QuestionOptionTable)
      .where(eq(QuestionOptionTable.questionId, nextQuestionId))
      .orderBy(QuestionOptionTable.order);

    return NextResponse.json({
      success: true,
      completed: false,
      question: {
        id: nextQuestion[0].id,
        text: nextQuestion[0].questionText,
        type: nextQuestion[0].questionType,
        placeholder: nextQuestion[0].placeholder,
        isRequired: nextQuestion[0].isRequired,
        order: nextQuestion[0].order,
      },
      options: nextOptions.map((opt) => ({
        id: opt.id,
        text: opt.optionText,
        value: opt.optionValue,
      })),
    });
  } catch (error) {
    console.error("Submit answer error:", error);
    return NextResponse.json(
      { error: "Failed to submit answer" },
      { status: 500 }
    );
  }
}
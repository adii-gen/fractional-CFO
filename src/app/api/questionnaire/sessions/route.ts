// // app/api/admin/questionnaire/sessions/route.ts
// import {
//   QuestionnaireSessionTable,
//   QuestionnaireResponseTable,
//   QuestionnaireResultTable,
//   QuestionTable,
//   QuestionOptionTable,
// } from "@/drizzle/schema";
// import { db } from "@/lib/db";
// import { eq, desc } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

// // GET - Get all sessions with filters
// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const status = searchParams.get("status"); // completed, in_progress, all
//     const limit = parseInt(searchParams.get("limit") || "50");
//     const offset = parseInt(searchParams.get("offset") || "0");

//     // Build query
//     let query = db
//       .select({
//         session: QuestionnaireSessionTable,
//         result: QuestionnaireResultTable,
//       })
//       .from(QuestionnaireSessionTable)
//       .leftJoin(
//         QuestionnaireResultTable,
//         eq(QuestionnaireSessionTable.id, QuestionnaireResultTable.sessionId)
//       )
//       .orderBy(desc(QuestionnaireSessionTable.createdAt))
//       .limit(limit)
//       .offset(offset);

//     // Apply filters
//     if (status === "completed") {
//       query = query.where(eq(QuestionnaireSessionTable.isCompleted, true));
//     } else if (status === "in_progress") {
//       query = query.where(eq(QuestionnaireSessionTable.isCompleted, false));
//     }

//     const sessions = await query;

//     // Get total count
//     const totalCount = await db
//       .select({ count: QuestionnaireSessionTable.id })
//       .from(QuestionnaireSessionTable);

//     return NextResponse.json({
//       success: true,
//       sessions: sessions.map((s) => ({
//         id: s.session.id,
//         sessionToken: s.session.sessionToken,
//         userName: s.session.userName,
//         userEmail: s.session.userEmail,
//         userPhone: s.session.userPhone,
//         isCompleted: s.session.isCompleted,
//         completedAt: s.session.completedAt,
//         createdAt: s.session.createdAt,
//         result: s.result
//           ? {
//               businessType: s.result.businessType,
//               country: s.result.country,
//               facilityType: s.result.facilityType,
//               budgetRange: s.result.budgetRange,
//               isReviewed: s.result.isReviewed,
//             }
//           : null,
//       })),
//       pagination: {
//         total: totalCount.length,
//         limit,
//         offset,
//         hasMore: offset + limit < totalCount.length,
//       },
//     });
//   } catch (error) {
//     console.error("Get sessions error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch sessions" },
//       { status: 500 }
//     );
//   }
// }

// // GET single session with full journey
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { sessionId } = body;

//     // Get session
//     const session = await db
//       .select()
//       .from(QuestionnaireSessionTable)
//       .where(eq(QuestionnaireSessionTable.id, sessionId))
//       .limit(1);

//     if (!session.length) {
//       return NextResponse.json(
//         { error: "Session not found" },
//         { status: 404 }
//       );
//     }

//     // Get all responses with question and option details
//     const responses = await db
//       .select({
//         response: QuestionnaireResponseTable,
//         question: QuestionTable,
//         option: QuestionOptionTable,
//       })
//       .from(QuestionnaireResponseTable)
//       .leftJoin(
//         QuestionTable,
//         eq(QuestionnaireResponseTable.questionId, QuestionTable.id)
//       )
//       .leftJoin(
//         QuestionOptionTable,
//         eq(QuestionnaireResponseTable.selectedOptionId, QuestionOptionTable.id)
//       )
//       .where(eq(QuestionnaireResponseTable.sessionId, sessionId))
//       .orderBy(QuestionnaireResponseTable.answeredAt);

//     // Get result
//     const result = await db
//       .select()
//       .from(QuestionnaireResultTable)
//       .where(eq(QuestionnaireResultTable.sessionId, sessionId))
//       .limit(1);

//     return NextResponse.json({
//       success: true,
//       session: {
//         id: session[0].id,
//         userName: session[0].userName,
//         userEmail: session[0].userEmail,
//         userPhone: session[0].userPhone,
//         isCompleted: session[0].isCompleted,
//         completedAt: session[0].completedAt,
//         createdAt: session[0].createdAt,
//       },
//       journey: responses.map((r) => ({
//         questionId: r.response.questionId,
//         questionText: r.question?.questionText,
//         questionOrder: r.question?.order,
//         questionType: r.question?.questionType,
//         selectedOption: r.option
//           ? {
//               id: r.option.id,
//               text: r.option.optionText,
//               value: r.option.optionValue,
//             }
//           : null,
//         textAnswer: r.response.textAnswer,
//         answeredAt: r.response.answeredAt,
//       })),
//       result: result.length ? result[0] : null,
//     });
//   } catch (error) {
//     console.error("Get session details error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch session details" },
//       { status: 500 }
//     );
//   }
// }

// app/api/admin/questionnaire/sessions/route.ts
import {
  QuestionnaireSessionTable,
  QuestionnaireResponseTable,
  QuestionnaireResultTable,
  QuestionTable,
  QuestionOptionTable,
} from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq, desc, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET - Get all sessions with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // completed, in_progress, all
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query with conditional where
    let whereCondition: SQL | undefined = undefined;

    if (status === "completed") {
      whereCondition = eq(QuestionnaireSessionTable.isCompleted, true);
    } else if (status === "in_progress") {
      whereCondition = eq(QuestionnaireSessionTable.isCompleted, false);
    }

    // Build the main query
    const query = db
      .select({
        session: QuestionnaireSessionTable,
        result: QuestionnaireResultTable,
      })
      .from(QuestionnaireSessionTable)
      .leftJoin(
        QuestionnaireResultTable,
        eq(QuestionnaireSessionTable.id, QuestionnaireResultTable.sessionId)
      )
      .$dynamic();

    // Apply where condition if it exists
    const finalQuery = whereCondition 
      ? query.where(whereCondition)
      : query;

    const sessions = await finalQuery
      .orderBy(desc(QuestionnaireSessionTable.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    let countQuery = db
      .select({ count: QuestionnaireSessionTable.id })
      .from(QuestionnaireSessionTable)
      .$dynamic();

    // Apply same where condition to count query
    const finalCountQuery = whereCondition
      ? countQuery.where(whereCondition)
      : countQuery;

    const totalCount = await finalCountQuery;

    return NextResponse.json({
      success: true,
      sessions: sessions.map((s) => ({
        id: s.session.id,
        sessionToken: s.session.sessionToken,
        userName: s.session.userName,
        userEmail: s.session.userEmail,
        userPhone: s.session.userPhone,
        isCompleted: s.session.isCompleted,
        completedAt: s.session.completedAt,
        createdAt: s.session.createdAt,
        result: s.result
          ? {
              businessType: s.result.businessType,
              country: s.result.country,
              facilityType: s.result.facilityType,
              budgetRange: s.result.budgetRange,
              isReviewed: s.result.isReviewed,
            }
          : null,
      })),
      pagination: {
        total: totalCount.length,
        limit,
        offset,
        hasMore: offset + limit < totalCount.length,
      },
    });
  } catch (error) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

// GET single session with full journey
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    // Get session
    const session = await db
      .select()
      .from(QuestionnaireSessionTable)
      .where(eq(QuestionnaireSessionTable.id, sessionId))
      .limit(1);

    if (!session.length) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Get all responses with question and option details
    const responses = await db
      .select({
        response: QuestionnaireResponseTable,
        question: QuestionTable,
        option: QuestionOptionTable,
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
      .where(eq(QuestionnaireResponseTable.sessionId, sessionId))
      .orderBy(QuestionnaireResponseTable.answeredAt);

    // Get result
    const result = await db
      .select()
      .from(QuestionnaireResultTable)
      .where(eq(QuestionnaireResultTable.sessionId, sessionId))
      .limit(1);

    return NextResponse.json({
      success: true,
      session: {
        id: session[0].id,
        userName: session[0].userName,
        userEmail: session[0].userEmail,
        userPhone: session[0].userPhone,
        isCompleted: session[0].isCompleted,
        completedAt: session[0].completedAt,
        createdAt: session[0].createdAt,
      },
      journey: responses.map((r) => ({
        questionId: r.response.questionId,
        questionText: r.question?.questionText,
        questionOrder: r.question?.order,
        questionType: r.question?.questionType,
        selectedOption: r.option
          ? {
              id: r.option.id,
              text: r.option.optionText,
              value: r.option.optionValue,
            }
          : null,
        textAnswer: r.response.textAnswer,
        answeredAt: r.response.answeredAt,
      })),
      result: result.length ? result[0] : null,
    });
  } catch (error) {
    console.error("Get session details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session details" },
      { status: 500 }
    );
  }
}
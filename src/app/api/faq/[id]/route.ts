import { FAQTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "FAQ ID is required",
//         },
//         { status: 400 }
//       );
//     }

//     const deleted = await db
//       .update(FAQTable)
//       .set({
//         isActive: false,
//         updatedAt: new Date(),
//       })
//       .where(eq(FAQTable.id, id))
//       .returning();

//     if (deleted.length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "FAQ entry not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "FAQ entry deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting FAQ:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to delete FAQ entry",
//       },
//       { status: 500 }
//     );
//   }
// }




// app/api/faqs/[id]/route.ts


// DELETE /api/faqs/[id] - Permanently delete FAQ entry
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ ID is required",
        },
        { status: 400 }
      );
    }

    // Hard delete - permanently removes from database
    const deleted = await db
      .delete(FAQTable)
      .where(eq(FAQTable.id, id))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ entry not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "FAQ entry permanently deleted",
      data: deleted[0],
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete FAQ entry",
      },
      { status: 500 }
    );
  }
}


// PUT /api/faqs/[id] - Update FAQ entry
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { category, question, answers, order, isActive } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ ID is required",
        },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (category !== undefined) updateData.category = category;
    if (question !== undefined) updateData.question = question;
    if (answers !== undefined) {
      // Validate answers format
      if (typeof answers !== "object") {
        return NextResponse.json(
          {
            success: false,
            error: "Answers must be a valid JSON object or array",
          },
          { status: 400 }
        );
      }
      updateData.answers = answers;
    }
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await db
      .update(FAQTable)
      .set(updateData)
      .where(eq(FAQTable.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ entry not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated[0],
      message: "FAQ entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update FAQ entry",
      },
      { status: 500 }
    );
  }
}

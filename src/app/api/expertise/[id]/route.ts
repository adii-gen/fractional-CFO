import { ExpertiseTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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
          error: "Expertise ID is required",
        },
        { status: 400 }
      );
    }
      const deleted = await db
      .delete(ExpertiseTable)
      .where(eq(ExpertiseTable.id, id))
      .returning();


    // Soft delete by setting isActive to false
    // const deleted = await db
    //   .update(ExpertiseTable)
    //   .set({
    //     isActive: false,
    //     updatedAt: new Date(),
    //   })
    //   .where(eq(ExpertiseTable.id, id))
    //   .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Expertise entry not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Expertise entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expertise:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete expertise entry",
      },
      { status: 500 }
    );
  }
}
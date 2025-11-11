// import { NextRequest, NextResponse } from 'next/server';
// import { neon } from '@neondatabase/serverless';
// import { eq } from 'drizzle-orm';

// import { ClientSuccessStoryTable } from '@/drizzle/schema';
// import { db } from '@/lib/db';

// // Define the tab

// // GET - Fetch all stories
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const activeOnly = searchParams.get('activeOnly') === 'true';
    
//     let query = db.select().from(ClientSuccessStoryTable).orderBy(ClientSuccessStoryTable.order);
    
//     if (activeOnly) {
//       query = query.where(eq(ClientSuccessStoryTable.isActive, true));
//     }

//     const stories = await query;
//     return NextResponse.json({ success: true, data: stories });
//   } catch (error) {
//     console.error('GET Error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch stories' },
//       { status: 500 }
//     );
//   }
// }

// // POST - Create a new story
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     // Validate required fields
//     const requiredFields = ['testimonial', 'clientName', 'clientInitials', 'designation', 'companyName'];
//     const missingFields = requiredFields.filter(field => !body[field]);
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
//         { status: 400 }
//       );
//     }

//     const [newStory] = await db
//       .insert(ClientSuccessStoryTable)
//       .values({
//         testimonial: body.testimonial,
//         clientName: body.clientName,
//         clientInitials: body.clientInitials,
//         designation: body.designation,
//         companyName: body.companyName,
//         rating: body.rating || "5.0",
//         order: body.order || 0,
//         isActive: body.isActive !== undefined ? body.isActive : true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })
//       .returning();

//     return NextResponse.json({ success: true, data: newStory }, { status: 201 });
//   } catch (error) {
//     console.error('POST Error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to create story' },
//       { status: 500 }
//     );
//   }
// }

// // PUT - Update a story
// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { id, ...updateData } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: 'Story ID is required' },
//         { status: 400 }
//       );
//     }

//     const [updatedStory] = await db
//       .update(ClientSuccessStoryTable)
//       .set({
//         ...updateData,
//         updatedAt: new Date(),
//       })
//       .where(eq(ClientSuccessStoryTable.id, id))
//       .returning();

//     if (!updatedStory) {
//       return NextResponse.json(
//         { success: false, error: 'Story not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: updatedStory });
//   } catch (error) {
//     console.error('PUT Error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to update story' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete a story
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: 'Story ID is required' },
//         { status: 400 }
//       );
//     }

//     const [deletedStory] = await db
//       .delete(ClientSuccessStoryTable)
//       .where(eq(ClientSuccessStoryTable.id, id))
//       .returning();

//     if (!deletedStory) {
//       return NextResponse.json(
//         { success: false, error: 'Story not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Story deleted successfully',
//       data: deletedStory 
//     });
//   } catch (error) {
//     console.error('DELETE Error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete story' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { eq, sql } from 'drizzle-orm';

import { ClientSuccessStoryTable } from '@/drizzle/schema';
import { db } from '@/lib/db';

// GET - Fetch all stories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    let stories;
    
    if (activeOnly) {
      stories = await db
        .select()
        .from(ClientSuccessStoryTable)
        .where(eq(ClientSuccessStoryTable.isActive, true))
        .orderBy(ClientSuccessStoryTable.order);
    } else {
      stories = await db
        .select()
        .from(ClientSuccessStoryTable)
        .orderBy(ClientSuccessStoryTable.order);
    }

    return NextResponse.json({ success: true, data: stories });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

// POST - Create a new story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['testimonial', 'clientName', 'clientInitials', 'designation', 'companyName'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const [newStory] = await db
      .insert(ClientSuccessStoryTable)
      .values({
        testimonial: body.testimonial,
        clientName: body.clientName,
        clientInitials: body.clientInitials,
        designation: body.designation,
        companyName: body.companyName,
        rating: body.rating || "5.0",
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create story' },
      { status: 500 }
    );
  }
}

// PUT - Update a story
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Story ID is required' },
        { status: 400 }
      );
    }

    const [updatedStory] = await db
      .update(ClientSuccessStoryTable)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(ClientSuccessStoryTable.id, id))
      .returning();

    if (!updatedStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedStory });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update story' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a story
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Story ID is required' },
        { status: 400 }
      );
    }

    const [deletedStory] = await db
      .delete(ClientSuccessStoryTable)
      .where(eq(ClientSuccessStoryTable.id, id))
      .returning();

    if (!deletedStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Story deleted successfully',
      data: deletedStory 
    });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete story' },
      { status: 500 }
    );
  }
}
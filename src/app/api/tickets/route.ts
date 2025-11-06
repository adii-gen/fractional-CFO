// // import { db } from '@/db';
// // import { Tickets, TicketMessages } from '@/db/schema';
// import { eq, and, desc } from 'drizzle-orm';
// import { NextResponse } from 'next/server';
// // import { auth } from '@clerk/nextjs';
// import { db } from '@/lib/db';
// import { Tickets ,TicketMessages} from '@/drizzle/schema';
// import { useSession } from 'next-auth/react';

// export async function GET(request: Request) {
//   const data=useSession()
//       const userId = data.data?.user.id

//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const tickets = await db.query.Tickets.findMany({
//       where: eq(Tickets.userId, userId),
//       with: {
//         messages: {
//           orderBy: (messages, { desc }) => [desc(messages.createdAt)],
//           limit: 1
//         }
//       },
//       orderBy: (tickets, { desc }) => [desc(tickets.createdAt)]
//     });

//     return NextResponse.json({ tickets });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch tickets' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   const data=useSession()
//     const userId = data.data?.user.id
//   const { subject, description, category, priority } = await request.json();

//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   if (!subject || !description) {
//     return NextResponse.json(
//       { error: 'Subject and description are required' },
//       { status: 400 }
//     );
//   }

//   try {
//     // Generate ticket number (simple timestamp-based for demo)
//     const ticketNumber = `T-${Date.now()}`;

//     const [newTicket] = await db.insert(Tickets).values({
//       userId,
//       ticketNumber,
//       subject,
//       description,
//       category: category || 'general',
//       priority: priority || 'medium',
//       status: 'open'
//     }).returning();

//     // Add initial message
//     await db.insert(TicketMessages).values({
//       ticketId: newTicket.id,
//       senderId: userId,
//       direction: 'user_to_admin',
//       message: description
//     });

//     return NextResponse.json({ ticket: newTicket }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create ticket' },
//       { status: 500 }
//     );
//   }
// }
import { db } from '@/lib/db';
import { eq, desc, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';



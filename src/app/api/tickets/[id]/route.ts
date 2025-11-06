// import { db } from '@/db';
// import { Tickets } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';


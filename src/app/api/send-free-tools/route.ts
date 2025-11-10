import { NextRequest, NextResponse } from 'next/server';
import { sendFreeToolsEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await sendFreeToolsEmail(email, name);
    
    return NextResponse.json(
      { message: 'Free tools email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending free tools email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://149.56.97.159:5002';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const response = await fetch(`${BACKEND_URL}/free-trial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Free trial API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create trial. Please try again.' },
      { status: 500 }
    );
  }
}

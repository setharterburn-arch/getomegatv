import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://149.56.97.159:5002';

export async function POST(request: NextRequest) {
  try {
    const { message, history, sessionId } = await request.json();

    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, sessionId, region: 'support' }),
    });

    if (!response.ok) {
      throw new Error('Backend error');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        message: 'Sorry, I\'m having trouble connecting. Please try again in a moment.',
        buttons: [
          { label: '🔄 Try Again', value: 'Hi' },
          { label: '📱 Text Support', value: 'I need to contact support directly' }
        ]
      },
      { status: 500 }
    );
  }
}

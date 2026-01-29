import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://149.56.97.159:5002';

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/blockchyp/tokenizing-key`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get tokenizing key' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase-server';

const PUSHOVER_USER = process.env.PUSHOVER_USER_KEY;
const PUSHOVER_TOKEN = process.env.PUSHOVER_APP_TOKEN;

async function sendPushover(title: string, message: string, priority: number = 0) {
  if (!PUSHOVER_USER || !PUSHOVER_TOKEN) {
    console.log('Pushover not configured, skipping notification');
    return;
  }

  try {
    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        title,
        message,
        priority,
        sound: priority >= 1 ? 'pushover' : 'cosmic',
      }),
    });
  } catch (err) {
    console.error('Pushover notification failed:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, userId } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message required' }, { status: 400 });
    }

    const subjectLabels: Record<string, string> = {
      account_link: 'Account Link Request',
      billing: 'Billing Question',
      technical: 'Technical Issue',
      other: 'General Inquiry',
    };

    // Save to database
    const { data, error } = await adminSupabase
      .from('support_requests')
      .insert({
        user_id: userId || null,
        name,
        email,
        subject: subjectLabels[subject] || subject,
        message,
        status: 'open',
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save support request:', error);
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }

    // Send Pushover notification
    const pushTitle = `🎫 Omega TV: ${subjectLabels[subject] || 'Support Request'}`;
    const pushMessage = `From: ${name || 'Unknown'} (${email})\n\n${message.slice(0, 200)}${message.length > 200 ? '...' : ''}`;
    
    // Higher priority for account link requests
    const priority = subject === 'account_link' ? 0 : -1;
    await sendPushover(pushTitle, pushMessage, priority);

    return NextResponse.json({ success: true, id: data.id });

  } catch (error: any) {
    console.error('Support API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

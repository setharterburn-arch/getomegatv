import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase, adminSupabase } from '@/lib/supabase-server';

const ADMIN_EMAILS = ['setharterburn@gmail.com', 'seth@arterburn.me'];

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all data
    const [supportRes, pendingRes, subscriptionsRes] = await Promise.all([
      adminSupabase
        .from('support_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      adminSupabase
        .from('pending_matches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      adminSupabase
        .from('user_subscriptions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);

    return NextResponse.json({
      supportRequests: supportRes.data || [],
      pendingMatches: pendingRes.data || [],
      subscriptions: subscriptionsRes.data || [],
    });

  } catch (error: any) {
    console.error('Admin data error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

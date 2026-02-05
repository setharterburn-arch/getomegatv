import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase, adminSupabase } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    let effectiveUserId = userId
    
    // If no userId provided, get from current session
    if (!effectiveUserId) {
      const supabase = createServerSupabase()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      effectiveUserId = user.id
    }
    
    // Check for linked subscription
    const { data: subscription, error } = await adminSupabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', effectiveUserId)
      .single()
    
    if (error || !subscription) {
      // Check if pending review
      const { data: pending } = await adminSupabase
        .from('pending_matches')
        .select('*')
        .eq('user_id', effectiveUserId)
        .single()
      
      if (pending) {
        return NextResponse.json({
          status: 'pending',
          message: 'Your account is pending setup.',
        })
      }
      
      return NextResponse.json({ 
        status: 'unlinked',
      })
    }
    
    // Calculate days remaining
    const expiryDate = subscription.expires_at ? new Date(subscription.expires_at) : null
    const now = new Date()
    const daysRemaining = expiryDate 
      ? Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null
    
    return NextResponse.json({
      status: daysRemaining === null ? subscription.status : (daysRemaining > 0 ? 'active' : 'expired'),
      username: subscription.iptv_username,
      expiryDate: expiryDate 
        ? expiryDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Unknown',
      daysRemaining: daysRemaining !== null ? Math.max(0, daysRemaining) : null,
      planName: subscription.plan_name || 'Omega TV Premium',
      // Full subscription object for renew page
      subscription: {
        id: subscription.id,
        iptv_username: subscription.iptv_username,
        plan_name: subscription.plan_name,
        price_cents: subscription.price_cents,
        status: subscription.status,
        expires_at: subscription.expires_at,
        auto_renew: subscription.auto_renew,
      }
    })
  } catch (err) {
    console.error('Subscription error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

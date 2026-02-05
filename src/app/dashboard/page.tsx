'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Tv, LogOut, Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface SubscriptionData {
  status: 'active' | 'expired' | 'pending' | 'unlinked'
  username?: string
  expiryDate?: string
  daysRemaining?: number
  planName?: string
  panelId?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        // Fetch subscription data
        fetchSubscription(user.id)
      }
    })
  }, [router])

  const fetchSubscription = async (userId: string) => {
    try {
      const res = await fetch(`/api/subscription?userId=${userId}`)
      const data = await res.json()
      setSubscription(data)
    } catch (err) {
      setSubscription({ status: 'unlinked' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Customer'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Omega TV</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">Hi, {userName}</span>
            <button onClick={handleLogout} className="text-white/60 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">My Subscription</h1>

        {/* Subscription Card */}
        <div className="card p-8 mb-8">
          {subscription?.status === 'unlinked' || subscription?.status === 'pending' ? (
            <div className="text-center py-8">
              <CreditCard className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                {subscription?.status === 'pending' ? 'Account Pending' : 'Get Started'}
              </h2>
              <p className="text-white/60 mb-6">
                {subscription?.status === 'pending' 
                  ? 'Your account is being set up. If you haven\'t paid yet, subscribe below.'
                  : 'Subscribe to Omega TV to start streaming.'}
              </p>
              <Link href="/renew" className="btn-primary inline-block">
                Subscribe Now
              </Link>
              <div className="mt-4">
                <Link href="/support" className="text-white/40 hover:text-white/60 text-sm transition-colors">
                  Need help? Contact Support
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Status Banner */}
              <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
                subscription?.status === 'active' 
                  ? 'bg-emerald-500/20 border border-emerald-500/30'
                  : subscription?.status === 'expired'
                  ? 'bg-red-500/20 border border-red-500/30'
                  : 'bg-amber-500/20 border border-amber-500/30'
              }`}>
                {subscription?.status === 'active' ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                )}
                <div>
                  <p className={`font-semibold ${
                    subscription?.status === 'active' ? 'text-emerald-300' : 
                    subscription?.status === 'expired' ? 'text-red-300' : 'text-amber-300'
                  }`}>
                    {subscription?.status === 'active' ? 'Active Subscription' :
                     subscription?.status === 'expired' ? 'Subscription Expired' : 'Pending'}
                  </p>
                  {subscription?.daysRemaining !== undefined && (
                    <p className="text-sm text-white/60">
                      {subscription.daysRemaining > 0 
                        ? `${subscription.daysRemaining} days remaining`
                        : 'Expired'}
                    </p>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Tv className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Username</p>
                    <p className="text-white font-semibold">{subscription?.username || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Expires</p>
                    <p className="text-white font-semibold">{subscription?.expiryDate || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Renew Button */}
              {subscription?.status !== 'active' || (subscription?.daysRemaining && subscription.daysRemaining < 7) ? (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link href="/renew" className="btn-primary inline-flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Renew Subscription
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/support" className="card p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <h3 className="font-semibold text-white mb-2">💬 Need Help?</h3>
            <p className="text-white/60 text-sm">Chat with our support bot or submit a request.</p>
          </Link>
          <a href="https://www.youtube.com/@OmegaTV-IPTV" target="_blank" rel="noopener noreferrer" className="card p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <h3 className="font-semibold text-white mb-2">📺 Setup Guide</h3>
            <p className="text-white/60 text-sm">Watch video tutorials for setting up your devices.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

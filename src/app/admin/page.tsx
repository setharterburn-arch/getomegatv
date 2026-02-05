'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  AlertCircle, CheckCircle, Link2, 
  Clock, RefreshCw, X, MessageSquare,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Logo } from '@/components/Logo';

interface SupportRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface PendingMatch {
  id: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  matched_iptv_username: string | null;
  match_confidence: number | null;
  status: string;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  iptv_username: string;
  status: string;
  expires_at: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('support');
  
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [pendingMatches, setPendingMatches] = useState<PendingMatch[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [linkModal, setLinkModal] = useState<{ userId: string; email: string } | null>(null);
  const [iptvUsername, setIptvUsername] = useState('');
  const [iptvPassword, setIptvPassword] = useState('');
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    // Try to load admin data - API will reject if not admin
    try {
      const res = await fetch('/api/admin/data');
      if (res.status === 401) {
        router.push('/dashboard');
        return;
      }
      const data = await res.json();
      setSupportRequests(data.supportRequests || []);
      setPendingMatches(data.pendingMatches || []);
      setSubscriptions(data.subscriptions || []);
      setAuthorized(true);
    } catch {
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setSupportRequests(data.supportRequests || []);
      setPendingMatches(data.pendingMatches || []);
      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function resolveRequest(id: string) {
    await fetch('/api/admin/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: 'support' }),
    });
    loadData();
  }

  async function linkAccount(userId: string) {
    if (!iptvUsername) return;
    
    await fetch('/api/admin/link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        iptvUsername,
        iptvPassword: iptvPassword || undefined,
      }),
    });
    
    setLinkModal(null);
    setIptvUsername('');
    setIptvPassword('');
    loadData();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Checking authorization...</div>
      </div>
    );
  }

  const openRequests = supportRequests.filter(r => r.status === 'open');
  const pendingLinks = pendingMatches.filter(m => m.status === 'pending');
  const expiringSoon = subscriptions.filter(s => {
    if (!s.expires_at) return false;
    const days = Math.ceil((new Date(s.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days <= 7 && days > 0;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold text-white">Omega TV Admin</span>
          </div>
          <button onClick={loadData} className="text-white/60 hover:text-white transition-colors">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{openRequests.length}</p>
              <p className="text-sm text-white/60">Open Requests</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{pendingLinks.length}</p>
              <p className="text-sm text-white/60">Pending Links</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{expiringSoon.length}</p>
              <p className="text-sm text-white/60">Expiring Soon</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'support', label: 'Support', count: openRequests.length },
            { id: 'pending', label: 'Pending Links', count: pendingLinks.length },
            { id: 'users', label: 'All Users', count: subscriptions.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-purple-500/30 text-purple-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="card">
          {activeTab === 'support' && (
            <div className="divide-y divide-white/10">
              {supportRequests.length === 0 ? (
                <div className="p-8 text-center text-white/40">No support requests yet</div>
              ) : (
                supportRequests.map(req => (
                  <div key={req.id} className="p-4">
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => setExpandedRequest(expandedRequest === req.id ? null : req.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${
                            req.status === 'open' ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} />
                          <span className="font-medium text-white">{req.subject}</span>
                          <span className="text-sm text-white/40">{formatDate(req.created_at)}</span>
                        </div>
                        <p className="text-sm text-white/60">{req.name} • {req.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {req.status === 'open' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); resolveRequest(req.id); }}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-emerald-400"
                            title="Mark resolved"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {expandedRequest === req.id ? (
                          <ChevronUp className="w-5 h-5 text-white/40" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </div>
                    {expandedRequest === req.id && (
                      <div className="mt-3 p-3 bg-white/5 rounded-lg">
                        <p className="text-white/80 whitespace-pre-wrap">{req.message}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="divide-y divide-white/10">
              {pendingMatches.length === 0 ? (
                <div className="p-8 text-center text-white/40">No pending account links</div>
              ) : (
                pendingMatches.map(match => (
                  <div key={match.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{match.user_name || match.user_email}</p>
                      <p className="text-sm text-white/60">
                        {match.user_phone && `📱 ${match.user_phone} • `}
                        {match.user_email}
                      </p>
                      {match.matched_iptv_username && (
                        <p className="text-sm text-purple-400 mt-1">
                          Possible match: {match.matched_iptv_username} ({Math.round((match.match_confidence || 0) * 100)}%)
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setLinkModal({ userId: match.user_id, email: match.user_email })}
                      className="btn-primary text-sm"
                    >
                      Link Account
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="divide-y divide-white/10">
              {subscriptions.length === 0 ? (
                <div className="p-8 text-center text-white/40">No linked users yet</div>
              ) : (
                subscriptions.map(sub => {
                  const daysLeft = sub.expires_at 
                    ? Math.ceil((new Date(sub.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    : null;
                  return (
                    <div key={sub.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">@{sub.iptv_username}</p>
                        <p className="text-sm text-white/60">
                          {sub.status === 'active' ? (
                            <span className="text-emerald-400">Active</span>
                          ) : (
                            <span className="text-red-400">{sub.status}</span>
                          )}
                          {daysLeft !== null && (
                            <span className={`ml-2 ${daysLeft <= 3 ? 'text-red-400' : daysLeft <= 7 ? 'text-amber-400' : 'text-white/40'}`}>
                              • {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>

      {/* Link Account Modal */}
      {linkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Link IPTV Account</h2>
              <button onClick={() => setLinkModal(null)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/60 mb-4">Linking account for: {linkModal.email}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">IPTV Username</label>
                <input
                  type="text"
                  value={iptvUsername}
                  onChange={(e) => setIptvUsername(e.target.value)}
                  placeholder="username from panel"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">IPTV Password (optional)</label>
                <input
                  type="text"
                  value={iptvPassword}
                  onChange={(e) => setIptvPassword(e.target.value)}
                  placeholder="password if known"
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLinkModal(null)}
                className="flex-1 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => linkAccount(linkModal.userId)}
                disabled={!iptvUsername}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Link Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

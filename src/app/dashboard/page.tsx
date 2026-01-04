import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const subscription = await prisma.subscription.findUnique({
        where: { userId: session.user.id },
        include: { plan: true },
    });

    return (
        <main style={{ minHeight: '100vh', background: '#050505', padding: '2rem' }}>
            <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2rem', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', marginBottom: '2rem' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '1.5rem' }} className="text-gradient">OMEGA TV</Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Welcome, {session.user.name || session.user.email}</span>
                    <Link href="/api/auth/signout" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Logout</Link>
                </div>
            </nav>

            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

                <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>My Subscription</h2>

                    {subscription ? (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Plan:</span>
                                <span style={{ fontWeight: 'bold' }}>{subscription.plan.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Status:</span>
                                <span style={{ color: subscription.status === 'ACTIVE' ? '#4ade80' : '#f87171' }}>{subscription.status}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Renews:</span>
                                <span>{subscription.endDate?.toLocaleDateString()}</span>
                            </div>
                            <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>Manage Subscription</button>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '1.5rem', color: '#a1a1aa' }}>You are not subscribed to any plan.</p>
                            <Link href="/plans" className="btn btn-primary">Subscribe Now</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

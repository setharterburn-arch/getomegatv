import PaymentForm from '@/components/PaymentForm';

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function PaymentPage({ searchParams }: Props) {
    const session = await getServerSession(authOptions);
    const resolvedParams = await searchParams;
    const planName = typeof resolvedParams.plan === 'string' ? resolvedParams.plan : 'Standard';

    if (!session) {
        redirect(`/login?callbackUrl=/payment?plan=${planName}`);
    }
    const price = planName === 'Basic' ? 9.99 : planName === 'Premium' ? 19.99 : 14.99;

    return (
        <main style={{ minHeight: '100vh', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
            <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Complete Subscription</h1>
                <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{planName} Plan</span>
                    <span style={{ fontWeight: 'bold' }}>${price}/mo</span>
                </div>

                <PaymentForm
                    amount={price}
                    planId={planName}
                    appId={process.env.SQUARE_APPLICATION_ID || ''}
                    locationId={process.env.SQUARE_LOCATION_ID || ''}
                />
            </div>
        </main>
    );
}

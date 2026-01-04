'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

export default function RealPaymentForm({
    amount,
    planId,
    appId,
    locationId
}: {
    amount: number,
    planId: string,
    appId: string,
    locationId: string
}) {
    const router = useRouter();
    const [status, setStatus] = useState('');
    const [autoRenew, setAutoRenew] = useState(true);

    return (
        <div>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    type="checkbox"
                    id="autoRenew"
                    checked={autoRenew}
                    onChange={(e) => setAutoRenew(e.target.checked)}
                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                />
                <label htmlFor="autoRenew" style={{ color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.95rem' }}>
                    Enable Auto-Renewal
                </label>
            </div>

            <PaymentForm
                applicationId={appId}
                locationId={locationId}
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    if (token.status !== 'OK') {
                        // Safe access to error message
                        const errorMsg = 'errors' in token && token.errors && token.errors.length > 0
                            ? token.errors[0].message
                            : 'Unknown error';
                        setStatus('Payment Failed: ' + errorMsg);
                        return;
                    }

                    setStatus('Processing payment...');
                    try {
                        const res = await fetch('/api/payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                sourceId: token.token,
                                amount,
                                planId,
                                autoRenew
                            }),
                        });

                        if (!res.ok) {
                            throw new Error('Payment failed');
                        }

                        setStatus('Payment Successful! Redirecting...');
                        setTimeout(() => {
                            router.push('/dashboard');
                        }, 2000);
                    } catch (error) {
                        setStatus('Payment Failed. Please try again.');
                        console.error(error);
                    }
                }}
            >
                <CreditCard
                    style={{
                        '.message-text': {
                            color: '#fff'
                        },
                        '.input-container': {
                            borderRadius: '8px',
                            borderColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                    buttonProps={{
                        css: {
                            backgroundColor: '#ffffff',
                            fontSize: '16px',
                            color: '#000000',
                            fontWeight: '600',
                            '&:hover': {
                                backgroundColor: '#e5e5e5',
                            },
                        },
                    }}
                >
                    Pay ${amount}
                </CreditCard>
            </PaymentForm>
            {status && <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: status.includes('Success') ? 'var(--success)' : 'var(--error)' }}>{status}</p>}
        </div>
    );
}

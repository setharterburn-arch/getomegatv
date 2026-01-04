'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function PlansPage() {
    const plans = [
        {
            name: 'Monthly',
            price: '$20',
            period: '/ month',
            features: ['Live TV Channels', 'Movies & TV Shows', 'Stream on 3 screens'],
            highlight: false,
        },
        {
            name: '6 Months',
            price: '$90',
            period: '/ 6 months',
            features: ['Live TV Channels', 'Movies & TV Shows', 'Stream on 3 screens', 'Save $30/year'],
            highlight: true,
        },
        {
            name: 'Yearly',
            price: '$150',
            period: '/ year',
            features: ['Live TV Channels', 'Movies & TV Shows', 'Stream on 3 screens', 'Best Value: Save $90/year'],
            highlight: false,
        },
    ];

    return (
        <main className={styles.container}>
            <h1 className="text-gradient" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Choose Your Plan</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
                Flexible options, same premium entertainment. Cancel anytime.
            </p>

            <div className={styles.grid}>
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="glass-card"
                        style={{
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            border: plan.highlight ? '1px solid var(--primary)' : undefined,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {plan.highlight && (
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '-32px',
                                background: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                                padding: '4px 40px',
                                transform: 'rotate(45deg)',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                POPULAR
                            </div>
                        )}

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{plan.name}</h2>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{plan.price}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{plan.period}</span>
                        </div>

                        <ul style={{ marginBottom: '2.5rem', flex: 1 }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/payment?plan=${plan.name}`}
                            className={plan.highlight ? 'btn btn-primary' : 'btn btn-secondary'}
                            style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                        >
                            Choose {plan.name}
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

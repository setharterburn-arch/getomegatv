import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Initialize Square Client
const squareClient = new SquareClient({
    environment: SquareEnvironment.Sandbox, // Change to Production for live
    token: process.env.SQUARE_ACCESS_TOKEN,
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { sourceId, amount, planId, autoRenew = true } = await req.json();

        if (!sourceId || !amount) {
            return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
        }

        // Calculate End Date based on Plan
        let durationDays = 30;
        if (planId === '6 Months') durationDays = 180;
        if (planId === 'Yearly') durationDays = 365;

        const endDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

        // Idempotency Key: Unique key for this transaction
        const idempotencyKey = crypto.randomUUID();

        const { payment } = await squareClient.payments.create({
            sourceId,
            idempotencyKey,
            amountMoney: {
                amount: BigInt(Math.round(amount * 100)), // Amount in cents
                currency: 'USD',
            },
            note: `Subscription for ${session.user.email} (${planId})`,
        });

        // Handle successful payment
        if (payment?.status === 'COMPLETED' || payment?.status === 'APPROVED') {
            // Update user subscription in DB
            await prisma.subscription.upsert({
                where: { userId: session.user.id },
                update: {
                    status: 'ACTIVE',
                    planId: planId,
                    endDate: endDate,
                    autoRenew: autoRenew
                },
                create: {
                    userId: session.user.id,
                    planId: planId,
                    status: 'ACTIVE',
                    endDate: endDate,
                    autoRenew: autoRenew
                }
            });

            return NextResponse.json({ success: true, payment: payment });
        } else {
            return NextResponse.json({ error: 'Payment failed' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Payment Error:', error);
        return NextResponse.json({ error: error.message || 'Payment processing failed' }, { status: 500 });
    }
}

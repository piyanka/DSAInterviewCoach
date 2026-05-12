import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { SessionWithId } from '@/helpers/sessionTypes';

export async function POST() {
    try {
        const session = (await getServerSession(authOptions)) as SessionWithId;
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated', success: false },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { message: 'Logged out successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Logout failed';
        return NextResponse.json(
            { error: message, success: false },
            { status: 500 }
        );
    }
}
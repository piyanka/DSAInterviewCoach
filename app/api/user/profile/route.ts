import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import type { SessionWithId } from '@/helpers/sessionTypes'

connect()

export async function POST(request: NextRequest) {
    try {
        const session = (await getServerSession(authOptions)) as SessionWithId
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.id
        const user = await User.findOne({ _id: userId }).select('-password')
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 })
        }

        return NextResponse.json({ message: 'User found', data: user })
    } catch (error: any) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
}
import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import type { SessionWithId } from '@/helpers/sessionTypes'

connect()

export async function POST(request: NextRequest) {
    try {
        const session = (await getServerSession(authOptions)) as SessionWithId | null
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.id
        const reqBody = await request.json()
        const { currentPassword, newPassword } = reqBody

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: 'Current password and new password are required', success : false }, { status: 200 })
        }

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ message: 'User does not exist', success : false}, { status: 200 })
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: 'Current password is incorrect', success : false }, { status: 200 })
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password)
        if (isSamePassword) {
            return NextResponse.json({ message: 'New password cannot be the same as current password', success : false }, { status: 200 })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        return NextResponse.json({ message: 'Password changed successfully', success: true }, { status: 200 })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
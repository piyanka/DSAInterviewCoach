import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody

        if (!token || !password) {
            return NextResponse.json({ message: 'Token and password are required', success : false }, { status: 200 })
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ message: 'Invalid or expired token', success : false }, { status: 200 })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save()

        return NextResponse.json({ message: 'Password reset successfully', success: true }, { status: 200 })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Please try again later";
        return NextResponse.json({ message, success : false }, { status: 500 })
    }
}
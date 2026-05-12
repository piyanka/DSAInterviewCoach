import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import { emailSender } from '@/helpers/mailer'
import { validateEmail } from '@/helpers/helperFunctions'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        const validaton = validateEmail(email);
        if(validaton?.message){
            return NextResponse.json({message : validaton?.message, success : false}, {status : 200});
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: 'User with this email does not exist', success : false }, { status: 200 })
        }

        await emailSender({ email: user.email, emailType: 'RESET', userId: user._id })

        return NextResponse.json({ message: 'Password reset link sent successfully', success: true }, { status: 200 })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Please try again later";
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
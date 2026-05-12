import {connect} from '@/db/db'
import User  from '@/models/UserModel'
import {NextRequest, NextResponse} from 'next/server'
import crypto from 'crypto'

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        
        const user = await User.findOne({verifyToken:hashedToken, verifyTokenExpiry : {$gt : Date.now()}})
        if(!user){
            return NextResponse.json({error:'Invalid token'},{status:400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: 'User verified successfully',success : true},{status:200})
    }catch(error){
        const message = error instanceof Error ? error.message : 'Verification failed';
        return NextResponse.json({error:message},{status:500})
    }
}
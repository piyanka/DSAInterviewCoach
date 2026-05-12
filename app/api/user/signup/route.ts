import { connect } from "@/db/db";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { emailSender } from "@/helpers/mailer";
import {validateSignup} from "@/helpers/helperFunctions";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        const validation = validateSignup(username,email,password);
        if(validation?.message){
            return NextResponse.json({message : validation?.message, success : false}, {status : 200});
        }
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (user) {
            var message = 'User already exists';
            if(user.email === email){
                message = 'An account with this email already exists.';
            } else if(user.username === username){
                message = 'This username is already taken. Try another one.';
            }
            return NextResponse.json(
                { message : message, success : false },
                { status: 200 },
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        await emailSender({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json(
            { message: "Account created successfully - please verify your email.", success: true },
            { status: 200 },
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
        return NextResponse.json({ message, success : false }, { status: 500 });
    }
}

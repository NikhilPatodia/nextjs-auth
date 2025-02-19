import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect"
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model"
import jwt from "jsonwebtoken"
connectDB()

export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {email, password} = reqBody;
    if(!email || !password){
        return NextResponse.json({error: "Email and Password is Required!", success: false}, {status: 400})
    }
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({ error: "User not Exists!", success: false}, {status: 400})
    }
    if(!user.isVerified){
        return NextResponse.json({ error: "User not Verify Email!", success: false}, {status: 400})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error: "password not Valid!", success: false}, {status: 400})
    }
    const token = await jwt.sign({id: user?._id}, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response = NextResponse.json({message: "Logged IN successfully",user, success: true})

    response.cookies.set("token", token, {httpOnly: true});

    return response
}
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect"
import { User } from "@/models/user.model"

connectDB()
export async function POST(request:NextRequest){
    const reqBody = await request.json()
    const {token} = reqBody;

    const user = await User.findOne({verifyToken:token, verifyTokenExpiry: {$gt:Date.now()}})
    if(!user){
        return NextResponse.json({error: "User Not Found", success: false}, {status: 404})
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save()

    return NextResponse.json({message: "User Verified Successfully!", success: true}, {status: 200})
}
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect"
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model"
connectDB()

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User not Exists!", success: false }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({status: 200,  message: "User Password Reset Successfully!", success: true})

}
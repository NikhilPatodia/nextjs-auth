import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect"
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model"
import { sendMail } from "@/helpers/mailer";
connectDB()

export async function POST(request: NextRequest){
    const reqBody = await request.json()
    const { username, email, password } = reqBody;
    if([username, email, password].some(field=>field.trim() === "")){
        return NextResponse.json({ error: "All the Fields are Required", success: false},{status: 400},)
    }

    const user = await User.findOne({ email });
    if(user){
        return NextResponse.json({ error: "User Already Exists!", success: false},{status: 400},)
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
        username,
        email,
        password: hashedPassword
    })

    await sendMail({email, emailType: "VERIFY"})

    return NextResponse.json({status: 200, user: savedUser,  message: "User Created Sucessfully!", success: true})

   
}


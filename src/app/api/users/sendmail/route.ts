import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import { User } from "@/models/user.model";

export async function POST(request: NextRequest){
   try {
     const reqBody = await request.json();
     const {email} = reqBody;
     console.log("My Email is: ", email)
     const user = await User.findOne({email});
     if(!user){
         return NextResponse.json({ error: "User not Exists!", success: false}, {status: 400})
     }
     await sendMail({email, emailType:"RESET"});
     return  NextResponse.json({message: "Send Email For Verification.", success: true})
   } catch (error) {
    return NextResponse.json({ error, success: false}, {status: 400})
   }
}
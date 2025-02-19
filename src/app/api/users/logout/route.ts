import {  NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect"
connectDB()

export async function GET(){
        const response = NextResponse.json({message: "LoggedOut Successfully", success: true});
        response.cookies.set("token", '');
        return response
}
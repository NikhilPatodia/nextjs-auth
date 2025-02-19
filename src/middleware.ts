import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicPath = (path === "/signup" || path === "/login");
    const token = request.cookies.get("token")?.value || '';
    console.log("Token is: ", token)
    if(!token && !publicPath){
        console.log("I am run 1")
        return NextResponse.redirect(new URL("/login",request.nextUrl.origin))
    }
    if(token && publicPath){
        console.log("I am run 2", request.nextUrl.origin)
        return NextResponse.redirect(new URL("/profile",request.nextUrl.origin))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/', 
    '/signup',
    '/login',
    '/profile',
],
}
import { NextResponse} from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const nextAuthToken = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('__Secure-next-auth.session-token')?.value || '';

    const authPages = ["/user/login", "/user/signup", "/user/verifyemail", "/user/forgotpassword","/user/resetpassword"];
    const isAuthPage = authPages.includes(path);
    const isProtectedPage = path === "/user/profile";
    
    if (isAuthPage && nextAuthToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (isProtectedPage && !nextAuthToken) {
        return NextResponse.redirect(new URL("/user/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/login", "/user/signup", "/user/verifyemail", "/user/forgotpassword", "/user/resetpassword", "/user/profile"],
};
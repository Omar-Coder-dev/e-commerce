import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decode } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Check both dev and prod cookie names
  const tokenName = process.env.NODE_ENV === "production" 
    ? "__Secure-next-auth.session-token" 
    : "next-auth.session-token"
  
  const token = request.cookies.get(tokenName)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Use NextAuth's decode function instead of jwtVerify
    const decodedToken = await decode({
      token: token,
      secret: process.env.NEXTAUTH_SECRET!
    })

    if (!decodedToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('Token decode failed:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/cart', '/orders', '/allorders'],
}
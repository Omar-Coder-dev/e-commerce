import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // verify token using NEXTAUTH_SECRET
    await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET))
    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed:', err) // <-- use the error here
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/cart', '/orders'],
}

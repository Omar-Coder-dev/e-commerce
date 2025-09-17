import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function GetUserToken(): Promise<string> {
  const tokenKey =
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'

  const cookiesData = await cookies()
  const encryptedToken = cookiesData.get(tokenKey)?.value

  if (!encryptedToken) return '' // safer: empty string

  try {
    const data = await decode({
      token: encryptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    })
    return (data as any)?.token ?? ''
  } catch (err) {
    console.error('Token decode error:', err)
    return ''
  }
}

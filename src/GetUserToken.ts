import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function GetUserToken(): Promise<string | null> {
    const TokenAcess = (process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : 'next-auth.session-token')
    const cookiesData = await cookies()
    const encryptedToken = cookiesData.get(TokenAcess)?.value
    if (!encryptedToken) return null

    const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! })
    return data?.token ?? null
}

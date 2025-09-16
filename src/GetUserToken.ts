import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function GetUserToken() {
        const cookiesData = await cookies()
        const encryptedToken = cookiesData.get('next-auth.session-token')?.value
        const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! })
        return data?.token

}

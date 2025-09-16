import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode"
export const NextOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                if (data.message == "success") {
                    const decodeToken:{id :string} = jwtDecode(data.token)
                    return {
                        id: decodeToken.id,
                        userData: data.user,
                        tokenData: data.token
                    }
                } else {
                    throw new Error(data.message)
                }
            }
        })
    ],
callbacks: {
    async jwt({token , user}){
        if (user) {
            token.token = user.tokenData
            token.user = user.userData
        }
        return token
    },
    async session({session , token}){
        if (token.user) { 
            session.user = token.user
        }
        return session
    }
}
}

const handler = NextAuth(NextOptions)

export { handler as GET, handler as POST }

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User{
        userData:{
            name:string,
            email:string,
            role:string
        },
        tokenData:string
    }
    interface Session {
        user:User['userData']
    }
}
declare module "next-auth/jwt" {
  interface JWT {
    user : User['userData']
    idToken?: string
  }
}
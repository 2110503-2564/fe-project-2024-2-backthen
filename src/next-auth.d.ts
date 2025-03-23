import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user:{
            success: boolean
            token: string
        }
    }
}
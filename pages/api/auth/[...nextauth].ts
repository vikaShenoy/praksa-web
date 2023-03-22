import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../utils/prismadb'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      if (token) {
        session.user.id = token.id
      } else {
        session.user.id = user.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/lib/prisma";

interface CustomUser {
  id: string;
  email: string;
  name: string | null;
  role?: 'USER' | 'ADMIN';
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              role: 'USER',
              password: '' // Empty password for OAuth users
            }
          });
        }
      }
      return true;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      }
    },
    jwt: ({ token, user, account }) => {
      if (user) {
        const customUser = user as CustomUser;
        return {
          ...token,
          id: customUser.id,
          role: customUser.role
        }
      }
      return token
    }
  }
}

export default authOptions

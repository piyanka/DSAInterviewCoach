import type { Account, NextAuthOptions, Profile, Session, User as NextAuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { connect } from '@/db/db'
import User from '@/models/UserModel'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import type { JWT } from 'next-auth/jwt'
import type { SessionWithId } from '@/helpers/sessionTypes'

connect()

type UserWithId = NextAuthUser & {
  id?: string
}

const isObjectId = (value: string | undefined): value is string => {
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null
        if (!user.isVerified) {
          throw new Error('Please verify your email before signing in. Check your inbox for the verification link.')
        }
        return { id: String(user._id), name: user.username, email: user.email }
      }
    }),

    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GitHubProvider({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: UserWithId; account?: Account | null }) {
      if (!user) return token

      if (isObjectId(user.id)) {
        token.id = user.id
        return token
      }

      if (user.email) {
        const dbUser = await User.findOne({ email: user.email }).select('_id')
        if (dbUser) {
          token.id = String(dbUser._id)
          return token
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const sessionWithId = session as SessionWithId
      if (sessionWithId.user && typeof token.id !== 'undefined') {
        sessionWithId.user.id = token.id as string
      }
      return sessionWithId
    },
    async signIn({ user, account, profile }: { user: NextAuthUser; account: Account | null; profile?: Profile }) {
      try {
        if (account && account.provider !== 'credentials') {
          const oauthUser = user as UserWithId
          const email = user.email
          if (!email) return false
          const providerAccountId = account.providerAccountId
          const username = user.name as string
          const existing = await User.findOne({ email })
          const oauthPassword = await bcrypt.hash(`oauth:${account.provider}:${providerAccountId}:${crypto.randomBytes(16).toString('hex')}`, 10)
          let mongoUserId = String(existing?._id ?? '')

          if (!existing) {
            const createdUser = await User.create({
              username,
              email,
              password: oauthPassword,
              authProvider: account.provider,
              providerAccountId,
              isVerified: true
            })
            mongoUserId = String(createdUser._id)
          } else {
            const update: Record<string, unknown> = {}
            if (!existing.authProvider) update.authProvider = account.provider
            if (!existing.providerAccountId) update.providerAccountId = providerAccountId
            if (!existing.username && username) update.username = username
            if (!existing.isVerified) update.isVerified = true

            if (Object.keys(update).length > 0) {
              await User.updateOne({ _id: existing._id }, { $set: update })
            }
          }

          if (mongoUserId) oauthUser.id = mongoUserId
        }
        return true
      } catch (err) {
        console.error('NextAuth signIn error', err)
        return false
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

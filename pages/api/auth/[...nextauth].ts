import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// @ts-expect-error types for next-auth are currently incorrect
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  database: process.env.DATABASE_URL
})

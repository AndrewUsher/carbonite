import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// @ts-expect-error types for next-auth are currently incorrect
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
    // ...add more providers here
  ],
  events: {
    async createUser (message) {
      console.log(message)
    }
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL
})

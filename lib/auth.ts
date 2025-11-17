import { betterAuth } from "better-auth";

/**
 * Better Auth Server Configuration
 * 
 * This is the server-side auth handler.
 * Configure your authentication providers, database, and settings here.
 * 
 * Documentation: https://www.better-auth.com/docs
 */

export const auth = betterAuth({
  // Database configuration
  // Add your database connection here
  database: {
    // Example with Prisma:
    // provider: "prisma",
    // url: process.env.DATABASE_URL,
    
    // For now, using in-memory (development only)
    provider: "memory",
  },

  // Email provider (for magic links, password reset, etc.)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },

  // Social providers
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update every 24 hours
  },

  // Advanced options
  advanced: {
    cookiePrefix: "devs-auth",
    generateId: () => crypto.randomUUID(),
  },
});

/**
 * Type helper for getting the auth session
 */
export type Session = typeof auth.$Infer.Session;


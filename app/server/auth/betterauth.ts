import { betterAuth } from "better-auth";
import { db } from "~/server/db/drizzle";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth: any = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,

    sendEmailVerificationOnSignUp: true,
    sendResetPasswordEmail: true,

    sendResetPassword: async () => {},
    sendVerificationEmail: async () => {},
  },
  cookie: {
    name: "betterauth",
    options: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  providers: {
    discord: {
      id: "discord",
      name: "Discord",
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.BETTERAUTH_SECRET,
});

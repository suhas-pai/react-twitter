import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor, magicLink } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { authSchema } from "~/lib/auth/schema";

import { db } from "~/server/db/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,

    minPasswordLength: authSchema.passwordMinLength,
    maxPasswordLength: authSchema.passwordMaxLength,

    sendEmailVerificationOnSignUp: true,
    sendResetPasswordEmail: true,

    sendResetPassword: async () => {},
    sendVerificationEmail: async () => {},
  },
  plugins: [
    passkey(),
    twoFactor(),
    magicLink({
      sendMagicLink: async () => {
        // TODO: Implement email server
      },
    }),
  ],
  secret: process.env.BETTERAUTH_SECRET,
});

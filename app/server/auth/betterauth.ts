import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { defineEventHandler, toWebRequest } from "vinxi/http";

import { getBaseUrl } from "~/client/trpc";
import { db } from "~/server/db/drizzle";

import { account, session, users, verification } from "../db/drizzle/schema";
import { authSchema } from "~/lib/auth/schema";

import { twoFactor } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins/magic-link";

export const auth = betterAuth({
  basePath: "/api/betterauth",
  baseURL: getBaseUrl(),
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      users,
      session,
      account,
      verification,
    },
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
    twoFactor(),
    magicLink({
      sendMagicLink: async () => {
        // TODO: Implement email server
      },
    }),
  ],
  secret: process.env.BETTERAUTH_SECRET,
});

export default defineEventHandler((event) => {
  const request = toWebRequest(event);
  console.log(request);
});

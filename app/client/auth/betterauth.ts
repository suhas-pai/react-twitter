import {
  organizationClient,
  passkeyClient,
  twoFactorClient,
  adminClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
import { defineEventHandler } from "vinxi/http";
import { getBaseUrl } from "~/client/trpc";

export const betterAuthClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    organizationClient(),
    twoFactorClient({
      redirect: true,
      twoFactorPage: "/two-factor",
    }),
    passkeyClient(),
    adminClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        //toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export default defineEventHandler((event) => console.log(event));

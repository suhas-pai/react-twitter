import {
  passkeyClient,
  twoFactorClient,
  adminClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
import { getBaseUrl } from "~/client/trpc";

export const betterAuthClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/betterauth`,
  plugins: [
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

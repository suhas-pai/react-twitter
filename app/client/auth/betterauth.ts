import {
  passkeyClient,
  twoFactorClient,
  adminClient,
  magicLinkClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
import { getBaseUrl } from "~/client/trpc";

const betterAuthClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/betterauth`,
  plugins: [
    twoFactorClient(),
    passkeyClient(),
    adminClient(),
    magicLinkClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        //toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const { signIn, signOut, signUp, useSession } = betterAuthClient;

import {
  passkeyClient,
  twoFactorClient,
  adminClient,
  magicLinkClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
import { getBaseUrl } from "~/client/trpc";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const betterAuthClient: any = createAuthClient({
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

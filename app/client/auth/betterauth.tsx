import {
  passkeyClient,
  twoFactorClient,
  adminClient,
  magicLinkClient,
  usernameClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";

import { ToastAction } from "@/components/ui/toast";
import { getBaseUrl } from "~/client/trpc";
import { useToast } from "~/hooks/use-toast";

const betterAuthClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/betterauth`,
  plugins: [
    usernameClient(),
    twoFactorClient(),
    passkeyClient(),
    adminClient(),
    magicLinkClient(),
  ],
  fetchOptions: {
    onError(e) {
      console.log(e);
    },
  },
});

export const { signIn, signOut, signUp, useSession } = betterAuthClient;

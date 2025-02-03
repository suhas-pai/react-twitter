import {
  passkeyClient,
  twoFactorClient,
  adminClient,
  magicLinkClient,
  usernameClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";
import { getBaseUrl } from "~/client/trpc";
import { useToast } from "~/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
      const { toast } = useToast();
      if (e.error.status === 429) {
        toast({
          title: "Error",
          description: "Too many requests. Please try again later.",
          action: <ToastAction altText="Dismiss Toast">Dismiss</ToastAction>,
        });
      }
    },
  },
});

export const { signIn, signOut, signUp, useSession } = betterAuthClient;

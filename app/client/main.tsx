import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { TRPCReactProvider } from "./trpc";

import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import "./index.css";

// Import the generated route tree
import { routeTree } from "../routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function ClerkWithThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={theme === "dark" ? { baseTheme: dark } : {}}
    >
      {children}
    </ClerkProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider storageKey="vite-ui-theme">
        <TRPCReactProvider>
          <ClerkWithThemeProvider>
            <RouterProvider router={router} />
          </ClerkWithThemeProvider>
        </TRPCReactProvider>
      </ThemeProvider>
      <TanStackRouterDevtools router={router} />
    </StrictMode>
  );
}

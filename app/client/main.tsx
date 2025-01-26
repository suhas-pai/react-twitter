import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "./trpc";

import "./index.css";

// Import the generated route tree
import { routeTree } from "../routeTree.gen.ts";
import { QueryClient } from "@tanstack/react-query";

// Create a new router instance
const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider storageKey="vite-ui-theme">
        <TRPCReactProvider>
          <RouterProvider router={router} />
        </TRPCReactProvider>
      </ThemeProvider>
      <TanStackRouterDevtools router={router} />
    </StrictMode>
  );
}

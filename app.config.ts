import { createApp } from "vinxi";

import reactRefresh from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default createApp({
  server: {
    preset: "vercel", // change to 'node' or 'bun' or anyof the supported presets for nitro (nitro.unjs.io)
    experimental: {
      asyncContext: true,
    },
  },
  routers: [
    {
      type: "static",
      name: "public",
      dir: "./public",
    },
    {
      type: "http",
      name: "trpc",
      base: "/api/trpc",
      handler: "./app/server/trpc/root.ts",
      target: "server",
      plugins: () => [tsconfigPaths(), reactRefresh()],
    },
    {
      type: "http",
      name: "api",
      base: "/api/betterauth",
      handler: "./app/server/auth/betterauth.ts",
      target: "server",
      plugins: () => [tsconfigPaths(), reactRefresh()],
    },
    {
      type: "spa",
      name: "client",
      handler: "./index.html",
      target: "browser",
      plugins: () => [
        tailwindcss(),
        TanStackRouterVite({
          routesDirectory: "./app/routes",
          generatedRouteTree: "./app/routeTree.gen.ts",
          autoCodeSplitting: true,
        }),
        tsconfigPaths(),
        reactRefresh(),
      ],
    },
  ],
});

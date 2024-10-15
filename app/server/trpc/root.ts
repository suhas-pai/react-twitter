import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { defineEventHandler, toWebRequest } from "vinxi/http";
import { createCallerFactory, createTRPCRouter } from "~/server/trpc/api";
import { postRouter } from "~/server/trpc/routers/post";
import { db } from "~/server/db/drizzle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export default defineEventHandler((event) => {
  const request = toWebRequest(event);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,

    createContext() {
      return {
        db,
        headers: request.headers,
        req: request,
      };
    },
  });
});

import { initTRPC } from "@trpc/server";
import { db } from "~/server/db";
import { ZodError } from "zod";
import superjson from "superjson";
import { clerkAuthClient } from "~/server/auth/clerk";

export const createTRPCContext = async (opts: {
  headers: Headers;
  req: Request;
}) => {
  return {
    db,
    ...opts,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();
  const end = Date.now();

  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  return result;
});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!clerkAuthClient) {
    throw new Error(`Unauthorized: ${Object.keys(ctx)}`);
  }

  try {
    // Verify the Clerk token using ClerkClient
    const requestState = await clerkAuthClient.authenticateRequest(ctx.req);
    if (!requestState.isSignedIn) {
      throw new Error("Not logged in");
    }

    // Pass the user information to the tRPC context
    return next({
      ctx: {
        user: requestState.toAuth(),
      },
    });
  } catch (error) {
    throw new Error(`Authentication failed: ${error}`);
  }
});

export const timedProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = timedProcedure.use(authMiddleware);

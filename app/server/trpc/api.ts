import { initTRPC } from "@trpc/server";
import { db } from "~/server/db/drizzle";
import z, { ZodError } from "zod/v4";
import superjson from "superjson";
import { getSession } from "../auth/betterauth";

export const createTRPCContext = async (opts: {
  headers: Headers;
  req: Request;
}) => {
  const session = await getSession({
    headers: opts.headers,
  });

  return {
    db,
    session,
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
          error.cause instanceof ZodError ? z.treeifyError(error.cause) : null,
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

export const timedProcedure = t.procedure.use(timingMiddleware);

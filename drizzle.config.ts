import { type Config } from "drizzle-kit";
import env from "./env";

export default {
  schema: "./app/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["react-twitter_*"],
} satisfies Config;

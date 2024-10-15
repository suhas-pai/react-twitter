import { type Config } from "drizzle-kit";
import dotenv from "dotenv";

export default {
  schema: "./app/server/db/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dotenv.config().parsed?.POSTGRES_URL ?? "",
  },
  tablesFilter: ["react-twitter_*"],
} satisfies Config;

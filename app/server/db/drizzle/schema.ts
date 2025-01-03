// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `react-twitter_${name}`);

export const images = createTable(
  "images",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    url: varchar("url", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => [
    {
      nameIndex: index("image_idx").on(example.name),
    },
  ]
);

export const users = createTable(
  "users",
  {
    id: text().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    displayName: varchar("display_name", { length: 256 }).notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    iconUrl: varchar("icon_url")
      .default(sql`''`)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    bio: text("bio")
      .notNull()
      .default(sql`''`),
    website: varchar("website")
      .notNull()
      .default(sql`''`),
  },
  (example) => [
    {
      nameIndex: index("name_idx").on(example.name),
    },
  ]
);

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const posts = createTable(
  "posts",
  {
    id: serial().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    parentId: integer("parent_id"),
    content: text("content").notNull(),
    likes: integer().notNull().default(0),
    shares: integer().notNull().default(0),
    images: text().array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (post) => [
    {
      nameIndex: index("text_idx").on(post.content),
      selfRef: foreignKey({
        columns: [post.parentId],
        foreignColumns: [post.id],
      }),
    },
  ]
);

// FIXME: Add a limit on number of likes stored per user
export const userLikes = createTable(
  "user_likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    postId: serial("post_id").references(() => posts.id, {
      onDelete: "cascade",
    }),
  },
  (like) => [
    {
      nameIndex: index("like_idx").on(like.userId, like.postId),
      id: primaryKey({ columns: [like.userId, like.postId] }),
    },
  ]
);

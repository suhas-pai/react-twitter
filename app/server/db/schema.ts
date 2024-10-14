// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
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
  (example) => ({
    nameIndex: index("image_idx").on(example.name),
  })
);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    displayName: varchar("display_name", { length: 256 }).notNull(),
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
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    userId: serial("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    parentId: integer("parent_id"),
    content: text("content").notNull(),
    likes: integer("likes").notNull().default(0),
    shares: integer("shares").notNull().default(0),
    images: text("images").array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (post) => ({
    nameIndex: index("text_idx").on(post.content),
    selfRef: foreignKey({
      columns: [post.parentId],
      foreignColumns: [post.id],
    }),
  })
);

// FIXME: Add a limit on number of likes stored per user
export const userLikes = createTable(
  "user_likes",
  {
    userId: serial("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    postId: serial("post_id").references(() => posts.id, {
      onDelete: "cascade",
    }),
  },
  (like) => ({
    nameIndex: index("like_idx").on(like.userId, like.postId),
    id: primaryKey({ columns: [like.userId, like.postId] }),
  })
);

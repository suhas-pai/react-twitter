import { protectedProcedure } from "~/server/trpc/api";
import { Post } from "~/lib/post";
import { z } from "zod";

import { timedProcedure } from "~/server/trpc/api";
import { createTRPCRouter } from "~/server/trpc/api";
import { posts, users, userLikes } from "~/server/db/schema";
import { and, count, eq, inArray, sql } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      if (input.content.length > 100) {
        throw new Error("Text is too long");
      }

      await ctx.db.insert(posts).values({
        content: input.content,
        userId: 1, // FIXME
      });
    }),
  list: timedProcedure.query(async ({ ctx }): Promise<Post[]> => {
    const list = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      limit: 10,
    });

    const userList = await ctx.db.query.users.findMany({
      where: inArray(
        users.id,
        list.map((post) => post.userId)
      ),
    });

    const commentCount = await ctx.db
      .select({ count: count() })
      .from(posts)
      .where(
        inArray(
          posts.parentId,
          list.map((post) => post.id)
        )
      );

    // FIXME: Move this to the db
    let postList: Post[] = [];
    for (const post of list) {
      const isLikedQuery = await ctx.db
        .select({ count: count() })
        .from(userLikes)
        .where(and(eq(userLikes.userId, 1), eq(userLikes.postId, post.id)));

      const isLiked = isLikedQuery[0]?.count ?? 0;
      postList.push({
        ...post,
        user: userList.find((user) => user.id === post.userId)!,
        comments: commentCount[0]?.count ?? 0,
        isLiked: isLiked > 0,
      });
    }

    return postList;
  }),

  getLatest: timedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  togglePostLike: timedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const hasLike = await ctx.db.query.userLikes.findFirst({
        // FIXME:
        where: and(eq(userLikes.userId, 1), eq(userLikes.postId, input.postId)),
      });

      if (hasLike) {
        const result = await ctx.db
          .update(posts)
          .set({ likes: sql`${posts.likes} - 1` })
          .where(eq(posts.id, input.postId));

        if (!result) {
          throw new Error("Post not found to like");
        }

        const result2 = await ctx.db.delete(userLikes).where(
          // FIXME:
          and(eq(userLikes.userId, 1), eq(userLikes.postId, input.postId))
        );

        if (!result2) {
          throw new Error("Couldn't unlike post");
        }
      } else {
        const result = await ctx.db
          .update(posts)
          .set({ likes: sql`${posts.likes} + 1` })
          .where(eq(posts.id, input.postId));

        if (!result) {
          throw new Error("Post not found to unlike");
        }

        const result2 = await ctx.db.insert(userLikes).values({
          postId: input.postId,
          userId: 1, // FIXME:
        });

        if (!result2) {
          throw new Error("Couldn't like post");
        }
      }
    }),

  delete: timedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(posts)
        .where(eq(posts.id, input.postId));

      if (!result) {
        throw new Error("Post not found to delete");
      }
    }),
});

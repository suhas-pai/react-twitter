"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Share, Trash } from "lucide-react";
import { Post } from "~/lib/post";
import { trpc } from "~/client/trpc";
import { Link } from "@tanstack/react-router";

export default function PostComponent({ post }: { post: Post }) {
  const toggleLike = trpc.post.togglePostLike.useMutation({
    onSuccess: async () => {
      post.isLiked = !post.isLiked;
      if (post.isLiked) {
        post.likes++;
      } else {
        post.likes--;
      }
    },
  });

  const utils = trpc.useUtils();
  const deletePost = trpc.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  return (
    <div className="flex min-h-28 w-full min-w-48 flex-col justify-around border px-3 py-3">
      <div className="mb-3 flex h-full items-start">
        <div className="avatar">
          <Link
            href={`/profile/${post.user.name}`}
            className="w-8 overflow-hidden rounded-full"
          >
            <Avatar className="mr-2">
              <AvatarImage
                src={post.user.iconUrl}
                alt={`${post.user.name} icon`}
              />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="flex w-full flex-col items-start">
          <div className="flex items-center gap-1">
            <Link
              href={`/profile/${post.user.name}`}
              className={`font-semibold ${deletePost.isPending ? "opacity-70" : ""}`}
            >
              {post.user.displayName}
            </Link>
            <span className="flex gap-1 text-sm">
              <Link
                href={`/profile/${post.user.name}`}
                className={`${deletePost.isPending ? "opacity-70" : ""}`}
              >
                @{post.user.name}
              </Link>
              <span>·</span>
              <span className={`${deletePost.isPending ? "opacity-70" : ""}`}>
                {"Just Now"}
              </span>
            </span>
          </div>
          <div className="mt-1 flex w-full min-w-fit flex-col gap-3">
            <span className={`${deletePost.isPending ? "opacity-70" : ""}`}>
              {post.content}
            </span>
            {post.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="h-48 w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>
        <div className="w-full px-2">
          <span className="flex justify-end">
            <Button
              variant="ghost"
              className="cursor-pointer hover:text-red-500 disabled:opacity-70"
              size="sm"
              onClick={() => deletePost.mutate({ postId: post.id })}
              disabled={deletePost.isPending}
            >
              <Trash size={16} />
            </Button>
          </span>
        </div>
      </div>
      <div className="h-100 flex justify-between">
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          onClick={() => toggleLike.mutate({ postId: post.id })}
          disabled={
            toggleLike.isPending || deletePost.isPending || deletePost.isSuccess
          }
        >
          <Heart
            className="mr-2 h-4 w-4"
            fill={post.isLiked ? "red" : "none"}
          />
          {post.likes}
        </Button>
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          disabled={deletePost.isPending || deletePost.isSuccess}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {post.comments}
        </Button>
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          disabled={deletePost.isPending || deletePost.isSuccess}
        >
          <Share className="mr-2 h-4 w-4" />
          {post.shares}
        </Button>
      </div>
    </div>
  );
}

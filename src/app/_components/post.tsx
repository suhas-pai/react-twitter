"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Share, Trash } from "lucide-react";
import { Post } from "~/lib/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function PostComponent({
  post,
  triggerRefresh,
}: {
  post: Post;
  triggerRefresh: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const toggleLike = api.post.togglePostLike.useMutation({
    onSuccess: () => {
      setLiked((prev) => !prev);
      if (liked) {
        post.likes--;
      } else {
        post.likes++;
      }
    },
  });

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      triggerRefresh();
    },
  });

  const isAlreadyLiked = api.post.hasLiked.useQuery(
    {
      postId: post.id,
    },
    {
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    setLiked(isAlreadyLiked.data || false);
  }, [isAlreadyLiked.data]);

  return (
    <div className="flex min-h-9 w-full flex-col border border-gray-200 px-4 pb-2 pt-4 text-gray-800">
      <div className="mb-2 flex items-start gap-2">
        <div className="avatar">
          <Link
            href={`/profile/${post.user.name}`}
            className="w-8 overflow-hidden rounded-full"
          >
            <Avatar>
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
              className="font-semibold text-gray-800"
            >
              {post.user.displayName}
            </Link>
            <span className="flex gap-1 text-sm text-gray-700">
              <Link href={`/profile/${post.user.name}`}>@{post.user.name}</Link>
              <span>·</span>
              <span>{"Just Now"}</span>
            </span>
          </div>
          <div className="mt-1 flex flex-col gap-3">
            <span className="text-gray-800">{post.content}</span>
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
            <button
              className="enabled:hover:text-red-400"
              onClick={() => deletePost.mutate({ postId: post.id })}
              disabled={deletePost.isPending}
            >
              <Trash size={20} className="cursor-pointer" />
            </button>
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleLike.mutate({ postId: post.id })}
          disabled={
            toggleLike.isPending ||
            isAlreadyLiked.isPending ||
            deletePost.isPending ||
            deletePost.isSuccess
          }
        >
          <Heart className="mr-2 h-4 w-4" fill={liked ? "red" : "none"} />
          {post.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={deletePost.isPending || deletePost.isSuccess}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {post.comments}
        </Button>
        <Button
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

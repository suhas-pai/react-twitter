"use client";

import {
  Bookmark,
  ChartNoAxesColumn,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/client/trpc";

import type { Post } from "@/lib/post";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function PostComponent({ post }: { post: Post }) {
  const toggleLike = trpc.post.togglePostLike.useMutation({
    onSuccess: () => {
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
    onSuccess: async () => await utils.post.invalidate(),
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  //const isOwnPost = post.user.id === user.id;
  const isOwnPost = false;

  return (
    <div className="p-4 border-b hover:bg-muted/50 transition-colors">
      <div className="flex gap-4">
        <Avatar className="mt-1">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">{post.user.displayName}</span>
              <span className="text-muted-foreground">@{post.user.handle}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {post.createdAt.toLocaleDateString()}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwnPost ? (
                  <>
                    <DropdownMenuItem>Pin to your profile</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deletePost.mutate({ id: post.id })}
                    >
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <button type="button">Not interested in this post</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button">Follow @{post.user.handle}</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button">
                        Add/remove @{post.user.handle} from Lists
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button">Mute @{post.user.handle}</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button">Block @{post.user.handle}</button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Report post</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-1">{post.content}</p>
          <div className="flex justify-between mt-4 items-center text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-blue-500 p-0"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{post.replies}</span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-green-500">
              <Repeat2 className="w-6 h-6 mr-2" />
              <span className="text-sm">{post.reposts}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-red-500"
              onClick={() => toggleLike.mutate({ id: post.id })}
            >
              <Heart className="w-5 h-5 mr-2" />
              <span className="text-sm">{post.likes}</span>
            </Button>
            <div className="flex flex-row items-center hover:text-blue-500">
              <ChartNoAxesColumn className="w-4 h-4 mr-2" />
              <span className="text-sm">{post.views}</span>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current text-blue-500" : ""}`}
                />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

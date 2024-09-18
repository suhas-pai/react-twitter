"use client";

import PostComponent from "./post";
import { api } from "~/trpc/react";

export default function PostList() {
  const [postList] = api.post.getList.useSuspenseQuery();
  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      {postList.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

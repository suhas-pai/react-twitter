"use client";

import { Suspense } from "react";
import { api } from "~/trpc/client";

import PostComponent from "./post";

enum FeedType {
  FOR_YOU = "for-you",
  FOLLOWING = "following",
}

export default function PostList() {
  const [postList] = api.post.getList.useSuspenseQuery();
  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <Suspense fallback={<div>Loading...</div>}>
        {postList.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </Suspense>
    </div>
  );
}

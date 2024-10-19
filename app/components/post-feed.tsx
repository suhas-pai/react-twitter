"use client";

import { Suspense, useState } from "react";
import { trpc } from "~/client/trpc";

import PostComponent from "./post";
import { FeedType } from "./post-feed-tab";
import PostFeedTabs from "./post-feed-tab";

function PostList() {
  const [postList] = trpc.post.list.useSuspenseQuery();
  return (
    <Suspense fallback={<div>loading.</div>}>
      {postList.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Suspense>
  );
}

export default function PostFeed() {
  const [feedType, setFeedType] = useState(FeedType.FOR_YOU);
  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <PostFeedTabs selectedFeedType={feedType} setFeedType={setFeedType} />
      <div className="flex w-full max-w-lg flex-col items-center">
        <PostList />
      </div>
    </div>
  );
}

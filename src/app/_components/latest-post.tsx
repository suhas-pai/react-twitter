"use client";

import { api } from "~/trpc/client";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.content}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}

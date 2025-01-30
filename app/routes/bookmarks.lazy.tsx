import { createLazyFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";

import PostComponent from "~/components/post";
import type { Post } from "~/lib/post";

export const Route = createLazyFileRoute("/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  const bookmarkedPosts: Post[] = [];
  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4">
        <h1 className="text-xl font-bold">Bookmarks</h1>
      </div>
      {bookmarkedPosts.length > 0 ? (
        bookmarkedPosts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center p-4">
          <Bookmark className="w-16 h-16 text-[#1D9BF0] mb-4" />
          <h2 className="text-2xl font-bold mb-2">Save posts for later</h2>
          <p className="text-muted-foreground mb-4">
            Bookmark posts to easily find them again in the future.
          </p>
          <Button className="bg-[#1D9BF0] hover:bg-[#1A8CD8]">
            Learn more
          </Button>
        </div>
      )}
    </div>
  );
}

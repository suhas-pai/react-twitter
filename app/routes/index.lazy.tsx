import { createLazyFileRoute } from "@tanstack/react-router";

import PostFeedTabs, { FeedType } from "@/components/post-feed-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComposePost } from "~/components/compose-post";
import { Post } from "~/lib/post";
import PostComponent from "~/components/post";

export const Route = createLazyFileRoute("/")({
  component: Index,
  pendingComponent: () => (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
});

function Index() {
  const forYouPosts: Post[] = [];
  const followingPosts: Post[] = [];

  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <ComposePost />
          <TabsContent value="all">
            {forYouPosts.map((post, i) => (
              <PostComponent key={i} post={post} />
            ))}
          </TabsContent>
          <TabsContent value="mentions">
            <ComposePost />
            {followingPosts.map((post, i) => (
              <PostComponent key={i} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

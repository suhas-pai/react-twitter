import { createLazyFileRoute } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComposePost } from "~/components/compose-post";
import type { Post } from "~/lib/post";
import PostComponent from "~/components/post";
import { trpc } from "~/client/trpc";
import { useSession } from "~/client/auth/betterauth";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
  pendingComponent: () => (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="cursor-pointer" value="for-you">
              For You
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="following">
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
});

function Index() {
  const [content, setContent] = useState("");
  const [forYouPosts] = trpc.post.list.useSuspenseQuery();

  const followingPosts: Post[] = [];
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <Tabs defaultValue="for-you">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="cursor-pointer" value="for-you">
              For You
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="following">
              Following
            </TabsTrigger>
          </TabsList>
          <ComposePost content={content} setContent={setContent} />
          <TabsContent className="mt-0" value="for-you">
            {forYouPosts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))}
          </TabsContent>
          <TabsContent className="mt-0" value="following">
            {followingPosts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { createLazyFileRoute } from "@tanstack/react-router";
import { Search, TrendingUp } from "lucide-react";
import PostComponent from "~/components/post";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import type { Post } from "~/lib/post";

export const Route = createLazyFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  const explorePosts: Post[] = [];
  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search X" className="pl-10" />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        {trendingTopics.map((topic, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{topic.topic}</p>
              <p className="text-sm text-muted-foreground">
                {topic.posts} posts
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="border-t">
        <h2 className="text-xl font-bold p-4">What's happening</h2>
        {explorePosts.map((post, i) => (
          <PostComponent key={i} post={post} />
        ))}
      </div>
    </div>
  );
}

const trendingTopics = [
  { topic: "#TechNews", posts: "125K" },
  { topic: "World Cup", posts: "89K" },
  { topic: "Climate Change", posts: "56K" },
  { topic: "#CodingLife", posts: "42K" },
  { topic: "SpaceX", posts: "38K" },
];

import { createLazyFileRoute } from "@tanstack/react-router";
import { CalendarDays, Link2, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { Post } from "@/lib/post";
import PostComponent from "@/components/post";

export const Route = createLazyFileRoute("/profile")({
  component: ProfilePage,
});

export default function ProfilePage() {
  const userPosts: Post[] = [];
  const posts = userPosts.map((post) => (
    <PostComponent key={post.id} post={post} />
  ));

  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>
      <div className="h-48 bg-muted" />
      <div className="p-4">
        <div className="flex justify-between">
          <Avatar className="w-32 h-32 border-4 border-background -mt-16">
            <AvatarImage src="/placeholder.svg?height=128&width=128" />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <Button variant="outline" className="rounded-full">
            Edit profile
          </Button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Jane Cooper</h2>
          <p className="text-muted-foreground">@jane</p>
          <p className="mt-4">
            Full-stack developer. Building awesome things with React and
            Node.js.
          </p>
          <div className="flex gap-4 mt-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <Link2 className="w-4 h-4" />
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="text-[#1D9BF0] hover:underline">
                jane.dev
              </a>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              Joined June 2021
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <p>
              <span className="font-bold">2,048</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </p>
            <p>
              <span className="font-bold">1,024</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t">{posts}</div>
    </div>
  );
}

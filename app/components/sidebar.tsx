"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Bookmark,
  Home,
  Mail,
  MoreHorizontal,
  Search,
  User,
  Settings,
  Pen,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";
import type { FileRoutesByFullPath } from "@/routeTree.gen.ts";
import { ComposePostDialog } from "./compose-post-dialog";

const sidebarItems: {
  icon: React.ElementType;
  label: string;
  href: keyof FileRoutesByFullPath;
}[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const router = useRouterState();
  const pathname = router.location.href;

  return (
    <div className="flex flex-col h-screen p-2 md:p-4 border-r">
      <Link
        to="/"
        className="p-2 mb-4 inline-flex items-center justify-center md:justify-start"
      >
        <span className="hidden md:inline ml-4 text-3xl font-bold">X</span>
      </Link>
      <nav className="space-y-2 flex-1 h-full">
        {sidebarItems.map((item) => {
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-center md:justify-start gap-4",
                pathname === item.href && "font-bold bg-muted"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="mt-4 h-full">
        <ComposePostDialog>
          <Button
            variant="ghost"
            className="w-full justify-center md:justify-start gap-4"
          >
            <Pen className="w-4 h-4" />
            Create Post
          </Button>
        </ComposePostDialog>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-center md:justify-start gap-4"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="hidden md:inline">More</span>
      </Button>
    </div>
  );
}

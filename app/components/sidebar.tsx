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
  X,
  Settings,
} from "lucide-react";

import { Link, useRouterState } from "@tanstack/react-router";
import { FileRoutesByFullPath } from "@/routeTree.gen";

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
        <X className="w-7 h-7" />
        <span className="hidden md:inline ml-4 text-xl font-bold">X</span>
      </Link>
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-center md:justify-start gap-4",
                pathname === item.href && "font-bold bg-muted"
              )}
              asChild
            >
              <Link to={item.href}>
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </Button>
          );
        })}
        <Button className="w-full bg-[#1D9BF0] hover:bg-[#1A8CD8] mt-4">
          <span className="hidden md:inline">Post</span>
          <span className="inline md:hidden">+</span>
        </Button>
      </nav>
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

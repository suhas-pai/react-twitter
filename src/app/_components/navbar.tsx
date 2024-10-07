"use client";

import {
  BellDot,
  Home,
  MailIcon,
  PenBox,
  Search,
  Settings,
  User,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import ProfileButton from "./profile-dropdown";
import CreatePost from "./create-post";

export default function NavBar() {
  return (
    <header className="w-full">
      <nav className="fixed top-0 z-50 h-14 w-full min-w-fit overflow-hidden border-b-2 border-b-slate-300 bg-white px-5 text-black dark:bg-slate-800">
        <div className="flex h-full w-full min-w-48 items-center justify-evenly font-semibold">
          <div className="flex w-full min-w-fit justify-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="sm">
                <BellDot className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" size="sm">
                <MailIcon className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
          <div className="flex w-full min-w-96 justify-center">
            <span>Timeline</span>
          </div>
          <div className="flex w-full min-w-fit items-center justify-center">
            <div className="mx-6 flex flex-row items-center">
              <input
                className="h-8 w-full rounded-xl bg-gray-200 px-3 text-sm font-normal text-gray-800 outline-none"
                id="search-input"
                type="text"
                placeholder="Search"
                autoComplete="false"
                spellCheck="false"
              />
              <Search
                className="mr-2 h-4 w-4"
                style={{ marginLeft: "-24px" }}
              />
            </div>
            <CreatePost>
              <Button
                variant="ghost"
                size="sm"
                className="bg-blue-100 hover:bg-blue-200"
              >
                <PenBox className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </CreatePost>
            <ProfileButton>
              <div className="ml-6 flex h-9 w-11 cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                <Settings className="h-4 w-4" />
              </div>
            </ProfileButton>
          </div>
        </div>
      </nav>
    </header>
  );
}

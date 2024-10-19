import {
  BellDot,
  Home,
  MailIcon,
  PenBox,
  Search,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";

import ProfileButton from "./profile-dropdown";
import CreatePost from "./create-post";

export default function NavBar() {
  return (
    <header className="w-full mb-14">
      <nav className="fixed top-0 z-50 h-14 w-full min-w-fit overflow-hidden border-b px-5 bg-primary-foreground">
        <div className="flex h-full w-full min-w-48 items-center justify-evenly font-semibold">
          <div className="flex w-full min-w-fit justify-center gap-2">
            <Link to="/">
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost">
                <BellDot className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost">
                <MailIcon className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">
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
              <Input
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
              <Button variant="secondary" size="sm">
                <PenBox className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </CreatePost>
            <ProfileButton>
              <Button variant="outline" size="icon" className="ml-5">
                <Settings className="h-4 w-4" />
              </Button>
            </ProfileButton>
          </div>
        </div>
      </nav>
    </header>
  );
}

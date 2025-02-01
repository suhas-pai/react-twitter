import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Settings, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "~/lib/utils";

export const Route = createLazyFileRoute("/messages")({
  component: () => <MessagesPage />,
});

function MessagesPage() {
  return (
    <div className="max-w-2xl border-x min-h-screen">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Messages</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search Direct Messages" className="pl-10" />
        </div>
      </div>
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center gap-4 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p
                  className={cn(
                    "font-medium truncate",
                    conversation.unread ? "font-bold" : ""
                  )}
                >
                  {conversation.name}
                </p>
                <span
                  className={cn(
                    "text-sm",
                    conversation.unread
                      ? "text-blue-500"
                      : "text-muted-foreground"
                  )}
                >
                  {conversation.time}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm truncate",
                  conversation.unread
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {conversation.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8]">
          New Message
        </Button>
      </div>
    </div>
  );
}

const conversations = [
  {
    id: 0,
    name: "Alice Johnson",
    message: "Hey, how's it going?",
    time: "2m",
    unread: true,
  },
  {
    id: 1,
    name: "Bob Smith",
    message: "Did you see the game last night?",
    time: "1h",
    unread: false,
  },
  {
    id: 2,
    name: "Carol Williams",
    message: "Can we reschedule our meeting?",
    time: "3h",
    unread: true,
  },
  {
    id: 3,
    name: "David Brown",
    message: "Thanks for your help!",
    time: "1d",
    unread: false,
  },
];

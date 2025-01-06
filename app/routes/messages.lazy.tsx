import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Settings, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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
        {conversations.map((convo, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
              <AvatarFallback>{convo.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p
                  className={`font-medium truncate ${convo.unread ? "font-bold" : ""}`}
                >
                  {convo.name}
                </p>
                <span
                  className={`text-sm ${convo.unread ? "text-blue-500" : "text-muted-foreground"}`}
                >
                  {convo.time}
                </span>
              </div>
              <p
                className={`text-sm truncate ${convo.unread ? "text-foreground" : "text-muted-foreground"}`}
              >
                {convo.message}
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
    name: "Alice Johnson",
    message: "Hey, how's it going?",
    time: "2m",
    unread: true,
  },
  {
    name: "Bob Smith",
    message: "Did you see the game last night?",
    time: "1h",
    unread: false,
  },
  {
    name: "Carol Williams",
    message: "Can we reschedule our meeting?",
    time: "3h",
    unread: true,
  },
  {
    name: "David Brown",
    message: "Thanks for your help!",
    time: "1d",
    unread: false,
  },
];

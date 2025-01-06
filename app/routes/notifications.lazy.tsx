import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Notification } from "~/lib/notification";

export const Route = createLazyFileRoute("/notifications")({
  component: () => {
    const notifications: Notification[] = [];
    return (
      <div className="max-w-2xl border-x min-h-screen">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b">
          <h1 className="text-xl font-bold p-4">Notifications</h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {notifications.map((notification, i) => (
                <NotificationItem key={i} notification={notification} />
              ))}
            </TabsContent>
            <TabsContent value="mentions">
              <div className="p-4 text-center text-muted-foreground">
                No mentions yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  },
});

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const icons = {
    like: <Heart className="w-4 h-4 text-red-500" />,
    reply: <MessageCircle className="w-4 h-4 text-blue-500" />,
    repost: <Repeat2 className="w-4 h-4 text-green-500" />,
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
      <div className="mt-1">{icons[notification.kind]}</div>
      <Avatar>
        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
        <AvatarFallback>{notification.post.user.displayName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p>
          <span className="font-bold">
            {notification.post.user.displayName}
          </span>{" "}
          <span className="text-muted-foreground">
            @{notification.post.user.handle}
          </span>
        </p>
        <p>{notification.post.content}</p>
        <p className="text-sm text-muted-foreground">
          {notification.post.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

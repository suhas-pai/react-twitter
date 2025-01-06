"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Smile, MapPin, Calendar } from "lucide-react";
import { trpc } from "~/client/trpc";

export function ComposePost() {
  const [content, setContent] = useState("");

  const utils = trpc.useUtils();
  const createPost = trpc.post.create.useMutation({
    onSuccess() {
      setContent("");
      utils.post.invalidate();
    },
    onError(error: { message: string }) {
      console.log(`ERROR: ${error.message}`);
    },
  });

  return (
    <div className="p-4 border-b">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] text-xl border-0 focus-visible:ring-0 resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-100"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-100"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-100"
              >
                <MapPin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:bg-blue-100"
              >
                <Calendar className="w-5 h-5" />
              </Button>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2"
              disabled={!content.trim()}
              onClick={() => createPost.mutate({ content })}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

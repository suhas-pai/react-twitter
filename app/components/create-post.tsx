"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { trpc } from "@/client/trpc";
import { postSchema } from "@/lib/post";

export default function CreatePost({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const utils = trpc.useUtils();
  const createPost = trpc.post.create.useMutation({
    onSuccess() {
      setOpen(false);
      setContent("");

      utils.post.invalidate();
    },
    onError(error: { message: string }) {
      console.log(`ERROR: ${error.message}`);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Post</AlertDialogTitle>
          <AlertDialogDescription>
            Write a post to share with the world. Limit{" "}
            {postSchema.contentMaxLength} characters
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            placeholder="Type your post here."
            id="message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            You can @mention other users and organizations.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={
              content.length < postSchema.contentMinLength ||
              content.length > postSchema.contentMaxLength ||
              createPost.isPending
            }
            onClick={() => createPost.mutate({ content })}
          >
            {createPost.isPending ? "Submitting..." : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

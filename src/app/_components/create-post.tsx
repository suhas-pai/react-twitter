"use client";

import { api } from "~/trpc/client";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { Textarea } from "~/components/ui/textarea";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  text: z.string().min(2).max(50),
});

export default function CreatePost({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      setContent("");

      utils.post.invalidate();
    },
    onError: (error) => {
      console.log(`ERROR: ${error.message}`);
      toast({
        title: "Failed to create post",
        description: error.message,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Post</AlertDialogTitle>
          <AlertDialogDescription>
            Write a post to share with the world. Limit 280 characters
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
            disabled={createPost.isPending}
            onClick={() => createPost.mutate({ content })}
          >
            {createPost.isPending ? "Submitting..." : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

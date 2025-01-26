import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { ComposePost } from "./compose-post";
import { trpc } from "~/client/trpc";

export function ComposePostDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Post</AlertDialogTitle>
        </AlertDialogHeader>
        <ComposePost
          havePostButton={false}
          content={content}
          setContent={setContent}
        />
        <AlertDialogFooter>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => createPost.mutate({ content })}
            >
              Post
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

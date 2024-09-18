"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function () {
  const utils = api.useUtils();

  const [content, setContent] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setContent("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ content });
      }}
      className="flex w-full flex-col items-center gap-2"
    >
      <textarea
        className="rounded-lg px-3 py-2 text-black"
        name="text"
        placeholder="What is happening?"
        id="text"
        cols={40}
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-full px-10 py-3 font-semibold transition enabled:bg-gray-600 disabled:bg-black/10 disabled:hover:bg-black/20"
        disabled={createPost.isPending || !content}
      >
        {createPost.isPending ? "Submitting..." : "Create Post"}
      </button>
    </form>
  );
}

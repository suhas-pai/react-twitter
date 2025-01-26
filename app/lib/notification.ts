import type { Post } from "./post";

export type Notification = {
  id: number;
  kind: "like" | "reply" | "repost";
  post: Post;
};

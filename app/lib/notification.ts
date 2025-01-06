import { Post } from "./post";

export type Notification = {
  kind: "like" | "reply" | "repost";
  post: Post;
};

import type { User } from "./user";

export type Post = {
  id: number;
  user: User;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  images: string[];
  isLiked: boolean;
};

export const postSchema = {
  contentMinLength: 3,
  contentMaxLength: 280,
};

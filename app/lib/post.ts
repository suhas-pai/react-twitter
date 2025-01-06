import type { User } from "./user";

export type Post = {
  id: number;
  user: User;
  content: string;
  likes: number;
  views: number;
  replies: number;
  reposts: number;
  images: string[];
  isLiked: boolean;
  createdAt: Date;
};

export const postSchema = {
  contentMinLength: 3,
  contentMaxLength: 280,
};

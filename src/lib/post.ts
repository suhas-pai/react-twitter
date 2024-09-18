import { User } from "./user";

export type Post = {
  id: number;
  user: User;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  images: string[];
};

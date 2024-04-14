import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  userId: number;
  author: User;
}

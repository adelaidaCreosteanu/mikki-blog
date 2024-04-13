export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  created: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  userId: number;
  author: Author;
}

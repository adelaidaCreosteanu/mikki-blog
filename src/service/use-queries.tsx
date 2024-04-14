import axios from "axios";
import { Post } from "../interfaces/Post";
import { useCallback, useEffect, useState } from "react";
import { BACKEND } from "./utils";

export const useGetPostsForUser = (
  userId: string | undefined,
  token: string,
  triggerReload: boolean
): Post[] => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getData = useCallback(async () => {
    const { data } = await axios.get(`${BACKEND}/users/${userId}/posts`, {
      headers: { Authorization: token },
    });
    const posts = data.items.map((item: Post) => {
      item.created = new Date(item.created);
      item.updated = new Date(item.updated);
      return item;
    });
    setPosts(posts as Post[]);
  }, [setPosts, token, userId]);

  useEffect(() => {
    try {
      if (userId !== undefined) getData();
    } catch (error) {
      console.log(error);
    }
  }, [userId, token, getData, triggerReload]);

  return posts;
};

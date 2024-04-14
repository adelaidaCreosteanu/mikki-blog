import axios from "axios";
import { Post } from "../interfaces/Post";
import { useCallback, useEffect, useState } from "react";
import { BACKEND } from "./utils";
import { User } from "../interfaces/User";

export const useGetPostsForUser = (
  user: User | undefined,
  token: string,
  triggerReload: boolean
): Post[] => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getData = useCallback(async () => {
    const { data } = await axios.get(`${BACKEND}/users/${user?.id}/posts`, {
      headers: { Authorization: token },
    });
    const posts = data.items.map((item: Post) => {
      item.created = new Date(item.created);
      item.updated = new Date(item.updated);
      return item;
    });
    setPosts(posts as Post[]);
  }, [setPosts, token, user]);

  useEffect(() => {
    try {
      if (user !== undefined) getData();
    } catch (error) {
      console.log(error);
    }
  }, [user, token, getData, triggerReload]);

  return posts;
};

export const useGetUser = (
  userId: string | undefined,
  token: string
): User | undefined => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BACKEND}/users/${userId}`, {
        headers: { Authorization: token },
      });
      setUser(data);
    } catch (error) {
      console.log("Caught error");
      setUser(undefined);
    }
  }, [setUser, token, userId]);

  useEffect(() => {
    getData();
  }, [userId, token, getData]);

  return user;
};

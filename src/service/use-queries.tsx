import axios from "axios";
import { Post } from "../interfaces/Post";
import { useCallback, useEffect, useState } from "react";
import { BACKEND } from "./utils";

export const useGetPostsForUser = (
  userId: number,
  token: string,
  triggerReload: boolean
) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getData = useCallback(async () => {
    const { data } = await axios.get(`${BACKEND}/users/${userId}/posts`, {
      headers: { Authorization: token },
    });
    setPosts(data.items as Post[]);
  }, [setPosts]);

  useEffect(() => {
    console.log("making request");
    getData();
  }, [userId, token, getData, triggerReload]);

  return posts;
};

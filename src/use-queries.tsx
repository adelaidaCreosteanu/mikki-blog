import axios from "axios";
import { Post } from "./interfaces/Post";
import { useEffect, useState } from "react";

const BACKEND = "http://13.40.200.183";

export const useGetPostsForUser = (userId: number, token: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getData = async () => {
    const { data } = await axios.get(`${BACKEND}/users/${userId}/posts`, {
      headers: { Authorization: token },
    });
    setPosts(data.items as Post[]);
  };

  useEffect(() => {
    console.log("making request");
    getData();
  }, [userId, token]);

  return posts;
};

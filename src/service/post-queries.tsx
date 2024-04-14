import axios from "axios";
import { BACKEND } from "./utils";

export const sendNewPost = async (
  title: string,
  content: string,
  token: string
) => {
  return await axios.post(
    `${BACKEND}/posts`,
    { title: title, content: content },
    {
      headers: { Authorization: token },
    }
  );
};

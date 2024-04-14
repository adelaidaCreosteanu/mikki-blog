import axios, { AxiosResponse } from "axios";
import { BACKEND } from "./utils";

export const sendNewPost = async (
  title: string,
  content: string,
  token: string
): Promise<AxiosResponse | undefined> => {
  try {
    return await axios.post(
      `${BACKEND}/posts`,
      { title: title, content: content },
      {
        headers: { Authorization: token },
      }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

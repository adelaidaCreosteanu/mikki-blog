import axios, { AxiosResponse } from "axios";
import { BACKEND } from "./utils";

export const sendNewPost = async (
  title: string,
  content: string,
  token: string | null
): Promise<AxiosResponse | null> => {
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
    return null;
  }
};

export const deletePost = async (
  postId: string,
  token: string | null
): Promise<AxiosResponse | null> => {
  try {
    return await axios.delete(`${BACKEND}/posts/${postId}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerUser = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse | null> => {
  try {
    return await axios.post(`${BACKEND}/users`, {
      username,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    return null;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<AxiosResponse | null> => {
  try {
    return await axios.post(`${BACKEND}/users/auth`, {
      username,
      password,
    });
  } catch (error) {
    return null;
  }
};

import React, { useEffect, useState } from "react";
import PublishedPost from "./PublishedPost";
import { Stack } from "@mui/material";
import CreatePost from "./CreatePost";
import { useGetPostsForUser } from "../use-queries";

type ProfileProps = {
  userId: number;
};

const Profile = ({ userId }: ProfileProps) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const userToken = "token-valid-for-17";
  const posts = useGetPostsForUser(userId, userToken);
  // TODO: fetch username
  const username = `User ${userId}`;

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const val = currentUser === userId.toString();
    setIsOwnProfile(val);
  }, [userId, isOwnProfile, setIsOwnProfile]);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <div>
        <p>{username} profile</p>
      </div>

      {isOwnProfile ? <CreatePost /> : null}

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ width: "65ch" }}
      >
        {posts.length === 0 ? (
          isOwnProfile ? (
            <p>You don't have any posts yet. Create one!</p>
          ) : (
            <p>{username} doesn't have any posts yet, sorry! </p>
          )
        ) : (
          posts.map((post) => (
            <PublishedPost
              key={post.id}
              title={post.title}
              content={post.content}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default Profile;

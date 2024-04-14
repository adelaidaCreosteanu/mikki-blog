import React, { useEffect, useState } from "react";
import PublishedPost from "./PublishedPost";
import { Stack, Typography } from "@mui/material";
import CreatePost from "./CreatePost";
import { useGetPostsForUser, useGetUser } from "../service/use-queries";
import { useParams } from "react-router-dom";
import { showNotFound } from "./NotFound404";

const Profile = () => {
  const { userId } = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const userToken = "token-valid-for-17";
  const user = useGetUser(userId, userToken);
  const posts = useGetPostsForUser(user, userToken, triggerReload);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const val = currentUser === userId?.toString();
    setIsOwnProfile(val);
  }, [userId, isOwnProfile, setIsOwnProfile]);

  const showNoPostsMessage = () => {
    if (isOwnProfile) {
      return <p>You don't have any posts yet. Create one!</p>;
    } else {
      return <p>{user?.username} doesn't have any posts yet, sorry! </p>;
    }
  };
  const showPublishedPosts = () => {
    // Sort by newest posts first
    posts.sort((a, b) => b.created.getTime() - a.created.getTime());
    return posts.map((post) => (
      <PublishedPost key={post.id} post={post} isOwnProfile={isOwnProfile} />
    ));
  };

  if (user === undefined) {
    return showNotFound(userId);
  }
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <div>
        <Typography variant="h6" align="center">
          {user?.username}'s page
        </Typography>
      </div>

      {isOwnProfile ? <CreatePost setTriggerReload={setTriggerReload} /> : null}

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ width: "65ch" }}
      >
        {posts.length === 0 ? showNoPostsMessage() : showPublishedPosts()}
      </Stack>
    </Stack>
  );
};

export default Profile;

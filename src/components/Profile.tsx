import React, { useEffect, useState } from "react";
import PublishedPost from "./PublishedPost";
import { Stack } from "@mui/material";
import CreatePost from "./CreatePost";
import { useGetPostsForUser } from "../service/use-queries";

type ProfileProps = {
  userId: number;
};

const Profile = ({ userId }: ProfileProps) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const userToken = "token-valid-for-17";
  const posts = useGetPostsForUser(userId, userToken, triggerReload);
  // TODO: fetch username
  const username = `User ${userId}`;

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const val = currentUser === userId.toString();
    setIsOwnProfile(val);
  }, [userId, isOwnProfile, setIsOwnProfile]);

  const showNoPostsMessage = () => {
    if (isOwnProfile) {
      return <p>You don't have any posts yet. Create one!</p>;
    } else {
      return <p>{username} doesn't have any posts yet, sorry! </p>;
    }
  };
  const showPublishedPosts = () => {
    // Sort by newest posts first
    posts.sort((a, b) => b.created.getTime() - a.created.getTime());
    return posts.map((post) => (
      <PublishedPost key={post.id} post={post} isOwnProfile={isOwnProfile} />
    ));
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <div>
        <p>{username} profile</p>
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

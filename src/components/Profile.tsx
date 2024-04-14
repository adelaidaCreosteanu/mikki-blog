import { useEffect, useState } from "react";
import PublishedPost from "./PublishedPost";
import { Stack, Typography } from "@mui/material";
import CreatePost from "./CreatePost";
import { useGetPostsForUser, useGetUser } from "../service/use-queries";
import { useNavigate, useParams } from "react-router-dom";
import { showNotFound } from "./NotFound404";
import { useAuth } from "../service/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { status } = useAuth();
  const { userId } = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const userToken = localStorage.getItem("accessToken");
  const user = useGetUser(userId, userToken);
  const posts = useGetPostsForUser(user, userToken, triggerReload);

  useEffect(() => {
    // Redirect to login if user is unauthenticated
    if (status === "unauthenticated") navigate("/login");
  }, [status, navigate]);

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

  if (user === null) {
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

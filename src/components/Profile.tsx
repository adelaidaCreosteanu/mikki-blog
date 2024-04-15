import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import PublishedPost from "./PublishedPost";
import CreatePost from "./CreatePost";
import NotFound from "./NotFound";
import { useGetPostsForUser, useGetUser } from "../service/use-queries";
import { useAuth } from "../service/AuthProvider";

const Profile = () => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const user = useGetUser(userId, accessToken);
  const posts = useGetPostsForUser(user, accessToken, triggerReload);
  const { status } = useAuth();

  useEffect(() => {
    // Redirect to login if user is unauthenticated
    if (status === "unauthenticated") navigate("/login");
  }, [status, navigate]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const isOwn = currentUser === userId?.toString();
    setIsOwnProfile(isOwn);
  }, [userId, isOwnProfile, setIsOwnProfile]);

  const showPublishedPosts = () => {
    // Sort by newest posts first
    posts.sort((a, b) => b.created.getTime() - a.created.getTime());
    return posts.map((post) => (
      <PublishedPost
        key={post.id}
        post={post}
        isOwnProfile={isOwnProfile}
        setTriggerReload={setTriggerReload}
      />
    ));
  };

  const showNoPostsMessage = () => {
    if (isOwnProfile) {
      return <p>You don't have any posts yet. Create one!</p>;
    } else {
      return <p>{user?.username} doesn't have any posts yet, sorry! </p>;
    }
  };

  // TODO: add loading animation
  if (user === null) {
    return <NotFound userId={userId} />;
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
        {posts.length > 0 ? showPublishedPosts() : showNoPostsMessage()}
      </Stack>
    </Stack>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Stack } from "@mui/material";
import CreatePost from "./CreatePost";

type ProfileProps = {
  userid: number;
};

const dummyPosts = [
  {
    id: 1,
    title: "My title 1",
    content: "Some text content 1",
    created: "2024-04-01T16:19:01.000Z",
    modified: "2024-04-01T16:19:01.000Z",
    userId: 2,
    author: {
      id: 2,
      firstName: "First",
      lastName: "Last",
      username: "testusername",
      created: "2024-04-01T15:57:46.000Z",
    },
  },
  {
    id: 2,
    title: "My title 2",
    content:
      "Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2 Some text content 2",
    created: "2024-04-01T16:19:11.000Z",
    modified: "2024-04-01T16:19:11.000Z",
    userId: 2,
    author: {
      id: 2,
      firstName: "First",
      lastName: "Last",
      username: "testusername",
      created: "2024-04-01T15:57:46.000Z",
    },
  },
];
const Profile = ({ userid }: ProfileProps) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const val = currentUser === userid.toString();
    setIsOwnProfile(val);
  }, [userid, isOwnProfile, setIsOwnProfile]);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <div>
        {/* TODO: fetch username */}
        <p>User {userid} profile</p>
      </div>

      {isOwnProfile ? <CreatePost></CreatePost> : null}

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ width: "65ch" }}
      >
        {/* TODO: fetch posts */}
        {dummyPosts.length === 0 ? (
          <p>You don't have any posts yet. Create one!</p>
        ) : (
          dummyPosts.map((post) => (
            <Post key={post.id} title={post.title} content={post.content} />
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default Profile;

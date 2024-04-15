import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sendNewPost } from "../service/post-queries";

type CreatePostProps = {
  setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ setTriggerReload }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const onPostClick = async () => {
    const response = await sendNewPost(title, content, accessToken);

    if (response === null || response.status !== 200) {
      setShowError(true);
      console.log(`Something went wrong: ${response}`);
    } else {
      console.log("Successfully created new post");
      setTitle("");
      setContent("");
      setTriggerReload((prevState) => !prevState);
    }
  };

  return (
    <Card style={{ width: "65ch", padding: 5 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body1" align="center">
            What are you thinking?
          </Typography>
          <TextField
            required
            id="title-field"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="content-field"
            label="Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {showError ? (
            <Typography variant="body1" color={"red"}>
              Oops something went wrong! Please try again or contact our
              support.
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onPostClick}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;

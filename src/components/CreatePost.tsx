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
import { red } from "@mui/material/colors";

type CreatePostProps = {
  setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ setTriggerReload }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  const userToken = "token-valid-for-17";

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onPostClick = async () => {
    const response = await sendNewPost(title, content, userToken);

    if (response === undefined || response.status !== 200) {
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
    <Card style={{ width: "65ch" }}>
      <CardContent>
        <Stack spacing={1} style={{ marginTop: 5 }}>
          <Typography variant="body1" align="center">
            What are you thinking?
          </Typography>
          <TextField
            required
            id="title-field"
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            required
            id="content-field"
            label="Content"
            multiline
            rows={4}
            value={content}
            onChange={handleContentChange}
          />
          {showError ? (
            <Typography variant="body1" color={red[500]}>
              Oops something went wrong! Please try again or contact our
              support.
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onPostClick}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;

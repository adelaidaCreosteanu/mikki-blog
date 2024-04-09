import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
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
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Post</Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;

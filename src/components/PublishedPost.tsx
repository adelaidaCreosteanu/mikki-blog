import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Post } from "../interfaces/Post";

type PublishedPostProps = {
  post: Post;
  isOwnProfile: boolean;
};

const PublishedPost = ({ post, isOwnProfile }: PublishedPostProps) => {
  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" align="center">
          {post.title}
        </Typography>
        <Typography variant="body2" align="left">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Only show delete button to owner. */}
        {isOwnProfile ? <Button size="small">Delete</Button> : null}
      </CardActions>
    </Card>
  );
};

export default PublishedPost;

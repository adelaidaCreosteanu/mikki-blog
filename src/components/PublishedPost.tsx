import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Post } from "../interfaces/Post";
import { deletePost } from "../service/post-queries";

type PublishedPostProps = {
  post: Post;
  isOwnProfile: boolean;
  setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const PublishedPost = ({
  post,
  isOwnProfile,
  setTriggerReload,
}: PublishedPostProps) => {
  const accessToken = localStorage.getItem("accessToken");

  const deleteThisPost = async () => {
    deletePost(post.id.toString(), accessToken);
    setTriggerReload((prevState) => !prevState);
  };

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
        {isOwnProfile ? (
          <Button size="small" onClick={deleteThisPost}>
            Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default PublishedPost;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type PostProps = {
  title: string;
  content: string;
};

const Post = ({ title, content }: PostProps) => {
  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="left">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        {/* TODO: only show if it's this user's post */}
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;

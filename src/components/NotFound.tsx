import { Typography } from "@mui/material";
import { CenterStack } from "./styledComponents";

type NotFoundProps = {
  userId: string | undefined;
};

const NotFound = ({ userId }: NotFoundProps) => {
  return (
    <CenterStack spacing={2}>
      <Typography variant="h4" align="center">
        404
      </Typography>
      <Typography variant="h5" align="center">
        Oops... the user '{userId}' doesn't exist!
      </Typography>
      <Typography variant="body1" align="center">
        Try a different user
      </Typography>
    </CenterStack>
  );
};

export default NotFound;

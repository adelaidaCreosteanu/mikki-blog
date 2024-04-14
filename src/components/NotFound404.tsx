import { Stack, Typography } from "@mui/material";

export const showNotFound = (userId: string | undefined) => {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h4" align="center">
        404
      </Typography>
      <Typography variant="h5" align="center">
        Oops... the user '{userId}' doesn't exist!
      </Typography>
      <Typography variant="body1" align="center">
        Try a different user
      </Typography>
    </Stack>
  );
};

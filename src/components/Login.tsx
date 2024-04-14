import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/post-queries";
import { grey } from "@mui/material/colors";
import { useAuth } from "../service/AuthProvider";
import { CenterStack, WhiteTextField } from "./styledComponents";
import { getVisibilityAdornment } from "./utils";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);
  const { status, signIn, signOut } = useAuth();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect if the user is already authenticated
      const userId = localStorage.getItem("currentUser");
      navigate(`/profile/${userId}`);
    }
  }, [status, navigate]);

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await loginUser(username, password);
    if (response === null) {
      signOut();
      setShowSignInError(true);
    } else {
      const userId = response.data.id;
      signIn(response.data.accessToken, userId);
      // Redirect to user's profile
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <CenterStack spacing={1}>
      <Box
        component="form"
        sx={{
          border: 1,
          borderColor: grey[400],
          borderRadius: 2,
          backgroundColor: grey[100],
          padding: 2,
          width: "40ch",
        }}
      >
        <CenterStack
          spacing={3}
          style={{
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <WhiteTextField
            required
            id="login-form-username"
            label="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <WhiteTextField
            required
            id="login-form-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: getVisibilityAdornment(
                showPassword,
                setShowPassword
              ),
            }}
          />

          {showSignInError ? (
            <Typography variant="body1" color={"red"}>
              Incorrect user or password!
            </Typography>
          ) : null}
          <Button
            style={{ width: "12ch" }}
            variant="contained"
            onClick={onLogin}
          >
            Sign in
          </Button>
        </CenterStack>
      </Box>

      <Box sx={{ width: "35ch" }}>
        <CenterStack direction={"row"} spacing={1}>
          <Button
            style={{ textTransform: "none" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            No account yet?
          </Button>
        </CenterStack>
      </Box>
    </CenterStack>
  );
};
export default Login;

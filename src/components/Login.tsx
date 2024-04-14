import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../service/post-queries";
import { grey } from "@mui/material/colors";
import { useAuth } from "../service/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignInError, setShowSignInError] = useState(false);
  const { signIn, signOut } = useAuth();

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
    <Stack
      spacing={1}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
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
        <Stack
          spacing={3}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <TextField
            style={{ width: "100%", backgroundColor: "#fff" }}
            required
            id="login-form-username"
            label="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ width: "100%", backgroundColor: "#fff" }}
            required
            id="login-form-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {showSignInError && (
            <Typography variant="body1" color={"red"}>
              Incorrect user or password!
            </Typography>
          )}
          <Button
            style={{ width: "12ch" }}
            variant="contained"
            onClick={onLogin}
          >
            Sign in
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          width: "35ch",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          style={{ justifyContent: "center" }}
        >
          {/* <p>No account yet?</p> */}
          <Button
            style={{ textTransform: "none" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            No account yet? Register here
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
export default Login;

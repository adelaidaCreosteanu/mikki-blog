import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CenterStack, WhiteTextField } from "./styledComponents";
import { getVisibilityAdornment } from "./utils";
import { loginUser, registerUser } from "../service/postQueries";
import { useAuth } from "../service/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordsError, setShowPasswordsError] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const { status, signIn, signOut } = useAuth();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect if the user is already authenticated
      const userId = localStorage.getItem("currentUser");
      navigate(`/profile/${userId}`);
    }
  }, [status, navigate]);

  const onRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Show error if passwords don't match
    if (password !== confirmPassword) {
      setShowPasswordsError(true);
      return;
    }

    // Register new user
    const registerResponse = await registerUser(
      username,
      password,
      firstName,
      lastName
    );
    if (registerResponse === null) {
      signOut();
      setShowRegisterError(true);
      return;
    }
    // And log in
    const loginResponse = await loginUser(username, password);
    if (loginResponse === null) {
      signOut();
      setShowRegisterError(true);
    } else {
      const userId = loginResponse.data.id;
      signIn(loginResponse.data.accessToken, userId);
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
          spacing={2}
          style={{
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <WhiteTextField
            required
            id="register-form-firstname"
            label="First Name"
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <WhiteTextField
            required
            id="register-form-lastname"
            label="Last Name"
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <WhiteTextField
            required
            id="register-form-username"
            label="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <WhiteTextField
            required
            id="register-form-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: getVisibilityAdornment(
                showPassword,
                setShowPassword
              ),
            }}
          />
          <WhiteTextField
            required
            id="register-form-confirm-password"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            error={showPasswordsError}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: getVisibilityAdornment(
                showConfirmPassword,
                setShowConfirmPassword
              ),
            }}
          />

          {showPasswordsError ? (
            <Typography variant="body1" color={"red"}>
              Passwords don't match!
            </Typography>
          ) : null}
          {showRegisterError ? (
            <Typography variant="body1" color={"red"}>
              Something went wrong! Please try again
            </Typography>
          ) : null}

          <Button
            style={{ width: "12ch" }}
            variant="contained"
            onClick={onRegister}
          >
            Register
          </Button>
        </CenterStack>
      </Box>

      <Box sx={{ width: "35ch" }}>
        <CenterStack direction={"row"} spacing={1}>
          <Button
            style={{ textTransform: "none" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
          </Button>
        </CenterStack>
      </Box>
    </CenterStack>
  );
};
export default Register;

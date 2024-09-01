import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/auth";
import bgImage from "../assets/bg1-removebg-preview-transformed.png";
import { server } from "../components/constants/config";
import { usernameVlidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameVlidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExist(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExist(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="cont"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${bgImage}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          justifyContent: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Paper
          className="card"
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.54)",
            borderRadius: "12px",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="username"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                />
                {username.error && (
                  <Typography color="red">{username.error}</Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  variant="outlined"
                  sx={{ marginBottom: "1rem" }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  fullWidth
                  color="primary"
                  onClick={toggleLogin}
                >
                  Sign-Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Stack position="relative" margin="auto" width="10rem">
                <Avatar
                  src={avatar.preview} // Display the uploaded avatar
                  alt="Avatar"
                  sx={{ height: "10rem", width: "10rem", objectFit: "contain" }}
                />
                <label htmlFor="avatar-upload">
                  <IconButton component="span" aria-label="Upload avatar">
                    <CameraAlt />
                  </IconButton>
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={avatar.changeHandler}
                  style={{ display: "none" }}
                />
              </Stack>

              <Typography variant="h5">Sign-Up</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignUp}
              >
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={name.value}
                  onChange={name.changeHandler}
                  variant="outlined"
                />
                <TextField
                  required
                  fullWidth
                  label="username"
                  value={username.value}
                  onChange={username.changeHandler}
                  variant="outlined"
                  sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                />
                {username.error && (
                  <Typography color="red">{username.error}</Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  type="password"
                  variant="outlined"
                  sx={{ marginBottom: "1rem" }}
                />
                {password.error && (
                  <Typography color="red">{password.error}</Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{ marginBottom: "1rem" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                  }}
                  disabled={isLoading}
                >
                  Sign-Up
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  fullWidth
                  color="primary"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

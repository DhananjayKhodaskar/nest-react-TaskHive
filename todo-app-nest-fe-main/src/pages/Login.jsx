import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices.jsx/userSlice";
import { useNavigate } from "react-router-dom";
import { handleRedirection } from "../utils/common";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const currState = useSelector((state) => state);
  console.log("State: ", currState);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        if (res.success) {
          navigate("/");
        } else {
          console.error("Login failed:", res.message);
          setError(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setError("An unexpected error occurred.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleRedirection();
  }, []);

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#778DA9",
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: "40vw",
          backgroundColor: "#415A77",
          color: "white",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          {error && (
            <Typography color={"red"} mt={2}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, backgroundColor: "#0D1B2A" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, backgroundColor: "#1B263B" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;

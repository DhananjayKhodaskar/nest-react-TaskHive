import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Card,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../slices.jsx/userSlice";
import { handleRedirection } from "../utils/common";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    roles: "",
  });

  const rolesOptions = ["Admin", "User"];

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      roles: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signupUser(formData))
      .unwrap()
      .then((res) => {
        if (res.success) {
          console.log("Signup successful:", res);
          navigate("/login");
        } else {
          console.error("Signup failed:", res.message);
          setError(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred during signup:", error);
        setError("An unexpected error occurred during signup.");
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
            Sign Up
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
          <TextField
            fullWidth
            label="First Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            fullWidth
            label="Role"
            name="roles"
            value={formData.roles}
            onChange={handleRoleChange}
            margin="normal"
            required
          >
            {rolesOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
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
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, backgroundColor: "#1B263B" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default SignUp;

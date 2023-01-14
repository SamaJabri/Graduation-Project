import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button, IconButton, Typography } from "@mui/material";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const endornment = (property, setProperty) => {
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setProperty((show) => !show)}
            edge="end"
          >
            {property ? (
              <AiFillEyeInvisible style={{ color: "#683636" }} />
            ) : (
              <AiFillEye style={{ color: "#683636" }} />
            )}
          </IconButton>
        </InputAdornment>
      ),
    };
  };

  const handleSignUpForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!username) {
      setErrorMessage("No error");
    } else if (!(password || confirmPassword)) {
      setErrorMessage("No error");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage("");
    }
  }, [username, password, confirmPassword]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          width: "22rem",
          height: "34rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={Logo} alt="Lab Archive Logo" width="60%" />
          <Typography variant="h6" color="primary">
            Lab Archive
          </Typography>
        </div>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            gap: "1rem",
          }}
          onSubmit={handleSignUpForm}
        >
          <Typography
            variant="body1"
            color="error"
            sx={{
              visibility: `${
                errorMessage !== "No error" ? "visible" : "hidden"
              }`,
              marginTop: "-0.8rem",
            }}
          >
            {errorMessage}
          </Typography>

          <TextField
            required
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "100%" }}
          />

          <TextField
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            variant="outlined"
            value={password}
            color={password === confirmPassword ? "primary" : "error"}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%" }}
            InputProps={endornment(showPassword, setShowPassword)}
          />

          <TextField
            required
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            color={password === confirmPassword ? "primary" : "error"}
            sx={{ width: "100%" }}
            InputProps={endornment(showConfirmPassword, setShowConfirmPassword)}
          />

          <Button
            disabled={Boolean(errorMessage)}
            type="submit"
            variant="contained"
            sx={{ marginTop: "2rem", width: "70%" }}
          >
            Sign Up
          </Button>
        </form>

        <div>
          <Typography variant="body1" color="secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#CF7C7C", textDecoration: "none" }}
            >
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../assets/Logo.svg";

import { Link, useNavigate } from "react-router-dom";

import usePatientsStore from "../store/patient/patients-store";

const Login2 = () => {
  const patients = usePatientsStore((state) => state.patients);
  const loginPatient = usePatientsStore((state) => state.loginPatient);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");

  const navigate = useNavigate();

  const doesPatientExist = patients.find(
    (patient) => patient.username === username
  );

  const patientsData = patients.find(
    (patient) => patient.username === username && patient.password === password
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (doesPatientExist) {
      if (patientsData) {
        loginPatient(patientsData.id);
        setWarningMessage("");
        navigate("/home");
      } else {
        setWarningMessage("Wrong username or password");
      }
    } else {
      setWarningMessage("User data not found, try signing up first");
    }
  };

  return (
    <div className="welcome">
      <div className="login">
        <div className="login__header">
          <img src={Logo} alt="MyLabDocs Logo" />
          <h2>MyLabDocs</h2>
        </div>

        <div className="login__form">
          <AnimatePresence>
            <motion.div
              className={warningMessage ? "warning-message" : ""}
              initial={{ scale: 0 }}
              animate={{ scale: 0.9 }}
              exit={{ scale: 0 }}
              whileTap={{ scale: 0.7 }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 1,
              }}
            >
              {warningMessage}
            </motion.div>
          </AnimatePresence>

          <TextField
            required
            name="username"
            label="Username"
            variant="outlined"
            className="login__form__field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="login__password">
            <TextField
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              variant="outlined"
              className="login__form__field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible style={{ color: "#218d87" }} />
                      ) : (
                        <AiFillEye style={{ color: "#218d87" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <p>
              Forgot Password?{" "}
              <Link to="/" className="ternary">
                Reset
              </Link>
            </p>
          </div>

          <input
            type="submit"
            value="Login"
            className="login__form__button"
            onClick={handleLogin}
            disabled={!(username && password)}
          />
        </div>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="ternary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login2;

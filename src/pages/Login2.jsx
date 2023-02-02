import React from "react";
import Logo from "../assets/Logo.svg";

const Login2 = () => {
  return (
    <div className="welcome">
      <div className="login">
        <div className="login__header">
          <img src={Logo} alt="MyLabDocs Logo" />
          <h2>MyLabDocs</h2>
        </div>

        <div className="login__form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login__form__field"
          />
          <div>
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="login__form__field"
            />
            <p>
              Forgot Password? <span className="ternary">Reset</span>
            </p>
          </div>

          <input type="submit" value="Login" className="login__form__button" />
        </div>

        <p>
          Don't have an account? <span className="ternary">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Login2;

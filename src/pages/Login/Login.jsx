import { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets.js";
import { signup, login, resetPass } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Get navigate function
  const [currState, setCurrState] = useState("Sign up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up") {
      signup(userName, email, password, navigate);
    } else {
      login(email, password, navigate);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button className="submit">
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>{" "}
            </p>
          ) : (
            <p className="login-toggle">
              Don&apos;t have an account?{" "}
              <span onClick={() => setCurrState("Sign up")}>Click here</span>{" "}
            </p>
          )}

          {currState === "Login" ? (
            <p className="login-toggle">
              Forgot Password{" "}
              <span onClick={() => resetPass(email)}>Reset</span>{" "}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Login;

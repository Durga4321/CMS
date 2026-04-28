import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      if (res.status === 200 && res.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        setError("");
        setTimeout(() => navigate("/super-admin-dashboard"), 2000);
      } else {
        setError("Login failed. Try again.");
        toast.error("Login failed. Try again.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      toast.error(err.response?.data?.message || "Login failed. Try again.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="super-admin-login-wrapper">
      <div className="super-admin-login-card">
        <h2 className="super-admin-login-title">CMS</h2>
        {error && <p className="super-admin-error-text">{error}</p>}

        <div className="super-admin-form-group">
          <label>Email*</label>
          {emailError && <span className="super-admin-error-text">{emailError}</span>}
          <div className="super-admin-input-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) setEmailError("");
              }}
            />
          </div>
        </div>

        <div className="super-admin-form-group">
          <label>Password*</label>
          {passwordError && (
            <span className="super-admin-error-text">{passwordError}</span>
          )}
          <div className="super-admin-input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value) setPasswordError("");
              }}
            />
            <span
              className="super-admin-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="super-admin-form-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <span
            className="super-admin-forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        <button className="super-admin-login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="super-admin-bottom-text">
          Don't have account?
          <span onClick={() => navigate("/register")}> Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;

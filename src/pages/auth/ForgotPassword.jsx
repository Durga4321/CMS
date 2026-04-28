import React, { useState } from "react";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";   // axios instance

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.status === 200 && res.data?.message) {
        setSuccess(res.data.message);
        navigate("/reset-password", { state: { email } });
      } else {
        setError(res.data?.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  return (
    <div className="super-admin-auth-container">
      <div className="super-admin-auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive OTP</p>
        {error && <p className="super-admin-error-text">{error}</p>}
        {success && <p className="super-admin-success-text">{success}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          className="super-admin-auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="super-admin-auth-btn" onClick={handleSubmit}>
          Send OTP
        </button>

        <p className="super-admin-bottom-text">
          <span onClick={() => navigate("/login")}>Back to Login</span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

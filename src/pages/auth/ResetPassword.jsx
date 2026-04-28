import React, { useState } from "react";
import "../../styles/Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../services/api"; // ✅ import your axios instance

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleReset = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setError("All fields required");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      const res = await api.post("/auth/reset-password", {
        otp,
        newPassword,
        confirmPassword,
      });

      setSuccess(res.data.message || "Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="super-admin-auth-container">
      <div className="super-admin-auth-card">
        <h2>Reset Password</h2>
        {error && <p className="super-admin-error-text">{error}</p>}
        {success && <p className="super-admin-success-text">{success}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          className="super-admin-auth-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="super-admin-password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="super-admin-auth-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="super-admin-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="super-admin-password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="super-admin-auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="super-admin-eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="super-admin-auth-btn" onClick={handleReset}>
          Reset Password
        </button>

        <p className="super-admin-bottom-text">
          Remembered your password?{" "}
          <span
            className="super-admin-link-text"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

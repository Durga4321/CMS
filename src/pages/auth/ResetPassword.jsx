import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthWaves } from "../../components/AuthWaves";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth-new.css";
import api from "../../services/api";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const validateForm = () => {
    const errors = {};
    if (!otp) errors.otp = "OTP is required";
    if (!newPassword) errors.newPassword = "New password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    if (newPassword && newPassword.length < 6)
      errors.newPassword = "Password must be at least 6 characters";
    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      setFieldErrors({});
      const res = await api.auth.resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword,
      }); // ✅ wrapper method

      setSuccess(res?.message || "Password reset successful! Redirecting...");
      toast.success(res?.message || "Password reset successful!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message || "Reset failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell auth-shell-compact">
        {/* Hero Section */}
        <div className="auth-hero auth-hero-compact">
          <div className="auth-hero-base" />
          <div className="auth-hero-inner">
            <div className="auth-welcome">
              Secure Your
              <br />
              Clinic Login
            </div>
            <div className="auth-brand">
              <AuthLogo />
              <div className="auth-brand-copy">
                <h1>Clinical</h1>
                <h2>Management System</h2>
              </div>
            </div>
            <AuthWaves />
          </div>
        </div>

        {/* Reset Password Panel */}
        <div className="auth-panel auth-panel-compact">
          <div className="auth-form-card auth-form-card-compact">
            <div className="auth-form-header">
              <h2>Reset Password</h2>
              <p>
                {email
                  ? `Enter the OTP sent to ${email} and choose a new password.`
                  : "Enter your OTP and choose a new password."}
              </p>
            </div>
            {success && <div className="auth-success-text">{success}</div>}

            <div className="auth-form-grid">
              {/* OTP */}
              <div className="auth-form-group">
                <label>OTP</label>
                <input
                  type="text"
                  className={fieldErrors.otp ? "auth-input-error" : ""}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, otp: "" }));
                  }}
                />
                {fieldErrors.otp && <div className="auth-field-error">{fieldErrors.otp}</div>}
              </div>

              {/* New Password */}
              <div className="auth-form-group">
                <label>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={fieldErrors.newPassword ? "auth-input-error" : ""}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, newPassword: "" }));
                  }}
                  style={{ paddingRight: 40 }}
                />
                <span
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {fieldErrors.newPassword && <div className="auth-field-error">{fieldErrors.newPassword}</div>}
              </div>

              {/* Confirm Password */}
              <div className="auth-form-group">
                <label>Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={fieldErrors.confirmPassword ? "auth-input-error" : ""}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  style={{ paddingRight: 40 }}
                />
                <span
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {fieldErrors.confirmPassword && <div className="auth-field-error">{fieldErrors.confirmPassword}</div>}
              </div>
            </div>

            <button className="auth-btn auth-btn-spaced" onClick={handleReset}>
              Reset Password
            </button>

            <p className="auth-bottom-text">
              Remembered your password?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthWaves } from "../../components/AuthWaves";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth-new.css";
import api from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.status === 200 && res.data?.message) {
        toast.success(res.data.message, { position: "top-center", autoClose: 1500 });
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(res.data?.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP. Try again.");
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
              Recover
              <br />
              Clinic Access
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

        {/* Forgot Password Panel */}
        <div className="auth-panel auth-panel-compact">
          <div className="auth-form-card auth-form-card-compact">
            <div className="auth-form-header">
              <h2>Forgot Password</h2>
              <p>Enter your registered email to receive OTP.</p>
            </div>

            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={fieldErrors.email ? "auth-input-error" : ""}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                {fieldErrors.email && (
                  <div className="auth-field-error">{fieldErrors.email}</div>
                )}
              </div>
            </div>

            <button className="auth-btn auth-btn-spaced" onClick={handleSubmit}>
              Send OTP
            </button>

            <p className="auth-bottom-text">
              Remembered your password?{" "}
              <span onClick={() => navigate("/login")}>Back to Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

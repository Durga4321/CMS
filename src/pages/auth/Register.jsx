import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthWaves } from "../../components/AuthWaves";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth-new.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation Regex
  const nameRegex = /^[A-Za-z\s]+$/;
  const usernameRegex = /^[A-Za-z0-9_]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  const handleChange = (e) => {
    let { name, value } = e.target;

    // First Name & Last Name -> only characters
    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^A-Za-z\s]/g, "");
    }

    // Phone -> only numbers + max 10 digits
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Only characters allowed";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "Minimum 2 characters required";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Only characters allowed";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Minimum 2 characters required";
    }

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username can contain letters, numbers & underscore only";
    } else if (formData.username.length < 4) {
      newErrors.username = "Minimum 4 characters required";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be minimum 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Terms
    if (!agreeTerms) {
      newErrors.terms = "You must agree to terms & conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      const res = await api.auth.register(formData);

      if (res?.message) {
        toast.success(res.message || "Registration Successful 🎉", {
          position: "top-center",
          autoClose: 1500,
        });

        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res?.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);

      toast.error(
        err.message || "Registration failed. Please check your details."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">

        {/* Hero Section */}
        <div className="auth-hero">
          <div className="auth-hero-base" />

          <div className="auth-hero-inner">
            <div className="auth-welcome">
              Build Your
              <br />
              Care Team
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

        {/* Register Panel */}
        <div className="auth-panel">
          <div className="auth-form-card auth-form-card-wide">

            <div className="auth-form-header">
              <h2>Register</h2>

              <p>
                Create a new account to access the dashboard and manage your
                workspace.
              </p>
            </div>

            <div className="auth-form-grid auth-form-grid-two">

              {/* First Name */}
              <div className="auth-form-group">
                <label>First Name</label>

                <input
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "auth-input-error" : ""}
                />

                {errors.firstName && (
                  <div className="auth-field-error">
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className="auth-form-group">
                <label>Last Name</label>

                <input
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "auth-input-error" : ""}
                />

                {errors.lastName && (
                  <div className="auth-field-error">
                    {errors.lastName}
                  </div>
                )}
              </div>

              {/* Username */}
              <div className="auth-form-group">
                <label>Username</label>

                <input
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "auth-input-error" : ""}
                />

                {errors.username && (
                  <div className="auth-field-error">
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="auth-form-group">
                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? "auth-input-error" : ""}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Patient">Patient</option>
                </select>

                {errors.role && (
                  <div className="auth-field-error">
                    {errors.role}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="auth-form-group">
                <label>Phone</label>

                <input
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={errors.phone ? "auth-input-error" : ""}
                />

                {errors.phone && (
                  <div className="auth-field-error">
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="auth-form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "auth-input-error" : ""}
                />

                {errors.email && (
                  <div className="auth-field-error">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="auth-form-group">
                <label>Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "auth-input-error" : ""}
                  style={{ paddingRight: 40 }}
                />

                <span
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                {errors.password && (
                  <div className="auth-field-error">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="auth-form-group">
                <label>Confirm Password</label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={
                    errors.confirmPassword ? "auth-input-error" : ""
                  }
                  style={{ paddingRight: 40 }}
                />

                <span
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                {errors.confirmPassword && (
                  <div className="auth-field-error">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="auth-form-options">
              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />

                I agree terms & conditions
              </label>

              {errors.terms && (
                <div className="auth-field-error">
                  {errors.terms}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button className="auth-btn" onClick={handleRegister}>
              Register
            </button>

            <p className="auth-bottom-text">
              Already have account?
              <span onClick={() => navigate("/login")}>
                Login
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
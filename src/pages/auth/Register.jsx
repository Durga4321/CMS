import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Register.css";

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

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({}); // ✅ track field errors
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!agreeTerms) newErrors.terms = "You must agree to terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);

      if (res.status === 200 && res.data?.message) {
        toast.success(res.data.message || "Registration Successful 🎉");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "Registration failed. Please check your details."
      );
    }
  };

  return (
    <div className="super-admin-auth-wrapper">
      <div className="super-admin-register-card">
        <h2 className="super-admin-title">Register</h2>

        <div className="super-admin-form-grid">
          {/* Example field with inline error */}
          <div className="super-admin-form-group">
            <label>First Name</label>
            <input
              name="firstName"
              placeholder="John"
              onChange={handleChange}
              className={errors.firstName ? "error-input" : ""}
            />
            {errors.firstName && <small className="error-text">{errors.firstName}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              placeholder="Doe"
              onChange={handleChange}
              className={errors.lastName ? "error-input" : ""}
            />
            {errors.lastName && <small className="error-text">{errors.lastName}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Username</label>
            <input
              name="username"
              placeholder="johndoe"
              onChange={handleChange}
              className={errors.username ? "error-input" : ""}
            />
            {errors.username && <small className="error-text">{errors.username}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
            />
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={errors.confirmPassword ? "error-input" : ""}
            />
            {errors.confirmPassword && (
              <small className="error-text">{errors.confirmPassword}</small>
            )}
          </div>

          <div className="super-admin-form-group">
            <label>Role</label>
            <select
              name="role"
              onChange={handleChange}
              className={errors.role ? "error-input" : ""}
            >
              <option value="">Select Role</option>
              <option>Admin</option>
              <option>Doctor</option>
              <option>Receptionist</option>
              <option>Patient</option>
            </select>
            {errors.role && <small className="error-text">{errors.role}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Phone</label>
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
            />
            {errors.phone && <small className="error-text">{errors.phone}</small>}
          </div>

          <div className="super-admin-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>
        </div>

        <div className="super-admin-terms">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />{" "}
          <span>I agree terms & conditions</span>
          {errors.terms && <small className="error-text">{errors.terms}</small>}
        </div>

        <button className="super-admin-register-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="super-admin-bottom-text">
          Already have account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;

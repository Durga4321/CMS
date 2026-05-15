import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAdmin() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    clinic: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedValue = value;

    // Name validation
    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    // Clinic validation
    if (name === "clinic") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    // Role validation
    if (name === "role") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Only gmail.com, yahoo.com, outlook.com, hotmail.com emails allowed";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be minimum 6 characters";
    }

    if (!formData.clinic.trim()) {
      newErrors.clinic = "Clinic is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {

      await api.admins.create(formData);

      toast.success("Admin created successfully");

      setTimeout(() => {
        navigate("/admins");
      }, 1500);

    } catch (err) {

      console.error("Error creating admin:", err);

      toast.error("Failed to create admin");
    }
  };

  return (
    <div className="super-box">

      <ToastContainer position="top-right" autoClose={2000} />

      <h2>Create Admin</h2>

      <form className="form-grid" onSubmit={handleSubmit}>

        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && (
            <span className="validation-error">{errors.name}</span>
          )}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && (
            <span className="validation-error">{errors.email}</span>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && (
            <span className="validation-error">{errors.password}</span>
          )}
        </div>

        <div>
          <input
            name="clinic"
            placeholder="Clinic"
            value={formData.clinic}
            onChange={handleChange}
            className={errors.clinic ? "error-input" : ""}
          />
          {errors.clinic && (
            <span className="validation-error">{errors.clinic}</span>
          )}
        </div>

        <div>
          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? "error-input" : ""}
          />
          {errors.role && (
            <span className="validation-error">{errors.role}</span>
          )}
        </div>

        <button className="activate-btn" type="submit">
          Save
        </button>

      </form>
    </div>
  );
}

export default CreateAdmin;
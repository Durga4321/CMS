import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/admin.css";

import api from "../../services/api";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function CreateAdmin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    clinic: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name" || name === "clinic" || name === "role") {
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
      newErrors.email = "Enter valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
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

      console.error(err);

      toast.error("Failed to create admin");
    }
  };

  return (

    <div className="admins-form-container">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="admins-form-card">

        <div className="admins-form-header">

          <h2>Create Admin</h2>

          <p>Add new administrator details</p>

        </div>

        <form
          className="admins-form"
          onSubmit={handleSubmit}
        >

          <div className="admins-form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.name ? "admins-input-error" : ""}
            />

            {errors.name && (
              <span className="admins-error-text">
                {errors.name}
              </span>
            )}

          </div>

          <div className="admins-form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? "admins-input-error" : ""}
            />

            {errors.email && (
              <span className="admins-error-text">
                {errors.email}
              </span>
            )}

          </div>

          <div className="admins-grid">

            <div className="admins-form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={errors.password ? "admins-input-error" : ""}
              />

              {errors.password && (
                <span className="admins-error-text">
                  {errors.password}
                </span>
              )}

            </div>

            <div className="admins-form-group">

              <label>Clinic</label>

              <input
                type="text"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                placeholder="Enter clinic"
                className={errors.clinic ? "admins-input-error" : ""}
              />

              {errors.clinic && (
                <span className="admins-error-text">
                  {errors.clinic}
                </span>
              )}

            </div>

          </div>

          <div className="admins-form-group">

            <label>Role</label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role"
              className={errors.role ? "admins-input-error" : ""}
            />

            {errors.role && (
              <span className="admins-error-text">
                {errors.role}
              </span>
            )}

          </div>

          <div className="admins-btn-group">

            <button
              type="submit"
              className="admins-primary-btn"
            >
              Save Admin
            </button>

            <button
              type="button"
              className="admins-secondary-btn"
              onClick={() => navigate("/admins")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateAdmin;
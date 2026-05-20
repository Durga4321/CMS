import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddClinic() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    status: "Active"
  });

  const [errors, setErrors] = useState({});

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "contact") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm({
      ...form,
      [name]: updatedValue
    });
  };

  const validateForm = () => {

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Clinic name is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter valid email";
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

      await api.clinics.create(form);

      toast.success("Clinic added successfully");

      setTimeout(() => {
        navigate("/clinics");
      }, 1500);

    } catch (err) {

      console.error(err);

      toast.error("Failed to add clinic");
    }
  };

  return (
    <div className="clinic-container clinic-centered">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="clinic-card">

        <form className="clinic-form" onSubmit={handleSubmit}>

          <div className="clinic-header">
            <h2>Add Clinic</h2>
            <p>Create new clinic details</p>
          </div>

          <div className="clinic-form-group">
            <label>Clinic Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter clinic name"
              className={errors.name ? "clinic-input-error" : ""}
            />

            {errors.name && (
              <span className="clinic-error">{errors.name}</span>
            )}
          </div>

          <div className="clinic-form-group">
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Area, City, State, India"
              className={errors.address ? "clinic-input-error" : ""}
            />

            {errors.address && (
              <span className="clinic-error">{errors.address}</span>
            )}
          </div>

          <div className="clinic-grid">

            <div className="clinic-form-group">
              <label>Contact Number</label>

              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className={errors.contact ? "clinic-input-error" : ""}
              />

              {errors.contact && (
                <span className="clinic-error">{errors.contact}</span>
              )}
            </div>

            <div className="clinic-form-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <div className="clinic-form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? "clinic-input-error" : ""}
            />

            {errors.email && (
              <span className="clinic-error">{errors.email}</span>
            )}
          </div>

          <div className="clinic-btn-group">

            <button type="submit" className="clinic-primary-btn">
              Save Clinic
            </button>

            <button
              type="button"
              className="clinic-secondary-btn"
              onClick={() => navigate("/clinics")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddClinic;
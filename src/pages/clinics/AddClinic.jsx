import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddClinic() {

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    status: "Active"
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedValue = value;

    // Clinic Name → only characters & spaces
    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    // Contact → only numbers & max 10 digits
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

    // Clinic Name
    if (!form.name.trim()) {
      newErrors.name = "Clinic name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      newErrors.name = "Only alphabets are allowed";
    }

    // Address
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (!/india/i.test(form.address)) {
      newErrors.address = "Enter valid Indian address format (Area, City, State, India)";
    }

    // Contact
    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email =
        "In correct format";
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

      console.error("Error adding clinic:", err);

      toast.error("Failed to add clinic");
    }
  };

  return (
    <div className="clinic-container centered">

      <ToastContainer position="top-right" autoClose={2000} />

      <form className="clinic-form" onSubmit={handleSubmit}>

        <h2>Add Clinic</h2>

        <input
          type="text"
          name="name"
          placeholder="Clinic Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="clinic-error">{errors.name}</span>}

        <input
          type="text"
          name="address"
          placeholder="Address(Area, City, State, India)"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <span className="clinic-error">{errors.address}</span>}

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
        />
        {errors.contact && <span className="clinic-error">{errors.contact}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="clinic-error">{errors.email}</span>}

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          Save
        </button>

      </form>
    </div>
  );
}

export default AddClinic;
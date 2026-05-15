import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Clinic.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditClinic() {

  const { id } = useParams();

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

  useEffect(() => {

    api.clinics.get(id)
      .then(res => {

        setForm({
          name: res.name,
          address: res.location,
          contact: res.contactNumber,
          email: res.email,
          status: res.status
        });

      })
      .catch(err => console.error("Fetch error:", err));

  }, [id]);

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
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      newErrors.name = "Only alphabets are allowed";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (!/india/i.test(form.address)) {
      newErrors.address = "Enter valid Indian address format (Area, City, State, India)";
    }

    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

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

      await api.clinics.update(id, form);

      toast.success("Clinic updated successfully");

      setTimeout(() => {
        navigate("/clinics");
      }, 1500);

    } catch (err) {

      console.error("Update error:", err);

      toast.error("Failed to update clinic");
    }
  };

  return (
    <div className="clinic-container centered">

      <ToastContainer position="top-right" autoClose={2000} />

      <form className="clinic-form" onSubmit={handleSubmit}>

        <h2>Edit Clinic</h2>

        <input
          type="text"
          name="name"
          placeholder="Clinic Name"
          value={form.name || ""}
          onChange={handleChange}
        />
        {errors.name && <span className="clinic-error">{errors.name}</span>}

        <input
          type="text"
          name="address"
          placeholder="Address(Area, City, State, India)"
          value={form.address || ""}
          onChange={handleChange}
        />
        {errors.address && <span className="clinic-error">{errors.address}</span>}

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact || ""}
          onChange={handleChange}
        />
        {errors.contact && <span className="clinic-error">{errors.contact}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email || ""}
          onChange={handleChange}
        />
        {errors.email && <span className="clinic-error">{errors.email}</span>}

        <select
          name="status"
          value={form.status || ""}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          Update
        </button>

      </form>
    </div>
  );
}

export default EditClinic;
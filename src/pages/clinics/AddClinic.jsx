import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";

function AddClinic() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    status: "Active"
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.clinics.create(form); // ✅ wrapper method
      alert("Clinic added successfully");
      navigate("/clinics");
    } catch (err) {
      console.error("Error adding clinic:", err);
      alert("Failed to add clinic");
    }
  };

  return (
    <div className="clinic-container centered">
      <form className="clinic-form" onSubmit={handleSubmit}>
        <h2>Add Clinic</h2>
        <input name="name" placeholder="Clinic Name" value={form.name} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddClinic;

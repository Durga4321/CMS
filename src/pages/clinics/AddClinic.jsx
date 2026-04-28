import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";

function AddClinic() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    contactNumber: "",
    email: "",
    status: "Active"
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Mock save for now
    alert("Clinic added successfully (mock)");
    navigate("/clinics");
  };

  return (
    <div className="clinic-container centered">
      <form className="clinic-form" onSubmit={handleSubmit}>
        <h2>Add Clinic</h2>
        <input name="name" placeholder="Clinic Name" value={form.name} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} />
        <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Save</button>

        {/* Navigation to Edit Clinic */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/edit-clinic/1" className="add-btn">Edit </Link>
        </div>
      </form>
    </div>
  );
}

export default AddClinic;

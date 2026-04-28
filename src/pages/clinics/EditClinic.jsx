import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Clinic.css";

function EditClinic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    location: "",
    contactNumber: "",
    email: "",
    status: ""
  });

  useEffect(() => {
    api.get(`/clinics/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/clinics/${id}`, form)
      .then(() => {
        alert("Clinic updated successfully");
        navigate("/clinics");
      })
      .catch(err => console.error("Update error:", err));
  };

  return (
    <div className="clinic-container centered">
      <form className="clinic-form" onSubmit={handleSubmit}>
        <h2>Edit Clinic</h2>
        <input name="name" placeholder="Clinic Name" value={form.name} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} />
        <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditClinic;

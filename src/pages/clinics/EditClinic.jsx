import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Clinic.css";

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

  useEffect(() => {
    api.clinics.get(id)
      .then(res => {
        setForm({
          name: res.name,
          address: res.location,       // backend field mapping
          contact: res.contactNumber,
          email: res.email,
          status: res.status
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.clinics.update(id, form); // ✅ wrapper method
      alert("Clinic updated successfully");
      navigate("/clinics");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update clinic");
    }
  };

  return (
    <div className="clinic-container centered">
      <form className="clinic-form" onSubmit={handleSubmit}>
        <h2>Edit Clinic</h2>
        <input name="name" placeholder="Clinic Name" value={form.name || ""} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address || ""} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact || ""} onChange={handleChange} />
        <input name="email" placeholder="Email Address" value={form.email || ""} onChange={handleChange} />
        <select name="status" value={form.status || ""} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditClinic;

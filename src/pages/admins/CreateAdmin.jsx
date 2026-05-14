import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import api from "../../services/api";

function CreateAdmin() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", clinic: "", role: ""
  });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.clinic || !formData.role) {
      alert("All fields are required");
      return;
    }
    try {
      await api.admins.create(formData);
      alert("Admin created successfully");
      navigate("/admins");
    } catch (err) {
      console.error("Error creating admin:", err);
      alert("Failed to create admin");
    }
  };

  return (
    <div className="super-box">
      <h2>Create Admin</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input name="clinic" placeholder="Clinic" value={formData.clinic} onChange={handleChange} />
        <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
        <button className="activate-btn" type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateAdmin;

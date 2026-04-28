import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function CreateAdmin() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", clinic: "", role: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("/api/admins", formData);
      alert("Admin created successfully");
      navigate("/admins");
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  return (
    <div className="super-box">
      <h2>Create Admin</h2>
      <div className="form-grid">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input name="clinic" placeholder="Clinic" onChange={handleChange} />
        <input name="role" placeholder="Role" onChange={handleChange} />
      </div>
      <button className="activate-btn" onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CreateAdmin;

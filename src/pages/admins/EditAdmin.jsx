import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import api from "../../services/api";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clinic: "",
    role: "",
    status: "Active"
  });

  useEffect(() => {
    api.get(`/admins/${id}`)
      .then(res => {
        console.log("Fetched admin:", res.data);
        // Map backend response into form fields
        setFormData({
          name: res.data.name,
          email: res.data.email,
          clinic: res.data.clinic,
          role: res.data.role,
          status: res.data.status
        });
      })
      .catch(err => console.error("Error fetching admin:", err));
  }, [id]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        clinic: formData.clinic,
        role: formData.role,
        status: formData.status
      };

      await api.put(`/admins/${id}`, payload);
      alert("Admin updated successfully");
      navigate("/admins");
    } catch (err) {
      console.error("Error updating admin:", err.response?.data || err.message);
      alert("Failed to update admin");
    }
  };

  return (
    <div className="super-box">
      <h2>Edit Admin</h2>
      <div className="form-grid">
        <input
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
        />
        <input
          name="clinic"
          placeholder="Clinic"
          value={formData.clinic || ""}
          onChange={handleChange}
        />
        <input
          name="role"
          placeholder="Role"
          value={formData.role || ""}
          onChange={handleChange}
        />
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button className="activate-btn" onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditAdmin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function EditAdmin() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/admins/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error("Error fetching admin:", err));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/admins/${id}`, formData);
      alert("Admin updated successfully");
      navigate("/admins");
    } catch (err) {
      console.error("Error updating admin:", err);
    }
  };

  return (
    <div className="super-box">
      <h2>Edit Admin</h2>
      <div className="form-grid">
        <input name="name" value={formData.name || ""} onChange={handleChange} />
        <input name="email" value={formData.email || ""} onChange={handleChange} />
        <input name="clinic" value={formData.clinic || ""} onChange={handleChange} />
        <input name="role" value={formData.role || ""} onChange={handleChange} />
      </div>
      <button className="activate-btn" onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditAdmin;

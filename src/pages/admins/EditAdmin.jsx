import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [errors, setErrors] = useState({});

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

  useEffect(() => {

    api.admins.get(id)
      .then(res => {

        setFormData({
          name: res.name,
          email: res.email,
          clinic: res.clinic,
          role: res.role,
          status: res.status
        });

      })
      .catch(err => console.error("Error fetching admin:", err));

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "clinic") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "role") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Only gmail.com, yahoo.com, outlook.com, hotmail.com emails allowed";
    }

    if (!formData.clinic.trim()) {
      newErrors.clinic = "Clinic is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {

      await api.admins.update(id, formData);

      toast.success("Admin updated successfully");

      setTimeout(() => {
        navigate("/admins");
      }, 1500);

    } catch (err) {

      console.error("Error updating admin:", err);

      toast.error("Failed to update admin");
    }
  };

  return (
    <div className="super-box">

      <ToastContainer position="top-right" autoClose={2000} />

      <h2>Edit Admin</h2>

      <div className="form-grid">

        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && (
            <span className="validation-error">{errors.name}</span>
          )}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && (
            <span className="validation-error">{errors.email}</span>
          )}
        </div>

        <div>
          <input
            name="clinic"
            placeholder="Clinic"
            value={formData.clinic || ""}
            onChange={handleChange}
            className={errors.clinic ? "error-input" : ""}
          />
          {errors.clinic && (
            <span className="validation-error">{errors.clinic}</span>
          )}
        </div>

        <div>
          <input
            name="role"
            placeholder="Role"
            value={formData.role || ""}
            onChange={handleChange}
            className={errors.role ? "error-input" : ""}
          />
          {errors.role && (
            <span className="validation-error">{errors.role}</span>
          )}
        </div>

        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      <button className="activate-btn" onClick={handleUpdate}>
        Update
      </button>

    </div>
  );
}

export default EditAdmin;
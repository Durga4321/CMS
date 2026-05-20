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
      .catch(err => console.error(err));

  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await api.admins.update(id, formData);

      toast.success("Admin updated successfully");

      setTimeout(() => {
        navigate("/admins");
      }, 1500);

    } catch (err) {

      console.error(err);

      toast.error("Failed to update admin");
    }
  };

  return (

    <div className="admins-form-container">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="admins-form-card">

        <div className="admins-form-header">

          <h2>Edit Admin</h2>

          <p>Update administrator details</p>

        </div>

        <form
          className="admins-form"
          onSubmit={handleUpdate}
        >

          <div className="admins-form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />

          </div>

          <div className="admins-form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />

          </div>

          <div className="admins-grid">

            <div className="admins-form-group">

              <label>Clinic</label>

              <input
                type="text"
                name="clinic"
                value={formData.clinic || ""}
                onChange={handleChange}
              />

            </div>

            <div className="admins-form-group">

              <label>Role</label>

              <input
                type="text"
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="admins-form-group">

            <label>Status</label>

            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

          <div className="admins-btn-group">

            <button
              type="submit"
              className="admins-primary-btn"
            >
              Update Admin
            </button>

            <button
              type="button"
              className="admins-secondary-btn"
              onClick={() => navigate("/admins")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditAdmin;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [errors, setErrors] = useState({});

  useEffect(() => {

    api.clinics.get(id)
      .then((res) => {

        setForm({
          name: res.name,
          address: res.location,
          contact: res.contactNumber,
          email: res.email,
          status: res.status
        });

      })
      .catch(err => console.error(err));

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.clinics.update(id, form);

      toast.success("Clinic updated successfully");

      setTimeout(() => {
        navigate("/clinics");
      }, 1500);

    } catch (err) {

      console.error(err);

      toast.error("Failed to update clinic");
    }
  };

  return (
    <div className="clinic-container clinic-centered">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="clinic-card">

        <form className="clinic-form" onSubmit={handleSubmit}>

          <div className="clinic-header">
            <h2>Edit Clinic</h2>
            <p>Update clinic information</p>
          </div>

          <div className="clinic-form-group">
            <label>Clinic Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="clinic-form-group">
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="clinic-grid">

            <div className="clinic-form-group">
              <label>Contact Number</label>

              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
            </div>

            <div className="clinic-form-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <div className="clinic-form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="clinic-btn-group">

            <button type="submit" className="clinic-primary-btn">
              Update Clinic
            </button>

            <button
              type="button"
              className="clinic-secondary-btn"
              onClick={() => navigate("/clinics")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditClinic;
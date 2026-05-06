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
    api.get(`/clinics/${id}`)
      .then(res => {
        console.log("Fetched clinic:", res.data);
        // Map response fields into form fields
        setForm({
          name: res.data.name,
          address: res.data.location,       // response uses location
          contact: res.data.contactNumber,  // response uses contactNumber
          email: res.data.email,
          status: res.data.status
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Backend expects address + contact in request
      const payload = {
        name: form.name,
        address: form.address,
        contact: form.contact,
        email: form.email,
        status: form.status
      };

      await api.put(`/clinics/${id}`, payload);
      alert("Clinic updated successfully");
      navigate("/clinics");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update clinic");
    }
  };

  return (
    <div className="clinic-container centered">
      <form className="clinic-form" onSubmit={handleSubmit}>
        <h2>Edit Clinic</h2>
        <input
          name="name"
          placeholder="Clinic Name"
          value={form.name || ""}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address || ""}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact || ""}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email Address"
          value={form.email || ""}
          onChange={handleChange}
        />
        <select
          name="status"
          value={form.status || ""}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditClinic;

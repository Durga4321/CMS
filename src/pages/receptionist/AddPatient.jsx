import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/patient.css";

function AddPatient() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    medicalHistory: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.receptionist.addPatient(formData);
      toast.success("Patient added successfully 🎉");
      setFormData({
        name: "",
        dob: "",
        gender: "",
        phone: "",
        address: "",
        email: "",
        medicalHistory: "",
      });
    } catch (err) {
      console.error("Error adding patient:", err);
      toast.error(err.message || "Failed to add patient");
    }
  };

  return (
    <div className="patient-container">
      <main className="patient-main">
        <h2 className="patient-title">Add Patient</h2>
        <form className="patient-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <textarea name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} />
          <button type="submit" className="patient-btn">Save Patient</button>
        </form>
      </main>
    </div>
  );
}

export default AddPatient;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/patient.css";

function EditPatient() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.receptionist.getPatient(id)
      .then(data => setFormData(data))
      .catch(err => console.error("Error fetching patient:", err));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.receptionist.updatePatient(id, formData);
      toast.success("Patient updated successfully 🎉");
    } catch (err) {
      toast.error(err.message || "Failed to update patient");
    }
  };

  return (
    <div className="patient-container">
      <main className="patient-main">
        <h2 className="patient-title">Edit Patient</h2>
        <form className="patient-form" onSubmit={handleSubmit}>
          <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" />
          <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" />
          <button type="submit" className="patient-btn">Update</button>
        </form>
      </main>
    </div>
  );
}

export default EditPatient;

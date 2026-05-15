import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/appointments.css";

function EditAppointment() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.receptionist.getAppointment(id)
      .then(data => setFormData(data))
      .catch(err => console.error("Error fetching appointment:", err));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.receptionist.updateAppointment(id, formData);
      toast.success("Appointment updated successfully 🎉");
    } catch (err) {
      toast.error(err.message || "Failed to update appointment");
    }
  };

  return (
    <div className="appointments-container">
      <main className="appointments-main">
        <h2 className="appointments-title">Edit Appointment</h2>
        <form className="appointments-form" onSubmit={handleSubmit}>
          <input name="date" type="date" value={formData.date || ""} onChange={handleChange} />
          <input name="time" type="time" value={formData.time || ""} onChange={handleChange} />
          <select name="status" value={formData.status || ""} onChange={handleChange}>
            <option value="Scheduled">Scheduled</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="appointments-btn">Update</button>
        </form>
      </main>
    </div>
  );
}

export default EditAppointment;

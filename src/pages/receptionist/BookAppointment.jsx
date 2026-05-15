import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/appointments.css";

function BookAppointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    timeSlot: "",
  });

  useEffect(() => {
    api.receptionist.getWaitingPatients()
      .then(data => setPatients(data || []))
      .catch(err => console.error("Error fetching patients:", err));

    api.users.list()
      .then(data => setDoctors(data || []))
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.receptionist.bookAppointment(formData);
      toast.success("Appointment booked successfully 🎉");
      setFormData({ patientId: "", doctorId: "", date: "", timeSlot: "" });
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error(err.message || "Failed to book appointment");
    }
  };

  return (
    <div className="appointments-container">
      <main className="appointments-main">
        <h2 className="appointments-title">Book Appointment</h2>
        <form className="appointments-form" onSubmit={handleSubmit}>
          <select name="patientId" value={formData.patientId} onChange={handleChange} required>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="time" name="timeSlot" value={formData.timeSlot} onChange={handleChange} required />

          <button type="submit" className="appointments-btn">Confirm Booking</button>
        </form>
      </main>
    </div>
  );
}

export default BookAppointment;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/appointments.css";

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    api.receptionist.getAppointment(id)
      .then(data => setAppointment(data))
      .catch(err => console.error("Error fetching appointment:", err));
  }, [id]);

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="appointments-container">
      <main className="appointments-main">
        <h2 className="appointments-title">Appointment Details</h2>
        <p><strong>Patient:</strong> {appointment.patientName}</p>
        <p><strong>Doctor:</strong> {appointment.doctorName}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
      </main>
    </div>
  );
}

export default AppointmentDetails;

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/appointments.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.receptionist.getTodayAppointments()
      .then(data => setAppointments(data || []))
      .catch(err => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div className="appointments-container">
      <main className="appointments-main">
        <h2 className="appointments-title">Appointment List</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, idx) => (
                <tr key={idx}>
                  <td>{appt.patientName}</td>
                  <td>{appt.doctorName}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AppointmentList;

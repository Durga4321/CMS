import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/receptionist-dashboard.css";

function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [waitingPatients, setWaitingPatients] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    api.receptionist.getTodayAppointments()
      .then(data => setAppointments(data || []))
      .catch(err => console.error("Error fetching appointments:", err));

    api.receptionist.getWaitingPatients()
      .then(data => setWaitingPatients(data || []))
      .catch(err => console.error("Error fetching waiting patients:", err));

    api.receptionist.getCompletedAppointments()
      .then(data => setCompletedAppointments(data || []))
      .catch(err => console.error("Error fetching completed appointments:", err));
  }, []);

  return (
    <div className="receptionist-dashboard-container">
     

      {/* Main Content */}
      <main className="receptionist-dashboard-main">
       

        {/* Widgets */}
        <div className="receptionist-dashboard-widgets">
          <div className="receptionist-dashboard-widget">
            <h4>Today's Appointments</h4>
            <p>{appointments.length}</p>
          </div>
          <div className="receptionist-dashboard-widget">
            <h4>Waiting Patients</h4>
            <p>{waitingPatients.length}</p>
          </div>
          <div className="receptionist-dashboard-widget">
            <h4>Completed Appointments</h4>
            <p>{completedAppointments.length}</p>
          </div>
        </div>

        {/* Appointment List */}
        <section className="receptionist-dashboard-section">
          <h3>Appointment List</h3>
          <table className="receptionist-dashboard-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
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
                    <td>{appt.time}</td>
                    <td>{appt.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No appointments today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Waiting Queue */}
        <section className="receptionist-dashboard-section">
          <h3>Waiting Queue</h3>
          <ul>
            {waitingPatients.length > 0 ? (
              waitingPatients.map((p, idx) => (
                <li key={idx}>{p.name} ({p.reason})</li>
              ))
            ) : (
              <li>No patients waiting</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ReceptionistDashboard;

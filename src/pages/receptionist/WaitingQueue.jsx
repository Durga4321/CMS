import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/appointments.css";

function WaitingQueue() {
  const [waitingPatients, setWaitingPatients] = useState([]);

  useEffect(() => {
    api.receptionist.getWaitingPatients()
      .then(data => setWaitingPatients(data || []))
      .catch(err => console.error("Error fetching waiting patients:", err));
  }, []);

  return (
    <div className="appointments-container">
      <main className="appointments-main">
        <h2 className="appointments-title">Waiting Queue</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {waitingPatients.length > 0 ? (
              waitingPatients.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.token ?? idx + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.reason}</td>
                  <td>
                    <span className={`appointments-status ${p.status?.toLowerCase()}`}>
                      {p.status ?? "Waiting"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No patients waiting
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default WaitingQueue;

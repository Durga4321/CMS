import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/patient.css";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.receptionist.getWaitingPatients()
      .then(data => setPatients(data || []))
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  return (
    <div className="patient-container">
      <main className="patient-main">
        <h2 className="patient-title">Patient List</h2>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.email}</td>
                  <td>{p.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default PatientList;

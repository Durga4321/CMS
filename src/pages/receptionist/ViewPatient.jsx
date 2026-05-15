import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/patient.css";

function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.receptionist.getPatient(id)
      .then(data => setPatient(data))
      .catch(err => console.error("Error fetching patient:", err));
  }, [id]);

  if (!patient) return <p className="patient-empty">Loading...</p>;

  return (
    <div className="patient-container">
      <main className="patient-main">
        <h2 className="patient-title">Patient Details</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
      </main>
    </div>
  );
}

export default ViewPatient;

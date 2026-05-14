import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Clinic.css";

function ViewClinic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    api.clinics.get(id)
      .then(res => setClinic(res))
      .catch(err => console.error("Error fetching clinic:", err));
  }, [id]);

  if (!clinic) {
    return (
      <div className="clinic-container">
        <h2>Clinic Details</h2>
        <p style={{ textAlign: "center", color: "#64748b" }}>Loading clinic...</p>
      </div>
    );
  }

  return (
    <div className="clinic-container">
      <h2>Clinic Details</h2>
      <div className="clinic-details">
        <p><strong>ID:</strong> {clinic.id}</p>
        <p><strong>Name:</strong> {clinic.name}</p>
        <p><strong>Location:</strong> {clinic.location}</p>
        <p><strong>Contact Number:</strong> {clinic.contactNumber}</p>
        <p><strong>Email:</strong> {clinic.email}</p>
        <p><strong>Status:</strong> {clinic.status}</p>
        <button className="back-btn" onClick={() => navigate("/clinics")}>Back</button>
      </div>
    </div>
  );
}

export default ViewClinic;

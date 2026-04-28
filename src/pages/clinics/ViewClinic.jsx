import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Clinic.css";

function ViewClinic() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});

  useEffect(() => {
    api.get(`/clinics/${id}`)
      .then(res => setClinic(res.data))
      .catch(err => console.error("Error fetching clinic:", err));
  }, [id]);

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
      </div>
    </div>
  );
}

export default ViewClinic;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";

function ViewClinic() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [clinic, setClinic] = useState(null);

  useEffect(() => {

    api.clinics.get(id)
      .then((res) => setClinic(res))
      .catch(err => console.error(err));

  }, [id]);

  if (!clinic) {

    return (
      <div className="clinic-loading">
        Loading clinic details...
      </div>
    );
  }

  return (
    <div className="clinic-container clinic-centered">

      <div className="clinic-view-card">

        <div className="clinic-header">
          <h2>Clinic Details</h2>
          <p>View clinic information</p>
        </div>

        <div className="clinic-view-grid">

          <div className="clinic-view-item">
            <label>Clinic ID</label>
            <span>{clinic.id}</span>
          </div>

          <div className="clinic-view-item">
            <label>Clinic Name</label>
            <span>{clinic.name}</span>
          </div>

          <div className="clinic-view-item">
            <label>Location</label>
            <span>{clinic.location}</span>
          </div>

          <div className="clinic-view-item">
            <label>Contact Number</label>
            <span>{clinic.contactNumber}</span>
          </div>

          <div className="clinic-view-item">
            <label>Email Address</label>
            <span>{clinic.email}</span>
          </div>

          <div className="clinic-view-item">
            <label>Status</label>

            <span className="clinic-status-active">
              {clinic.status}
            </span>
          </div>

        </div>

        <button
          className="clinic-secondary-btn clinic-back-btn"
          onClick={() => navigate("/clinics")}
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default ViewClinic;
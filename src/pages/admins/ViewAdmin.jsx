import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import "../../styles/admin.css";

import api from "../../services/api";

function ViewAdmin() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  useEffect(() => {

    api.admins.get(id)
      .then(res => setAdmin(res))
      .catch(err => console.error(err));

  }, [id]);

  if (!admin) {

    return (
      <div className="admins-loading">
        Loading admin details...
      </div>
    );
  }

  return (

    <div className="admins-view-container">

      <div className="admins-view-card">

        <div className="admins-form-header">

          <h2>Admin Details</h2>

          <p>View administrator information</p>

        </div>

        <div className="admins-view-grid">

          <div className="admins-view-item">
            <label>Name</label>
            <span>{admin.name}</span>
          </div>

          <div className="admins-view-item">
            <label>Email</label>
            <span>{admin.email}</span>
          </div>

          <div className="admins-view-item">
            <label>Clinic</label>
            <span>{admin.clinic}</span>
          </div>

          <div className="admins-view-item">
            <label>Role</label>
            <span>{admin.role}</span>
          </div>

          <div className="admins-view-item">
            <label>Status</label>

            <span
              className={
                admin.status === "Active"
                  ? "admins-status-active"
                  : "admins-status-inactive"
              }
            >
              {admin.status}
            </span>

          </div>

        </div>

        <button
          className="admins-secondary-btn admins-back-btn"
          onClick={() => navigate("/admins")}
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default ViewAdmin;
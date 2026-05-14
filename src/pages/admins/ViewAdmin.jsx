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
      .catch(err => console.error("Error fetching admin:", err));
  }, [id]);

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="super-box">
      <h2>Admin Details</h2>
      <p><strong>Name:</strong> {admin.name}</p>
      <p><strong>Email:</strong> {admin.email}</p>
      <p><strong>Clinic:</strong> {admin.clinic}</p>
      <p><strong>Role:</strong> {admin.role}</p>
      <p><strong>Status:</strong> {admin.status}</p>

      {/* Back button for navigation */}
      <button
        className="back-btn"
        onClick={() => navigate("/admins")}
      >
        Back to Admin List
      </button>
    </div>
  );
}

export default ViewAdmin;

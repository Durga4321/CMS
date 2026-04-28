import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/admin.css";

function ViewAdmin() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axios.get(`/api/admins/${id}`)
      .then(res => setAdmin(res.data))
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
    </div>
  );
}

export default ViewAdmin;

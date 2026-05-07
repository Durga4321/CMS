import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/user.css";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(res => {
        console.log("Fetched user:", res.data);
        setUser(res.data);
      })
      .catch(err => console.error("Error fetching user details:", err));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.status}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

      <button
        className={user.status === "Active" ? "deactivate-btn" : "activate-btn"}
        onClick={() => navigate(`/user-activate-deactivate/${user.id}`)}
      >
        {user.status === "Active" ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}

export default UserDetails;

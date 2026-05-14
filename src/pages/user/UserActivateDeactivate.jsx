import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/user.css";

function UserActivateDeactivate() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.users.get(id)
      .then(res => {
        console.log("Fetched user:", res);
        setUser(res);
      })
      .catch(err => console.error("Error fetching user:", err));
  }, [id]);

  const toggleStatus = async () => {
    try {
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      await api.users.updateStatus(id, { status: newStatus });
      setUser({ ...user, status: newStatus });
      alert(`User ${newStatus} successfully`);
      navigate("/users");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update user status");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-activate-deactivate">
      <h2>Activate / Deactivate User</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Current Status:</strong> {user.status}</p>

      <button
        className={user.status === "Active" ? "deactivate-btn" : "activate-btn"}
        onClick={toggleStatus}
      >
        {user.status === "Active" ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}

export default UserActivateDeactivate;

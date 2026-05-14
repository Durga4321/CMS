import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/roles.css";

function CreateRole() {
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!roleName) return;
    try {
      await api.roles.create({ name: roleName });
      alert("Role created successfully");
      navigate("/roles");
    } catch (err) {
      console.error("Error creating role:", err);
      alert("Failed to create role");
    }
  };

  return (
    <div className="roles-container">
      <h2>Create Role</h2>
      <div className="roles-form">
        <label>Role Name</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter role name"
        />
        <button className="roles-btn" onClick={handleSave}>Save Role</button>
      </div>
    </div>
  );
}

export default CreateRole;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/roles.css";

function CreateRole() {
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!roleName) return;
    try {
      await axios.post("/api/roles", { name: roleName });
      navigate("/roles");
    } catch (err) {
      console.error("Error creating role:", err);
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

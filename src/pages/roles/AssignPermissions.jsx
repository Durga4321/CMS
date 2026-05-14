import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/roles.css";

function AssignPermissions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    if (!id) return;
    api.roles.get(id)
      .then(role => {
        console.log("Fetched role:", role);
        setPermissions({
          view: role.permissions?.includes("View"),
          create: role.permissions?.includes("Create"),
          edit: role.permissions?.includes("Edit"),
          delete: role.permissions?.includes("Delete"),
        });
      })
      .catch(err => console.error("Error loading role:", err));
  }, [id]);

  const handleSave = async () => {
    const selected = Object.keys(permissions).filter(p => permissions[p]);
    try {
      await api.roles.updatePermissions(id, { permissions: selected });
      alert("Permissions updated successfully");
      navigate("/roles");
    } catch (err) {
      console.error("Error saving permissions:", err);
      alert("Failed to update permissions");
    }
  };

  return (
    <div className="roles-container">
      <h2>Assign Permissions</h2>
      <div className="roles-form">
        {["view", "create", "edit", "delete"].map(p => (
          <label key={p} className="roles-check">
            <input
              type="checkbox"
              checked={permissions[p]}
              onChange={(e) => setPermissions(prev => ({ ...prev, [p]: e.target.checked }))}
            />
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </label>
        ))}
        <div className="roles-actions">
          <button className="roles-btn" onClick={handleSave}>Save Permissions</button>
          <button className="roles-btn" onClick={() => navigate("/roles")}>Back to Roles</button>
        </div>
      </div>
    </div>
  );
}

export default AssignPermissions;

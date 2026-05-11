import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/roles.css";

function RoleList() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/roles")
      .then(res => {
        console.log("Fetched roles:", res.data);
        setRoles(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  const handleAssignPermissions = (roleId) => {
    // ✅ Navigate to the correct route
    navigate(`/roles/assign-permissions/${roleId}`);
  };

  return (
    <div className="roles-container">
      <h2>Role List</h2>
      <table className="roles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{Array.isArray(role.permissions) ? role.permissions.join(", ") : ""}</td>
                <td>
                  <button
                    className="roles-btn"
                    onClick={() => handleAssignPermissions(role.id)}
                  >
                    Assign Permissions
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No roles found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="roles-btn" onClick={() => navigate("/roles/create-role")}>
        + Create Role
      </button>
    </div>
  );
}

export default RoleList;

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

  return (
    <div className="roles-container">
      <h2>Role List</h2>
      <table className="roles-table">
        <thead>
          <tr>
            <th>Name</th><th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map(role => (
              <tr key={role.id} onClick={() => navigate(`/assign-permissions/${role.id}`)}>
                <td>{role.name}</td>
                <td>{Array.isArray(role.permissions) ? role.permissions.join(", ") : ""}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>No roles found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="roles-btn" onClick={() => navigate("/create-role")}>
        + Create Role
      </button>
    </div>
  );
}

export default RoleList;

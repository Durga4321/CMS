import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/roles.css";

function RoleList() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/roles")
      .then(res => setRoles(Array.isArray(res.data) ? res.data : res.data?.data || []))
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
          {roles.map(role => (
            <tr key={role.id} onClick={() => navigate(`/assign-permissions/${role.id}`)}>
              <td>{role.name}</td>
              <td>{role.permissions?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="roles-btn" onClick={() => navigate("/create-role")}>
        + Create Role
      </button>
    </div>
  );
}

export default RoleList;

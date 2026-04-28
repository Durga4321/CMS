import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/admins")
      .then(res => setAdmins(res.data))
      .catch(err => console.error("Error fetching admins:", err));
  }, []);

  return (
    <div className="super-box">
      <h2>Admin List</h2>
      <table className="super-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Clinic</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id} onClick={() => navigate(`/view-admin/${admin.id}`)}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.clinic}</td>
              <td>{admin.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="activate-btn" onClick={() => navigate("/create-admin")}>
        + Create Admin
      </button>
    </div>
  );
}

export default AdminList;

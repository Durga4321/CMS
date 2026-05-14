import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";
import api from "../../services/api";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.admins.list()
      .then(res => {
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];
        setAdmins(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching admins:", err);
        setError("Failed to load admins");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="super-loading">Loading admins...</div>;
  if (error) return <div className="super-error">{error}</div>;

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
          {admins.length > 0 ? (
            admins.map(admin => (
              <tr key={admin.id} onClick={() => navigate(`/view-admin/${admin.id}`)}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.clinic}</td>
                <td>{admin.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No admins found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="activate-btn" onClick={() => navigate("/create-admin")}>
        + Create Admin
      </button>
    </div>
  );
}

export default AdminList;

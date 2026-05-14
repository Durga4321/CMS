import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Clinic.css";
import api from "../../services/api";

function ClinicList() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    api.clinics.list()
      .then(res => {
        let data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        setClinics(data);
      })
      .catch(err => console.error("Error fetching clinics:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;
    try {
      await api.clinics.remove(id); // ✅ wrapper method
      setClinics(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting clinic:", err);
    }
  };

  return (
    <div className="clinic-container">
      <h2>Clinic List</h2>
      <Link to="/add-clinic" className="add-btn">Add Clinic</Link>
      <table className="clinic-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Location</th><th>Status</th>
            <th>Contact Number</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinics.length > 0 ? (
            clinics.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.location}</td>
                <td>{c.status}</td>
                <td>{c.contactNumber}</td>
                <td>{c.email}</td>
                <td className="clinic-actions">
                  <Link to={`/view-clinic/${c.id}`}>View</Link>
                  <Link to={`/edit-clinic/${c.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                No clinics available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClinicList;

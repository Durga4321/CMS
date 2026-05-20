import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import "../../styles/Clinic.css";
import api from "../../services/api";

function ClinicList() {

  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    api.clinics.list()
      .then((res) => {

        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];

        setClinics(data);

      })
      .catch(err => console.error(err));

  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure want to delete clinic?")) {
      return;
    }

    try {

      await api.clinics.remove(id);

      setClinics(prev => prev.filter(c => c.id !== id));

    } catch (err) {

      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    return String(status).toLowerCase() === "inactive"
      ? "clinic-status-inactive"
      : "clinic-status-active";
  };

  const filteredClinics = clinics.filter((clinic) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    return [
      clinic.id,
      clinic.name,
      clinic.location,
      clinic.status,
      clinic.contactNumber,
      clinic.email,
    ].some((value) => String(value ?? "").toLowerCase().includes(query));
  });

  return (
    <div className="clinic-container">

      <div className="clinic-page-header">

        <div>
          <h2>Clinic List</h2>
          <p>Manage all clinics</p>
        </div>

        <Link to="/add-clinic" className="clinic-add-btn">
          <FaPlus /> Add Clinic
        </Link>

      </div>

      <div className="clinic-table-card">

        <div className="clinic-toolbar">
          <div className="clinic-search">
            <FaSearch />
            <input
              type="search"
              placeholder="Search clinics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="clinic-table-wrapper">

          <table className="clinic-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredClinics.length > 0 ? (

                filteredClinics.map((c) => (

                  <tr key={c.id}>

                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>
                      <span className={getStatusClass(c.status)}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.contactNumber}</td>
                    <td>{c.email}</td>

                    <td>

                      <div className="clinic-actions">

                        <Link to={`/view-clinic/${c.id}`} className="clinic-action-view">
                          <FaEye /> View
                        </Link>

                        <Link to={`/edit-clinic/${c.id}`} className="clinic-action-edit">
                          <FaEdit /> Edit
                        </Link>

                        <button className="clinic-action-delete" onClick={() => handleDelete(c.id)}>
                          <FaTrash /> Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="7" className="clinic-empty-row">
                    {searchTerm ? "No clinics match your search" : "No clinics available"}
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ClinicList;

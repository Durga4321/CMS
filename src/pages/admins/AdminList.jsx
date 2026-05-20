import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

        console.error(err);

        setError("Failed to load admins");

        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="admins-loading">
        Loading admins...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admins-error">
        {error}
      </div>
    );
  }

  return (

    <div className="admins-container">

      <div className="admins-header">

        <div>
          <h2>Admin Management</h2>
          <p>Manage all clinic administrators</p>
        </div>

        <Link
          to="/create-admin"
          className="admins-primary-btn"
        >
          + Create Admin
        </Link>

      </div>

      <div className="admins-card">

        <div className="admins-table-wrapper">

          <table className="admins-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Clinic</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {admins.length > 0 ? (

                admins.map(admin => (

                  <tr
                    key={admin.id}
                    onClick={() => navigate(`/view-admin/${admin.id}`)}
                  >

                    <td>{admin.name}</td>

                    <td>{admin.email}</td>

                    <td>{admin.clinic}</td>

                    <td>

                      <span
                        className={
                          admin.status === "Active"
                            ? "admins-status-active"
                            : "admins-status-inactive"
                        }
                      >
                        {admin.status}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="admins-empty"
                  >
                    No admins found
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

export default AdminList;
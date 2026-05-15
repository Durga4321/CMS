import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/receptionist-reports.css";

function ReceptionistReports() {
  const [activeTab, setActiveTab] = useState("daily");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    let fetchFn;
    switch (activeTab) {
      case "daily":
        fetchFn = api.receptionist.dailyCollectionReport;
        break;
      case "appointments":
        fetchFn = api.receptionist.appointmentReport;
        break;
      case "doctor":
        fetchFn = api.receptionist.doctorWiseReport;
        break;
      case "pending":
        fetchFn = api.receptionist.pendingPaymentsReport;
        break;
      default:
        fetchFn = api.receptionist.reports;
    }
    fetchFn()
      .then(data => setReports(data || []))
      .catch(err => console.error("Error fetching reports:", err));
  }, [activeTab]);

  return (
    <div className="receptionist-reports-container">
      <main className="receptionist-reports-main">
        <h2 className="receptionist-reports-title">Receptionist Reports</h2>

        <div className="receptionist-reports-tabs">
          <button onClick={() => setActiveTab("daily")} className={activeTab==="daily" ? "active" : ""}>Daily Collection</button>
          <button onClick={() => setActiveTab("appointments")} className={activeTab==="appointments" ? "active" : ""}>Appointments</button>
          <button onClick={() => setActiveTab("doctor")} className={activeTab==="doctor" ? "active" : ""}>Doctor-wise</button>
          <button onClick={() => setActiveTab("pending")} className={activeTab==="pending" ? "active" : ""}>Pending Payments</button>
        </div>

        <table className="receptionist-reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((rep, idx) => (
                <tr key={idx}>
                  <td>{rep.id}</td>
                  <td>{rep.type}</td>
                  <td>{rep.description}</td>
                  <td>{rep.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No reports available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ReceptionistReports;

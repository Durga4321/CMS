import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/reports.css";

function ReportsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="reports-container">
      <h2>Reports Dashboard</h2>
      <div className="reports-cards">
        <div className="reports-card" onClick={() => navigate("/revenue")}>
          <h3>Revenue Report</h3>
          <p>View revenue trends with charts and tables.</p>
        </div>
        <div className="reports-card" onClick={() => navigate("/activity")}>
          <h3>User Activity</h3>
          <p>Track user activity logs and actions.</p>
        </div>
      </div>
    </div>
  );
}

export default ReportsDashboard;

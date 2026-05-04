import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reports.css";

function UserActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("/api/reports/activity")
      .then(res => setActivities(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(err => console.error("Error fetching user activity:", err));
  }, []);

  return (
    <div className="reports-container">
      <h2>User Activity</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>User</th><th>Action</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, idx) => (
            <tr key={idx}>
              <td>{act.user}</td>
              <td>{act.action}</td>
              <td>{act.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserActivity;

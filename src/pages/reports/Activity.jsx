import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/reports.css";

function UserActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.reports.activityReport()
      .then(res => {
        console.log("User activity:", res);
        setActivities(Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : []);
      })
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
          {activities.length > 0 ? (
            activities.map((act, idx) => (
              <tr key={idx}>
                <td>{act.user}</td>
                <td>{act.action}</td>
                <td>{act.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No activity found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserActivity;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";   // use configured axios instance
import "../../styles/notifications.css";

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/notifications")   // ✅ backend endpoint
      .then(res => {
        console.log("Fetched notifications:", res.data);
        setNotifications(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notification List</h2>
      <table className="notifications-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Target Users</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((n, idx) => (
              <tr key={idx}>
                <td>{n.title}</td>
                <td>{n.message}</td>
                <td>{Array.isArray(n.targetUsers) ? n.targetUsers.join(", ") : n.targetUsers}</td>
                <td>{n.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="notifications-btn"
        onClick={() => navigate("/send-notification")}
      >
        + Send Notification
      </button>
    </div>
  );
}

export default NotificationList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/notifications.css";

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/notifications")
      .then(res => setNotifications(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(err => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notification List</h2>
      <table className="notifications-table">
        <thead>
          <tr>
            <th>Title</th><th>Message</th><th>Target Users</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((n, idx) => (
              <tr key={idx}>
                <td>{n.title}</td>
                <td>{n.message}</td>
                <td>{n.targetUsers?.join(", ")}</td>
                <td>{n.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No notifications found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="notifications-btn" onClick={() => navigate("/send-notification")}>
        + Send Notification
      </button>
    </div>
  );
}

export default NotificationList;

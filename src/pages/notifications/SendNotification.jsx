import React, { useState } from "react";
import api from "../../services/api";
import "../../styles/notifications.css";

function SendNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUsers, setTargetUsers] = useState("");

  const handleSend = async () => {
    try {
      const payload = {
        title,
        message,
        targetUsers: targetUsers.split(",").map(u => u.trim())
      };

      await api.notifications.create(payload); // ✅ wrapper method
      alert("Notification delivered successfully!");
      setTitle("");
      setMessage("");
      setTargetUsers("");
    } catch (err) {
      console.error("Error sending notification:", err);
      alert("Failed to send notification");
    }
  };

  return (
    <div className="notifications-container">
      <h2>Send Notification</h2>
      <div className="notifications-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notification title"
        />

        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message"
        />

        <label>Target Users (comma separated)</label>
        <input
          type="text"
          value={targetUsers}
          onChange={(e) => setTargetUsers(e.target.value)}
          placeholder="e.g. Admin, Doctor, Patient"
        />

        <button className="notifications-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default SendNotification;

import React, { useState } from "react";
import axios from "axios";
import "../../styles/notifications.css";

function SendNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUsers, setTargetUsers] = useState("");

  const handleSend = async () => {
    try {
      await axios.post("/api/notifications", {
        title,
        message,
        targetUsers: targetUsers.split(",").map(u => u.trim())
      });
      alert("Notification delivered successfully!");
      setTitle("");
      setMessage("");
      setTargetUsers("");
    } catch (err) {
      console.error("Error sending notification:", err);
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

        <button className="notifications-btn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default SendNotification;

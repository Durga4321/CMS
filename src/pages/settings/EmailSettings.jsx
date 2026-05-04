import React, { useState } from "react";
import axios from "axios";
import "../../styles/settings.css";

function EmailSettings() {
  const [smtpServer, setSmtpServer] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      await axios.put("/api/settings/email", { smtpServer, port, username, password });
      alert("Email settings updated system-wide!");
    } catch (err) {
      console.error("Error saving email settings:", err);
    }
  };

  return (
    <div className="settings-container">
      <h2>Email Settings</h2>
      <div className="settings-form">
        <label>SMTP Server</label>
        <input value={smtpServer} onChange={(e) => setSmtpServer(e.target.value)} />

        <label>Port</label>
        <input value={port} onChange={(e) => setPort(e.target.value)} />

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="settings-btn" onClick={handleSave}>Save Config</button>
      </div>
    </div>
  );
}

export default EmailSettings;

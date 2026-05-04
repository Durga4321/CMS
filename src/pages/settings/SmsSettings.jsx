import React, { useState } from "react";
import axios from "axios";
import "../../styles/settings.css";

function SmsSettings() {
  const [provider, setProvider] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSave = async () => {
    try {
      await axios.put("/api/settings/sms", { provider, apiKey });
      alert("SMS settings updated system-wide!");
    } catch (err) {
      console.error("Error saving SMS settings:", err);
    }
  };

  return (
    <div className="settings-container">
      <h2>SMS Settings</h2>
      <div className="settings-form">
        <label>Provider</label>
        <input value={provider} onChange={(e) => setProvider(e.target.value)} />

        <label>API Key</label>
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />

        <button className="settings-btn" onClick={handleSave}>Save Config</button>
      </div>
    </div>
  );
}

export default SmsSettings;

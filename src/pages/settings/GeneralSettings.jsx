import React, { useState } from "react";
import axios from "axios";
import "../../styles/settings.css";

function GeneralSettings() {
  const [appName, setAppName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSave = async () => {
    try {
      await axios.put("/api/settings/general", { appName, timezone, currency });
      alert("General settings updated system-wide!");
    } catch (err) {
      console.error("Error saving general settings:", err);
    }
  };

  return (
    <div className="settings-container">
      <h2>General Settings</h2>
      <div className="settings-form">
        <label>App Name</label>
        <input value={appName} onChange={(e) => setAppName(e.target.value)} />

        <label>Timezone</label>
        <input value={timezone} onChange={(e) => setTimezone(e.target.value)} />

        <label>Currency</label>
        <input value={currency} onChange={(e) => setCurrency(e.target.value)} />

        <button className="settings-btn" onClick={handleSave}>Save Config</button>
      </div>
    </div>
  );
}

export default GeneralSettings;

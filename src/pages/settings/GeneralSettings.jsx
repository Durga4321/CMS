import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/settings.css";

function GeneralSettings() {
  const [appName, setAppName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    api.get("/settings")
      .then(res => {
        const settings = res.data.general || {};
        setAppName(settings.appName || "");
        setTimezone(settings.timezone || "");
        setCurrency(settings.currency || "");
      })
      .catch(err => console.error("Error loading general settings:", err));
  }, []);

  const handleSave = async () => {
    try {
      await api.put("/settings/general", { appName, timezone, currency });
      alert("General settings updated system-wide!");
    } catch (err) {
      console.error("Error saving general settings:", err.response?.data || err.message);
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

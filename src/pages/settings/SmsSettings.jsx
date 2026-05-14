import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/settings.css";

function SmsSettings() {
  const [provider, setProvider] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    api.settings.get()
      .then(res => {
        const settings = res.sms || {};
        setProvider(settings.provider || "");
        setApiKey(settings.apiKey || "");
      })
      .catch(err => console.error("Error loading SMS settings:", err));
  }, []);

  const handleSave = async () => {
    try {
      await api.settings.updateSms({ provider, apiKey });
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

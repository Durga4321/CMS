import React, { useState } from "react";
import axios from "axios";
import "../../styles/settings.css";

function PaymentSettings() {
  const [gateway, setGateway] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSave = async () => {
    try {
      await axios.put("/api/settings/payment", { gateway, merchantId, secretKey });
      alert("Payment settings updated system-wide!");
    } catch (err) {
      console.error("Error saving payment settings:", err);
    }
  };

  return (
    <div className="settings-container">
      <h2>Payment Settings</h2>
      <div className="settings-form">
        <label>Gateway</label>
        <input value={gateway} onChange={(e) => setGateway(e.target.value)} />

        <label>Merchant ID</label>
        <input value={merchantId} onChange={(e) => setMerchantId(e.target.value)} />

        <label>Secret Key</label>
        <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />

        <button className="settings-btn" onClick={handleSave}>Save Config</button>
      </div>
    </div>
  );
}

export default PaymentSettings;

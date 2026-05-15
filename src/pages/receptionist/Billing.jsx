import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/billing.css";

function Billing() {
  const [formData, setFormData] = useState({
    patientId: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.receptionist.createBill(formData);
      toast.success("Bill created successfully 🎉");
      setFormData({ patientId: "", amount: "", description: "" });
    } catch (err) {
      console.error("Error creating bill:", err);
      toast.error(err.message || "Failed to create bill");
    }
  };

  return (
    <div className="billing-container">
      <main className="billing-main">
        <h2 className="billing-title">Create Bill</h2>
        <form className="billing-form" onSubmit={handleSubmit}>
          <input
            name="patientId"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" className="billing-btn">Save Bill</button>
        </form>
      </main>
    </div>
  );
}

export default Billing;

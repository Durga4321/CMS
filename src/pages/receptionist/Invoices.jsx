import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/billing.css";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.receptionist.invoices()
      .then(data => setInvoices(data || []))
      .catch(err => console.error("Error fetching invoices:", err));
  }, []);

  return (
    <div className="billing-container">
      <main className="billing-main">
        <h2 className="billing-title">Invoices</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((inv, idx) => (
                <tr key={idx}>
                  <td>{inv.id}</td>
                  <td>{inv.patientName}</td>
                  <td>{inv.amount}</td>
                  <td>{inv.description}</td>
                  <td>{inv.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Invoices;

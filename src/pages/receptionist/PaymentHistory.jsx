import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/billing.css";

function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.receptionist.paymentHistory()
      .then(data => setPayments(data || []))
      .catch(err => console.error("Error fetching payments:", err));
  }, []);

  return (
    <div className="billing-container">
      <main className="billing-main">
        <h2 className="billing-title">Payment History</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Invoice</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.id}</td>
                  <td>{p.invoiceId}</td>
                  <td>{p.patientName}</td>
                  <td>{p.amount}</td>
                  <td>{p.status}</td>
                  <td>{p.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default PaymentHistory;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/billing.css";

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    api.receptionist.getInvoice(id)
      .then(data => setInvoice(data))
      .catch(err => console.error("Error fetching invoice:", err));
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="billing-container">
      <main className="billing-main">
        <h2 className="billing-title">Invoice Details</h2>
        <p><strong>Invoice ID:</strong> {invoice.id}</p>
        <p><strong>Patient:</strong> {invoice.patientName}</p>
        <p><strong>Amount:</strong> {invoice.amount}</p>
        <p><strong>Description:</strong> {invoice.description}</p>
        <p><strong>Date:</strong> {invoice.date}</p>
      </main>
    </div>
  );
}

export default InvoiceDetails;

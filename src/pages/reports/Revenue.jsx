import React, { useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "../../styles/reports.css";

function RevenueReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/reports/revenue", {
        params: { startDate, endDate }
      });
      setData(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.error("Error fetching revenue report:", err);
    }
  };

  return (
    <div className="reports-container">
      <h2>Revenue Report</h2>
      <div className="reports-filters">
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button className="reports-btn" onClick={fetchData}>Fetch Data</button>
      </div>

      <div className="reports-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Date</th><th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueReport;

import React, { Component } from "react";
import api from "../../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { toast } from "react-toastify";
import "../../styles/SuperAdmin.css";

class SuperAdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
      revenueData: [],
      clinicData: [],
      doctorDistribution: [],
      activities: [],
      loading: true,
      error: "",
      COLORS: ["#2563eb", "#10b981", "#f59e0b", "#ef4444"]
    };
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem("authToken");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const [summaryRes, revenueRes, activitiesRes, clinicsRes, doctorsRes] =
        await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/revenue-overview"),
          api.get("/dashboard/activities"),
          api.get("/clinics"),
          api.get("/doctors"),
        ]);

      this.setState({
        summary: summaryRes.data || {},
        revenueData: Array.isArray(revenueRes.data) ? revenueRes.data : revenueRes.data.data || [],
        activities: Array.isArray(activitiesRes.data) ? activitiesRes.data : activitiesRes.data.data || [],
        clinicData: (Array.isArray(clinicsRes.data) ? clinicsRes.data : clinicsRes.data.data || []).map((c, idx) => ({
          month: `M${idx + 1}`,
          clinics: idx + 1,
        })),
        doctorDistribution: [
          { name: "General", value: 120 },
          { name: "Specialists", value: 80 },
          { name: "Surgeons", value: 60 },
          { name: "Others", value: 96 },
        ],
        loading: false,
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      this.setState({ error: "Failed to load dashboard data", loading: false });
      toast.error("Failed to load dashboard data", { position: "top-center" });
    }
  }

  render() {
    const { summary, revenueData, clinicData, doctorDistribution, activities, COLORS, loading, error } = this.state;

    if (loading) return <div className="super-loading">Loading dashboard...</div>;
    if (error) return <div className="super-error">{error}</div>;

    return (
      <div className="super-dashboard">
        <h2 className="dashboard-title">Super Admin Dashboard</h2>

        {/* Top Stats */}
        <div className="super-cards">
          <div className="super-card"><h4>Total Clinics</h4><h2>{summary.totalClinics || 0}</h2></div>
          <div className="super-card"><h4>Total Admins</h4><h2>{summary.totalAdmins || 0}</h2></div>
          <div className="super-card"><h4>Total Doctors</h4><h2>{summary.totalDoctors || 0}</h2></div>
          <div className="super-card"><h4>Total Revenue</h4><h2>₹{summary.totalRevenue || 0}</h2></div>
        </div>

        {/* Charts Row */}
        <div className="super-row">
          <div className="super-box">
            <h3>Clinic Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={clinicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clinics" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="super-box">
            <h3>Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart + Activities */}
        <div className="super-row">
          <div className="super-box">
            <h3>Doctor Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={doctorDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {doctorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="super-box">
            <h3>Recent Activities</h3>
            <ul className="activity">
              {activities.map((act, idx) => (
                <li key={idx}>{act.message || act}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SuperAdminDashboard;

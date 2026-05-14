import React, { Component } from "react";
import api from "../../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
      // Use the new api.js wrapper methods
      const [summaryRes, revenueRes, activitiesRes, clinicsRes, doctorsRes] =
        await Promise.all([
          api.dashboard.summary(),
          api.dashboard.revenueOverview(),
          api.dashboard.activities(),
          api.clinics.list(),
          api.users.list(), // adjust if you have a dedicated doctors endpoint
        ]);

      this.setState({
        summary: summaryRes || {},
        revenueData: Array.isArray(revenueRes?.data)
          ? revenueRes.data
          : Array.isArray(revenueRes)
            ? revenueRes
            : [],
        activities: Array.isArray(activitiesRes?.data)
          ? activitiesRes.data
          : Array.isArray(activitiesRes)
            ? activitiesRes
            : [],
        clinicData: Array.isArray(clinicsRes?.data)
          ? clinicsRes.data.map((c, idx) => ({
              month: c.monthName || `M${idx + 1}`,
              clinics: c.count || idx + 1,
            }))
          : Array.isArray(clinicsRes)
            ? clinicsRes.map((c, idx) => ({
                month: c.monthName || `M${idx + 1}`,
                clinics: c.count || idx + 1,
              }))
            : [],
        doctorDistribution: Array.isArray(doctorsRes?.data)
          ? doctorsRes.data.map(d => ({
              name: d.specialization || "Unknown",
              value: d.count || 0,
            }))
          : Array.isArray(doctorsRes)
            ? doctorsRes.map(d => ({
                name: d.specialization || "Unknown",
                value: d.count || 0,
              }))
            : [],
        loading: false,
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      this.setState({ error: "Failed to load dashboard data", loading: false });
      toast.error("Failed to load dashboard data", { position: "top-center" });
    }
  }

  handleNavigate = (type) => {
    const { navigate } = this.props;
    switch (type) {
      case "clinics":
        navigate("/clinics");
        break;
      case "admins":
        navigate("/admins");
        break;
      case "doctors":
        navigate("/doctors");
        break;
      case "revenue":
        navigate("/revenue");
        break;
      default:
        break;
    }
  };

  render() {
    const { summary, revenueData, clinicData, doctorDistribution, activities, COLORS, loading, error } = this.state;

    if (loading) return <div className="super-loading">Loading dashboard...</div>;
    if (error) return <div className="super-error">{error}</div>;

    return (
      <div className="super-dashboard">
        <h2 className="dashboard-title">Super Admin Dashboard</h2>

        {/* Top Stats */}
        <div className="super-cards">
          <div className="super-card" onClick={() => this.handleNavigate("clinics")}>
            <h4>Total Clinics</h4><h2>{summary.totalClinics || 0}</h2>
          </div>
          <div className="super-card" onClick={() => this.handleNavigate("admins")}>
            <h4>Total Admins</h4><h2>{summary.totalAdmins || 0}</h2>
          </div>
          <div className="super-card" onClick={() => this.handleNavigate("doctors")}>
            <h4>Total Doctors</h4><h2>{summary.totalDoctors || 0}</h2>
          </div>
          <div className="super-card" onClick={() => this.handleNavigate("revenue")}>
            <h4>Total Revenue</h4><h2>₹{summary.totalRevenue || 0}</h2>
          </div>
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

// HOC to inject navigate into class component
export function withNavigation(Component) {
  return function Wrapped(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation(SuperAdminDashboard);

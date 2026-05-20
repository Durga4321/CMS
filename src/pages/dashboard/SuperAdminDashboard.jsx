import React, { Component } from "react";
import api from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Users,
  IndianRupee,
  Activity
} from "lucide-react";

import "../../styles/SuperAdmin.css";

class SuperAdminDashboard extends Component {

  constructor(props) {

    super(props);

    this.state = {

      summary: {},

      revenueData: [],

      clinicData: [],

      userDistribution: [],

      activities: [],

      loading: true,

      error: "",

      superAdminColors: [
        "#2563eb",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6"
      ]
    };
  }

  async componentDidMount() {

    try {

      const [
        summaryRes,
        revenueRes,
        activitiesRes,
        clinicsRes,
        usersRes
      ] = await Promise.all([

        api.dashboard.summary(),

        api.dashboard.revenueOverview(),

        api.dashboard.activities(),

        api.clinics.list(),

        api.users.list()
      ]);

      const usersData = Array.isArray(usersRes?.data)
        ? usersRes.data
        : Array.isArray(usersRes)
          ? usersRes
          : [];

      const activeUsers = usersData.filter(
        u => u.status === "Active"
      );

      this.setState({

        summary: {
          ...summaryRes,
          totalActiveUsers: activeUsers.length
        },

        revenueData: Array.isArray(revenueRes?.data)
          ? revenueRes.data
          : Array.isArray(revenueRes)
            ? revenueRes
            : [],

        clinicData: Array.isArray(clinicsRes?.data)
          ? clinicsRes.data.map((c, index) => ({
              month: c.monthName || `M${index + 1}`,
              clinics: c.count || index + 1
            }))
          : Array.isArray(clinicsRes)
            ? clinicsRes.map((c, index) => ({
                month: c.monthName || `M${index + 1}`,
                clinics: c.count || index + 1
              }))
            : [],

        userDistribution: [
          {
            name: "Active Users",
            value: activeUsers.length
          },
          {
            name: "Inactive Users",
            value: usersData.length - activeUsers.length
          }
        ],

        activities: Array.isArray(activitiesRes?.data)
          ? activitiesRes.data
          : Array.isArray(activitiesRes)
            ? activitiesRes
            : [],

        loading: false
      });

    } catch (err) {

      console.error(err);

      this.setState({
        error: "Failed to load dashboard data",
        loading: false
      });

      toast.error("Failed to load dashboard data");
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

      case "users":
        navigate("/users");
        break;

      case "revenue":
        navigate("/revenue");
        break;

      default:
        break;
    }
  };

  render() {

    const {
      summary,
      revenueData,
      clinicData,
      userDistribution,
      activities,
      superAdminColors,
      loading,
      error
    } = this.state;

    if (loading) {

      return (
        <div className="super-admin-loading">
          Loading Dashboard...
        </div>
      );
    }

    if (error) {

      return (
        <div className="super-admin-error">
          {error}
        </div>
      );
    }

    return (

      <div className="super-admin-dashboard">

        {/* Header */}

        <div className="super-admin-header">

          <div>
            <h2>Super Admin Dashboard</h2>
            <p>
              Monitor clinics, revenue, users and activities
            </p>
          </div>

        </div>

        {/* Stats */}

        <div className="super-admin-cards">

          <div
            className="super-admin-card"
            onClick={() => this.handleNavigate("clinics")}
          >

            <div className="super-admin-card-icon super-admin-blue">
              <Building2 size={24} />
            </div>

            <div>
              <h4>Total Clinics</h4>
              <h2>{summary.totalClinics || 0}</h2>
            </div>

          </div>

          <div
            className="super-admin-card"
            onClick={() => this.handleNavigate("admins")}
          >

            <div className="super-admin-card-icon super-admin-green">
              <Users size={24} />
            </div>

            <div>
              <h4>Total Admins</h4>
              <h2>{summary.totalAdmins || 0}</h2>
            </div>

          </div>

          <div
            className="super-admin-card"
            onClick={() => this.handleNavigate("users")}
          >

            <div className="super-admin-card-icon super-admin-orange">
              <Activity size={24} />
            </div>

            <div>
              <h4>Active Users</h4>
              <h2>{summary.totalActiveUsers || 0}</h2>
            </div>

          </div>

          <div
            className="super-admin-card"
            onClick={() => this.handleNavigate("revenue")}
          >

            <div className="super-admin-card-icon super-admin-purple">
              <IndianRupee size={24} />
            </div>

            <div>
              <h4>Total Revenue</h4>
              <h2>₹{summary.totalRevenue || 0}</h2>
            </div>

          </div>

        </div>

        {/* Charts */}

        <div className="super-admin-row">

          <div className="super-admin-box">

            <div className="super-admin-box-header">
              <h3>Clinic Growth</h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={clinicData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="clinics"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="super-admin-box">

            <div className="super-admin-box-header">
              <h3>Revenue Overview</h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="revenue"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bottom */}

        <div className="super-admin-row">

          <div className="super-admin-box">

            <div className="super-admin-box-header">
              <h3>User Distribution</h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >

                  {userDistribution.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        superAdminColors[
                        index % superAdminColors.length
                        ]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="super-admin-box">

            <div className="super-admin-box-header">
              <h3>Recent Activities</h3>
            </div>

            <div className="super-admin-activity-list">

              {activities.length > 0 ? (

                activities.map((act, index) => (

                  <div
                    className="super-admin-activity-item"
                    key={index}
                  >

                    <div className="super-admin-activity-dot"></div>

                    <p>
                      {act.message || act}
                    </p>

                  </div>

                ))

              ) : (

                <p className="super-admin-empty">
                  No activities available
                </p>

              )}

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export function withNavigation(Component) {

  return function Wrapped(props) {

    const navigate = useNavigate();

    return (
      <Component
        {...props}
        navigate={navigate}
      />
    );
  };
}

export default withNavigation(SuperAdminDashboard);
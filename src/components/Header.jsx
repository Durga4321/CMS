import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { clearAuthToken, getAuthToken } from "../services/api";
import "../styles/Header.css";

const superAdminMenu = [
  {
    key: "clinics",
    label: "Clinics",
    links: [
      { to: "/clinics", label: "Clinic List" },
      { to: "/add-clinic", label: "Add Clinic" },
    ],
  },
  {
    key: "admins",
    label: "Admin",
    links: [
      { to: "/admins", label: "Admin List" },
      { to: "/create-admin", label: "Create Admin" },
    ],
  },
  {
    key: "users",
    label: "Users",
    links: [
      { to: "/users", label: "User List" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    links: [
      { to: "/reports", label: "Reports Dashboard" },
      { to: "/revenue", label: "Revenue Report" },
      { to: "/activity", label: "User Activity" },
    ],
  },
];

const receptionistMenu = [
  {
    key: "patients",
    label: "Patients",
    links: [
      { to: "/receptionist/patients", label: "Patient List" },
      { to: "/receptionist/add-patient", label: "Add Patient" },
    ],
  },
  {
    key: "appointments",
    label: "Appointments",
    links: [
      { to: "/receptionist/appointments", label: "Appointment List" },
      { to: "/receptionist/book-appointment", label: "Book Appointment" },
      { to: "/receptionist/waiting-queue", label: "Waiting Queue" },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    links: [
      { to: "/receptionist/billing", label: "Create Bill" },
      { to: "/receptionist/invoices", label: "Invoices" },
      { to: "/receptionist/payment-history", label: "Payment History" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    links: [
      { to: "/receptionist/reports", label: "Receptionist Reports" },
    ],
  },
];

const getDashboardPath = (role) => {
  if (role === "SuperAdmin") return "/super-admin-dashboard";
  if (role === "Receptionist") return "/receptionist-dashboard";
  return "/home";
};

const getMenuItems = (role) => {
  if (role === "SuperAdmin") return superAdminMenu;
  if (role === "Receptionist") return receptionistMenu;
  return [];
};

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("authToken") || getAuthToken();
  const role = localStorage.getItem("role") || "Guest";
  const name = localStorage.getItem("name") || "User";
  const menuItems = getMenuItems(role);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    clearAuthToken();
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-logo">Clinic</div>

      <nav className="header-menu">
        <Link to={getDashboardPath(role)}>Home</Link>

        {menuItems.map((item) => (
          <div className="dropdown" key={item.key}>
            <div className="dropbtn" onClick={() => toggleDropdown(item.key)}>
              {item.label} v
            </div>
            {openDropdown === item.key && (
              <div className="dropdown-content">
                {item.links.map((link) => (
                  <Link key={link.to} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="header-actions">
        {isLoggedIn ? (
          <>
            <Link
              to="/notifications"
              className="notification-btn"
              aria-label="Notifications"
              title="Notifications"
            >
              <FaBell />
              <span className="notification-dot" />
            </Link>
            <div className="profile-dropdown">
              <div className="profile-btn" onClick={toggleProfile}>
                <div className="profile-avatar">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-text">
                  <span className="profile-name">{name}</span>
                  <span className="profile-role">{role}</span>
                </div>
                <span className="profile-arrow">v</span>
              </div>
              {profileOpen && (
                <div className="profile-content">
                  <div className="profile-info">
                    <strong>{name}</strong>
                    <small>{role}</small>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

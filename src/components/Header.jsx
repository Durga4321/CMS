import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("authToken");
  const role = localStorage.getItem("role") || "Guest";
  const name = localStorage.getItem("name") || "User";

  return (
    <header className="header">
      <div className="header-logo">Clinic</div>

      <nav className="header-menu">
        <Link to="/home">Home</Link>

        <div className="dropdown">
          <div className="dropbtn" onClick={() => toggleDropdown("doctors")}>
            Doctors ▾
          </div>
          {openDropdown === "doctors" && (
            <div className="dropdown-content">
              <Link to="/doctors">All Doctors</Link>
              <Link to="/add-doctor">Add Doctor</Link>
              <Link to="/doctor-schedule">Doctor Schedule</Link>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div className="dropbtn" onClick={() => toggleDropdown("appointments")}>
            Appointments ▾
          </div>
          {openDropdown === "appointments" && (
            <div className="dropdown-content">
              <Link to="/appointments">All Appointments</Link>
              <Link to="/book-appointment">Book Appointment</Link>
              <Link to="/today-appointments">Today Appointments</Link>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div className="dropbtn" onClick={() => toggleDropdown("patients")}>
            Patients ▾
          </div>
          {openDropdown === "patients" && (
            <div className="dropdown-content">
              <Link to="/patients">All Patients</Link>
              <Link to="/add-patient">Add Patient</Link>
              <Link to="/patient-history">Patient History</Link>
              <Link to="/patient-billing">Patient Billing</Link>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div className="dropbtn" onClick={() => toggleDropdown("contact")}>
            Contact ▾
          </div>
          {openDropdown === "contact" && (
            <div className="dropdown-content">
              <Link to="/contact">Contact Us</Link>
              <Link to="/support">Support</Link>
              <Link to="/help">Help Center</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="header-actions">
        {isLoggedIn ? (
          <div className="profile-dropdown">
            <div className="profile-btn" onClick={toggleProfile}>
              <div className="profile-avatar">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-text">
                <span className="profile-name">{name}</span>
                <span className="profile-role">{role}</span>
              </div>
              <span className="profile-arrow">▾</span>
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

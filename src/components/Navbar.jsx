import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        Surabhi Clinic
      </div>

      <div className="menu">

        <Link to="/">Home</Link>

        {/* Doctors */}
        <div className="dropdown">
          <span>Doctors ▾</span>
          <div className="dropdown-content">
            <Link to="/doctors">All Doctors</Link>
            <Link to="/add-doctor">Add Doctor</Link>
            <Link to="/doctor-schedule">Doctor Schedule</Link>
          </div>
        </div>

        {/* Appointments */}
        <div className="dropdown">
          <span>Appointments ▾</span>
          <div className="dropdown-content">
            <Link to="/appointments">All Appointments</Link>
            <Link to="/book-appointment">Book Appointment</Link>
            <Link to="/today-appointments">Today Appointments</Link>
          </div>
        </div>

        {/* Reports */}
        <div className="dropdown">
          <span>Reports ▾</span>
          <div className="dropdown-content">
            <Link to="/reports">All Reports</Link>
            <Link to="/billing-report">Billing Report</Link>
            <Link to="/patient-report">Patient Report</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="dropdown">
          <span>Contact ▾</span>
          <div className="dropdown-content">
            <Link to="/contact">Contact Us</Link>
            <Link to="/support">Support</Link>
            <Link to="/help">Help Center</Link>
          </div>
        </div>

      </div>

      <div className="actions">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>

    </div>
  );
}

export default Navbar;
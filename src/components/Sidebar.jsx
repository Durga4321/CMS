import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHospital,
  FaUsers,
  FaUserShield,
  FaCog,
  FaChartBar,
  FaBell,
  FaBriefcaseMedical,
  FaBars,
  FaFileAlt,
  FaChevronDown,
  FaUserPlus,
  FaCalendarCheck,
  FaFileInvoice
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar({ isCollapsed = false, onToggleCollapse }) {
  const [openMenu, setOpenMenu] = useState(null);
  const role = localStorage.getItem("role"); // stored after login

  const toggleMenu = (menuName) => {
    if (isCollapsed) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="logo">
          <FaBriefcaseMedical className="logo-icon" />
          <span className="sidebar-label">CMS</span>
        </div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FaBars />
        </button>
      </div>
      <ul>
        {/* SUPER ADMIN SIDEBAR */}
        {role === "SuperAdmin" && (
          <>
            <li>
              <NavLink to="/super-admin-dashboard">
                <FaTachometerAlt /> <span className="sidebar-label">Dashboard</span>
              </NavLink>
            </li>

            {/* Clinics */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("clinics")}>
                <span><FaHospital /> <span className="sidebar-label">Clinics</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "clinics" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/clinics">Clinic List</NavLink></li>
                  <li><NavLink to="/add-clinic">Add Clinic</NavLink></li>
                </ul>
              )}
            </li>

            {/* Admins */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("admins")}>
                <span><FaUsers /> <span className="sidebar-label">Admin</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "admins" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/admins">Admin List</NavLink></li>
                  <li><NavLink to="/create-admin">Create Admin</NavLink></li>
                  <li><NavLink to="/edit-admin/1">Edit Admin</NavLink></li>
                  <li><NavLink to="/view-admin/1">View Admin</NavLink></li>
                </ul>
              )}
            </li>

            {/* Users */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("users")}>
                <span><FaUsers /> <span className="sidebar-label">Users</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "users" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/users">User List</NavLink></li>
                  <li><NavLink to="/user-details/1">User Details</NavLink></li>
                  <li><NavLink to="/user-activate-deactivate/1">Activate / Deactivate</NavLink></li>
                </ul>
              )}
            </li>

            {/* Roles */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("roles")}>
                <span><FaUserShield /> <span className="sidebar-label">Roles</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "roles" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/roles">Roles List</NavLink></li>
                  <li><NavLink to="/roles/create-role">Create Role</NavLink></li>
                  <li><NavLink to="/roles/assign-permissions/1">Assign Permissions</NavLink></li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("reports")}>
                <span><FaChartBar /> <span className="sidebar-label">Reports</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "reports" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/reports">Reports Dashboard</NavLink></li>
                  <li><NavLink to="/revenue">Revenue Report</NavLink></li>
                  <li><NavLink to="/activity">User Activity</NavLink></li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("settings")}>
                <span><FaCog /> <span className="sidebar-label">Settings</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "settings" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/general-settings">General</NavLink></li>
                  <li><NavLink to="/email-settings">Email</NavLink></li>
                  <li><NavLink to="/sms-settings">SMS</NavLink></li>
                  <li><NavLink to="/payment-settings">Payment</NavLink></li>
                </ul>
              )}
            </li>

            {/* Logs */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("logs")}>
                <span><FaFileAlt /> <span className="sidebar-label">Logs</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "logs" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/audit-logs">Audit Logs</NavLink></li>
                  <li><NavLink to="/login-history">Login History</NavLink></li>
                </ul>
              )}
            </li>

            {/* Notifications */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("notifications")}>
                <span><FaBell /> <span className="sidebar-label">Notifications</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "notifications" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/notifications">Notifications List</NavLink></li>
                  <li><NavLink to="/send-notification">Send Notification</NavLink></li>
                </ul>
              )}
            </li>
          </>
        )}

               {/* RECEPTIONIST SIDEBAR */}
        {role === "Receptionist" && (
          <>
            <li>
              <NavLink to="/receptionist-dashboard">
                <FaTachometerAlt /> <span className="sidebar-label">Dashboard</span>
              </NavLink>
            </li>

            {/* Patients */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("patients")}>
                <span><FaUserPlus /> <span className="sidebar-label">Patients</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "patients" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/receptionist/add-patient">Add Patient</NavLink></li>
                  <li><NavLink to="/receptionist/patients">Patient List</NavLink></li>
                  <li><NavLink to="/receptionist/view-patient/:id">View Patient</NavLink></li>
                  <li><NavLink to="/receptionist/edit-patient/:id">Edit Patient</NavLink></li>
                </ul>
              )}
            </li>

            {/* Appointments */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("appointments")}>
                <span><FaCalendarCheck /> <span className="sidebar-label">Appointments</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "appointments" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/receptionist/book-appointment">Book Appointment</NavLink></li>
                  <li><NavLink to="/receptionist/appointments">Appointment List</NavLink></li>
                  <li><NavLink to="/receptionist/waiting-queue">Waiting Queue</NavLink></li>
                  <li><NavLink to="/receptionist/edit-appointment/:id">Edit Appointment</NavLink></li>
                  <li><NavLink to="/receptionist/appointment-details/:id">Appointment Details</NavLink></li>
                </ul>
              )}
            </li>

            {/* Billing */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("billing")}>
                <span><FaFileInvoice /> <span className="sidebar-label">Billing</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "billing" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/receptionist/billing">Create Bill</NavLink></li>
                  <li><NavLink to="/receptionist/invoices">Invoices</NavLink></li>
                  <li><NavLink to="/receptionist/invoice-details/:id">Invoice Details</NavLink></li>
                  <li><NavLink to="/receptionist/payment-history">Payment History</NavLink></li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("reports")}>
                <span><FaChartBar /> <span className="sidebar-label">Reports</span></span>
                <FaChevronDown className="sidebar-chevron" />
              </div>
              {openMenu === "reports" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/receptionist/reports">Receptionist Reports</NavLink></li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;

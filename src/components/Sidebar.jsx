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
  FaFileAlt,
  FaChevronDown,
  FaUserPlus,
  FaCalendarCheck,
  FaFileInvoice
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const role = localStorage.getItem("role"); // stored after login

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">CMS</h2>
      <ul>
        {/* SUPER ADMIN SIDEBAR */}
        {role === "SuperAdmin" && (
          <>
            <li>
              <NavLink to="/super-admin-dashboard">
                <FaTachometerAlt /> Dashboard
              </NavLink>
            </li>

            {/* Clinics */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("clinics")}>
                <FaHospital /> Clinics <FaChevronDown />
              </div>
              {openMenu === "clinics" && (
                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                  <li><NavLink to="/clinics">Clinic List</NavLink></li>
                  <li><NavLink to="/add-clinic">Add Clinic</NavLink></li>
                  <li><NavLink to="/edit-clinic/1">Edit Clinic</NavLink></li>
                  <li><NavLink to="/view-clinic/1">View Clinic</NavLink></li>
                </ul>
              )}
            </li>

            {/* Admins */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("admins")}>
                <FaUsers /> Admin <FaChevronDown />
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
                <FaUsers /> Users <FaChevronDown />
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
                <FaUserShield /> Roles <FaChevronDown />
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
                <FaChartBar /> Reports <FaChevronDown />
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
                <FaCog /> Settings <FaChevronDown />
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
                <FaFileAlt /> Logs <FaChevronDown />
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
                <FaBell /> Notifications <FaChevronDown />
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
                <FaTachometerAlt /> Dashboard
              </NavLink>
            </li>

            {/* Patients */}
            <li>
              <div className="menu-title" onClick={() => toggleMenu("patients")}>
                <FaUserPlus /> Patients <FaChevronDown />
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
                <FaCalendarCheck /> Appointments <FaChevronDown />
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
                <FaFileInvoice /> Billing <FaChevronDown />
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
                <FaChartBar /> Reports <FaChevronDown />
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
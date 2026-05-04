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
  FaChevronDown
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="sidebar">
      <h2 className="logo"> CMS</h2>
      <ul>
        {/* Dashboard */}
        <li>
          <NavLink to="/super-admin-dashboard">
            <FaTachometerAlt />   Dashboard
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

        {/* Super Admin */}
        <li>
          <div className="menu-title" onClick={() => toggleMenu("admins")}>
            <FaUsers />  Admin <FaChevronDown />
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
              <li><NavLink to="/create-role">Create Role</NavLink></li>
              <li><NavLink to="/edit-role/1">Edit Role</NavLink></li>
              <li><NavLink to="/assign-permission/1">Assign Permissions</NavLink></li>
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
      </ul>
    </div>
  );
}

export default Sidebar;

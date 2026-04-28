import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";   
function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";   
function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const showTimer = window.setTimeout(() => setIsRouteLoading(true), 0);
    const hideTimer = window.setTimeout(() => setIsRouteLoading(false), 300);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <div className={`layout ${isSidebarCollapsed ? "layout-sidebar-collapsed" : ""}`}>
      <Header />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <div className="main">
        {isRouteLoading && (
          <div className="route-loader" aria-label="Loading page">
            <span />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

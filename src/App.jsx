import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

import Home from "./components/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";

// Clinics
import ClinicList from "./pages/clinics/ClinicList";
import AddClinic from "./pages/clinics/AddClinic";
import EditClinic from "./pages/clinics/EditClinic";
import ViewClinic from "./pages/clinics/ViewClinic";

// Admin
import AdminList from "./pages/admins/AdminList";
import CreateAdmin from "./pages/admins/CreateAdmin";
import EditAdmin from "./pages/admins/EditAdmin";
import ViewAdmin from "./pages/admins/ViewAdmin";

// Users
import UserList from "./pages/user/UserList";
import UserDetails from "./pages/user/UserDetails";
import UserActivateDeactivate from "./pages/user/UserActivateDeactivate";

// Roles
import RolesList from "./pages/roles/RolesList";
import CreateRole from "./pages/roles/CreateRole";
import EditRole from "./pages/roles/EditRole";
import AssignPermissions from "./pages/roles/AssignPermissions";

// Reports
import Reports from "./pages/reports/Reports";
import Revenue from "./pages/reports/Revenue";
import Activity from "./pages/reports/Activity";

// Settings
import GeneralSettings from "./pages/settings/GeneralSettings";
import EmailSettings from "./pages/settings/EmailSettings";
import SmsSettings from "./pages/settings/SmsSettings";
import PaymentSettings from "./pages/settings/PaymentSettings";

// Logs
import AuditLogs from "./pages/logs/AuditLogs";
import LoginHistory from "./pages/logs/LoginHistory";

// Notifications
import Notifications from "./pages/notifications/Notifications";
import SendNotification from "./pages/notifications/SendNotification";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route path="/home" element={<Home />} />
            <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

            {/* Clinics */}
            <Route path="/clinics" element={<ClinicList />} />
            <Route path="/add-clinic" element={<AddClinic />} />
            <Route path="/edit-clinic/:id" element={<EditClinic />} />
            <Route path="/view-clinic/:id" element={<ViewClinic />} />

            {/* Admin */}
            <Route path="/admins" element={<AdminList />} />
            <Route path="/create-admin" element={<CreateAdmin />} />
            <Route path="/edit-admin/:id" element={<EditAdmin />} />
            <Route path="/view-admin/:id" element={<ViewAdmin />} />

            {/* Users */}
            <Route path="/users" element={<UserList />} />
            <Route path="/user-details/:id" element={<UserDetails />} />
            <Route path="/user-activate-deactivate/:id" element={<UserActivateDeactivate />} />

            {/* Roles */}
            <Route path="/roles" element={<RolesList />} />
            <Route path="/create-role" element={<CreateRole />} />
            <Route path="/edit-role/:id" element={<EditRole />} />
            <Route path="/assign-permission" element={<AssignPermissions />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/activity" element={<Activity />} />

            {/* Settings */}
            <Route path="/general-settings" element={<GeneralSettings />} />
            <Route path="/email-settings" element={<EmailSettings />} />
            <Route path="/sms-settings" element={<SmsSettings />} />
            <Route path="/payment-settings" element={<PaymentSettings />} />

            {/* Logs */}
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/login-history" element={<LoginHistory />} />

            {/* Notifications */}
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/send-notification" element={<SendNotification />} />

          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* ✅ Toast Container (Global) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;
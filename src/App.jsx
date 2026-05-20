import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import { getAuthToken } from "./services/api";

import Home from "./components/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Super Admin Dashboard
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";

// Receptionist Dashboard
import ReceptionistDashboard from "./pages/dashboard/ReceptionistDashboard";

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

// Receptionist Modules
import AddPatient from "./pages/receptionist/AddPatient";
import PatientList from "./pages/receptionist/PatientList";
import ViewPatient from "./pages/receptionist/ViewPatient";
import EditPatient from "./pages/receptionist/EditPatient";

import BookAppointment from "./pages/receptionist/BookAppointment";
import AppointmentList from "./pages/receptionist/AppointmentList";
import WaitingQueue from "./pages/receptionist/WaitingQueue";
import EditAppointment from "./pages/receptionist/EditAppointment";
import AppointmentDetails from "./pages/receptionist/AppointmentDetails";

import Billing from "./pages/receptionist/Billing";
import Invoices from "./pages/receptionist/Invoices";
import InvoiceDetails from "./pages/receptionist/InvoiceDetails";
import PaymentHistory from "./pages/receptionist/PaymentHistory";

import ReceptionistReports from "./pages/receptionist/ReceptionistReports";

const getDashboardPath = (role) => {
  if (role === "SuperAdmin") return "/super-admin-dashboard";
  if (role === "Receptionist") return "/receptionist-dashboard";
  return "/home";
};

const DefaultRedirect = () => {
  const token = localStorage.getItem("authToken") || getAuthToken();
  const role = localStorage.getItem("role");

  return <Navigate to={token ? getDashboardPath(role) : "/login"} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />

            {/* Super Admin Dashboard */}
            <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />

            {/* Receptionist Dashboard */}
            <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />

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
            <Route path="/roles/create-role" element={<CreateRole />} />
            <Route path="/roles/assign-permissions/:id" element={<AssignPermissions />} />

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

            {/* Receptionist Modules */}
            <Route path="/receptionist/add-patient" element={<AddPatient />} />
            <Route path="/receptionist/patients" element={<PatientList />} />
            <Route path="/receptionist/view-patient/:id" element={<ViewPatient />} />
            <Route path="/receptionist/edit-patient/:id" element={<EditPatient />} />

            <Route path="/receptionist/book-appointment" element={<BookAppointment />} />
            <Route path="/receptionist/appointments" element={<AppointmentList />} />
            <Route path="/receptionist/waiting-queue" element={<WaitingQueue />} />
            <Route path="/receptionist/edit-appointment/:id" element={<EditAppointment />} />
            <Route path="/receptionist/appointment-details/:id" element={<AppointmentDetails />} />

            <Route path="/receptionist/billing" element={<Billing />} />
            <Route path="/receptionist/invoices" element={<Invoices />} />
            <Route path="/receptionist/invoice-details/:id" element={<InvoiceDetails />} />
            <Route path="/receptionist/payment-history" element={<PaymentHistory />} />

            <Route path="/receptionist/reports" element={<ReceptionistReports />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>

      {/* ✅ Toast Container (Global) */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;

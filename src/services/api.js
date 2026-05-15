export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://irritant-kilobyte-until.ngrok-free.dev";

const TOKEN_KEY = "clinic_command_center_token";

export function getAuthToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setAuthToken(token) {
  if (typeof window === "undefined" || !token) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getPayload(response) {
  if (response && typeof response === "object") {
    return response.data ?? response.payload ?? response.result ?? response;
  }
  return response;
}

export function toArray(response) {
  const value = getPayload(response);
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

export function readToken(response) {
  return (
    response?.token ??
    response?.accessToken ??
    response?.access_token ??
    response?.data?.token ??
    response?.data?.accessToken ??
    response?.data?.access_token ??
    ""
  );
}

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, auth = true, ...init } = options;
  const token = auth ? getAuthToken() : "";

  const requestHeaders = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
    ...headers,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) requestHeaders.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? parseResponse(text) : null;

  if (!response.ok) {
    const message = data?.message ?? data?.error ?? `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function parseResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

const byId = (path, id) => `${path}/${encodeURIComponent(id)}`;
const json = (method, body) => ({ method, body });

export const api = {
  admins: {
    list: () => apiRequest("/api/admins"),
    create: (data) => apiRequest("/api/admins", json("POST", data)),
    get: (id) => apiRequest(byId("/api/admins", id)),
    update: (id, data) => apiRequest(byId("/api/admins", id), json("PUT", data)),
  },
  auth: {
    superAdminLogin: (data) => apiRequest("/api/auth/super-admin-login", json("POST", data)),
    register: (data) => apiRequest("/api/auth/register", json("POST", data)),
    login: (data) => apiRequest("/api/auth/login", json("POST", data)),
    forgotPassword: (data) => apiRequest("/api/auth/forgot-password", json("POST", data)),
    resetPassword: (data) => apiRequest("/api/auth/reset-password", json("POST", data)),
  },
  clinics: {
    list: () => apiRequest("/api/clinics"),
    create: (data) => apiRequest("/api/clinics", json("POST", data)),
    get: (id) => apiRequest(byId("/api/clinics", id)),
    update: (id, data) => apiRequest(byId("/api/clinics", id), json("PUT", data)),
    remove: (id) => apiRequest(byId("/api/clinics", id), { method: "DELETE" }),
  },
  dashboard: {
    summary: () => apiRequest("/api/dashboard/summary"),
    revenueOverview: () => apiRequest("/api/dashboard/revenue-overview"),
    activities: () => apiRequest("/api/dashboard/activities"),
  },
  logs: {
    audit: () => apiRequest("/api/logs/audit"),
    loginHistory: () => apiRequest("/api/logs/login-history"),
  },
  notifications: {
    list: () => apiRequest("/api/notifications"),
    create: (data) => apiRequest("/api/notifications", json("POST", data)),
  },
  reports: {
    revenue: () => apiRequest("/api/revenue"),
    revenueReport: () => apiRequest("/api/reports/revenue"),
    activity: () => apiRequest("/api/activity"),
    activityReport: () => apiRequest("/api/reports/activity"),
  },
  roles: {
    list: () => apiRequest("/api/roles"),
    create: (data) => apiRequest("/api/roles", json("POST", data)),
    get: (id) => apiRequest(byId("/api/roles", id)),
    update: (id, data) => apiRequest(byId("/api/roles", id), json("PUT", data)),
    remove: (id) => apiRequest(byId("/api/roles", id), { method: "DELETE" }),
    updatePermissions: (id, data) =>
      apiRequest(`${byId("/api/roles", id)}/permissions`, json("PUT", data)),
  },
  settings: {
    get: () => apiRequest("/api/settings"),
    updateGeneral: (data) => apiRequest("/api/settings/general", json("PUT", data)),
    updateEmail: (data) => apiRequest("/api/settings/email", json("PUT", data)),
    updateSms: (data) => apiRequest("/api/settings/sms", json("PUT", data)),
    updatePayment: (data) => apiRequest("/api/settings/payment", json("PUT", data)),
  },
  users: {
    list: () => apiRequest("/api/users"),
    create: (data) => apiRequest("/api/users", json("POST", data)),
    get: (id) => apiRequest(byId("/api/users", id)),
    update: (id, data) => apiRequest(byId("/api/users", id), json("PUT", data)),
    remove: (id) => apiRequest(byId("/api/users", id), { method: "DELETE" }),
    updateStatus: (id, data) => apiRequest(`${byId("/api/users", id)}/status`, json("PUT", data)),
  },
  receptionist: {
    // Appointments
    getTodayAppointments: () => apiRequest("/api/receptionist/appointments/today"),
    getWaitingPatients: () => apiRequest("/api/receptionist/patients/waiting"),
    getCompletedAppointments: () => apiRequest("/api/receptionist/appointments/completed"),
    bookAppointment: (data) => apiRequest("/api/receptionist/appointments", json("POST", data)),
    getAppointment: (id) => apiRequest(byId("/api/receptionist/appointments", id)),
    updateAppointment: (id, data) => apiRequest(byId("/api/receptionist/appointments", id), json("PUT", data)),

    // Patients
    addPatient: (data) => apiRequest("/api/receptionist/patients", json("POST", data)),
    getPatient: (id) => apiRequest(byId("/api/receptionist/patients", id)),
    updatePatient: (id, data) => apiRequest(byId("/api/receptionist/patients", id), json("PUT", data)),

    // Billing
    createBill: (data) => apiRequest("/api/receptionist/billing", json("POST", data)),
    invoices: () => apiRequest("/api/receptionist/invoices"),
    getInvoice: (id) => apiRequest(byId("/api/receptionist/invoices", id)),
    paymentHistory: () => apiRequest("/api/receptionist/payments"),

    // Reports
    reports: () => apiRequest("/api/receptionist/reports"),
    dailyCollectionReport: () => apiRequest("/api/receptionist/reports/daily"),
    appointmentReport: () => apiRequest("/api/receptionist/reports/appointments"),
    doctorWiseReport: () => apiRequest("/api/receptionist/reports/doctor"),
    pendingPaymentsReport: () => apiRequest("/api/receptionist/reports/pending"),
  },
};

export default api;

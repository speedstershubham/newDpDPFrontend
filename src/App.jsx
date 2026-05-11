import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "./components/Login";
import RoleDashboard from "./components/RoleDashboard";
import SystemAdminDashboard from "./components/SystemAdminDashboard";
import PlatformSuperAdmin from "./components/PlatformSuperAdmin";
import ProfilePage from "./components/ProfilePage";
import GrievanceSubmission from "./components/GrievanceSubmission";
import EditComplaintPage from "./components/ScrutinyDashboard/EditComplaintPage";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

export const TenantContext = createContext({
  tenantName: "Data Protection Board of India",
  tenantLogo: "🏛️",
  primaryColor: "#1A3562",
  accentColor: "#E8871A",
  language: "en",
  setLanguage: () => {},
});

export function useTenant() {
  return useContext(TenantContext);
}

/**
 * DynamicRolePage — the single catch-all for every non-admin role.
 *
 * The user object (from backend / mock login) carries:
 *   user.role            → role slug that becomes the URL (e.g. "scrutiny")
 *   user.dashboardConfig → { stats, tabs, columns, rowActions, detailFields, … }
 *
 * To add a new role: make the backend return dashboardConfig for it.
 * Nothing else in this file needs to change.
 */
function DynamicRolePage({ user, onLogout }) {
  const { role } = useParams();

  if (!user || user.role !== role) return <Navigate to="/" replace />;

  if (!user.dashboardConfig) {
    return (
      <div style={{ padding: 48, textAlign: "center", color: "var(--text-secondary)" }}>
        No dashboard configuration found for role <strong>{role}</strong>.
        <br />Contact your administrator.
      </div>
    );
  }

  return <RoleDashboard user={user} onLogout={onLogout} config={user.dashboardConfig} />;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [language, setLanguage]       = useState("en");

  const tenantConfig = {
    tenantName: "Data Protection Board of India",
    tenantLogo: "🏛️",
    primaryColor: "#1A3562",
    accentColor: "#E8871A",
    language,
    setLanguage,
  };

  const handleLogin  = (user) => setCurrentUser(user);
  const handleLogout = ()     => setCurrentUser(null);

  /* Shared guard: redirect unauthenticated users to login */
  const auth = (el) => (currentUser ? el : <Navigate to="/" replace />);

  return (
    <TenantContext.Provider value={tenantConfig}>
      <BrowserRouter>
        <Routes>

          {/* Root */}
          <Route
            path="/"
            element={
              currentUser
                ? <Navigate to={`/${currentUser.role}`} replace />
                : <Login onLogin={handleLogin} />
            }
          />

          {/* ── Dedicated dashboards ───────────────────────────────────── */}
          <Route path="/admin"       element={auth(<SystemAdminDashboard user={currentUser} onLogout={handleLogout} />)} />
          <Route path="/super-admin" element={auth(<PlatformSuperAdmin   user={currentUser} onLogout={handleLogout} />)} />

          {/* ── Profile (works for every role) ────────────────────────── */}
          <Route path="/:role/profile" element={auth(<ProfilePage user={currentUser} onLogout={handleLogout} />)} />

          {/* ── Citizen sub-action pages ───────────────────────────────── */}
          <Route path="/grievance/new"   element={auth(<GrievanceSubmission user={currentUser} onLogout={handleLogout} />)} />
          <Route path="/scrutiny/edit/:grn" element={auth(<EditComplaintPage user={currentUser} onLogout={handleLogout} />)} />
          <Route path="/analytics"       element={auth(<AnalyticsDashboard  user={currentUser} onLogout={handleLogout} />)} />

          {/*
           * ── Dynamic catch-all ────────────────────────────────────────
           * Handles EVERY role dashboard:
           *   /data-principal  /scrutiny  /chairperson  /registry
           *   /data-fiduciary  /board-member  /reader  … and any future role
           *
           * The route param :role must match user.role (URL = /roleName).
           * The dashboard layout is driven entirely by user.dashboardConfig
           * returned by the backend — no front-end changes needed for new roles.
           * ────────────────────────────────────────────────────────────── */}
          <Route path="/:role" element={<DynamicRolePage user={currentUser} onLogout={handleLogout} />} />

        </Routes>
      </BrowserRouter>
    </TenantContext.Provider>
  );
}

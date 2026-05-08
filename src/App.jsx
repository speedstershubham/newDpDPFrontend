import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WorkflowProvider } from "./context/WorkflowContext";
import RoleDashboard from "./components/RoleDashboard";
import Login from "./components/Login";
import DataPrincipalDashboard from "./components/DataPrincipalDashboard";
import GrievanceSubmission from "./components/GrievanceSubmission";
import ComplaintDetailsView from "./components/ComplaintDetailsView";
import ScrutinyDashboard from "./components/ScrutinyDashboard";
import EditComplaintPage from "./components/ScrutinyDashboard/EditComplaintPage";
import ScrutinyProfilePage from "./components/ScrutinyDashboard/ScrutinyProfilePage";
import ChairpersonDashboard from "./components/ChairpersonDashboard";
import ChairpersonComplaintDetail from "./components/ChairpersonDashboard/ChairpersonComplaintDetail";
import RegistryDashboard from "./components/RegistryDashboard";
import BoardMemberDashboard from "./components/BoardMemberDashboard";
import ReaderDashboard from "./components/ReaderDashboard";
import SystemAdminDashboard from "./components/SystemAdminDashboard";
import PlatformSuperAdmin from "./components/PlatformSuperAdmin";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import DataFiduciaryDashboard from "./components/DataFiduciaryDashboard";
import ProfilePage from "./components/ProfilePage";

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

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [language, setLanguage] = useState("en");

  const tenantConfig = {
    tenantName: "Data Protection Board of India",
    tenantLogo: "🏛️",
    primaryColor: "#1A3562",
    accentColor: "#E8871A",
    language,
    setLanguage,
  };

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  return (
    <TenantContext.Provider value={tenantConfig}>
      <WorkflowProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to={`/${currentUser.role}`} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/data-principal"
            element={
              currentUser?.role === "data-principal" ? (
                <DataPrincipalDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/grievance/new"
            element={
              currentUser?.role === "data-principal" ? (
                <GrievanceSubmission
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/complaint/:grn"
            element={
              currentUser?.role === "data-principal" ? (
                <ComplaintDetailsView
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/scrutiny"
            element={
              currentUser?.role === "scrutiny" ? (
                <ScrutinyDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/scrutiny/edit/:grn"
            element={
              currentUser?.role === "scrutiny" ? (
                <EditComplaintPage user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/scrutiny/profile"
            element={
              currentUser?.role === "scrutiny" ? (
                <ScrutinyProfilePage
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/chairperson"
            element={
              currentUser?.role === "chairperson" ? (
                <ChairpersonDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/chairperson/complaint/:grn"
            element={
              currentUser?.role === "chairperson" ? (
                <ChairpersonComplaintDetail
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/registry"
            element={
              currentUser?.role === "registry" ? (
                <RegistryDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/board-member"
            element={
              currentUser?.role === "board-member" ? (
                <BoardMemberDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reader"
            element={
              currentUser?.role === "reader" ? (
                <ReaderDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              currentUser?.role === "admin" ? (
                <SystemAdminDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/super-admin"
            element={
              currentUser?.role === "super-admin" ? (
                <PlatformSuperAdmin
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/data-fiduciary"
            element={
              currentUser?.role === "data-fiduciary" ? (
                <DataFiduciaryDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/analytics"
            element={
              currentUser ? (
                <AnalyticsDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* Profile page — works for every role */}
          <Route
            path="/:role/profile"
            element={
              currentUser ? (
                <ProfilePage user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* ── Generic RoleDashboard — catches any dynamic role
               created by a tenant that has no hardcoded component ── */}
          <Route
            path="/:role"
            element={
              currentUser ? (
                <RoleDashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      </WorkflowProvider>
    </TenantContext.Provider>
  );
}

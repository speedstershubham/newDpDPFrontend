import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Modal from "../shared/Modal";
import { useSystemAdmin } from "./hooks/useSystemAdmin";
import {
  USERS,
  ALL_ROLES,
  WORKFLOW_STAGES,
  AUDIT_LOGS,
  getRolePermissionCount,
  ASSIGNABLE_ROLES,
} from "./helpfunction/constants";
import "./styles/SystemAdminDashboard.css";

export default function SystemAdminDashboard({ user, onLogout }) {
  const { activeTab, setActiveTab, addUserOpen, setAddUserOpen, toast, showToast } = useSystemAdmin();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="System Administration"
          subtitle="Manage users, roles, and system configuration"
          actions={<button className="btn btn--primary" onClick={() => setAddUserOpen(true)}>+ Add User</button>}
        />

        <div className="stats-row">
          <StatCard icon="👥" value={24} label="Total Users" />
          <StatCard icon="✅" value={21} label="Active Users" />
          <StatCard icon="🔑" value={8} label="Roles Defined" />
          <StatCard icon="📋" value={1284} label="Audit Logs" />
        </div>

        <div className="tabs">
          <div className="tabs__nav">
            {[["users", "👥 User Management"], ["roles", "🔑 Role & Permissions"], ["audit", "📋 Audit Log"], ["workflow", "⚙️ Workflow"]].map(
              ([k, l]) => (
                <button key={k} className={`tab-btn${activeTab === k ? " tab-btn--active" : ""}`} onClick={() => setActiveTab(k)}>
                  {l}
                </button>
              )
            )}
          </div>

          {activeTab === "users" && (
            <div className="card">
              <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
                <table>
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {USERS.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className="tag tag--blue">{u.role}</span></td>
                        <td>
                          <span className={`badge badge--${u.status === "active" ? "success" : "default"}`}>{u.status}</span>
                        </td>
                        <td>{u.lastLogin}</td>
                        <td>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button className="btn btn--link btn--sm">Edit</button>
                            <button className="btn btn--link btn--sm" style={{ color: "var(--error)" }}>Deactivate</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="card">
              <div className="card__body">
                <div className="grid-2">
                  {ALL_ROLES.map((role) => (
                    <div key={role} className="card" style={{ background: "#fafafa" }}>
                      <div className="card__body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <span className="tag tag--blue">{role}</span>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                            {getRolePermissionCount(role)}
                          </div>
                        </div>
                        <button className="btn btn--ghost btn--sm">Configure</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="card">
              <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
                <table>
                  <thead>
                    <tr><th>Timestamp</th><th>User</th><th>Action</th><th>Entity</th><th>IP Address</th></tr>
                  </thead>
                  <tbody>
                    {AUDIT_LOGS.map((log, i) => (
                      <tr key={i}>
                        <td>{log.time}</td>
                        <td>{log.user}</td>
                        <td>{log.action}</td>
                        <td><span className="font-mono" style={{ fontSize: 12 }}>{log.entity}</span></td>
                        <td>{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="card">
              <div className="card__body">
                <div className="alert alert--info mb-4">
                  ⚙️ Workflow stages for grievance processing can be configured here.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {WORKFLOW_STAGES.map((stage, i) => (
                    <div key={i} className="card" style={{ background: "#fafafa" }}>
                      <div className="card__body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="workflow-stage-number">{i + 1}</div>
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{stage}</span>
                        </div>
                        <button className="btn btn--ghost btn--sm">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {addUserOpen && (
        <Modal title="Add New User" onClose={() => setAddUserOpen(false)}
          footer={<><button className="btn btn--default" onClick={() => setAddUserOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("User created successfully"); setAddUserOpen(false); }}>Create User</button></>}
        >
          <div className="form-group"><label className="form-label form-label--required">Full Name</label><input className="input" placeholder="User's full name" /></div>
          <div className="form-group"><label className="form-label form-label--required">Email</label><input type="email" className="input" placeholder="Official email" /></div>
          <div className="form-group"><label className="form-label">Role</label><select className="select">{ASSIGNABLE_ROLES.map((r) => <option key={r}>{r}</option>)}</select></div>
        </Modal>
      )}
    </div>
  );
}

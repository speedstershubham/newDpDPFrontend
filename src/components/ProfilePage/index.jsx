import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import "./styles/ProfilePage.css";

/* ── Role metadata ─────────────────────────────────────────── */
const ROLE_META = {
  "data-principal": {
    icon: "👤",
    title: "Data Principal",
    department: "Citizen Portal",
    org: "Government of India",
    idLabel: "Aadhaar / PAN",
  },
  scrutiny: {
    icon: "🔍",
    title: "Scrutiny Officer",
    department: "Grievance Processing Cell",
    org: "Data Protection Board of India",
    empId: "DPB/SW/2024/007",
  },
  chairperson: {
    icon: "🏛️",
    title: "Chairperson",
    department: "Adjudication Wing",
    org: "Data Protection Board of India",
    empId: "DPB/CP/2024/001",
  },
  registry: {
    icon: "📋",
    title: "Registry Officer",
    department: "Hearing Coordination Cell",
    org: "Data Protection Board of India",
    empId: "DPB/REG/2024/004",
  },
  "board-member": {
    icon: "⚖️",
    title: "Board Member",
    department: "Adjudication Wing",
    org: "Data Protection Board of India",
    empId: "DPB/BM/2024/003",
  },
  reader: {
    icon: "📖",
    title: "Reader",
    department: "Documentation Cell",
    org: "Data Protection Board of India",
    empId: "DPB/RDR/2024/011",
  },
  admin: {
    icon: "🔑",
    title: "System Administrator",
    department: "IT & Infrastructure",
    org: "Data Protection Board of India",
    empId: "DPB/SA/2024/002",
  },
  "super-admin": {
    icon: "🛡️",
    title: "Platform Super Admin",
    department: "Platform Operations",
    org: "Data Protection Board of India",
    empId: "DPB/PSA/2024/001",
  },
  "data-fiduciary": {
    icon: "🏢",
    title: "Data Fiduciary",
    department: "Compliance",
    org: "Registered Data Entity",
    empId: "DPB/DF/2024/001",
  },
};

const ACTIVITY = [
  { label: "Last Login",        value: "07 May 2026, 09:14 AM" },
  { label: "Session Duration",  value: "4h 12m"                },
  { label: "Login Device",      value: "Chrome on macOS"       },
  { label: "IP Address",        value: "192.168.x.x"           },
];

const PERMISSIONS = {
  "data-principal": ["Submit Grievances", "Track Complaint Status", "Download Orders", "View Hearings"],
  scrutiny:         ["Review Complaints", "Approve / Reject", "Request Clarification", "Edit Complaint Details"],
  chairperson:      ["Admit Complaints", "Assign Bench", "Send Notices", "Review Scrutiny Reports"],
  registry:         ["Schedule Hearings", "Publish Orders", "Send Notifications", "Generate VC Links"],
  "board-member":   ["Conduct Hearings", "Pass Orders", "View Case Files", "Submit Remarks"],
  reader:           ["Browse Published Orders", "Download Orders", "View Case Summaries"],
  admin:            ["Manage Users", "Assign Roles", "Configure Workflows", "View Audit Logs"],
  "super-admin":    ["Onboard Tenants", "Configure Platform", "Monitor Services", "Manage All Users"],
  "data-fiduciary": ["File Responses", "View Complaints", "Download Notices", "Track Hearings"],
};

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [activeSection, setActiveSection] = useState("overview");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const meta = ROLE_META[user?.role] || ROLE_META["data-principal"];
  const perms = PERMISSIONS[user?.role] || [];
  const backPath = user?.role === "data-principal" ? "/data-principal" : `/${user?.role}`;

  const handleSave = () => {
    setEditMode(false);
    showToast("Profile updated successfully");
  };

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={{ ...user, name: displayName }} onLogout={onLogout} />

      <div className="page-content">
        {/* Page Header */}
        <div className="profile-page-header">
          <button className="btn btn--default btn--sm" onClick={() => navigate(backPath)}>
            ← Back to Dashboard
          </button>
          <h1 className="profile-page-title">My Profile</h1>
        </div>

        <div className="profile-layout">
          {/* ── Left panel ──────────────────────────────────── */}
          <aside className="profile-aside">
            <div className="card profile-card">
              <div className="profile-avatar">{meta.icon}</div>
              <div className="profile-name">{displayName || "—"}</div>
              <div className="profile-role-badge">{meta.title}</div>
              <div className="profile-org">{meta.org}</div>
              {meta.empId && <div className="profile-empid">ID: {meta.empId}</div>}

              <div className="profile-nav">
                {[
                  ["overview",    "📊 Overview"],
                  ["edit",        "✏️ Edit Profile"],
                  ["security",    "🔒 Security"],
                  ["permissions", "🛡️ Permissions"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    className={`profile-nav-btn${activeSection === key ? " profile-nav-btn--active" : ""}`}
                    onClick={() => { setActiveSection(key); setEditMode(key === "edit"); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Right panel ─────────────────────────────────── */}
          <main className="profile-main">

            {/* Overview */}
            {activeSection === "overview" && (
              <>
                <div className="card mb-6">
                  <div className="card__header">
                    <span className="card__title">Account Information</span>
                    <button
                      className="btn btn--ghost btn--sm"
                      onClick={() => { setActiveSection("edit"); setEditMode(true); }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                  <div className="card__body">
                    <div className="desc-grid desc-grid--3">
                      <div className="desc-item">
                        <div className="desc-label">Full Name</div>
                        <div className="desc-value">{displayName || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Email</div>
                        <div className="desc-value">{user?.email || `${user?.role}@dpb.gov.in`}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Phone</div>
                        <div className="desc-value">{phone}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Role</div>
                        <div className="desc-value">
                          <span className="tag tag--blue">{meta.title}</span>
                        </div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Department</div>
                        <div className="desc-value">{meta.department}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Organization</div>
                        <div className="desc-value">{meta.org}</div>
                      </div>
                      {meta.empId && (
                        <div className="desc-item">
                          <div className="desc-label">Employee ID</div>
                          <div className="desc-value font-mono">{meta.empId}</div>
                        </div>
                      )}
                      <div className="desc-item">
                        <div className="desc-label">Joined</div>
                        <div className="desc-value">01 Jan 2024</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Account Status</div>
                        <div className="desc-value">
                          <span className="badge badge--success">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card__header">
                    <span className="card__title">Recent Activity</span>
                  </div>
                  <div className="card__body">
                    <div className="desc-grid">
                      {ACTIVITY.map((a) => (
                        <div key={a.label} className="desc-item">
                          <div className="desc-label">{a.label}</div>
                          <div className="desc-value">{a.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Edit Profile */}
            {activeSection === "edit" && (
              <div className="card">
                <div className="card__header">
                  <span className="card__title">Edit Profile</span>
                </div>
                <div className="card__body">
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label form-label--required">Full Name</label>
                      <input
                        className="input"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="input"
                        type="email"
                        defaultValue={user?.email || `${user?.role}@dpb.gov.in`}
                        placeholder="Official email"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        className="input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Language</label>
                      <select className="select">
                        <option>English</option>
                        <option>हिन्दी</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <textarea className="textarea" rows={3} placeholder="Official address..." />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button className="btn btn--default" onClick={() => { setActiveSection("overview"); setEditMode(false); }}>
                      Cancel
                    </button>
                    <button className="btn btn--primary" onClick={handleSave}>
                      💾 Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="card">
                <div className="card__header">
                  <span className="card__title">Security Settings</span>
                </div>
                <div className="card__body">
                  <div className="security-row">
                    <div>
                      <div className="security-label">Password</div>
                      <div className="security-desc">Last changed 30 days ago</div>
                    </div>
                    <button className="btn btn--default btn--sm" onClick={() => showToast("Password reset link sent to your email")}>
                      Change Password
                    </button>
                  </div>
                  <div className="security-row">
                    <div>
                      <div className="security-label">Two-Factor Authentication</div>
                      <div className="security-desc">Add an extra layer of security to your account</div>
                    </div>
                    <button className="btn btn--primary btn--sm" onClick={() => showToast("2FA setup initiated")}>
                      Enable 2FA
                    </button>
                  </div>
                  <div className="security-row">
                    <div>
                      <div className="security-label">Active Sessions</div>
                      <div className="security-desc">1 active session — Chrome on macOS</div>
                    </div>
                    <button className="btn btn--danger btn--sm" onClick={() => showToast("All other sessions terminated")}>
                      Revoke All
                    </button>
                  </div>
                  <div className="security-row" style={{ border: "none" }}>
                    <div>
                      <div className="security-label">Login History</div>
                      <div className="security-desc">View last 30 days of login activity</div>
                    </div>
                    <button className="btn btn--ghost btn--sm" onClick={() => showToast("Login history downloaded")}>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Permissions */}
            {activeSection === "permissions" && (
              <div className="card">
                <div className="card__header">
                  <span className="card__title">Role &amp; Permissions</span>
                </div>
                <div className="card__body">
                  <div className="alert alert--info mb-6">
                    ℹ️ Permissions are assigned based on your role. Contact your System Administrator to request changes.
                  </div>
                  <div className="desc-grid mb-6">
                    <div className="desc-item">
                      <div className="desc-label">Assigned Role</div>
                      <div className="desc-value"><span className="tag tag--blue">{meta.title}</span></div>
                    </div>
                    <div className="desc-item">
                      <div className="desc-label">Department</div>
                      <div className="desc-value">{meta.department}</div>
                    </div>
                  </div>
                  <div className="perm-section-title">Granted Permissions</div>
                  <div className="perm-grid">
                    {perms.map((p) => (
                      <div key={p} className="perm-item">
                        <span className="perm-check">✓</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

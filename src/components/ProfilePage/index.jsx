import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import "./styles/ProfilePage.css";

const LOGIN_HISTORY = [
  { ts: "2026-05-06 09:15:23", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { ts: "2026-05-05 14:30:45", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { ts: "2026-05-05 09:10:12", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { ts: "2026-05-04 16:45:33", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
];

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState("profile");

  const [fullName,      setFullName]      = useState(user?.name || "");
  const [designation,   setDesignation]   = useState("");
  const [department,    setDepartment]    = useState("");
  const [email,         setEmail]         = useState(user?.email || `${user?.role || ""}@dpb.gov.in`);
  const [phone,         setPhone]         = useState("");
  const [jurisdiction,  setJurisdiction]  = useState("");
  const [authorityLevel,setAuthorityLevel]= useState("");
  const [delegateTo,    setDelegateTo]    = useState("");

  const [curPwd,  setCurPwd]  = useState("");
  const [newPwd,  setNewPwd]  = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [showCur,  setShowCur]  = useState(false);
  const [showNew,  setShowNew]  = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [notifPush,  setNotifPush]  = useState(false);
  const [notifDaily, setNotifDaily] = useState(true);

  // notification prefs
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifHearing, setNotifHearing] = useState(true);
  const [notifOrder, setNotifOrder] = useState(true);
  const [notifClarification, setNotifClarification] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const TABS = [
    { key: "profile",       label: "Profile Information",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { key: "security",      label: "Security",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> },
    { key: "notifications", label: "Notifications",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
    { key: "activity",      label: "Login Activity",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ];

  // ── Data Principal specific layout ──────────────────────────
  if (user?.role === "data-principal") {
    const initials = (displayName || "U").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const email = user?.email || "rahul.kumar@example.com";
    const dpTabs = [
      ["overview", "Overview"],
      ["security", "Security"],
      ["notifications", "Notifications"],
    ];

    return (
      <div className="layout">
        <ToastNotification message={toast} />
        <TenantHeader user={{ ...user, name: displayName }} onLogout={onLogout} />
        <div className="page-content">
          <div className="profile-page-header">
            <button className="btn btn--default btn--sm" onClick={() => navigate(backPath)}>
              ← Back to Dashboard
            </button>
            <h1 className="profile-page-title">My Profile</h1>
          </div>

          <div className="dp-profile-card card mb-6">
            <div className="dp-profile-avatar">{initials}</div>
            <div className="dp-profile-name">{displayName || "—"}</div>
            <div className="dp-profile-email">{email}</div>

            <div className="dp-profile-tabs">
              {dpTabs.map(([key, label]) => (
                <button
                  key={key}
                  className={`dp-profile-tab${activeSection === key ? " dp-profile-tab--active" : ""}`}
                  onClick={() => { setActiveSection(key); setEditMode(false); }}
                >
                  {key === "security" && "🔒 "}
                  {key === "notifications" && "🔔 "}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Overview ──────────────────────────────────── */}
          {activeSection === "overview" && (
            <>
              {/* Account Statistics */}
              <div className="card mb-6">
                <div className="card__header">
                  <span className="card__title">Account Statistics</span>
                </div>
                <div className="card__body">
                  <div className="dp-stats-grid">
                    <div className="dp-stat-item">
                      <span className="dp-stat-label">Total Complaints:</span>
                      <span className="dp-stat-value dp-stat-value--primary">4</span>
                    </div>
                    <div className="dp-stat-item">
                      <span className="dp-stat-label">Active Complaints:</span>
                      <span className="dp-stat-value dp-stat-value--info">3</span>
                    </div>
                    <div className="dp-stat-item">
                      <span className="dp-stat-label">Resolved Complaints:</span>
                      <span className="dp-stat-value dp-stat-value--success">1</span>
                    </div>
                    <div className="dp-stat-item">
                      <span className="dp-stat-label">Drafts:</span>
                      <span className="dp-stat-value">3</span>
                    </div>
                    <div className="dp-stat-item">
                      <span className="dp-stat-label">Account Created:</span>
                      <span className="dp-stat-value">2024-01-15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="card mb-6">
                <div className="card__header">
                  <span className="card__title">Personal Information</span>
                  {!editMode ? (
                    <button className="btn btn--ghost btn--sm" onClick={() => setEditMode(true)}>✏️ Edit</button>
                  ) : null}
                </div>
                <div className="card__body">
                  {editMode ? (
                    <>
                      <div className="grid-2 mb-4">
                        <div className="form-group">
                          <label className="form-label form-label--required">Full Name</label>
                          <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input className="input" type="email" defaultValue={email} disabled style={{ background: "var(--surface-hover)" }} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Mobile</label>
                          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91-XXXXXXXXXX" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">State</label>
                          <select className="select" value={stateVal} onChange={(e) => setStateVal(e.target.value)}>
                            {["Karnataka","Maharashtra","Delhi","Tamil Nadu","Telangana","Gujarat","Rajasthan","Uttar Pradesh","West Bengal","Kerala"].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group mb-4">
                        <label className="form-label">Address</label>
                        <textarea className="textarea" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn--default" onClick={() => setEditMode(false)}>Cancel</button>
                        <button className="btn btn--primary" onClick={handleSave}>💾 Save Changes</button>
                      </div>
                    </>
                  ) : (
                    <table className="dp-info-table">
                      <tbody>
                        <tr><td className="dp-info-label">Full Name</td><td className="dp-info-value">{displayName || "—"}</td></tr>
                        <tr><td className="dp-info-label">Email</td><td className="dp-info-value">{email}</td></tr>
                        <tr><td className="dp-info-label">Mobile</td><td className="dp-info-value">{phone}</td></tr>
                        <tr><td className="dp-info-label">Address</td><td className="dp-info-value">{address}</td></tr>
                        <tr><td className="dp-info-label">State</td><td className="dp-info-value">{stateVal}</td></tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Government ID Verification */}
              <div className="card">
                <div className="card__header">
                  <span className="card__title">Government ID Verification</span>
                </div>
                <div className="card__body">
                  <div className="dp-id-verified">
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div className="dp-id-icon">🪪</div>
                      <div>
                        <div className="dp-id-verified-title">Verified Identity</div>
                        <div className="dp-id-verified-desc">
                          Your identity has been verified using <strong>Aadhaar</strong>
                        </div>
                        <div className="dp-id-verified-id">ID: XXXX-XXXX-1234</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Security ──────────────────────────────────── */}
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
                  <button className="btn btn--default btn--sm" onClick={() => showToast("Password reset OTP sent to your mobile")}>
                    Change Password
                  </button>
                </div>
                <div className="security-row">
                  <div>
                    <div className="security-label">Two-Factor Authentication</div>
                    <div className="security-desc">Secure your account with OTP verification</div>
                  </div>
                  <button className="btn btn--primary btn--sm" onClick={() => showToast("2FA setup initiated")}>
                    Enable 2FA
                  </button>
                </div>
                <div className="security-row">
                  <div>
                    <div className="security-label">Login Verification</div>
                    <div className="security-desc">Verified via Aadhaar OTP · Last login: 07 May 2026</div>
                  </div>
                  <span className="badge badge--success">Verified</span>
                </div>
                <div className="security-row" style={{ border: "none" }}>
                  <div>
                    <div className="security-label">Active Sessions</div>
                    <div className="security-desc">1 active session — Chrome on Windows</div>
                  </div>
                  <button className="btn btn--danger btn--sm" onClick={() => showToast("All other sessions terminated")}>
                    Revoke All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ──────────────────────────────── */}
          {activeSection === "notifications" && (
            <div className="card">
              <div className="card__header">
                <span className="card__title">Notification Preferences</span>
              </div>
              <div className="card__body">
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
                  Choose how and when you want to receive notifications about your grievances.
                </p>
                {[
                  { label: "Email Notifications", desc: "Receive updates on complaint status via email", val: notifEmail, set: setNotifEmail },
                  { label: "SMS / Mobile Alerts", desc: "Get SMS alerts for hearing dates and orders", val: notifSMS, set: setNotifSMS },
                  { label: "Hearing Reminders", desc: "Get reminders 24 hours before scheduled hearings", val: notifHearing, set: setNotifHearing },
                  { label: "Order & Judgment Alerts", desc: "Notify when an order is issued on your complaint", val: notifOrder, set: setNotifOrder },
                  { label: "Clarification Requests", desc: "Notify when the board requests additional information", val: notifClarification, set: setNotifClarification },
                ].map(({ label, desc, val, set }) => (
                  <div key={label} className="dp-notif-row">
                    <div>
                      <div className="security-label">{label}</div>
                      <div className="security-desc">{desc}</div>
                    </div>
                    <label className="dp-toggle">
                      <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} />
                      <span className="dp-toggle__slider" />
                    </label>
                  </div>
                ))}
                <div style={{ marginTop: 20 }}>
                  <button className="btn btn--primary" onClick={() => showToast("Notification preferences saved")}>Save Preferences</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={{ ...user, name: fullName }} onLogout={onLogout} />

      <div className="page-content">
        <h1 className="pp-title">My Profile</h1>

        <div className="pp-tabs">
          {TABS.map((t) => (
            <button key={t.key} type="button"
              className={`pp-tab${tab === t.key ? " pp-tab--active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Profile Information */}
        {tab === "profile" && (
          <div className="pp-card">
            <div className="pp-avatar-wrap">
              <div className="pp-avatar" />
              <button type="button" className="pp-change-photo-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Change Photo
              </button>
            </div>

            <div className="pp-form-grid">
              <div className="pp-field">
                <label className="pp-label"><span className="pp-req">*</span> Full Name</label>
                <div className="pp-input-wrap">
                  <svg className="pp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input className="pp-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label">Designation</label>
                <div className="pp-input-wrap">
                  <svg className="pp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <input className="pp-input" placeholder="e.g., Senior Officer" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label">Department</label>
                <div className="pp-input-wrap">
                  <input className="pp-input pp-input--no-icon" placeholder="e.g., Scrutiny Wing" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label">Role</label>
                <div className="pp-input-wrap">
                  <input className="pp-input pp-input--no-icon pp-input--readonly" value={user?.role || "chairperson"} readOnly />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label"><span className="pp-req">*</span> Email</label>
                <div className="pp-input-wrap">
                  <svg className="pp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input className="pp-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label">Phone</label>
                <div className="pp-input-wrap">
                  <svg className="pp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  <input className="pp-input" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="pp-section-divider"><span>Authority Details</span></div>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label className="pp-label">Jurisdiction</label>
                <div className="pp-input-wrap">
                  <input className="pp-input pp-input--no-icon" placeholder="e.g., All India" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} />
                </div>
              </div>
              <div className="pp-field">
                <label className="pp-label">Authority Level</label>
                <div className="pp-input-wrap">
                  <input className="pp-input pp-input--no-icon pp-input--readonly" placeholder="e.g., Chairperson" value={authorityLevel} readOnly />
                </div>
              </div>
            </div>

            <div className="pp-field" style={{ marginTop: 24 }}>
              <label className="pp-label">Digital Signature</label>
              <button type="button" className="pp-upload-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Upload Digital Signature
              </button>
              <div className="pp-upload-hint">Accepted formats: .pfx, .p12</div>
            </div>

            <div className="pp-section-divider" style={{ marginTop: 32 }}><span>Delegation Settings</span></div>
            <div className="pp-field" style={{ marginTop: 16 }}>
              <label className="pp-label">Delegate Authority To</label>
              <div className="pp-input-wrap">
                <input className="pp-input pp-input--no-icon" placeholder="Select board member" value={delegateTo} onChange={(e) => setDelegateTo(e.target.value)} />
              </div>
            </div>

            <button type="button" className="pp-submit-btn" style={{ marginTop: 28 }}
              onClick={() => showToast("Profile updated successfully")}>
              Update Profile
            </button>
          </div>
        )}

        {/* Security */}
        {tab === "security" && (
          <div className="pp-card">
            <div className="pp-card__section-title">Change Password</div>
            <div className="pp-pwd-form">
              {[
                { label: "Current Password",    val: curPwd,  set: setCurPwd,  show: showCur,  setShow: setShowCur  },
                { label: "New Password",         val: newPwd,  set: setNewPwd,  show: showNew,  setShow: setShowNew  },
                { label: "Confirm New Password", val: confPwd, set: setConfPwd, show: showConf, setShow: setShowConf },
              ].map((f, i) => (
                <div key={i} className="pp-field">
                  <label className="pp-label"><span className="pp-req">*</span> {f.label}</label>
                  <div className="pp-pwd-wrap">
                    <svg className="pp-input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    <input className="pp-pwd-input" type={f.show ? "text" : "password"}
                      value={f.val} onChange={(e) => f.set(e.target.value)} />
                    <button type="button" className="pp-eye-btn" onClick={() => f.setShow((v) => !v)}>
                      {f.show
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="pp-submit-btn"
                onClick={() => { setCurPwd(""); setNewPwd(""); setConfPwd(""); showToast("Password changed successfully"); }}>
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        {tab === "notifications" && (
          <div className="pp-card">
            <div className="pp-card__section-title">Notification Preferences</div>
            <div className="pp-notif-list">
              {[
                { label: "Email Notifications",  desc: "Receive updates via email",         val: notifEmail, set: setNotifEmail },
                { label: "SMS Notifications",    desc: "Receive critical alerts via SMS",   val: notifSMS,   set: setNotifSMS   },
                { label: "Push Notifications",   desc: "Browser push notifications",        val: notifPush,  set: setNotifPush  },
                { label: "Daily Summary",        desc: "Daily email summary of activities", val: notifDaily, set: setNotifDaily },
              ].map((n, i) => (
                <div key={i} className="pp-notif-row">
                  <div className="pp-notif-info">
                    <div className="pp-notif-label">{n.label}</div>
                    <div className="pp-notif-desc">{n.desc}</div>
                  </div>
                  <button type="button" className={`pp-toggle${n.val ? " pp-toggle--on" : ""}`}
                    onClick={() => n.set((v) => !v)} aria-pressed={n.val}>
                    <span className="pp-toggle__knob" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Login Activity */}
        {tab === "activity" && (
          <div className="pp-card">
            <div className="pp-card__section-title">Recent Login Activity</div>
            <div className="pp-table-wrap">
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>IP Address</th>
                    <th>Device</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {LOGIN_HISTORY.map((row, i) => (
                    <tr key={i}>
                      <td>{row.ts}</td>
                      <td>{row.ip}</td>
                      <td>{row.device}</td>
                      <td>{row.location}</td>
                      <td><span className="pp-status-success">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pp-table-pagination">
                <button className="pp-page-btn" disabled>‹</button>
                <button className="pp-page-btn pp-page-btn--active">1</button>
                <button className="pp-page-btn">›</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

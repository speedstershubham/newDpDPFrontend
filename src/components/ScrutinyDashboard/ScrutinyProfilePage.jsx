import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import "./styles/ScrutinyProfilePage.css";

function IconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v0" />
      <path d="M9 12v0" />
      <path d="M9 15v0" />
      <path d="M9 18v0" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function IconLockInput() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function PasswordField({ id, label, value, onChange, visible, setVisible, autoFocus }) {
  return (
    <div className="scrutiny-profile-field scrutiny-profile-field--full">
      <label className="scrutiny-profile-label scrutiny-profile-label--req-left" htmlFor={id}>
        <span className="scrutiny-profile-req" aria-hidden>
          *
        </span>
        {label}
      </label>
      <div className="scrutiny-profile-input-wrap scrutiny-profile-input-wrap--password">
        <span className="scrutiny-profile-input-icon">
          <IconLockInput />
        </span>
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={id === "spf-current-pw" ? "current-password" : "new-password"}
          autoFocus={autoFocus}
        />
        <button
          type="button"
          className="scrutiny-profile-input-suffix"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <IconEye /> : <IconEyeOff />}
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { key: "profile", label: "Profile Information", Icon: IconPerson },
  { key: "security", label: "Security", Icon: IconLock },
  { key: "notifications", label: "Notifications", Icon: IconBell },
  { key: "activity", label: "Login Activity", Icon: IconHistory },
];

const LOGIN_ACTIVITY_ROWS = [
  { timestamp: "2026-05-08 14:22:01", ip: "192.168.1.105", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { timestamp: "2026-05-07 11:03:45", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { timestamp: "2026-05-06 09:15:23", ip: "192.168.1.100", device: "Chrome on Windows", location: "New Delhi, India", status: "Success" },
  { timestamp: "2026-05-05 08:40:12", ip: "10.0.0.42", device: "Safari on macOS", location: "Bengaluru, India", status: "Success" },
  { timestamp: "2026-05-04 16:55:00", ip: "192.168.1.88", device: "Edge on Windows", location: "New Delhi, India", status: "Success" },
  { timestamp: "2026-05-03 09:10:11", ip: "192.168.1.12", device: "Firefox on Linux", location: "Mumbai, India", status: "Success" },
];

export default function ScrutinyProfilePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [toast, setToast] = useState(null);

  const [fullName, setFullName] = useState(() => user?.name || "");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState(() => user?.email || user?.name || "");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [prefEmail, setPrefEmail] = useState(true);
  const [prefSms, setPrefSms] = useState(true);
  const [prefPush, setPrefPush] = useState(false);
  const [prefDaily, setPrefDaily] = useState(true);

  const [activityPage, setActivityPage] = useState(1);
  const activityPageSize = 5;
  const activityTotalPages = Math.max(1, Math.ceil(LOGIN_ACTIVITY_ROWS.length / activityPageSize));
  const activitySlice = LOGIN_ACTIVITY_ROWS.slice(
    (activityPage - 1) * activityPageSize,
    activityPage * activityPageSize,
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    showToast("Profile updated successfully");
  };

  const handleChangePhoto = () => {
    showToast("Photo upload will be available when connected to storage");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    showToast("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="layout scrutiny-profile-layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content scrutiny-profile-page">
        <div className="scrutiny-profile-column">
          <nav className="scrutiny-profile-breadcrumb" aria-label="Breadcrumb">
            <button type="button" className="scrutiny-profile-crumb-link" onClick={() => navigate("/scrutiny")}>
              Scrutiny
            </button>
          </nav>

          <h1 className="scrutiny-profile-page-title">My Profile</h1>

          <div className="scrutiny-profile-tabs" role="tablist">
            {TABS.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`scrutiny-profile-tab${tab === key ? " scrutiny-profile-tab--active" : ""}`}
                onClick={() => setTab(key)}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

        {tab === "profile" && (
          <div className="scrutiny-profile-card">
            <div className="scrutiny-profile-photo-block">
              <div className="scrutiny-profile-avatar-placeholder" aria-hidden />
              <button type="button" className="scrutiny-profile-change-photo" onClick={handleChangePhoto}>
                <IconCamera /> Change Photo
              </button>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="scrutiny-profile-form-grid">
                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-name">
                    Full Name
                    <span className="scrutiny-profile-req" aria-hidden>
                      *
                    </span>
                  </label>
                  <div className="scrutiny-profile-input-wrap">
                    <span className="scrutiny-profile-input-icon">
                      <IconPerson />
                    </span>
                    <input id="spf-name" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
                  </div>
                </div>

                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-designation">
                    Designation
                  </label>
                  <div className="scrutiny-profile-input-wrap">
                    <span className="scrutiny-profile-input-icon">
                      <IconBuilding />
                    </span>
                    <input id="spf-designation" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g., Senior Officer" />
                  </div>
                </div>

                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-dept">
                    Department
                  </label>
                  <div className="scrutiny-profile-input-wrap">
                    <span className="scrutiny-profile-input-icon">
                      <IconBuilding />
                    </span>
                    <input id="spf-dept" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g., Scrutiny Wing" />
                  </div>
                </div>

                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-role">
                    Role
                  </label>
                  <div className="scrutiny-profile-input-wrap scrutiny-profile-input-wrap--muted">
                    <input id="spf-role" value="scrutiny" readOnly tabIndex={-1} aria-readonly />
                  </div>
                </div>

                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-email">
                    Email
                    <span className="scrutiny-profile-req" aria-hidden>
                      *
                    </span>
                  </label>
                  <div className="scrutiny-profile-input-wrap">
                    <span className="scrutiny-profile-input-icon">
                      <IconMail />
                    </span>
                    <input id="spf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  </div>
                </div>

                <div className="scrutiny-profile-field">
                  <label className="scrutiny-profile-label" htmlFor="spf-phone">
                    Phone
                  </label>
                  <div className="scrutiny-profile-input-wrap">
                    <span className="scrutiny-profile-input-icon">
                      <IconPhone />
                    </span>
                    <input id="spf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" autoComplete="tel" />
                  </div>
                </div>
              </div>

              <div className="scrutiny-profile-form-footer">
                <div className="scrutiny-profile-actions scrutiny-profile-actions--profile">
                  <button type="submit" className="scrutiny-profile-submit">
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {tab === "security" && (
          <div className="scrutiny-profile-card scrutiny-profile-card--sectioned">
            <div className="scrutiny-profile-card__header">
              <h2 className="scrutiny-profile-card__title">Change Password</h2>
            </div>
            <div className="scrutiny-profile-card__body scrutiny-profile-card__body--security">
              <form onSubmit={handlePasswordSubmit} className="scrutiny-profile-security-form">
                <PasswordField
                  id="spf-current-pw"
                  label="Current Password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  visible={showCurrentPw}
                  setVisible={setShowCurrentPw}
                  autoFocus
                />
                <PasswordField
                  id="spf-new-pw"
                  label="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={showNewPw}
                  setVisible={setShowNewPw}
                />
                <PasswordField
                  id="spf-confirm-pw"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={showConfirmPw}
                  setVisible={setShowConfirmPw}
                />
                <div className="scrutiny-profile-actions scrutiny-profile-actions--security">
                  <button type="submit" className="scrutiny-profile-submit">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div className="scrutiny-profile-card scrutiny-profile-card--sectioned">
            <div className="scrutiny-profile-card__header">
              <h2 className="scrutiny-profile-card__title">Notification Preferences</h2>
            </div>
            <div className="scrutiny-profile-card__body scrutiny-profile-card__body--flush">
              <div className="scrutiny-profile-pref-row">
                <div className="scrutiny-profile-setting-text">
                  <strong>Email Notifications</strong>
                  <span>Receive updates via email</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefEmail}
                  className={`scrutiny-profile-switch${prefEmail ? " scrutiny-profile-switch--on" : ""}`}
                  onClick={() => setPrefEmail((v) => !v)}
                >
                  <span className="scrutiny-profile-switch__thumb" />
                </button>
              </div>
              <div className="scrutiny-profile-pref-row">
                <div className="scrutiny-profile-setting-text">
                  <strong>SMS Notifications</strong>
                  <span>Receive critical alerts via SMS</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefSms}
                  className={`scrutiny-profile-switch${prefSms ? " scrutiny-profile-switch--on" : ""}`}
                  onClick={() => setPrefSms((v) => !v)}
                >
                  <span className="scrutiny-profile-switch__thumb" />
                </button>
              </div>
              <div className="scrutiny-profile-pref-row">
                <div className="scrutiny-profile-setting-text">
                  <strong>Push Notifications</strong>
                  <span>Browser push notifications</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefPush}
                  className={`scrutiny-profile-switch${prefPush ? " scrutiny-profile-switch--on" : ""}`}
                  onClick={() => setPrefPush((v) => !v)}
                >
                  <span className="scrutiny-profile-switch__thumb" />
                </button>
              </div>
              <div className="scrutiny-profile-pref-row scrutiny-profile-pref-row--last">
                <div className="scrutiny-profile-setting-text">
                  <strong>Daily Summary</strong>
                  <span>Daily email summary of activities</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefDaily}
                  className={`scrutiny-profile-switch${prefDaily ? " scrutiny-profile-switch--on" : ""}`}
                  onClick={() => setPrefDaily((v) => !v)}
                >
                  <span className="scrutiny-profile-switch__thumb" />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="scrutiny-profile-card scrutiny-profile-card--sectioned scrutiny-profile-card--activity">
            <div className="scrutiny-profile-card__header">
              <h2 className="scrutiny-profile-card__title">Recent Login Activity</h2>
            </div>
            <div className="scrutiny-profile-card__body scrutiny-profile-card__body--table">
              <div className="scrutiny-profile-table-wrap">
                <table className="scrutiny-profile-activity-table">
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
                    {activitySlice.map((row) => (
                      <tr key={row.timestamp}>
                        <td className="scrutiny-profile-activity-ts">{row.timestamp}</td>
                        <td>{row.ip}</td>
                        <td>{row.device}</td>
                        <td>{row.location}</td>
                        <td>
                          <span className="scrutiny-profile-status-success">{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="scrutiny-profile-activity-footer">
                <div className="scrutiny-profile-pagination" role="navigation" aria-label="Login activity pages">
                  <button
                    type="button"
                    className="scrutiny-profile-page-btn"
                    disabled={activityPage <= 1}
                    onClick={() => setActivityPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <IconChevronLeft />
                  </button>
                  <span className="scrutiny-profile-page-current">{activityPage}</span>
                  <button
                    type="button"
                    className="scrutiny-profile-page-btn"
                    disabled={activityPage >= activityTotalPages}
                    onClick={() => setActivityPage((p) => Math.min(activityTotalPages, p + 1))}
                    aria-label="Next page"
                  >
                    <IconChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>

        <button
          type="button"
          className="scrutiny-profile-help-fab"
          aria-label="Help"
          onClick={() => showToast("Help — contact your system administrator")}
        >
          <IconHelp />
        </button>
      </div>
    </div>
  );
}

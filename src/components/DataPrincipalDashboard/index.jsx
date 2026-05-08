import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Modal from "../shared/Modal";
import Pagination from "../shared/Pagination";
import ComplaintDetailsView from "../ComplaintDetailsView";
import { useGrievanceDashboard } from "./hooks/useGrievanceDashboard";
import {
  NOTIFICATIONS,
  MAX_COMPLAINTS,
  MAX_ACTIVE,
  StatusBadge,
  PriorityTag,
  DRAFTS,
  RECYCLE_BIN_ITEMS,
} from "./helpfunction/constants.jsx";
import "./styles/DataPrincipalDashboard.css";

export default function DataPrincipalDashboard({ user, onLogout }) {
  const {
    drawerOpen, setDrawerOpen,
    selected, setSelected,
    revokeOpen, setRevokeOpen,
    revokeReason, setRevokeReason,
    toast,
    totalComplaints,
    activeComplaints,
    showToast,
    handleFileNew,
    upcomingHearing,
    search, handleSearch,
    activeTab, handleTab,
    page, setPage, totalPages,
    pagedGrievances,
    filteredGrievances,
    draftsOpen, setDraftsOpen,
    recycleBinOpen, setRecycleBinOpen,
    recycleBinItems,
    autosaveBannerVisible, setAutosaveBannerVisible,
    handleRestoreItem,
    handleDeleteForever,
    handleEmptyRecycleBin,
  } = useGrievanceDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast?.msg} type={toast?.type} />

      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        {upcomingHearing && (
          <div className="alert alert--info mb-6" style={{ alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <strong>Upcoming Hearing:</strong> {upcomingHearing.grn} —{" "}
              {upcomingHearing.hearingDate} at {upcomingHearing.hearingTime}
              <br />
              <span style={{ fontSize: 13 }}>Respondent: {upcomingHearing.respondent}</span>
            </div>
          </div>
        )}

        <PageHeader
          title="My Grievances"
          subtitle={`Track and manage your data protection grievances (${totalComplaints}/${MAX_COMPLAINTS} used)`}
          actions={<>
            <button className="btn btn--default" onClick={() => setDraftsOpen(true)}>💾 Drafts ({DRAFTS.length})</button>
            <button className="btn btn--default" onClick={() => setRecycleBinOpen(true)}>🗑 Recycle Bin</button>
            <button className="btn btn--primary btn--lg" onClick={handleFileNew}>+ File New Grievance</button>
          </>}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
          <div>
            <div className="stats-row">
              <StatCard icon="📋" value={totalComplaints} suffix={MAX_COMPLAINTS} label="Total Complaints" />
              <StatCard icon="⏳" value={activeComplaints} suffix={MAX_ACTIVE} label="Active" />
              <StatCard icon="✅" value={1} label="Order Issued" />
              <StatCard icon="💾" value={3} label="Drafts Saved" />
            </div>

            <div className="table-wrapper">
              {/* Search + filter bar */}
              <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border-solid)", flexWrap: "wrap" }}>
                <input
                  className="input"
                  style={{ maxWidth: 280 }}
                  placeholder="🔍 Search by GRN, subject or respondent..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="tabs__nav" style={{ marginBottom: 0 }}>
                  {[["all","All"],["active","Active"],["resolved","Resolved"],["revoked","Revoked"]].map(([val,label]) => (
                    <button
                      key={val}
                      className={`tab-btn${activeTab === val ? " tab-btn--active" : ""}`}
                      onClick={() => handleTab(val)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>GRN</th>
                    <th>Subject</th>
                    <th>Respondent</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Filed Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedGrievances.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--text-secondary)" }}>No complaints found.</td></tr>
                  ) : pagedGrievances.map((g) => (
                    <tr key={g.key}>
                      <td><span className="td-mono">{g.grn}</span></td>
                      <td style={{ maxWidth: 220 }}>{g.subject}</td>
                      <td>{g.respondent}</td>
                      <td><StatusBadge status={g.status} /></td>
                      <td><PriorityTag priority={g.priority} /></td>
                      <td>{g.filedDate}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            className="btn btn--link btn--sm"
                            onClick={() => { setSelected(g); setDrawerOpen(true); }}
                          >
                            👁 View Details
                          </button>
                          {["submitted", "under-scrutiny", "admitted"].includes(g.status) && (
                            <button
                              className="btn btn--link btn--sm"
                              style={{ color: "var(--error)" }}
                              onClick={() => { setSelected(g); setRevokeOpen(true); }}
                            >
                              🚫 Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination page={page} totalPages={totalPages} total={filteredGrievances.length} onPage={setPage} />
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">🔔 Notifications</span>
            </div>
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className="notif-item">
                <div className="notif-item__title">{n.title}</div>
                <div className="notif-item__desc">{n.desc}</div>
                <div className="notif-item__time">{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grievance Detail Drawer — full ComplaintDetailsView */}
      {drawerOpen && selected && (
        <ComplaintDetailsView
          caseData={selected}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      {/* Revoke Modal */}
      {revokeOpen && (
        <Modal
          title="Revoke Grievance"
          onClose={() => setRevokeOpen(false)}
          footer={<>
            <button className="btn btn--default" onClick={() => setRevokeOpen(false)}>Cancel</button>
            <button className="btn btn--danger" onClick={() => { showToast("Grievance revoked successfully"); setRevokeOpen(false); setDrawerOpen(false); setRevokeReason(""); }}>Confirm Revoke</button>
          </>}
        >
          <div className="alert alert--warning mb-4">⚠️ This action cannot be undone.</div>
          <div className="form-group">
            <label className="form-label form-label--required">Reason for Revocation</label>
            <textarea className="textarea" placeholder="Please provide the reason..." value={revokeReason} onChange={(e) => setRevokeReason(e.target.value)} rows={4} />
          </div>
        </Modal>
      )}

      {/* Draft Complaints Modal */}
      {draftsOpen && (
        <Modal
          title={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Draft Complaints <span className="badge badge--info">{DRAFTS.length}/{MAX_COMPLAINTS}</span>
            </span>
          }
          onClose={() => setDraftsOpen(false)}
          maxWidth={820}
          footer={<button className="btn btn--default" onClick={() => setDraftsOpen(false)}>Close</button>}
        >
          {autosaveBannerVisible && (
            <div className="draft-autosave-banner mb-4">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span className="draft-autosave-icon">ℹ</span>
                <div style={{ flex: 1 }}>
                  <strong>Auto-Save Enabled</strong>
                  <p style={{ fontSize: 13, marginTop: 4, color: "var(--text-secondary)" }}>
                    Your complaint is automatically saved as a draft every 2 minutes while you're filling the form. You can continue from where you left off anytime.
                  </p>
                </div>
                <button className="modal__close" style={{ fontSize: 18, lineHeight: 1 }} onClick={() => setAutosaveBannerVisible(false)}>×</button>
              </div>
            </div>
          )}
          <div className="table-wrapper" style={{ margin: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Draft ID</th>
                  <th>Subject</th>
                  <th>Respondent</th>
                  <th>Current Step</th>
                  <th>Completion</th>
                  <th>Last Saved</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DRAFTS.map((d) => (
                  <tr key={d.id}>
                    <td><span className="td-mono">{d.id}</span></td>
                    <td style={{ maxWidth: 180 }} title={d.subject}>{d.subjectShort}</td>
                    <td>{d.respondent}</td>
                    <td><span className="badge badge--processing">{d.step}</span></td>
                    <td>
                      <span className={`draft-completion draft-completion--${d.completion >= 70 ? "high" : d.completion >= 40 ? "mid" : "low"}`}>
                        {d.completion}%
                      </span>
                    </td>
                    <td style={{ whiteSpace: "nowrap", fontSize: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        🕐 {d.lastSaved}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn--primary btn--sm" onClick={() => { setDraftsOpen(false); showToast("Resuming draft..."); }}>✏️ Continue</button>
                        <button className="btn btn--outline-danger btn--sm" onClick={() => showToast("Draft deleted", "error")}>🗑 Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {/* Recycle Bin Modal */}
      {recycleBinOpen && (
        <Modal
          title={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              🗑 Recycle Bin <span className="badge badge--error">{recycleBinItems.length} items</span>
            </span>
          }
          onClose={() => setRecycleBinOpen(false)}
          maxWidth={900}
          footer={<>
            <button className="btn btn--outline-danger" onClick={() => { handleEmptyRecycleBin(); }}>Empty Recycle Bin</button>
            <button className="btn btn--default" onClick={() => setRecycleBinOpen(false)}>Close</button>
          </>}
        >
          <div className="recycle-retention-banner mb-4">
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div>
                <strong>Retention Period: 30 Days</strong>
                <p style={{ fontSize: 13, marginTop: 4, color: "var(--text-secondary)" }}>
                  Deleted complaints are kept in the recycle bin for 30 days. After that, they are permanently deleted and cannot be recovered.
                </p>
              </div>
            </div>
          </div>
          {recycleBinItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-secondary)" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🗑</div>
              <p>Recycle bin is empty</p>
            </div>
          ) : (
            <div className="table-wrapper" style={{ margin: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>GRN</th>
                    <th>Subject</th>
                    <th>Respondent</th>
                    <th>Deleted Date</th>
                    <th>Days Left</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recycleBinItems.map((item) => (
                    <tr key={item.grn}>
                      <td><span className="td-mono" style={{ fontSize: 12 }}>{item.grn}</span></td>
                      <td style={{ maxWidth: 180 }} title={item.subject}>{item.subjectShort}</td>
                      <td>{item.respondent}</td>
                      <td>{item.deletedDate}</td>
                      <td>
                        <span className={`recycle-days recycle-days--${item.daysLeft <= 5 ? "urgent" : "normal"}`}>
                          🕐 {item.daysLeft} days
                        </span>
                      </td>
                      <td style={{ fontSize: 13 }}>{item.reason}</td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn--primary btn--sm" onClick={() => handleRestoreItem(item.grn)}>↩ Restore</button>
                          <button className="btn btn--outline-danger btn--sm" onClick={() => handleDeleteForever(item.grn)}>🗑 Delete Forever</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

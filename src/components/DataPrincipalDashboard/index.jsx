import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Drawer from "../shared/Drawer";
import Modal from "../shared/Modal";
import Pagination from "../shared/Pagination";
import { useGrievanceDashboard } from "./hooks/useGrievanceDashboard";
import {
  NOTIFICATIONS,
  MAX_COMPLAINTS,
  MAX_ACTIVE,
  STATUS_TIMELINE_STEPS,
  StatusBadge,
  PriorityTag,
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
            <button className="btn btn--default">💾 Drafts (3)</button>
            <button className="btn btn--default">🗑 Recycle Bin</button>
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
                            👁 View
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

      {/* Grievance Detail Drawer */}
      {drawerOpen && selected && (
        <Drawer
          title="Grievance Details"
          onClose={() => setDrawerOpen(false)}
          footer={<>
            {["submitted", "under-scrutiny", "admitted"].includes(selected.status) && (
              <button className="btn btn--danger" onClick={() => setRevokeOpen(true)}>Revoke Grievance</button>
            )}
            <button className="btn btn--default" onClick={() => setDrawerOpen(false)}>Close</button>
          </>}
        >
              <div className="desc-grid mb-6">
                <div className="desc-item">
                  <div className="desc-label">GRN</div>
                  <div className="desc-value font-mono">{selected.grn}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Status</div>
                  <div className="desc-value"><StatusBadge status={selected.status} /></div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Respondent</div>
                  <div className="desc-value">{selected.respondent}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Priority</div>
                  <div className="desc-value"><PriorityTag priority={selected.priority} /></div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Filed Date</div>
                  <div className="desc-value">{selected.filedDate}</div>
                </div>
                {selected.hearingDate && (
                  <div className="desc-item">
                    <div className="desc-label">Hearing Date</div>
                    <div className="desc-value">{selected.hearingDate} {selected.hearingTime}</div>
                  </div>
                )}
              </div>
              <div className="desc-item mb-6">
                <div className="desc-label">Subject</div>
                <div className="desc-value">{selected.subject}</div>
              </div>

              <h4 className="mb-4">Case Progress</h4>
              <ul className="timeline">
                {["Submitted", "Under Scrutiny", "Admitted", "Hearing Scheduled", "Order Issued"].map(
                  (step, i) => (
                    <li key={i} className="timeline__item">
                      <div
                        className="timeline__dot"
                        style={{
                          background:
                            i <= STATUS_TIMELINE_STEPS.indexOf(selected.status)
                              ? "var(--primary)"
                              : "var(--border-solid)",
                        }}
                      />
                      <div className="timeline__content">
                        <div className="timeline__title">{step}</div>
                      </div>
                    </li>
                  )
                )}
              </ul>
        </Drawer>
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
    </div>
  );
}

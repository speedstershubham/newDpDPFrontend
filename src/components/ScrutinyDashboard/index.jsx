import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Drawer from "../shared/Drawer";
import Modal from "../shared/Modal";
import Pagination from "../shared/Pagination";
import { useScrutinyDashboard } from "./hooks/useScrutinyDashboard";
import {
  PRIORITY_CLASS,
  STATUS_DOT,
  STATUS_LABEL,
  daysLeft,
} from "./helpfunction/constants";
import "./styles/ScrutinyDashboard.css";

export default function ScrutinyDashboard({ user, onLogout }) {
  const {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    actionModal, setActionModal,
    remarks, setRemarks,
    toast,
    handleAction,
    submitAction,
    editOpen, setEditOpen, editForm, setEditForm, openEdit, submitEdit,
    profileOpen, setProfileOpen,
    search, handleSearch,
    activeTab, handleTab,
    groupBy, setGroupBy,
    page, setPage, totalPages, pagedGrievances, filteredGrievances,
  } = useScrutinyDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Scrutiny Dashboard"
          subtitle="Review and process grievance applications"
          actions={<button className="btn btn--default" onClick={() => setProfileOpen(true)}>👤 Profile</button>}
        />

        <div className="stats-row">
          <StatCard icon="⏳" value={18} label="Pending Review" color="var(--warning)" active={activeTab === "pending"} onClick={() => handleTab("pending")} />
          <StatCard icon="🔍" value={12} label="Under Review" color="var(--primary)" active={activeTab === "under"} onClick={() => handleTab("under")} />
          <StatCard icon="❓" value={5} label="Clarification" color="var(--accent)" active={activeTab === "clarification"} onClick={() => handleTab("clarification")} />
          <StatCard icon="✅" value={8} label="Approved Today" color="var(--success)" active={activeTab === "approved"} onClick={() => handleTab("approved")} />
        </div>

        <div className="alert alert--warning mb-6">
          ⚠️ <strong>3 complaints</strong> have deadlines within 48 hours. Please prioritize review.
        </div>

        <div className="card">
          <div className="card__header">
            <span className="card__title">Grievances Pending Scrutiny</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                className="input"
                style={{ width: 220 }}
                placeholder="🔍 Search GRN, subject..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <select className="select" style={{ width: 140 }}
                value={activeTab}
                onChange={(e) => handleTab(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Review</option>
                <option value="under">Under Review</option>
                <option value="clarification">Clarification</option>
                <option value="approved">Approved</option>
              </select>
              <select className="select" style={{ width: 140 }}
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="none">No Grouping</option>
                <option value="priority">Group by Priority</option>
                <option value="scrutinyLevel">Group by Level</option>
                <option value="respondent">Group by Respondent</option>
              </select>
            </div>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th>Respondent</th>
                  <th>Priority</th>
                  <th>Scrutiny Level</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedGrievances.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: "center", padding: 24, color: "var(--text-secondary)" }}>No complaints found.</td></tr>
                ) : pagedGrievances.map((g) => {
                  const dl = daysLeft(g.deadline);
                  return (
                    <tr key={g.key}>
                      <td><span className="td-mono">{g.grn}</span></td>
                      <td style={{ maxWidth: 200 }}>{g.subject}</td>
                      <td>{g.respondent}</td>
                      <td>
                        <span className={`tag tag--${PRIORITY_CLASS[g.priority]}`}>
                          {g.priority.charAt(0).toUpperCase() + g.priority.slice(1)}
                        </span>
                      </td>
                      <td><span className="tag tag--default">{g.scrutinyLevel}</span></td>
                      <td>
                        <span className={`badge badge--${STATUS_DOT[g.status]}`}>
                          {STATUS_LABEL[g.status]}
                        </span>
                      </td>
                      <td className={dl <= 2 ? "deadline-urgent" : "deadline-normal"}>
                        {g.deadline} ({dl}d)
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button
                            className="btn btn--link btn--sm"
                            onClick={() => { setSelected(g); setDrawerOpen(true); }}
                          >
                            Review
                          </button>
                          <button className="btn btn--link btn--sm" onClick={() => openEdit(g)}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} total={filteredGrievances.length} onPage={setPage} />
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {drawerOpen && selected && (
        <Drawer
          title="Scrutiny Review"
          onClose={() => setDrawerOpen(false)}
          footer={<>
            <button className="btn btn--danger" onClick={() => handleAction("rejected")}>✗ Reject</button>
            <button className="btn btn--default" onClick={() => handleAction("clarification-requested")}>❓ Request Clarification</button>
            <button className="btn btn--primary" onClick={() => handleAction("approved")}>✓ Approve &amp; Admit</button>
          </>}
        >
              <div className="desc-grid mb-6">
                <div className="desc-item">
                  <div className="desc-label">GRN</div>
                  <div className="desc-value font-mono">{selected.grn}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Status</div>
                  <div className="desc-value">
                    <span className={`badge badge--${STATUS_DOT[selected.status]}`}>
                      {STATUS_LABEL[selected.status]}
                    </span>
                  </div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Respondent</div>
                  <div className="desc-value">{selected.respondent}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Priority</div>
                  <div className="desc-value">
                    <span className={`tag tag--${PRIORITY_CLASS[selected.priority]}`}>
                      {selected.priority}
                    </span>
                  </div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Assigned To</div>
                  <div className="desc-value">{selected.assignedTo}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Deadline</div>
                  <div className="desc-value">{selected.deadline}</div>
                </div>
              </div>
              <div className="desc-item mb-6">
                <div className="desc-label">Subject</div>
                <div className="desc-value">{selected.subject}</div>
              </div>
              <div className="form-group">
                <label className="form-label form-label--required">Remarks / Observations</label>
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="Enter your scrutiny remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
        </Drawer>
      )}

      {/* Edit Complaint Modal */}
      {editOpen && editForm && (
        <Modal title={`Edit Complaint — ${editForm.grn}`} onClose={() => setEditOpen(false)} maxWidth={600}
          footer={<><button className="btn btn--default" onClick={() => setEditOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={submitEdit}>💾 Save Changes</button></>}
        >
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="input"
                  value={editForm.subject || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, subject: e.target.value }))}
                />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="select"
                    value={editForm.priority || ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, priority: e.target.value }))}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Scrutiny Level</label>
                  <select
                    className="select"
                    value={editForm.scrutinyLevel || ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, scrutinyLevel: e.target.value }))}
                  >
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Assigned To</label>
                <input
                  className="input"
                  value={editForm.assignedTo || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, assignedTo: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="input"
                  value={editForm.deadline || ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, deadline: e.target.value }))}
                />
              </div>
        </Modal>
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <Modal title="My Profile" onClose={() => setProfileOpen(false)} maxWidth={460}
          footer={<button className="btn btn--default" onClick={() => setProfileOpen(false)}>Close</button>}
        >

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>👤</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Scrutiny Officer</div>
            <div className="text-muted">scrutiny@dpb.gov.in</div>
          </div>
          <div className="desc-grid">
            <div className="desc-item"><div className="desc-label">Role</div><div className="desc-value">Scrutiny Worker (SW)</div></div>
            <div className="desc-item"><div className="desc-label">Employee ID</div><div className="desc-value">DPB/SW/2024/007</div></div>
            <div className="desc-item"><div className="desc-label">Designation</div><div className="desc-value">Senior Scrutiny Officer</div></div>
            <div className="desc-item"><div className="desc-label">Department</div><div className="desc-value">Grievance Processing Cell</div></div>
            <div className="desc-item"><div className="desc-label">Joined</div><div className="desc-value">01 Jan 2024</div></div>
            <div className="desc-item"><div className="desc-label">Cases Resolved</div><div className="desc-value">142</div></div>
          </div>
        </Modal>
      )}

      {/* Action Confirmation Modal */}
      {actionModal.open && (
        <Modal title="Confirm Action" onClose={() => setActionModal({ open: false, action: "" })}
          footer={<><button className="btn btn--default" onClick={() => setActionModal({ open: false, action: "" })}>Cancel</button><button className="btn btn--primary" onClick={submitAction}>Confirm</button></>}
        >
          <p>Are you sure you want to <strong>{actionModal.action}</strong> this grievance?</p>
        </Modal>
      )}
    </div>
  );
}

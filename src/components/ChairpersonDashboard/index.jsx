import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Drawer from "../shared/Drawer";
import Modal from "../shared/Modal";
import Pagination from "../shared/Pagination";
import { useChairpersonDashboard } from "./hooks/useChairpersonDashboard";
import { BENCH_MEMBERS, REC_CLASS } from "./helpfunction/constants";
import "./styles/ChairpersonDashboard.css";

export default function ChairpersonDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [delegationOpen, setDelegationOpen] = useState(false);
  const [reviewTab, setReviewTab] = useState("details");
  const [benchSearch, setBenchSearch] = useState("");
  const [selectedBench, setSelectedBench] = useState([]);
  const [benchOpen, setBenchOpen] = useState(false);
  const [timelineSubTab, setTimelineSubTab] = useState("visual");

  // Action modals
  const [admitOpen, setAdmitOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [admitTemplate, setAdmitTemplate] = useState("");
  const [admitInstructions, setAdmitInstructions] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [rejectBasis, setRejectBasis] = useState("");
  const {
    selected,
    setSelected,
    drawerOpen,
    setDrawerOpen,
    noticeOpen,
    setNoticeOpen,
    toast,
    showToast,
    profileOpen,
    setProfileOpen,
    search,
    handleSearch,
    page,
    setPage,
    totalPages,
    pagedReports,
    filteredReports,
  } = useChairpersonDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Chairperson Dashboard"
          subtitle="Review scrutiny reports and make adjudication decisions"
          actions={
            <>
              <select className="select" style={{ width: 130 }}>
                <option>This Week</option>
                <option>Today</option>
                <option>This Month</option>
                <option>Custom</option>
              </select>
              <button
                className="btn btn--default"
                onClick={() => navigate("/chairperson/profile")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </button>
            </>
          }
        />

        {/* ── Stats row ── */}
        <div className="cd-stats-row">
          {[
            {
              label: "Active Complaints",
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
              value: 45,
              sub: "↑ 12% from last week",
            },
            {
              label: "Notices Sent",
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              ),
              value: 28,
              sub: "↑ 8% from last week",
            },
            {
              label: "Pending Orders",
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              value: 12,
              sub: "↓ 15% from last week",
            },
            {
              label: "Timeline Breaches",
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ),
              value: 3,
              sub: "— No change",
            },
            {
              label: "Today's Hearings",
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ),
              value: 6,
              sub: "2 completed",
            },
            {
              label: "Resolution Rate",
              icon: (
                <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>
                  %
                </span>
              ),
              value: "87 %",
              sub: "↑ 5% from last month",
            },
          ].map((s, i) => (
            <div key={i} className="cd-stat-card">
              <div className="cd-stat-card__label">{s.label}</div>
              <div className="cd-stat-card__value">
                {s.icon}
                {s.value}
              </div>
              <div className="cd-stat-card__sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Alert banner ── */}
        {!alertDismissed && (
          <div className="cd-info-alert">
            <span className="cd-info-alert__icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <span className="cd-info-alert__text">
              2 scrutiny reports awaiting your decision
            </span>
            <button
              className="cd-info-alert__close"
              onClick={() => setAlertDismissed(true)}
            >
              ×
            </button>
          </div>
        )}

        {/* ── Pending Scrutiny Reports table ── */}
        <div className="card mb-6">
          <div className="card__header">
            <span className="card__title">Pending Scrutiny Reports</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                className="cd-tbl-btn"
                onClick={() => setWorkflowOpen(true)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Configure Workflow
              </button>
              <button
                className="cd-tbl-btn"
                onClick={() => setDelegationOpen(true)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Manage Delegation
              </button>
            </div>
          </div>
          <div
            className="table-wrapper"
            style={{ borderRadius: 0, border: "none" }}
          >
            <table>
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th>Scrutiny Level</th>
                  <th>Recommendation</th>
                  <th>Received Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: 24,
                        color: "var(--text-secondary)",
                      }}
                    >
                      No records found.
                    </td>
                  </tr>
                ) : (
                  pagedReports.map((r) => (
                    <tr key={r.key}>
                      <td>
                        <span className="td-mono">{r.grn}</span>
                      </td>
                      <td style={{ maxWidth: 240 }}>{r.subject}</td>
                      <td>
                        <span className="tag tag--blue">{r.scrutinyLevel}</span>
                      </td>
                      <td>
                        <span className="cd-rec-green">{r.recommendation}</span>
                      </td>
                      <td>{r.receivedDate}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                          }}
                        >
                          <button
                            className="cd-action-link"
                            onClick={() => {
                              setSelected(r);
                              setDrawerOpen(true);
                            }}
                          >
                            Review
                          </button>
                          <button
                            className="cd-action-send"
                            onClick={() => {
                              setSelected(r);
                              setNoticeOpen(true);
                            }}
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            Send Notice
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={filteredReports.length}
              onPage={setPage}
            />
          </div>
        </div>

        {/* ── Quick Actions card ── */}
        <div className="card mb-6">
          <div className="card__header">
            <span className="card__title">Quick Actions</span>
          </div>
          <div
            className="card__body"
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <button className="btn btn--primary btn--lg">
              📨 Issue Notice
            </button>
            <button className="btn btn--default btn--lg">
              📄 View Respondent Replies
            </button>
            <button className="btn btn--default btn--lg">
              👥 Assign Bench
            </button>
          </div>
        </div>
      </div>

      {/* ── Configure Workflow Modal ── */}
      {workflowOpen && (
        <Modal
          title="Workflow Configuration"
          onClose={() => setWorkflowOpen(false)}
          maxWidth={520}
          footer={
            <>
              <button
                className="btn btn--default"
                onClick={() => setWorkflowOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  showToast("Workflow configuration saved");
                  setWorkflowOpen(false);
                }}
              >
                Save Configuration
              </button>
            </>
          }
        >
          <div className="cd-modal-info-banner">
            ℹ️ Configure multi-level scrutiny workflow — define how many
            scrutiny levels are required and assignment rules.
          </div>
          <div className="form-group">
            <label className="form-label">Number of Scrutiny Levels</label>
            <select className="select">
              <option>1 Level</option>
              <option>2 Levels</option>
              <option selected>3 Levels</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Auto-assignment Rule</label>
            <select className="select">
              <option selected>Round Robin</option>
              <option>Least Workload</option>
              <option>By Expertise</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Escalation Threshold (Days)</label>
            <input className="input" type="number" defaultValue={7} />
          </div>
        </Modal>
      )}

      {/* ── Manage Delegation Modal ── */}
      {delegationOpen && (
        <Modal
          title="Manage Delegation"
          onClose={() => setDelegationOpen(false)}
          maxWidth={520}
          footer={
            <>
              <button
                className="btn btn--default"
                onClick={() => setDelegationOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  showToast("Delegation settings saved");
                  setDelegationOpen(false);
                }}
              >
                Save Configuration
              </button>
            </>
          }
        >
          <div className="cd-modal-info-banner">
            ℹ️ Configure which functions can be delegated to other officials.
          </div>
          <div className="form-group">
            <label className="form-label">Notice Issuance</label>
            <select className="select">
              <option selected>Chairperson Only</option>
              <option>Delegate to Registry</option>
              <option>Delegate to Senior Member</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Bench Assignment</label>
            <select className="select">
              <option selected>Chairperson Only</option>
              <option>Delegate to Registry</option>
            </select>
          </div>
        </Modal>
      )}

      {/* ── Review Drawer ── */}
      {drawerOpen && selected && (
        <Drawer
          title="Review Scrutiny Report"
          className="cp-review-drawer"
          closePosition="left"
          onClose={() => {
            setDrawerOpen(false);
            setReviewTab("details");
            setBenchSearch("");
            setSelectedBench([]);
            setBenchOpen(false);
            setTimelineSubTab("visual");
          }}
          footer={
            <div className="rv-footer">
              <button
                className="rv-footer-btn rv-footer-btn--admit"
                onClick={() => setAdmitOpen(true)}
              >
                <span className="rv-footer-btn__icon rv-footer-btn__icon--green">
                  ✓
                </span>
                Admit for Hearing
              </button>
              <button
                className="rv-footer-btn rv-footer-btn--return"
                onClick={() => setReturnOpen(true)}
              >
                <span className="rv-footer-btn__icon rv-footer-btn__icon--dark">
                  ↺
                </span>
                Return for Re-Scrutiny
              </button>
              <button
                className="rv-footer-btn rv-footer-btn--reject"
                onClick={() => setRejectOpen(true)}
              >
                <span className="rv-footer-btn__icon rv-footer-btn__icon--red">
                  ✕
                </span>
                Reject with Order
              </button>
            </div>
          }
        >
          {/* Tabs */}
          <div className="cp-rv-tabs">
            <button
              className={`cp-rv-tab${reviewTab === "details" ? " cp-rv-tab--active" : ""}`}
              onClick={() => setReviewTab("details")}
              type="button"
            >
              <span className="cp-rv-tab__icon">📄</span> Details
            </button>
            <button
              className={`cp-rv-tab${reviewTab === "timeline" ? " cp-rv-tab--active" : ""}`}
              onClick={() => setReviewTab("timeline")}
              type="button"
            >
              <span className="cp-rv-tab__icon">🕒</span> Timeline
            </button>
          </div>

          {reviewTab === "details" && (
            <div className="cp-rv-body">
              <div className="cp-section-card">
                <div className="cp-section-card__header">Basic Information</div>
                <div className="cp-section-card__body">
                  <table className="rv-table cp-rv-table">
                    <tbody>
                      <tr>
                        <td>GRN</td>
                        <td>
                          <span className="td-mono">{selected.grn}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Subject</td>
                        <td>{selected.subject}</td>
                      </tr>
                      <tr>
                        <td>Scrutiny Level</td>
                        <td>{selected.scrutinyLevel}</td>
                      </tr>
                      <tr>
                        <td>Received Date</td>
                        <td>{selected.receivedDate}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          <span className="rv-status-dot" /> Pending Decision
                        </td>
                      </tr>
                      <tr>
                        <td>Recommendation</td>
                        <td>
                          <span
                            className={`tag tag--${REC_CLASS[selected.recommendation] || "default"}`}
                          >
                            {selected.recommendation}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">
                  Data Principal (Complainant)
                </div>
                <div className="cp-section-card__body">
                  <table className="rv-table cp-rv-table">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>Ramesh Kumar</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>ramesh.kumar@example.com</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>+91 98765 43210</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>123, MG Road, Bangalore, Karnataka - 560001</td>
                      </tr>
                      <tr>
                        <td>Verification Status</td>
                        <td>
                          <span className="tag tag--green">
                            Verified via DigiLocker
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">
                  Respondent Details
                </div>
                <div className="cp-section-card__body">
                  <table className="rv-table cp-rv-table">
                    <tbody>
                      <tr>
                        <td>Organization</td>
                        <td>
                          {selected.respondent || "TechHub Solutions Pvt Ltd"}
                        </td>
                      </tr>
                      <tr>
                        <td>Registration</td>
                        <td>CIN: U72900KA2015PTC082345</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>legal@techhub.com</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>+91 80 4567 8900</td>
                      </tr>
                      <tr>
                        <td>Data Fiduciary Status</td>
                        <td>
                          <span className="tag tag--blue">
                            Registered Data Fiduciary
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Complaints Against</td>
                        <td>
                          <span style={{ color: "#ff4d4f", fontWeight: 700 }}>
                            8 active complaints
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Previous Orders</td>
                        <td>3 orders issued (2 penalties, 1 warning)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">Complaint Summary</div>
                <div className="cp-section-card__body">
                  <p className="cp-summary-para">
                    The data principal alleges that the respondent organization
                    has been sharing personal information with third-party
                    marketing companies without explicit consent. Multiple
                    instances of unauthorized promotional communications have
                    been received.
                  </p>
                  <p className="cp-summary-para">
                    <strong>Relief Sought:</strong> Immediate cessation of data
                    sharing, deletion of data from third parties, compensation
                    of ₹50,000 for mental harassment and privacy violation.
                  </p>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">Scrutiny Summary</div>
                <div className="cp-section-card__body">
                  <p className="cp-summary-para">
                    The grievance has been thoroughly reviewed at all scrutiny
                    levels. The case involves alleged unauthorized data sharing
                    practices by the respondent organization. All documentary
                    evidence has been verified and authenticated. The scrutiny
                    wing recommends admission for formal hearing.
                  </p>
                  <div className="cp-info-box">
                    <span className="cp-info-box__icon">i</span>
                    <span>
                      All three scrutiny levels recommend admission. Prima facie
                      evidence of consent violation established.
                    </span>
                  </div>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">Legal Provisions</div>
                <div className="cp-section-card__body">
                  <div className="cp-legal-row">
                    <span className="rv-tag-red">
                      Section 6 - DPDP Act 2023
                    </span>
                    <span className="cp-legal-row__desc">
                      Obligations of Data Fiduciary
                    </span>
                  </div>
                  <div className="cp-legal-row">
                    <span className="rv-tag-orange">
                      Section 8 - DPDP Act 2023
                    </span>
                    <span className="cp-legal-row__desc">
                      Purpose and Collection Limitation
                    </span>
                  </div>
                </div>
              </div>

              <div className="cp-section-card">
                <div className="cp-section-card__header">
                  Assign Bench Composition
                </div>
                <div className="cp-section-card__body">
                  <div className="cp-info-box">
                    <span className="cp-info-box__icon">i</span>
                    <span>
                      Select bench members to constitute the panel for this case
                    </span>
                  </div>

                  <div className="cp-rv__label">Select Bench Members</div>
                  <div className="rv-bench-combo">
                    {/* Dropdown list — shown above the input when open */}
                    {benchOpen && (
                      <div className="rv-bench-combo__list">
                        {BENCH_MEMBERS.filter(
                          (m) =>
                            m.name
                              .toLowerCase()
                              .includes(benchSearch.toLowerCase()) &&
                            !selectedBench.find((s) => s.id === m.id),
                        ).map((m) => (
                          <div
                            key={m.id}
                            className="rv-bench-combo__option"
                            onMouseDown={(e) => {
                              e.preventDefault(); // keep input focused
                              setSelectedBench((p) => [...p, m]);
                              setBenchSearch("");
                            }}
                          >
                            {m.name} ({m.role}) — {m.cases} cases
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Search input */}
                    <div
                      className={`rv-bench-combo__input-wrap${benchOpen ? " rv-bench-combo__input-wrap--open" : ""}`}
                    >
                      <input
                        className="rv-bench-combo__input"
                        placeholder="Search and select bench members"
                        value={benchSearch}
                        onChange={(e) => setBenchSearch(e.target.value)}
                        onFocus={() => setBenchOpen(true)}
                        onBlur={() => setBenchOpen(false)}
                      />
                      <span className="rv-bench-combo__icon">🔍</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reviewTab === "timeline" && (
            <div className="tl-panel">
              {/* Sub-tabs */}
              <div className="tl-subtabs">
                <button
                  type="button"
                  className={`tl-subtab${timelineSubTab === "visual" ? " tl-subtab--active" : ""}`}
                  onClick={() => setTimelineSubTab("visual")}
                >
                  <svg
                    className="tl-subtab__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Visual Timeline
                </button>
                <button
                  type="button"
                  className={`tl-subtab${timelineSubTab === "history" ? " tl-subtab--active" : ""}`}
                  onClick={() => setTimelineSubTab("history")}
                >
                  <svg
                    className="tl-subtab__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Detailed History
                </button>
                <button
                  type="button"
                  className={`tl-subtab${timelineSubTab === "status" ? " tl-subtab--active" : ""}`}
                  onClick={() => setTimelineSubTab("status")}
                >
                  <svg
                    className="tl-subtab__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Current Status
                </button>
              </div>

              {/* ── Visual Timeline ── */}
              {timelineSubTab === "visual" && (
                <ul className="tl-list">
                  {[
                    {
                      title: "Filed",
                      date: "2026-04-28 10:30 AM",
                      by: "Data Principal",
                      status: "done",
                    },
                    {
                      title: "Acknowledged",
                      date: "2026-04-28 10:35 AM",
                      by: "System",
                      status: "done",
                    },
                    {
                      title: "Assigned",
                      date: "2026-04-28 11:00 AM",
                      by: "Registry",
                      status: "done",
                    },
                    {
                      title: "Notice Sent",
                      date: "2026-04-29 10:00 AM",
                      by: "Registry",
                      status: "done",
                    },
                    {
                      title: "Hearing Scheduled",
                      date: "2026-05-05 10:30 AM",
                      by: "Registry",
                      status: "active",
                    },
                    {
                      title: "Order Issued",
                      date: null,
                      by: null,
                      status: "pending",
                    },
                  ].map((ev, i, arr) => (
                    <li key={i} className="tl-item">
                      <div className="tl-icon-col">
                        <div className={`tl-icon tl-icon--${ev.status}`}>
                          {ev.status === "done" ? (
                            <span className="tl-check">&#10003;</span>
                          ) : ev.status === "active" ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="16"
                              height="16"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          ) : (
                            <span>{i + 1}</span>
                          )}
                        </div>
                        {i < arr.length - 1 && <div className="tl-connector" />}
                      </div>
                      <div className="tl-content">
                        <div
                          className={`tl-title${ev.status === "pending" ? " tl-title--muted" : ""}`}
                        >
                          {ev.title}
                        </div>
                        {ev.date ? (
                          <>
                            <div className="tl-meta">{ev.date}</div>
                            <div className="tl-meta">By: {ev.by}</div>
                          </>
                        ) : (
                          <div className="tl-meta tl-meta--muted">Pending</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* ── Detailed History ── */}
              {timelineSubTab === "history" && (
                <ul className="tl-hist-list">
                  {[
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      ),
                      title: "Grievance Submitted",
                      desc: "Application filed via online portal",
                      by: "Ramesh Kumar (Data Principal)",
                      date: "2026-04-28 10:30 AM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      ),
                      title: "GRN Assigned",
                      desc: "Grievance Reference Number: GRN/2026/DPB/001245",
                      by: "System",
                      date: "2026-04-28 10:35 AM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      ),
                      title: "Assigned to Scrutiny",
                      desc: "Assigned to Scrutiny Level 1 - Priya Sharma",
                      by: "Registry System",
                      date: "2026-04-28 11:00 AM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      ),
                      title: "Documents Verified",
                      desc: "All documents passed virus scan and format validation",
                      by: "System",
                      date: "2026-04-28 14:15 PM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      ),
                      title: "Document Received at Registry",
                      desc: "Physical documents received and digitized",
                      by: "Registry Officer - Amit Singh",
                      date: "2026-04-28 14:00 PM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      ),
                      title: "Registered",
                      desc: "Complaint officially registered in Registry books",
                      by: "Senior Registry Officer",
                      date: "2026-04-28 14:30 PM",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="16"
                          height="16"
                        >
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                      ),
                      title: "Notice Sent to Respondent",
                      desc: "Notice to respond sent via SMTP and registered post",
                      by: "Registry",
                      date: "2026-04-29 10:00 AM",
                    },
                  ].map((ev, i) => (
                    <li key={i} className="tl-hist-item">
                      <div className="tl-hist-icon">{ev.icon}</div>
                      <div className="tl-hist-body">
                        <div className="tl-hist-title">{ev.title}</div>
                        <div className="tl-hist-desc">{ev.desc}</div>
                        <div className="tl-hist-meta">
                          <svg
                            className="tl-hist-person-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="13"
                            height="13"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {ev.by} &bull; {ev.date}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* ── Current Status ── */}
              {timelineSubTab === "status" && (
                <div className="tl-status">
                  <div className="tl-status__card">
                    <div className="tl-status__heading">Current Stage</div>
                    <div className="tl-status__badge">Hearing Scheduled</div>
                    <div className="tl-status__row">
                      <div className="tl-status__label">Next Action:</div>
                      <div className="tl-status__val">
                        Attend hearing on 05 May 2026 at 10:30 AM via Bharat VC
                      </div>
                    </div>
                    <div className="tl-status__row">
                      <div className="tl-status__label">Responsible Party:</div>
                      <div className="tl-status__val">Registry</div>
                    </div>
                    <div className="tl-status__row">
                      <div className="tl-status__label">Expected Timeline:</div>
                      <div className="tl-status__val">
                        Order expected within 15 days of final hearing
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Drawer>
      )}

      {/* ── Send Notice Modal ── */}
      {noticeOpen && selected && (
        <Modal
          title="Send Notice"
          onClose={() => setNoticeOpen(false)}
          footer={
            <>
              <button
                className="btn btn--default"
                onClick={() => setNoticeOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  showToast("Notice sent successfully");
                  setNoticeOpen(false);
                }}
              >
                📨 Send Notice
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Notice Type</label>
            <select className="select">
              <option>Admission Notice</option>
              <option>Hearing Notice</option>
              <option>Clarification Notice</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Recipient</label>
            <select className="select">
              <option>Both Parties</option>
              <option>Data Principal</option>
              <option>Respondent</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notice Content</label>
            <textarea
              className="textarea"
              rows={5}
              placeholder="Enter notice content..."
            />
          </div>
        </Modal>
      )}

      {/* ── Admit for Hearing Modal ── */}
      {admitOpen && (
        <Modal
          title="Admit for Hearing"
          onClose={() => setAdmitOpen(false)}
          maxWidth={480}
          footer={
            <div className="action-modal__footer">
              <button
                className="action-modal__btn action-modal__btn--cancel"
                onClick={() => setAdmitOpen(false)}
              >
                Cancel
              </button>
              <button
                className="action-modal__btn action-modal__btn--submit"
                onClick={() => {
                  setAdmitOpen(false);
                  setDrawerOpen(false);
                  setAdmitTemplate("");
                  setAdmitInstructions("");
                  showToast("Grievance admitted for hearing");
                }}
              >
                Submit
              </button>
            </div>
          }
        >
          <div className="action-modal__body">
            <div className="action-modal__field">
              <label className="action-modal__label">
                Select Notice Template
              </label>
              <div className="action-modal__select-wrap">
                <select
                  className="action-modal__select"
                  value={admitTemplate}
                  onChange={(e) => setAdmitTemplate(e.target.value)}
                >
                  <option value="">Choose template</option>
                  <option value="standard">Standard Hearing Notice</option>
                  <option value="urgent">Urgent Hearing Notice</option>
                  <option value="summon">Summon to Appear</option>
                </select>
                <span className="action-modal__chevron">▾</span>
              </div>
            </div>
            <div className="action-modal__field">
              <label className="action-modal__label">
                Additional Instructions
              </label>
              <textarea
                className="action-modal__textarea"
                rows={5}
                placeholder="Any specific instructions for the hearing..."
                value={admitInstructions}
                onChange={(e) => setAdmitInstructions(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* ── Return for Re-Scrutiny Modal ── */}
      {returnOpen && (
        <Modal
          title="Return for Re-Scrutiny"
          onClose={() => setReturnOpen(false)}
          maxWidth={480}
          footer={
            <div className="action-modal__footer">
              <button
                className="action-modal__btn action-modal__btn--cancel"
                onClick={() => setReturnOpen(false)}
              >
                Cancel
              </button>
              <button
                className="action-modal__btn action-modal__btn--submit"
                onClick={() => {
                  setReturnOpen(false);
                  setDrawerOpen(false);
                  showToast("Returned for re-scrutiny");
                }}
              >
                Submit
              </button>
            </div>
          }
        >
          <div className="action-modal__body" />
        </Modal>
      )}

      {/* ── Reject Grievance Modal ── */}
      {rejectOpen && (
        <Modal
          title="Reject Grievance"
          onClose={() => setRejectOpen(false)}
          maxWidth={480}
          footer={
            <div className="action-modal__footer">
              <button
                className="action-modal__btn action-modal__btn--cancel"
                onClick={() => setRejectOpen(false)}
              >
                Cancel
              </button>
              <button
                className="action-modal__btn action-modal__btn--submit"
                onClick={() => {
                  setRejectOpen(false);
                  setDrawerOpen(false);
                  setRejectReason("");
                  setRejectBasis("");
                  showToast("Grievance rejected with order");
                }}
              >
                Submit
              </button>
            </div>
          }
        >
          <div className="action-modal__body">
            <div className="action-modal__field">
              <label className="action-modal__label">
                <span className="action-modal__required">*</span> Reason for
                Rejection
              </label>
              <textarea
                className="action-modal__textarea"
                rows={5}
                placeholder="Provide detailed reasons for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div className="action-modal__field">
              <label className="action-modal__label">Legal Basis</label>
              <div className="action-modal__select-wrap">
                <select
                  className="action-modal__select"
                  value={rejectBasis}
                  onChange={(e) => setRejectBasis(e.target.value)}
                >
                  <option value="">Select relevant section</option>
                  <option value="s6">
                    Section 6 – Obligations of Data Fiduciary
                  </option>
                  <option value="s8">
                    Section 8 – Purpose and Collection Limitation
                  </option>
                  <option value="s9">Section 9 – Data Retention</option>
                  <option value="s11">Section 11 – Grievance Redressal</option>
                </select>
                <span className="action-modal__chevron">▾</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

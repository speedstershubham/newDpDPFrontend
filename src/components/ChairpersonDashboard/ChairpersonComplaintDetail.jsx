import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import { REPORTS, BENCH_MEMBERS } from "./helpfunction/constants";
import "./styles/ChairpersonComplaintDetail.css";

/* ---- Icons ---- */
function IconChevronDown({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconChevronUp({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
function IconExpand() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}
function IconCollapse() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="10" y1="14" x2="3" y2="21" />
      <line x1="21" y1="3" x2="14" y2="10" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function IconPdf() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e53e3e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconInbox() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c0c0c0"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}
function IconDragHandle() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="9" cy="7" r="1" fill="#9ca3af" />
      <circle cx="15" cy="7" r="1" fill="#9ca3af" />
      <circle cx="9" cy="12" r="1" fill="#9ca3af" />
      <circle cx="15" cy="12" r="1" fill="#9ca3af" />
      <circle cx="9" cy="17" r="1" fill="#9ca3af" />
      <circle cx="15" cy="17" r="1" fill="#9ca3af" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}

const TIMELINE = [
  {
    id: 1,
    icon: "document",
    color: "#0d9488",
    title: "Complaint Submitted",
    time: "10:26 AM",
    date: "08/05/2026",
    by: "Prateek Vats",
    role: "Data Principal",
    attachment: "incident_DP1631230526_complaint_signed.pdf",
  },
  {
    id: 2,
    icon: "chat",
    color: "#f97316",
    title: "Proposed for Rejection",
    time: "10:55 AM",
    date: "08/05/2026",
    by: "sw one",
    role: "Scrutiny Wing",
    remarks: "dfd",
  },
  {
    id: 3,
    icon: "dot",
    color: "#1a3562",
    title: "Take Action",
    isPending: true,
  },
];

const ACTION_OPTIONS = [
  { value: "send-notice", label: "Send notice to Data Fiduciary" },
  { value: "reject", label: "Reject Complaint" },
  { value: "re-scrutiny", label: "Send back for Re-scrutiny" },
];

const REJECTION_REASONS = [
  { value: "jurisdiction", label: "Lack of Jurisdiction" },
  { value: "grounds", label: "Insufficient grounds" },
  { value: "evidence", label: "Lack of evidence" },
  { value: "others", label: "Others" },
];

const SUMMON_DEFAULT =
  "Dear Data Fiduciary,\n\nThis is to bring to your notice that a complaint has been filed against your organization under the Digital Personal Data Protection Act, 2023. Please find the attached case details.You are required to submit your response within 30 days. Once your response is received, the case will be scheduled for a hearing. If you do not respond within the given timeframe, the hearing will proceed, but you will not be able to defend your case.Kindly ensure you file your response within the stipulated timeframe.\n\nRegards,\nData Protection Board of India";

/* ---- Timeline event icon ---- */
function TimelineIcon({ type, color }) {
  if (type === "document") {
    return (
      <span className="cd-timeline-icon" style={{ background: color }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      </span>
    );
  }
  if (type === "chat") {
    return (
      <span className="cd-timeline-icon" style={{ background: color }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </span>
    );
  }
  return <span className="cd-timeline-dot" style={{ background: color }} />;
}

/* ---- Controlled Action Select ---- */
function ActionSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOpt = ACTION_OPTIONS.find((o) => o.value === value);

  return (
    <div className="cd-action-dropdown" ref={ref}>
      <button
        className={`cd-select-trigger${open ? " cd-select-trigger--open" : ""}`}
        onClick={() => setOpen((p) => !p)}
      >
        <span
          style={{ color: selectedOpt ? "var(--text-primary)" : undefined }}
        >
          {selectedOpt?.label || "Select"}
        </span>
        <IconChevronDown />
      </button>
      {open && (
        <div className="cd-action-menu">
          {ACTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className="cd-action-option"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Assign Bench Modal ---- */
function AssignBenchModal({ onClose, onSubmit }) {
  const allMembers = BENCH_MEMBERS.map((m) => ({ id: m.id, name: m.name }));
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");
  const [leftList, setLeftList] = useState(allMembers);
  const [rightList, setRightList] = useState([]);
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  const toggleLeft = (id) =>
    setLeftSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );
  const toggleRight = (id) =>
    setRightSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const moveRight = () => {
    const moving = leftList.filter((m) => leftSelected.includes(m.id));
    setRightList((p) => [...p, ...moving]);
    setLeftList((p) => p.filter((m) => !leftSelected.includes(m.id)));
    setLeftSelected([]);
  };
  const moveLeft = () => {
    const moving = rightList.filter((m) => rightSelected.includes(m.id));
    setLeftList((p) => [...p, ...moving]);
    setRightList((p) => p.filter((m) => !rightSelected.includes(m.id)));
    setRightSelected([]);
  };

  const filteredLeft = leftList.filter((m) =>
    m.name.toLowerCase().includes(leftSearch.toLowerCase()),
  );
  const filteredRight = rightList.filter((m) =>
    m.name.toLowerCase().includes(rightSearch.toLowerCase()),
  );

  return (
    <div className="cd-modal-overlay">
      <div className="cd-assign-modal">
        <div className="cd-assign-header">
          <span className="cd-assign-title">Assign Bench</span>
          <button className="cd-assign-close" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <div className="cd-assign-desc">
          Select officers and move them to the right panel via drag-and-drop or
          the arrow buttons. The topmost officer in the selected group becomes
          the presiding officer - drag to reorder if needed.
        </div>
        <div className="cd-assign-body">
          {/* Left panel */}
          <div className="cd-bench-panel">
            <div className="cd-bench-panel-label">Bench Members</div>
            <input
              className="cd-bench-search"
              placeholder="Search"
              value={leftSearch}
              onChange={(e) => setLeftSearch(e.target.value)}
            />
            <div className="cd-bench-list">
              {filteredLeft.length === 0 ? (
                <div className="cd-bench-empty">
                  <IconInbox />
                  <span>No data</span>
                </div>
              ) : (
                filteredLeft.map((m) => (
                  <div
                    key={m.id}
                    className={`cd-bench-item${leftSelected.includes(m.id) ? " cd-bench-item--selected" : ""}`}
                    onClick={() => toggleLeft(m.id)}
                  >
                    <IconDragHandle />
                    <span className="cd-bench-item-name">{m.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Transfer arrows */}
          <div className="cd-bench-arrows">
            <button
              className="cd-bench-arrow-btn"
              onClick={moveRight}
              disabled={leftSelected.length === 0}
              title="Move to selected"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="10 8 14 12 10 16" />
              </svg>
            </button>
            <button
              className="cd-bench-arrow-btn"
              onClick={moveLeft}
              disabled={rightSelected.length === 0}
              title="Move back"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="14 8 10 12 14 16" />
              </svg>
            </button>
          </div>

          {/* Right panel */}
          <div className="cd-bench-panel">
            <div className="cd-bench-panel-label">Selected for Hearing</div>
            <input
              className="cd-bench-search"
              placeholder="Search"
              value={rightSearch}
              onChange={(e) => setRightSearch(e.target.value)}
            />
            <div className="cd-bench-list">
              {filteredRight.length === 0 ? (
                <div className="cd-bench-empty">
                  <IconInbox />
                  <span>No data</span>
                </div>
              ) : (
                filteredRight.map((m) => (
                  <div
                    key={m.id}
                    className={`cd-bench-item${rightSelected.includes(m.id) ? " cd-bench-item--selected" : ""}`}
                    onClick={() => toggleRight(m.id)}
                  >
                    <IconDragHandle />
                    <span className="cd-bench-item-name">{m.name} (1)</span>
                    <span className="cd-bench-item-action">
                      <IconSettings />
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="cd-assign-footer">
          <button className="cd-assign-footer-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="cd-assign-footer-btn cd-assign-footer-btn--submit"
            onClick={() => onSubmit(rightList)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---- Main Page ---- */
export default function ChairpersonComplaintDetail({ user, onLogout }) {
  const { grn } = useParams();
  const navigate = useNavigate();
  const report =
    REPORTS.find((r) => r.grn === decodeURIComponent(grn)) || REPORTS[0];

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [insightsExpanded, setInsightsExpanded] = useState(true);
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [allExpanded, setAllExpanded] = useState(true);
  const [assignBenchOpen, setAssignBenchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Take Action form state
  const [selectedAction, setSelectedAction] = useState(null);
  const [summonText, setSummonText] = useState(SUMMON_DEFAULT);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionText, setRejectionText] = useState("");
  const [rescrutinyText, setRescrutinyText] = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSummonSubmit = () => setAssignBenchOpen(true);

  const handleRejectSubmit = () => {
    showToast("Complaint rejected successfully");
    setTimeout(() => navigate("/chairperson"), 1800);
  };

  const handleRescrutinySubmit = () => {
    showToast("Complaint sent back for re-scrutiny");
    setTimeout(() => navigate("/chairperson"), 1800);
  };

  const handleAssignSubmit = (members) => {
    setAssignBenchOpen(false);
    showToast(
      `Bench assigned with ${members.length} member(s). Notice sent to Data Fiduciary.`,
    );
    setTimeout(() => navigate("/chairperson"), 1800);
  };

  const caseId = report.grn.replace("GRN/2026/DPB/", "DP") + "0526";

  return (
    <div className="layout">
      <ToastNotification message={toast?.msg} type={toast?.type} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content cd-page">
        {/* Breadcrumb */}
        <div className="cd-breadcrumb">
          <span
            className="cd-breadcrumb-link"
            onClick={() => navigate("/chairperson")}
          >
            Home
          </span>
          <span className="cd-breadcrumb-sep">&gt;</span>
          <span className="cd-breadcrumb-current">Complaint History</span>
        </div>

        {/* Page title row */}
        <div className="cd-title-row">
          <h1 className="cd-case-id">{caseId}</h1>
          <span className="cd-status-badge">Assigned To Chairman</span>
        </div>

        <div className={`cd-body${sidebarOpen ? "" : " cd-body--collapsed"}`}>
          {/* ---- LEFT SIDEBAR ---- */}
          <div className="cd-sidebar">
            {/* Insights section */}
            <div className="cd-sidebar-section">
              <div
                className="cd-sidebar-section-header"
                onClick={() => setInsightsExpanded((p) => !p)}
              >
                <span className="cd-sidebar-section-title">Insights</span>
                {insightsExpanded ? (
                  <IconChevronUp size={13} />
                ) : (
                  <IconChevronDown size={13} />
                )}
              </div>
              {insightsExpanded && (
                <div className="cd-sidebar-section-body">
                  <div className="cd-insight-row">
                    <div className="cd-insight-label">Severity</div>
                    <div className="cd-insight-value cd-insight-value--empty" />
                  </div>
                  <div className="cd-insight-row">
                    <div className="cd-insight-label">Tags</div>
                    <div className="cd-insight-value">
                      <span className="cd-tag">dcd</span>
                    </div>
                  </div>
                  <div className="cd-insight-row">
                    <div className="cd-insight-label">Group</div>
                    <div className="cd-insight-value">
                      <button className="cd-group-btn">Create New Group</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="cd-sidebar-edit-row">
                <button className="cd-edit-link">
                  <IconPencil /> Edit
                </button>
              </div>
            </div>

            {/* Complaint Details section */}
            <div className="cd-sidebar-section">
              <div
                className="cd-sidebar-section-header cd-sidebar-section-header--bold"
                onClick={() => setDetailsExpanded((p) => !p)}
              >
                <span className="cd-sidebar-section-title cd-sidebar-section-title--bold">
                  Complaint Details
                </span>
                {detailsExpanded ? (
                  <IconChevronUp size={14} />
                ) : (
                  <IconChevronDown size={14} />
                )}
              </div>
              {detailsExpanded && (
                <div className="cd-sidebar-section-body cd-complaint-detail-body">
                  <div className="cd-detail-label">Brief of the complaint:</div>
                  <div className="cd-detail-value">{report.subject}</div>
                  <div className="cd-detail-label" style={{ marginTop: 12 }}>
                    Respondent:
                  </div>
                  <div className="cd-detail-value">{report.respondent}</div>
                  <div className="cd-detail-label" style={{ marginTop: 12 }}>
                    Scrutiny Level:
                  </div>
                  <div className="cd-detail-value">{report.scrutinyLevel}</div>
                  <div className="cd-detail-label" style={{ marginTop: 12 }}>
                    Recommendation:
                  </div>
                  <div className="cd-detail-value">{report.recommendation}</div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar toggle */}
          <button
            className="cd-sidebar-toggle"
            onClick={() => setSidebarOpen((p) => !p)}
          >
            {sidebarOpen ? "<" : ">"}
          </button>

          {/* ---- RIGHT: ACTIVITY TIMELINE ---- */}
          <div className="cd-timeline-panel">
            <div className="cd-timeline-header">
              <span className="cd-timeline-title">Activity Timeline</span>
              <div className="cd-timeline-controls">
                <button
                  className="cd-timeline-ctrl-btn"
                  onClick={() => setAllExpanded(true)}
                >
                  <IconExpand /> Expand All
                </button>
                <span className="cd-timeline-ctrl-sep">/</span>
                <button
                  className="cd-timeline-ctrl-btn cd-timeline-ctrl-btn--primary"
                  onClick={() => setAllExpanded(false)}
                >
                  <IconCollapse /> Collapse All
                </button>
              </div>
            </div>

            <div className="cd-timeline-list">
              {TIMELINE.map((event, idx) => (
                <div key={event.id} className="cd-timeline-event">
                  {/* connector line above */}
                  {idx > 0 && (
                    <div
                      className="cd-timeline-connector"
                      style={{ borderColor: TIMELINE[idx - 1].color }}
                    />
                  )}

                  <div className="cd-timeline-event-row">
                    <div className="cd-timeline-icon-col">
                      <TimelineIcon type={event.icon} color={event.color} />
                    </div>

                    {event.isPending ? (
                      <div className="cd-timeline-pending">
                        <div className="cd-timeline-event-header">
                          <span className="cd-timeline-event-title">
                            {event.title}
                          </span>
                        </div>

                        {/* Select Action dropdown */}
                        <div className="cd-action-form-group">
                          <div className="cd-action-form-label">
                            Select Action
                          </div>
                          <ActionSelect
                            value={selectedAction}
                            onChange={setSelectedAction}
                          />
                        </div>

                        {/* Send notice to Data Fiduciary */}
                        {selectedAction === "send-notice" && (
                          <div className="cd-action-form">
                            <div className="cd-action-form-label">
                              Summon<span className="cd-required">*</span>
                            </div>
                            <textarea
                              className="cd-action-textarea"
                              value={summonText}
                              onChange={(e) => setSummonText(e.target.value)}
                              maxLength={3000}
                              rows={6}
                            />
                            <div className="cd-action-charcount">
                              {summonText.length} / 3000
                            </div>
                            <div className="cd-action-footer">
                              <button
                                className="cd-action-submit"
                                onClick={handleSummonSubmit}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Reject Complaint */}
                        {selectedAction === "reject" && (
                          <div className="cd-action-form">
                            <div className="cd-action-form-label">
                              Select reason for rejection
                              <span className="cd-required">*</span>
                            </div>
                            <div className="cd-rejection-grid">
                              {REJECTION_REASONS.map((r) => (
                                <label key={r.value} className="cd-radio-label">
                                  <input
                                    type="radio"
                                    name="rejection-reason"
                                    value={r.value}
                                    checked={rejectionReason === r.value}
                                    onChange={() => setRejectionReason(r.value)}
                                  />
                                  {r.label}
                                </label>
                              ))}
                            </div>
                            <div
                              className="cd-action-form-label"
                              style={{ marginTop: 14 }}
                            >
                              Type reason for Rejection
                              <span className="cd-required">*</span>
                            </div>
                            <textarea
                              className="cd-action-textarea"
                              value={rejectionText}
                              onChange={(e) => setRejectionText(e.target.value)}
                              placeholder="Please provide reasons for rejection..."
                              maxLength={3000}
                              rows={5}
                            />
                            <div className="cd-action-charcount">
                              {rejectionText.length} / 3000
                            </div>
                            <div className="cd-action-footer">
                              <button
                                className="cd-action-submit"
                                onClick={handleRejectSubmit}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Send back for Re-scrutiny */}
                        {selectedAction === "re-scrutiny" && (
                          <div className="cd-action-form">
                            <div className="cd-action-form-label">
                              Type reason for sending back for re-scrutiny
                              <span className="cd-required">*</span>
                            </div>
                            <textarea
                              className="cd-action-textarea"
                              value={rescrutinyText}
                              onChange={(e) =>
                                setRescrutinyText(e.target.value)
                              }
                              placeholder="Enter your remark..."
                              maxLength={3000}
                              rows={5}
                            />
                            <div className="cd-action-charcount">
                              {rescrutinyText.length} / 3000
                            </div>
                            <div className="cd-action-footer">
                              <button
                                className="cd-action-submit"
                                onClick={handleRescrutinySubmit}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="cd-timeline-content">
                        <div className="cd-timeline-event-header">
                          <span className="cd-timeline-event-title">
                            {event.title}
                          </span>
                          <span className="cd-timeline-event-time">
                            {event.time} | {event.date}
                          </span>
                        </div>
                        {allExpanded && (
                          <div className="cd-timeline-event-body">
                            <div className="cd-timeline-event-meta">
                              <span className="cd-timeline-meta-item">
                                <IconUser /> {event.by}
                              </span>
                              <span className="cd-timeline-meta-item">
                                <IconBuilding /> {event.role}
                              </span>
                            </div>
                            {event.attachment && (
                              <div className="cd-timeline-attachment">
                                <IconPdf />
                                <span className="cd-attachment-name">
                                  {event.attachment}
                                </span>
                              </div>
                            )}
                            {event.remarks && (
                              <div className="cd-timeline-remarks">
                                <div className="cd-timeline-remarks-label">
                                  Remarks
                                </div>
                                <div className="cd-timeline-remarks-text">
                                  {event.remarks}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Bench Modal */}
      {assignBenchOpen && (
        <AssignBenchModal
          onClose={() => setAssignBenchOpen(false)}
          onSubmit={handleAssignSubmit}
        />
      )}
    </div>
  );
}

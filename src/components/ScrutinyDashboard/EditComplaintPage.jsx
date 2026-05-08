import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import { GRIEVANCES } from "./helpfunction/constants";
import "./styles/EditComplaintPage.css";

const CATEGORY_OPTIONS = [
  { value: "consent-violation", label: "Consent Violation" },
  { value: "data-breach", label: "Data Breach" },
  { value: "right-to-erasure", label: "Right to Erasure" },
  { value: "right-to-correction", label: "Right to Correction" },
  { value: "data-portability", label: "Data Portability" },
  { value: "unauthorized-processing", label: "Unauthorized Processing" },
  { value: "other", label: "Other" },
];

const PRIORITY_OPTIONS = ["Urgent", "High", "Medium", "Low"];
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "under-review", label: "Under Review" },
  { value: "clarification-requested", label: "Clarification Requested" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
const ASSIGNED_OPTIONS = [
  "Me",
  "Rajesh Kumar",
  "Priya Sharma",
  "Amit Verma",
  "Sunita Reddy",
];

const AUDIT_TRAIL = [
  {
    text: 'Status changed from "Pending" to "Under Review"',
    by: "Priya Sharma",
    when: "2026-05-05 14:30:00",
  },
  {
    text: 'Priority updated from "Medium" to "High"',
    by: "Priya Sharma",
    when: "2026-05-05 14:25:00",
  },
  {
    text: "Assigned to Rajesh Kumar",
    by: "Amit Verma",
    when: "2026-05-04 10:15:00",
  },
  {
    text: "Complaint created",
    by: "System",
    when: "2026-05-04 09:00:00",
  },
];

const TITLE_MAX = 200;
const DESC_MAX = 2000;
const REMARKS_MAX = 1000;

function IconSave() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconCircleCheck() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconInfo() {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function IconPaperclip() {
  return (
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
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export default function EditComplaintPage({ user, onLogout }) {
  const { grn } = useParams();
  const navigate = useNavigate();

  const grievance = GRIEVANCES.find((g) => g.grn === decodeURIComponent(grn));

  const [form, setForm] = useState({
    title: grievance?.subject ?? "",
    description:
      "The data principal alleges that the respondent organization has been sharing personal information with third-party marketing companies without explicit consent.",
    category: grievance?.category ?? "consent-violation",
    priority: grievance?.priority ?? "high",
    status: grievance?.status ?? "under-review",
    assignedTo: grievance?.assignedTo ?? "Rajesh Kumar",
    remarks:
      "Initial verification completed. Awaiting response from respondent.",
  });

  const [saved, setSaved] = useState(true);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-save draft after 2 s of no changes
  useEffect(() => {
    setSaved(false);
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    const t = setTimeout(() => setSaved(true), 2000);
    setAutoSaveTimer(t);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    setConfirmOpen(true);
  };

  const confirmSave = () => {
    setSaved(true);
    setConfirmOpen(false);
    setToast("Complaint updated successfully");
    setTimeout(() => {
      setToast(null);
      navigate("/scrutiny");
    }, 1800);
  };

  const categoryLabel =
    CATEGORY_OPTIONS.find((c) => c.value === form.category)?.label ??
    form.category;
  const priorityLabel =
    form.priority.charAt(0).toUpperCase() + form.priority.slice(1);
  const statusLabel =
    STATUS_OPTIONS.find((s) => s.value === form.status)?.label ?? form.status;

  return (
    <div className="layout">
      <ToastNotification message={toast} type="success" />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content edit-complaint-page">
        {/* Breadcrumb */}
        <div className="edit-breadcrumb">
          <span
            className="edit-breadcrumb__link"
            onClick={() => navigate("/scrutiny")}
          >
            Scrutiny
          </span>
        </div>

        {/* Page Header */}
        <div className="edit-page-header">
          <div>
            <h1 className="edit-page-title">Edit Complaint</h1>
            <p className="edit-page-subtitle">
              Update complaint details and track changes
            </p>
          </div>
          <div className="edit-page-actions">
            <span
              className={`edit-saved-indicator${saved ? " edit-saved-indicator--visible" : ""}`}
            >
              <IconCircleCheck /> Saved
            </span>
            <button
              className="btn btn--default"
              onClick={() => navigate("/scrutiny")}
            >
              <IconArrowLeft /> Cancel
            </button>
            <button className="btn edit-save-btn" onClick={handleSave}>
              <IconSave /> Save Changes
            </button>
          </div>
        </div>

        {/* Two-column body */}
        <div className="edit-body">
          {/* ---- LEFT: Form ---- */}
          <div className="edit-form-card card">
            {/* Complaint ID + Filed Date (read-only) */}
            <div className="edit-row-2">
              <div className="form-group">
                <label className="form-label">Complaint ID</label>
                <input
                  className="input edit-input--readonly"
                  value={grievance?.grn ?? ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Filed Date</label>
                <input
                  className="input edit-input--readonly"
                  value={grievance?.filedDate ?? ""}
                  readOnly
                />
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label form-label--required">Title</label>
              <div className="edit-input-wrap">
                <input
                  className="input"
                  maxLength={TITLE_MAX}
                  value={form.title}
                  onChange={handleChange("title")}
                />
                <span className="edit-char-count">
                  {form.title.length} / {TITLE_MAX}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label form-label--required">
                Description
              </label>
              <textarea
                className="textarea"
                rows={6}
                maxLength={DESC_MAX}
                value={form.description}
                onChange={handleChange("description")}
              />
              <div className="edit-char-count-bar">
                {form.description.length} / {DESC_MAX}
              </div>
            </div>

            {/* Category / Priority / Status */}
            <div className="edit-row-3">
              <div className="form-group">
                <label className="form-label form-label--required">
                  Category
                </label>
                <select
                  className="select"
                  value={form.category}
                  onChange={handleChange("category")}
                >
                  {CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label form-label--required">
                  Priority
                </label>
                <select
                  className="select"
                  value={form.priority}
                  onChange={handleChange("priority")}
                >
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p} value={p.toLowerCase()}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label form-label--required">
                  Status
                </label>
                <select
                  className="select"
                  value={form.status}
                  onChange={handleChange("status")}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned To */}
            <div className="form-group">
              <label className="form-label form-label--required">
                Assigned To
              </label>
              <select
                className="select"
                value={form.assignedTo}
                onChange={handleChange("assignedTo")}
              >
                {ASSIGNED_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div className="form-group">
              <label className="form-label">Remarks</label>
              <textarea
                className="textarea"
                rows={4}
                maxLength={REMARKS_MAX}
                value={form.remarks}
                onChange={handleChange("remarks")}
              />
              <div className="edit-char-count-bar">
                {form.remarks.length} / {REMARKS_MAX}
              </div>
            </div>

            {/* Attachments */}
            <div className="form-group edit-attachments-group">
              <label className="form-label">Attachments</label>
              <div>
                <button
                  type="button"
                  className="btn btn--default edit-attach-btn"
                >
                  <IconPaperclip /> Add Attachment
                </button>
              </div>
              <p className="edit-attach-hint">
                Maximum 5 files, up to 10MB each. Accepted formats: PDF, DOC,
                DOCX, JPG, PNG
              </p>
            </div>
          </div>

          {/* ---- RIGHT: Audit Trail ---- */}
          <div className="edit-right-col">
            {/* Audit Trail card */}
            <div className="card edit-audit-card">
              <div className="edit-audit-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Audit Trail
              </div>
              <div className="edit-audit-list">
                {AUDIT_TRAIL.map((item, i) => (
                  <div key={i} className="edit-audit-item">
                    <div className="edit-audit-dot" />
                    <div className="edit-audit-content">
                      <div className="edit-audit-text">{item.text}</div>
                      <div className="edit-audit-meta">By {item.by}</div>
                      <div className="edit-audit-meta">{item.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-save info box */}
            <div className="edit-autosave-box">
              <div className="edit-autosave-header">
                <span className="edit-autosave-icon">
                  <IconInfo />
                </span>{" "}
                Auto-save Enabled
              </div>
              <p className="edit-autosave-text">
                Changes are automatically saved as drafts every 2 seconds. Click
                'Save Changes' to finalize updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Update Modal */}
      {confirmOpen && (
        <div className="modal-overlay edit-confirm-overlay">
          <div className="edit-confirm-modal">
            <div className="edit-confirm-header">
              <span className="edit-confirm-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#fa8c16" />
                  <path
                    d="M12 7v5"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.5" r="1.25" fill="#fff" />
                </svg>
              </span>
              <span className="edit-confirm-title">Confirm Update</span>
            </div>
            <div className="edit-confirm-body">
              Are you sure you want to save these changes to the complaint?
            </div>
            <div className="edit-confirm-footer">
              <button
                className="btn btn--default edit-confirm-cancel"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button className="btn edit-confirm-ok" onClick={confirmSave}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

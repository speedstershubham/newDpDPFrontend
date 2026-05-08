import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import Modal from "../shared/Modal";
import {
  CASE,
  TIMELINE_ITEMS,
  SUBMITTED_DOCS,
  BOARD_DOCS,
  STATUS_STEPS,
  STATUS_STEP_LABELS,
  STATUS_STEP_SUBTITLES,
  COMM_NOTIFICATIONS,
  RECENT_UPDATES,
} from "./helpfunction/constants";
import "./styles/ComplaintDetailsView.css";

const PRIORITY_CLASS = {
  high: "cdv-priority-tag--high",
  urgent: "cdv-priority-tag--urgent",
  medium: "cdv-priority-tag--medium",
  low: "cdv-priority-tag--low",
};
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

export default function ComplaintDetailsView({ user, onLogout, caseData: caseDataProp, onClose, onPassOrder, onRequestExpert }) {
  const navigate = useNavigate();
  const caseObj = caseDataProp || CASE;
  const isDrawerMode = !!onClose;
  const handleClose = () => (isDrawerMode ? onClose() : navigate("/data-principal"));

  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [docRequestOpen, setDocRequestOpen] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [revokeCategory, setRevokeCategory] = useState("");
  const [revokeConfirm, setRevokeConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const currentStepIndex = STATUS_STEPS.indexOf(caseObj.status);
  const priorityClass = PRIORITY_CLASS[caseObj.priority] || "cdv-priority-tag--medium";
  const priorityLabel = capitalize(caseObj.priority);
  const statusLabel = STATUS_STEP_LABELS[caseObj.status] || capitalize(caseObj.status);

  const handleRevoke = () => {
    if (!revokeReason.trim()) { showToast("Please provide a reason", "error"); return; }
    setRevokeConfirm(true);
    setRevokeOpen(false);
    showToast("Revocation request submitted.");
  };

  const tabs = [
    { key: "overview", label: "Overview", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    )},
    { key: "documents", label: "Documents", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
      </svg>
    )},
    { key: "timeline", label: "Timeline", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    )},
    { key: "communications", label: "Communications", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    )},
  ];

  /* ── Shared panel interior ── */
  const panelBody = (
    <>
      {/* Panel header */}
      <div className="cdv-panel-header">
        <button className="cdv-close-btn" onClick={handleClose} title="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="cdv-panel-header__title">
          <div className="cdv-panel-header__icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span className="cdv-panel-header__grn">{caseObj.grn}</span>
          <span className={`cdv-priority-tag ${priorityClass}`}>{priorityLabel}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="cdv-tabs">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`cdv-tab${activeTab === key ? " cdv-tab--active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </>
  );

  const tabContentJSX = (
    <div className="cdv-tab-content">

            {/* ══ OVERVIEW ══ */}
            {activeTab === "overview" && (
              <div className="cdv-overview">
                {/* Info table */}
                <div className="cdv-info-card">
                  <table className="cdv-info-table">
                    <tbody>
                      <tr>
                        <th>GRN</th>
                        <td><strong>{caseObj.grn}</strong></td>
                      </tr>
                      <tr>
                        <th>Subject</th>
                        <td>{caseObj.subject}</td>
                      </tr>
                      <tr>
                        <th>Respondent</th>
                        <td>{caseObj.respondent}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{statusLabel}</td>
                      </tr>
                      <tr>
                        <th>Priority</th>
                        <td>
                          <span className={`cdv-priority-tag ${priorityClass}`}>{priorityLabel}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Filed Date</th>
                        <td>{caseObj.filedDate}</td>
                      </tr>
                      {caseObj.hearingDate && (
                        <tr>
                          <th>Hearing Date</th>
                          <td>
                            <span className="cdv-hearing-date-cell">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8871a" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                                <polyline points="17,2 12,7 7,2"/>
                              </svg>
                              {caseObj.hearingDate}{caseObj.hearingTime ? ` at ${caseObj.hearingTime}` : ""}
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Grievance Description */}
                <div className="cdv-desc-card">
                  <div className="cdv-card-section-title">Grievance Description</div>
                  <p className="cdv-desc-para">
                    This grievance pertains to alleged violations of data protection rights under the{" "}
                    <span className="cdv-desc-link">Digital Personal Data Protection Act, 2023</span>. The
                    complaint alleges that the respondent organization has engaged in{" "}
                    <span className="cdv-desc-link">unauthorized processing</span> of personal data without
                    proper consent mechanisms in place.
                  </p>
                  <p className="cdv-desc-para" style={{ marginTop: 8 }}>
                    The data principal has submitted evidence including{" "}
                    <span className="cdv-desc-link">email communications, privacy policy documents,
                    and screenshots</span> demonstrating the alleged violations.
                  </p>
                </div>

                {/* Recent Updates */}
                <div className="cdv-recent-updates-card">
                  <div className="cdv-card-section-title">Recent Updates</div>
                  <div className="cdv-recent-list">
                    {RECENT_UPDATES.map((item, i) => (
                      <div key={i} className="cdv-recent-item">
                        <div className="cdv-recent-item__left">
                          <div className={`cdv-recent-dot cdv-recent-dot--${item.type}`} />
                          {i < RECENT_UPDATES.length - 1 && <div className="cdv-recent-line" />}
                        </div>
                        <div className="cdv-recent-item__body">
                          <div className="cdv-recent-item__row">
                            <span className="cdv-recent-item__title">{item.title}</span>
                            <span className="cdv-recent-item__time">{item.time}</span>
                          </div>
                          <div className="cdv-recent-item__desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hearing banner (only if hearing is scheduled) */}
                {caseObj.hearingDate && (
                <div className="cdv-hearing-banner">
                  <div className="cdv-hearing-banner__inner">
                    <div className="cdv-hearing-banner__icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                        <polyline points="17,2 12,7 7,2"/>
                      </svg>
                    </div>
                    <div>
                      <div className="cdv-hearing-banner__heading">Hearing Scheduled</div>
                      <div className="cdv-hearing-banner__sub">
                        Your hearing is scheduled for {caseObj.hearingDate}{caseObj.hearingTime ? ` at ${caseObj.hearingTime}` : ""}
                      </div>
                      <button className="cdv-join-btn">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                          <polyline points="17,2 12,7 7,2"/>
                        </svg>
                        Join Bharat VC
                      </button>
                    </div>
                  </div>
                </div>
                )}

                {/* Status Progress */}
                <div className="cdv-status-card">
                  <div className="cdv-card-section-title">Current Status Progress</div>
                  <div className="cdv-status-list">
                    {STATUS_STEPS.map((step, i) => {
                      const isDone = i < currentStepIndex;
                      const isActive = i === currentStepIndex;
                      const sub = STATUS_STEP_SUBTITLES[step];
                      return (
                        <div key={step} className="cdv-status-item">
                          <div className="cdv-status-item__indicator">
                            <div className={`cdv-status-circle${isDone ? " cdv-status-circle--done" : ""}${isActive ? " cdv-status-circle--active" : ""}`}>
                              {isDone ? (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20,6 9,17 4,12"/>
                                </svg>
                              ) : (
                                <span>{i + 1}</span>
                              )}
                            </div>
                            {i < STATUS_STEPS.length - 1 && (
                              <div className={`cdv-status-line${isDone ? " cdv-status-line--done" : ""}`} />
                            )}
                          </div>
                          <div className="cdv-status-item__text">
                            <div className={`cdv-status-label${isDone ? " cdv-status-label--done" : ""}${isActive ? " cdv-status-label--active" : ""}`}>
                              {STATUS_STEP_LABELS[step]}
                            </div>
                            {sub && <div className="cdv-status-sub">{sub}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ══ DOCUMENTS ══ */}
            {activeTab === "documents" && (
              <div className="cdv-documents">
                {/* Submitted Documents */}
                <div className="cdv-doc-section">
                  <div className="cdv-card-section-title">Submitted Documents</div>
                  <div className="cdv-doc-list">
                    {SUBMITTED_DOCS.map((doc, i) => (
                      <div key={i} className="cdv-doc-row">
                        <div className="cdv-doc-row__left">
                          <div className="cdv-pdf-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14,2 14,8 20,8"/>
                            </svg>
                          </div>
                          <div>
                            <div className="cdv-doc-name">{doc.name}</div>
                            <div className="cdv-doc-sub">{doc.subtitle}</div>
                          </div>
                        </div>
                        <div className="cdv-doc-row__right">
                          {doc.verified ? (
                            <span className="cdv-verified-text">Verified</span>
                          ) : (
                            <>
                              <button className="cdv-doc-link-btn">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                  <circle cx="12" cy="12" r="3"/>
                                </svg>
                                View
                              </button>
                              <button className="cdv-doc-link-btn">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                  <polyline points="7,10 12,15 17,10"/>
                                  <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Download
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Board Documents */}
                <div className="cdv-doc-section" style={{ marginTop: 20 }}>
                  <div className="cdv-card-section-title">Board Documents</div>
                  <div className="cdv-doc-list">
                    {BOARD_DOCS.map((doc, i) => (
                      <div key={i} className="cdv-doc-row">
                        <div className="cdv-doc-row__left">
                          <div className="cdv-pdf-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14,2 14,8 20,8"/>
                            </svg>
                          </div>
                          <div>
                            <div className="cdv-doc-name">{doc.name}</div>
                            <div className="cdv-doc-sub">{doc.subtitle}</div>
                          </div>
                        </div>
                        <div className="cdv-doc-row__right">
                          <button className="cdv-doc-link-btn">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            View
                          </button>
                          <button className="cdv-doc-link-btn">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ TIMELINE ══ */}
            {activeTab === "timeline" && (
              <div className="cdv-timeline-tab">
                <ul className="cdv-tl-list">
                  {TIMELINE_ITEMS.map((item, i) => (
                    <li key={i} className="cdv-tl-item">
                      <div className={`cdv-tl-dot cdv-tl-dot--${item.type}`} />
                      <div className="cdv-tl-content">
                        <div className="cdv-tl-title">{item.title}</div>
                        <div className="cdv-tl-desc">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ══ COMMUNICATIONS ══ */}
            {activeTab === "communications" && (
              <div className="cdv-comm-tab">
                <div className="cdv-comm-section">
                  <div className="cdv-card-section-title">Notifications Sent</div>
                  <ul className="cdv-notif-list">
                    {COMM_NOTIFICATIONS.map((notif, i) => (
                      <li key={i} className="cdv-notif-item">
                        <div className={`cdv-notif-dot cdv-notif-dot--${notif.type}`} />
                        <div className="cdv-notif-content">
                          <div className="cdv-notif-title">{notif.title}</div>
                          <div className="cdv-notif-desc">{notif.desc}</div>
                          <span className={`cdv-notif-badge cdv-notif-badge--${notif.status === "Delivered" ? "delivered" : "pending"}`}>
                            {notif.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cdv-need-help">
                  <div className="cdv-need-help__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cdv-need-help__title">Need Help?</div>
                    <div className="cdv-need-help__desc">
                      If you have questions about your grievance or need to submit additional documents, you can contact the Registry at{" "}
                      <a href="mailto:registry@dpb.gov.in" className="cdv-email-link">registry@dpb.gov.in</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

    </div>
  );

  /* ── Drawer mode rendering ── */
  if (isDrawerMode) {
    return (
      <>
        <ToastNotification message={toast?.msg} type={toast?.type} />
        <div className="drawer-overlay" onClick={onClose} />
        <div className="cdv-drawer">
          {panelBody}
          <div className="cdv-drawer__body">
            {tabContentJSX}
          </div>
          {/* Action footer — shown only when Pass Order / Expert Opinion callbacks provided */}
          {(onPassOrder || onRequestExpert) && (
            <div className="cdv-drawer-footer">
              {onPassOrder && (
                <button className="cdv-footer-btn cdv-footer-btn--primary" onClick={onPassOrder}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  Pass Order
                </button>
              )}
              {onRequestExpert && (
                <button className="cdv-footer-btn cdv-footer-btn--outline" onClick={onRequestExpert}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Request Expert Opinion
                </button>
              )}
            </div>
          )}
        </div>
        {revokeOpen && (
          <Modal title="Revoke Complaint" onClose={() => setRevokeOpen(false)} maxWidth={520}
            footer={<><button className="btn btn--default" onClick={() => setRevokeOpen(false)}>Cancel</button><button className="btn btn--danger" onClick={handleRevoke} disabled={!revokeReason.trim()}>Confirm Revoke</button></>}
          >
            <div className="alert alert--error mb-4"><strong>This action cannot be easily undone.</strong></div>
            <div className="form-group"><label className="form-label form-label--required">Reason for Revocation</label><textarea className="textarea" rows={4} value={revokeReason} onChange={(e) => setRevokeReason(e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Category</label><select className="select" value={revokeCategory} onChange={(e) => setRevokeCategory(e.target.value)}><option value="">Select...</option><option>Issue resolved directly with the respondent</option><option>Complaint filed in error</option><option>Duplicate complaint</option><option>Other</option></select></div>
          </Modal>
        )}
      </>
    );
  }

  /* ── Full page rendering ── */
  return (
    <div className="layout">
      <ToastNotification message={toast?.msg} type={toast?.type} />
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <div className="cdv-breadcrumb">
          <button className="cdv-back-btn" onClick={handleClose}>
            &larr; Back to Dashboard
          </button>
        </div>
        <div className="cdv-panel">
          {panelBody}
          {tabContentJSX}
        </div>
      </div>
      {revokeOpen && (
        <Modal title="Revoke Complaint" onClose={() => setRevokeOpen(false)} maxWidth={520}
          footer={<><button className="btn btn--default" onClick={() => setRevokeOpen(false)}>Cancel</button><button className="btn btn--danger" onClick={handleRevoke} disabled={!revokeReason.trim()}>Confirm Revoke</button></>}
        >
          <div className="alert alert--error mb-4"><strong>This action cannot be easily undone.</strong></div>
          <div className="form-group"><label className="form-label form-label--required">Reason for Revocation</label><textarea className="textarea" rows={4} value={revokeReason} onChange={(e) => setRevokeReason(e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Category</label><select className="select" value={revokeCategory} onChange={(e) => setRevokeCategory(e.target.value)}><option value="">Select...</option><option>Issue resolved directly with the respondent</option><option>Complaint filed in error</option><option>Duplicate complaint</option><option>Other</option></select></div>
        </Modal>
      )}
    </div>
  );
}

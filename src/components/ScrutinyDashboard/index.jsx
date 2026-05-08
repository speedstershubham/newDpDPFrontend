import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
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

/* ---- SVG Icons ---- */
function IconFile() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function IconAlertTriangle() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconTrendingUp() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconFilter() {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconChevronDown() {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconEye() {
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconEdit() {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconGrid() {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconPersonSmall() {
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
function IconLink() {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function IconTag() {
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
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function IconFilePdf() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function IconFileZip() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="12" x2="12" y2="18" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconCircleCheck() {
  return (
    <svg
      width="18"
      height="18"
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
function IconCircleQuestion() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconCircleX() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

/* ---- Reusable sub-components ---- */
function SectionCard({ title, children }) {
  return (
    <div className="review-section-card">
      <div className="review-section-title">{title}</div>
      <div className="review-section-body">{children}</div>
    </div>
  );
}

function DescRow({ label, children }) {
  return (
    <div className="review-desc-row">
      <span className="review-desc-label">{label}</span>
      <span className="review-desc-value">{children}</span>
    </div>
  );
}

/* ---- Review Drawer (self-contained with tab state) ---- */
function ReviewDrawer({ selected, onClose, onAction, remarks, setRemarks }) {
  const [tab, setTab] = useState("details");

  const dl = daysLeft(selected.deadline);
  const isOverdue = dl < 0;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer review-drawer">
        {/* Header */}
        <div className="drawer__header review-drawer__header">
          <span className="review-drawer__grn">{selected.grn}</span>
          <div className="review-drawer__header-actions">
            <button className="btn btn--default btn--sm">
              <IconLink /> Link Similar
            </button>
            <button className="btn btn--default btn--sm">
              <IconTag /> Add Tags
            </button>
            <button className="drawer__close" onClick={onClose}>
              &#x2715;
            </button>
          </div>
        </div>

        {/* Tabs nav */}
        <div className="review-drawer-tabs">
          {[
            { key: "details", label: "Grievance Details" },
            { key: "timeline", label: "Timeline" },
            { key: "keywords", label: "Keywords & Tags" },
          ].map((t) => (
            <button
              key={t.key}
              className={`tab-btn${tab === t.key ? " tab-btn--active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="drawer__body review-drawer__body">
          {/* ========== GRIEVANCE DETAILS TAB ========== */}
          {tab === "details" && (
            <div className="review-sections">
              <SectionCard title="Basic Information">
                <DescRow label="GRN">
                  <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
                    {selected.grn}
                  </span>
                </DescRow>
                <DescRow label="Subject">{selected.subject}</DescRow>
                <DescRow label="Category">
                  <span className="tag tag--default">{selected.category}</span>
                </DescRow>
                <DescRow label="Priority">
                  <span
                    className={`tag tag--${PRIORITY_CLASS[selected.priority]}`}
                  >
                    {selected.priority.charAt(0).toUpperCase() +
                      selected.priority.slice(1)}
                  </span>
                </DescRow>
                <DescRow label="Status">
                  <span
                    className={`badge badge--${STATUS_DOT[selected.status]}`}
                  >
                    {STATUS_LABEL[selected.status]}
                  </span>
                </DescRow>
                <DescRow label="Filed Date">{selected.filedDate}</DescRow>
                <DescRow label="Deadline">
                  <span
                    style={{
                      color: isOverdue ? "var(--error)" : "inherit",
                      fontWeight: isOverdue ? 600 : "normal",
                    }}
                  >
                    {selected.deadline} {isOverdue ? `(${dl}d)` : `(+${dl}d)`}
                  </span>
                </DescRow>
                <DescRow label="Scrutiny Level">
                  <span className="tag tag--default">
                    {selected.scrutinyLevel}
                  </span>
                </DescRow>
                <DescRow label="Assigned To">{selected.assignedTo}</DescRow>
              </SectionCard>

              <SectionCard title="Data Principal (Complainant)">
                <DescRow label="Name">Ramesh Kumar</DescRow>
                <DescRow label="Email">ramesh.kumar@example.com</DescRow>
                <DescRow label="Phone">+91 98765 43210</DescRow>
                <DescRow label="Address">
                  123, MG Road, Bangalore, Karnataka - 560001
                </DescRow>
                <DescRow label="Aadhaar (Masked)">XXXX-XXXX-3456</DescRow>
                <DescRow label="Verification Status">
                  <span className="tag tag--green">
                    &#10003; Verified via DigiLocker
                  </span>
                </DescRow>
                <DescRow label="Previous Complaints">
                  <span style={{ color: "var(--primary)", cursor: "pointer" }}>
                    2 complaints filed
                  </span>
                </DescRow>
              </SectionCard>

              <SectionCard title="Respondent Details">
                <DescRow label="Organization">{selected.respondent}</DescRow>
                <DescRow label="Registration">
                  CIN: U72900KA2015PTC082345
                </DescRow>
                <DescRow label="Address">
                  Tower A, Tech Park, Whitefield, Bangalore - 560066
                </DescRow>
                <DescRow label="Email">legal@techhub.com</DescRow>
                <DescRow label="Phone">+91 80 4567 8900</DescRow>
                <DescRow label="Data Fiduciary Status">
                  <span className="tag tag--blue">
                    Registered Data Fiduciary
                  </span>
                </DescRow>
                <DescRow label="Complaints Against">
                  <span style={{ color: "var(--error)", fontWeight: 600 }}>
                    8 active complaints
                  </span>
                </DescRow>
                <DescRow label="Previous Orders">
                  3 orders issued (2 penalties, 1 warning)
                </DescRow>
              </SectionCard>

              <SectionCard title="Complaint Description">
                <p className="review-para">
                  The data principal alleges that the respondent organization
                  has been sharing personal information with third-party
                  marketing companies without explicit consent. Multiple
                  instances of unauthorized promotional communications have been
                  received.
                </p>
                <p className="review-para">
                  The complainant states that despite withdrawing consent for
                  marketing communications on 15 March 2026, they continued to
                  receive promotional emails and SMS from various third parties.
                  Upon investigation, it was discovered that{" "}
                  {selected.respondent} was sharing user data with 5+ marketing
                  partners without proper consent mechanisms.
                </p>
                <p className="review-para" style={{ marginBottom: 0 }}>
                  <strong>Relief Sought:</strong> Immediate cessation of data
                  sharing, deletion of data from third parties, compensation of
                  &#x20B9;50,000 for mental harassment and privacy violation.
                </p>
              </SectionCard>

              <SectionCard title="Legal Provisions Cited">
                <div className="review-legal-list">
                  <div className="review-legal-item">
                    <span className="tag tag--red">
                      Section 6 - DPDP Act 2023
                    </span>
                    <span className="review-legal-desc">
                      Obligations of Data Fiduciary
                    </span>
                  </div>
                  <div className="review-legal-item">
                    <span className="tag tag--orange">
                      Section 8 - DPDP Act 2023
                    </span>
                    <span className="review-legal-desc">
                      Purpose and Collection Limitation
                    </span>
                  </div>
                  <div className="review-legal-item">
                    <span className="tag tag--blue">
                      Rule 12 - DPDP Rules 2025
                    </span>
                    <span className="review-legal-desc">
                      Consent Management Requirements
                    </span>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Evidence & Documents Submitted">
                <div className="review-doc-list">
                  {[
                    {
                      icon: <IconFilePdf />,
                      name: "Grievance_Application.pdf",
                      size: "245 KB",
                      action: "View",
                    },
                    {
                      icon: <IconFilePdf />,
                      name: "Evidence_EmailScreenshots.pdf",
                      size: "1.2 MB",
                      action: "View",
                    },
                    {
                      icon: <IconFilePdf />,
                      name: "ConsentWithdrawal_Proof.pdf",
                      size: "180 KB",
                      action: "View",
                    },
                    {
                      icon: <IconFileZip />,
                      name: "ThirdParty_Communications.zip",
                      size: "3.5 MB",
                      action: "Download",
                    },
                  ].map((doc, i) => (
                    <div key={i} className="review-doc-row">
                      <div className="review-doc-info">
                        {doc.icon}
                        <span>
                          {doc.name}{" "}
                          <span className="review-doc-size">({doc.size})</span>
                        </span>
                      </div>
                      <div className="review-doc-actions">
                        <span className="tag tag--green">Verified</span>
                        <button className="btn btn--link btn--sm">
                          {doc.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Compliance Verification">
                <DescRow label="Form Completeness">
                  <span className="tag tag--green">100% Complete</span>
                </DescRow>
                <DescRow label="Mandatory Fields">
                  <span className="tag tag--green">All Present</span>
                </DescRow>
                <DescRow label="Document Authenticity">
                  <span className="tag tag--green">
                    Verified via Digital Signature
                  </span>
                </DescRow>
                <DescRow label="Virus Scan">
                  <span className="tag tag--green">
                    Clean - No threats detected
                  </span>
                </DescRow>
                <DescRow label="Jurisdiction Check">
                  <span className="tag tag--green">
                    Falls under Board jurisdiction
                  </span>
                </DescRow>
                <DescRow label="Duplication Check">
                  <span className="tag tag--orange">
                    1 similar complaint found (different respondent)
                  </span>
                </DescRow>
              </SectionCard>

              <SectionCard title="Risk Assessment">
                <DescRow label="Impact Level">
                  <span className="tag tag--red">
                    High - Affects 1000+ users
                  </span>
                </DescRow>
                <DescRow label="Urgency">
                  <span className="tag tag--red">
                    Urgent - Ongoing violation
                  </span>
                </DescRow>
                <DescRow label="Legal Complexity">
                  <span className="tag tag--blue">Medium</span>
                </DescRow>
                <DescRow label="Public Interest">
                  <span className="tag tag--orange">
                    Moderate - Industry practice concern
                  </span>
                </DescRow>
                <DescRow label="Media Sensitivity">
                  <span className="tag tag--green">Low</span>
                </DescRow>
              </SectionCard>

              <SectionCard title="Scrutiny Notes">
                <div className="review-info-banner">
                  <span
                    style={{ color: "var(--info, #1677ff)", marginRight: 8 }}
                  >
                    &#9432;
                  </span>
                  Initial review indicates prima facie evidence of consent
                  violation. Recommend admission for detailed investigation.
                </div>
                <div className="review-timeline-list" style={{ marginTop: 12 }}>
                  <div className="review-timeline-item">
                    <div className="review-timeline-dot review-timeline-dot--blue"></div>
                    <div className="review-timeline-content">
                      <div className="review-timeline-who">
                        Priya Sharma (Level 1)
                      </div>
                      <div className="review-timeline-when">
                        2026-04-28 3:30 PM
                      </div>
                      <div className="review-timeline-text">
                        Documents verified. Clear evidence of consent withdrawal
                        on record. Email headers confirm third-party sharing.
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Related Complaints">
                <div className="review-related-item">
                  <div
                    style={{
                      fontWeight: 600,
                      fontFamily: "monospace",
                      fontSize: 13,
                    }}
                  >
                    GRN/2026/DPB/001180
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    Similar category - Different respondent
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Status: Resolved - Penalty imposed
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* ========== TIMELINE TAB ========== */}
          {tab === "timeline" && (
            <div className="review-timeline-list">
              {[
                {
                  color: "blue",
                  title: "Grievance Filed",
                  when: "2026-04-28 10:30 AM",
                  desc: null,
                },
                {
                  color: "green",
                  title: "Assigned to Scrutiny Level 1",
                  when: "2026-04-28 11:00 AM",
                  desc: `Assigned to: ${selected.assignedTo}`,
                },
                {
                  color: "blue",
                  title: "Documents Verified",
                  when: "2026-04-28 02:15 PM",
                  desc: "All documents passed virus scan and digital signature check",
                },
                {
                  color: "orange",
                  title: "Under Active Review",
                  when: "2026-04-29 09:00 AM",
                  desc: "Scrutiny officer reviewing compliance details",
                },
              ].map((item, i) => (
                <div key={i} className="review-timeline-item">
                  <div
                    className={`review-timeline-dot review-timeline-dot--${item.color}`}
                  ></div>
                  <div className="review-timeline-content">
                    <div className="review-timeline-who">{item.title}</div>
                    <div className="review-timeline-when">{item.when}</div>
                    {item.desc && (
                      <div className="review-timeline-text">{item.desc}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== KEYWORDS & TAGS TAB ========== */}
          {tab === "keywords" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>
                  Auto-detected Keywords:
                </div>
                <div className="review-keyword-list">
                  {[
                    "data sharing",
                    "consent violation",
                    "third-party marketing",
                    "unauthorized communication",
                  ].map((kw) => (
                    <span key={kw} className="tag tag--default">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Add Additional Tags</label>
                <select className="select">
                  <option value="">Type and select...</option>
                  <option value="high-impact">High Impact</option>
                  <option value="repeat-offender">Repeat Offender</option>
                  <option value="media-sensitive">Media Sensitive</option>
                  <option value="urgent-escalation">Urgent Escalation</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer — action buttons on details tab */}
        {tab === "details" && (
          <div className="drawer__footer review-drawer__footer">
            <button
              className="btn review-footer-btn review-footer-btn--accept"
              onClick={() => onAction("accepted")}
            >
              <IconCircleCheck /> Accept &amp; Forward
            </button>
            <button
              className="btn review-footer-btn review-footer-btn--clarify"
              onClick={() => onAction("clarification requested")}
            >
              <IconCircleQuestion /> Request Clarification
            </button>
            <button
              className="btn review-footer-btn review-footer-btn--reject"
              onClick={() => onAction("rejected")}
            >
              <IconCircleX /> Reject
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ---- Scrutiny Stat Card ---- */
function ScrutinyStatCard({ label, value, icon, color, onClick, active }) {
  return (
    <div
      className="card scrutiny-stat-card"
      style={{
        outline: active ? "2px solid var(--primary)" : undefined,
        cursor: onClick ? "pointer" : undefined,
      }}
      onClick={onClick}
    >
      <div className="scrutiny-stat-label">{label}</div>
      <div
        className="scrutiny-stat-value"
        style={color ? { color } : undefined}
      >
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

function HeaderDropdown({
  value,
  options,
  onChange,
  className = "",
  ariaLabel = "",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={rootRef} className={`scrutiny-dropdown ${className}`.trim()}>
      <button
        type="button"
        className={`scrutiny-dropdown__trigger${open ? " scrutiny-dropdown__trigger--open" : ""}`}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected?.label}</span>
        <IconChevronDown />
      </button>
      {open && (
        <div className="scrutiny-dropdown__menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={`scrutiny-dropdown__option${value === option.value ? " scrutiny-dropdown__option--active" : ""}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Group By Dropdown ---- */
function GroupByDropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={rootRef} className="scrutiny-groupby-dropdown">
      <button
        type="button"
        className={`scrutiny-groupby-trigger${open ? " scrutiny-groupby-trigger--open" : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected?.label}</span>
        <IconGrid />
      </button>
      {open && (
        <div className="scrutiny-groupby-menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={`scrutiny-dropdown__option${value === option.value ? " scrutiny-dropdown__option--active" : ""}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Main Dashboard ---- */
export default function ScrutinyDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "Level 1", label: "Level 1" },
    { value: "Level 2", label: "Level 2" },
    { value: "Level 3", label: "Level 3" },
  ];
  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  const groupByOptions = [
    { value: "none", label: "None" },
    { value: "category", label: "Category" },
    { value: "priority", label: "Priority" },
    { value: "status", label: "Status" },
    { value: "assignedTo", label: "Assigned Officer" },
    { value: "scrutinyLevel", label: "Scrutiny Level" },
  ];
  const {
    selected,
    setSelected,
    drawerOpen,
    setDrawerOpen,
    actionModal,
    setActionModal,
    remarks,
    setRemarks,
    toast,
    handleAction,
    submitAction,
    editOpen,
    setEditOpen,
    editForm,
    setEditForm,
    openEdit,
    submitEdit,
    alertDismissed,
    setAlertDismissed,
    forwardTo,
    setForwardTo,
    search,
    handleSearch,
    activeTab,
    handleTab,
    filterLevel,
    setFilterLevel,
    filterPriority,
    setFilterPriority,
    groupBy,
    setGroupBy,
    page,
    setPage,
    totalPages,
    pagedGrievances,
    filteredGrievances,
  } = useScrutinyDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        <header
          className="scrutiny-hero"
          aria-label="Scrutiny queue page header"
        >
          <span className="scrutiny-breadcrumb">Scrutiny</span>
          <div className="scrutiny-title-row">
            <h1 className="scrutiny-title">Scrutiny Queue</h1>
            <div className="scrutiny-header-actions">
              <button
                type="button"
                className="btn btn--default scrutiny-header-btn"
                onClick={() => navigate("/scrutiny/profile")}
              >
                <IconPersonSmall /> Profile
              </button>
              <button
                type="button"
                className="btn btn--default scrutiny-header-btn"
              >
                <IconFilter /> Filters
              </button>
              <HeaderDropdown
                value={filterLevel}
                options={levelOptions}
                onChange={(next) => {
                  setFilterLevel(next);
                  setPage(1);
                }}
                ariaLabel="Scrutiny level filter"
              />
              <HeaderDropdown
                value={filterPriority}
                options={priorityOptions}
                onChange={(next) => {
                  setFilterPriority(next);
                  setPage(1);
                }}
                ariaLabel="Priority filter"
              />
            </div>
          </div>
          <p className="scrutiny-subtitle">Review and process grievances</p>
        </header>

        {/* Stats Row */}
        <div className="scrutiny-stats-row">
          <ScrutinyStatCard label="Total" value={15} icon={<IconFile />} />
          <ScrutinyStatCard
            label="Pending"
            value={4}
            icon={<IconClock />}
            onClick={() =>
              handleTab(activeTab === "pending" ? "all" : "pending")
            }
            active={activeTab === "pending"}
          />
          <ScrutinyStatCard
            label="Resolved Today"
            value={2}
            icon={<IconCheckCircle />}
            onClick={() =>
              handleTab(activeTab === "approved" ? "all" : "approved")
            }
            active={activeTab === "approved"}
          />
          <ScrutinyStatCard
            label="Overdue"
            value={2}
            icon={<IconAlertTriangle />}
          />
          <ScrutinyStatCard
            label="Assigned to Me"
            value={2}
            icon={<IconUser />}
          />
          <ScrutinyStatCard
            label="New Today"
            value={3}
            icon={<IconTrendingUp />}
          />
        </div>

        {/* Alert Banner */}
        {!alertDismissed && (
          <div className="alert alert--warning scrutiny-alert">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fa8c16",
                  flexShrink: 0,
                }}
              />
              4 grievances pending your review - 2 nearing deadline
            </span>
            <button
              className="scrutiny-alert-close"
              onClick={() => setAlertDismissed(true)}
            >
              &#x2715;
            </button>
          </div>
        )}

        {/* Grievances Table */}
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card__header scrutiny-table-header">
            <span className="card__title">Grievances</span>
            <div className="scrutiny-groupby-row">
              <span className="scrutiny-groupby-label">Group By:</span>
              <GroupByDropdown
                value={groupBy}
                options={groupByOptions}
                onChange={(next) => {
                  setGroupBy(next);
                  setPage(1);
                }}
              />
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
                  <tr>
                    <td
                      colSpan={8}
                      style={{
                        textAlign: "center",
                        padding: 24,
                        color: "var(--text-secondary)",
                      }}
                    >
                      No grievances found.
                    </td>
                  </tr>
                ) : (
                  pagedGrievances.map((g) => {
                    const dl = daysLeft(g.deadline);
                    const isOverdue = dl < 0;
                    return (
                      <tr key={g.key}>
                        <td>
                          <span className="td-mono">{g.grn}</span>
                        </td>
                        <td style={{ maxWidth: 220 }}>{g.subject}</td>
                        <td>{g.respondent}</td>
                        <td>
                          <span
                            className={`tag tag--${PRIORITY_CLASS[g.priority]}`}
                          >
                            {g.priority.charAt(0).toUpperCase() +
                              g.priority.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className="tag tag--default">
                            {g.scrutinyLevel}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge badge--${STATUS_DOT[g.status]}`}
                          >
                            {STATUS_LABEL[g.status]}
                          </span>
                        </td>
                        <td>
                          <div className="deadline-cell">
                            <span
                              className={
                                isOverdue
                                  ? "deadline-date deadline-date--overdue"
                                  : "deadline-date deadline-date--normal"
                              }
                            >
                              {g.deadline}
                            </span>
                            <span
                              className={
                                isOverdue
                                  ? "deadline-days deadline-days--overdue"
                                  : "deadline-days deadline-days--normal"
                              }
                            >
                              {isOverdue ? `(${dl}d)` : `(+${dl}d)`}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="scrutiny-action-btns">
                            <button
                              className="btn btn--link btn--sm scrutiny-action-link"
                              onClick={() => {
                                setSelected(g);
                                setDrawerOpen(true);
                              }}
                            >
                              <IconEye /> Review
                            </button>
                            <button
                              className="btn btn--link btn--sm scrutiny-action-link"
                              onClick={() =>
                                navigate(
                                  `/scrutiny/edit/${encodeURIComponent(g.grn)}`,
                                )
                              }
                            >
                              <IconEdit /> Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={filteredGrievances.length}
              onPage={setPage}
            />
          </div>
        </div>
      </div>

      {/* Review Drawer */}
      {drawerOpen && selected && (
        <ReviewDrawer
          selected={selected}
          onClose={() => setDrawerOpen(false)}
          onAction={handleAction}
          remarks={remarks}
          setRemarks={setRemarks}
        />
      )}

      {/* Edit Complaint Modal */}
      {editOpen && editForm && (
        <Modal
          title={`Edit Complaint — ${editForm.grn}`}
          onClose={() => setEditOpen(false)}
          maxWidth={600}
          footer={
            <>
              <button
                className="btn btn--default"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn--primary" onClick={submitEdit}>
                Save Changes
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              className="input"
              value={editForm.subject || ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, subject: e.target.value }))
              }
            />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="select"
                value={editForm.priority || ""}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, priority: e.target.value }))
                }
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
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, scrutinyLevel: e.target.value }))
                }
              >
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Assigned To</label>
            <input
              className="input"
              value={editForm.assignedTo || ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, assignedTo: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="input"
              value={editForm.deadline || ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, deadline: e.target.value }))
              }
            />
          </div>
        </Modal>
      )}

      {/* Action Confirmation Modal */}
      {actionModal.open && (
        <Modal
          title={`Confirm ${actionModal.action.charAt(0).toUpperCase() + actionModal.action.slice(1)}`}
          onClose={() => setActionModal({ open: false, action: "" })}
          maxWidth={480}
          footer={
            <>
              <button
                className="btn btn--default"
                onClick={() => setActionModal({ open: false, action: "" })}
              >
                Cancel
              </button>
              <button className="btn btn--primary" onClick={submitAction}>
                Submit
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label form-label--required">Remarks</label>
            <textarea
              className="textarea"
              rows={4}
              placeholder={
                actionModal.action === "rejected"
                  ? "Provide reasons for rejection..."
                  : actionModal.action === "clarification requested"
                    ? "Specify what clarification is needed..."
                    : "Add any remarks..."
              }
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          {actionModal.action === "accepted" && (
            <div className="form-group">
              <label className="form-label">Forward to</label>
              <select
                className="select"
                value={forwardTo}
                onChange={(e) => setForwardTo(e.target.value)}
              >
                <option value="chairperson">Chairperson</option>
                <option value="level2">Scrutiny Level 2</option>
                <option value="level3">Scrutiny Level 3</option>
                <option value="registry">Registry</option>
              </select>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

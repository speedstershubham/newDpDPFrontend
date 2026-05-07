import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import Modal from "../shared/Modal";
import { CASE, TIMELINE, DOCUMENTS } from "./helpfunction/constants";
import "./styles/ComplaintDetailsView.css";

export default function ComplaintDetailsView({ user, onLogout }) {
  const navigate = useNavigate();
  const [responseOpen, setResponseOpen] = useState(false);
  const [clarificationOpen, setClarificationOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [clarificationText, setClarificationText] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Complaint Details"
          subtitle={<span className="font-mono">{CASE.grn}</span>}
          actions={<button className="btn btn--default" onClick={() => navigate("/data-principal")}>← Back</button>}
        />

        <div className="alert alert--success mb-6">
          📅 <strong>Upcoming Hearing:</strong> {CASE.hearingDate} at {CASE.hearingTime} — Video
          conferencing link will be shared 24 hours before.
        </div>

        <div className="complaint-details-grid">
          <div>
            <div className="card mb-6">
              <div className="card__header">
                <span className="card__title">Case Information</span>
              </div>
              <div className="card__body">
                <div className="desc-grid desc-grid--3">
                  <div className="desc-item">
                    <div className="desc-label">Status</div>
                    <div className="desc-value">
                      <span className="badge badge--success">Hearing Scheduled</span>
                    </div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Priority</div>
                    <div className="desc-value">
                      <span className="tag tag--orange">High</span>
                    </div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Category</div>
                    <div className="desc-value">{CASE.category}</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Filed Date</div>
                    <div className="desc-value">{CASE.filedDate}</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Hearing Date</div>
                    <div className="desc-value">{CASE.hearingDate}</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Hearing Time</div>
                    <div className="desc-value">{CASE.hearingTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <div className="card__header">
                <span className="card__title">Respondent Details</span>
              </div>
              <div className="card__body">
                <div className="desc-grid">
                  <div className="desc-item">
                    <div className="desc-label">Name</div>
                    <div className="desc-value">{CASE.respondent}</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Type</div>
                    <div className="desc-value">Data Fiduciary</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Email</div>
                    <div className="desc-value">legal@shopnowindia.com</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Registration</div>
                    <div className="desc-value">DPB/DF/2024/001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <div className="card__header">
                <span className="card__title">Grievance Description</span>
              </div>
              <div className="card__body">
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>
                  {CASE.description}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <span className="card__title">Documents</span>
              </div>
              <div className="card__body">
                {DOCUMENTS.map((doc, i) => (
                  <div
                    key={i}
                    className="document-row"
                    style={{ borderBottom: i < DOCUMENTS.length - 1 ? "1px solid var(--border-solid)" : "none" }}
                  >
                    <div className="document-row__info">
                      <span>📄</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{doc.name}</div>
                        <div className="text-muted">{doc.size} · {doc.date}</div>
                      </div>
                    </div>
                    <button className="btn btn--ghost btn--sm">⬇ Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">Case Timeline</span>
            </div>
            <div className="card__body">
              <ul className="timeline">
                {TIMELINE.map((t, i) => (
                  <li key={i} className="timeline__item">
                    <div className="timeline__dot" />
                    <div className="timeline__content">
                      <div className="timeline__title">{t.title}</div>
                      <div className="timeline__desc">{t.desc}</div>
                      <div className="timeline__time">{t.date}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="card mt-6">
          <div className="card__header">
            <span className="card__title">Actions</span>
          </div>
          <div className="card__body" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn--primary" onClick={() => setResponseOpen(true)}>
              💬 Submit Response / Statement
            </button>
            <button className="btn btn--default" onClick={() => setClarificationOpen(true)}>
              ❓ Request Clarification
            </button>
            <button className="btn btn--default">
              📎 Upload Additional Evidence
            </button>
            <button className="btn btn--default">
              📥 Download Case File
            </button>
          </div>
        </div>
      </div>

      {/* Submit Response Modal */}
      {responseOpen && (
        <Modal title="Submit Response" onClose={() => setResponseOpen(false)} maxWidth={580}
          footer={<><button className="btn btn--default" onClick={() => setResponseOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("Response submitted successfully"); setResponseOpen(false); setResponseText(""); }}>✓ Submit Response</button></>}
        >
          <div className="alert alert--info mb-4">ℹ️ Your response will be shared with the adjudicating bench and all parties.</div>
          <div className="form-group"><label className="form-label form-label--required">Your Response / Statement</label><textarea className="textarea" rows={6} placeholder="Provide your detailed response to the complaint..." value={responseText} onChange={(e) => setResponseText(e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Attach Supporting Document (optional)</label><div className="upload-zone" style={{ padding: 12 }}><div className="upload-zone__icon" style={{ fontSize: 24 }}>📎</div><p className="text-muted" style={{ fontSize: 13 }}>Click to upload PDF / DOCX</p></div></div>
        </Modal>
      )}

      {/* Request Clarification Modal */}
      {clarificationOpen && (
        <Modal title="Request Clarification" onClose={() => setClarificationOpen(false)} maxWidth={500}
          footer={<><button className="btn btn--default" onClick={() => setClarificationOpen(false)}>Cancel</button><button className="btn btn--default" onClick={() => { showToast("Clarification request sent"); setClarificationOpen(false); setClarificationText(""); }}>📨 Send Request</button></>}
        >
          <div className="form-group"><label className="form-label form-label--required">Clarification Needed</label><textarea className="textarea" rows={4} placeholder="Describe what clarification you need from the board or the other party..." value={clarificationText} onChange={(e) => setClarificationText(e.target.value)} /></div>
        </Modal>
      )}
    </div>
  );
}

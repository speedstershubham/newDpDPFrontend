import React from "react";
import { useNavigate } from "react-router-dom";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import { useGrievanceForm } from "./hooks/useGrievanceForm";
import {
  STEPS,
  CATEGORY_OPTIONS,
  RESPONDENT_TYPES,
  ASK_QUESTION_FAQ,
  DF_SPECIFIC_CATEGORIES,
  generateGRN,
} from "./helpfunction/constants";
import "./styles/GrievanceSubmission.css";

export default function GrievanceSubmission({ user, onLogout }) {
  const navigate = useNavigate();
  const {
    step, setStep, form, errors, submitted,
    questionInput, setQuestionInput, questionAnswers, addCustomQuestion,
    set, handleNext, handleBack, handleSubmit,
  } = useGrievanceForm();

  if (submitted) {
    return (
      <div className="layout">
        <TenantHeader user={user} onLogout={onLogout} />
        <div
          className="page-content"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)" }}
        >
          <div className="card" style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
            <div className="card__body">
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: "var(--success)", marginBottom: 8 }}>Grievance Submitted!</h2>
              <p className="text-muted mb-4">Your GRN has been generated:</p>
              <div className="grn-display">{generateGRN()}</div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 24 }}>
                You will be notified via email and SMS when there are updates to your grievance.
              </p>
              <button className="btn btn--primary btn--block" onClick={() => navigate("/data-principal")}>
                Go to My Grievances
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="File New Grievance"
          subtitle="Submit a data protection complaint under DPDP Act 2023"
          actions={<button className="btn btn--default" onClick={() => navigate("/data-principal")}>← Back</button>}
        />

        <div className="steps mb-8">
          {STEPS.map((title, i) => (
            <div
              key={i}
              className={`step${i < step ? " step--finish" : i === step ? " step--process" : ""}`}
            >
              <div className="step__dot">{i < step ? "✓" : i + 1}</div>
              <div className="step__title">{title}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="card__body">
            {/* ── Step 0: Ask a Question ─────────────────────────── */}
            {step === 0 && (
              <>
                <h3 className="mb-4">Pre-Filing: Ask a Question</h3>
                <p className="text-muted mb-6" style={{ fontSize: 14 }}>
                  Before filing, review the frequently asked questions below. You can also ask a
                  custom question to clarify your eligibility.
                </p>

                {ASK_QUESTION_FAQ.map((item, i) => (
                  <div key={i} className="card mb-4" style={{ background: "var(--surface-hover)" }}>
                    <div className="card__body">
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                        ❓ {item.q}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        💬 {item.a}
                      </div>
                    </div>
                  </div>
                ))}

                {questionAnswers.map((qa, i) => (
                  <div key={i} className="card mb-4" style={{ background: "var(--surface-hover)", borderLeft: "3px solid var(--primary)" }}>
                    <div className="card__body">
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>❓ {qa.q}</div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>💬 {qa.a}</div>
                    </div>
                  </div>
                ))}

                <div className="form-group mt-4">
                  <label className="form-label">Have another question? Ask here:</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="input"
                      placeholder="Type your question..."
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCustomQuestion()}
                    />
                    <button className="btn btn--default" onClick={addCustomQuestion} type="button">
                      Ask
                    </button>
                  </div>
                </div>

                <div className="alert alert--info mt-4">
                  ℹ️ You must have already raised a grievance with the Data Fiduciary and received an
                  unsatisfactory response (or no response in 30 days) before proceeding.
                </div>
              </>
            )}

            {/* ── Step 1: Basic Information ──────────────────────── */}
            {step === 1 && (
              <>
                <h3 className="mb-6">Basic Information</h3>
                <div className="form-group">
                  <label className="form-label form-label--required">Category of Grievance</label>
                  <select className="select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                    <option value="">Select category...</option>
                    {CATEGORY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="form-error">{errors.category}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required">Subject of Grievance</label>
                  <input
                    className="input"
                    placeholder="Brief subject of your grievance"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  />
                  {errors.subject && <p className="form-error">{errors.subject}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required">Description</label>
                  <textarea
                    className="textarea"
                    rows={5}
                    placeholder="Describe your grievance in detail..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                  <p className="form-hint">{form.description.length}/2000 characters</p>
                  {errors.description && <p className="form-error">{errors.description}</p>}
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Date of Incident</label>
                    <input type="date" className="input" value={form.incidentDate} onChange={(e) => set("incidentDate", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date You Approached Respondent</label>
                    <input type="date" className="input" value={form.approachDate} onChange={(e) => set("approachDate", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Response Received from Respondent?</label>
                  <select className="select" value={form.approachResponseReceived} onChange={(e) => set("approachResponseReceived", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="no-response">No response within 30 days</option>
                    <option value="unsatisfactory">Unsatisfactory response</option>
                    <option value="rejected">Request rejected</option>
                  </select>
                </div>
              </>
            )}

            {/* ── Step 2: Respondent Details (dynamic by type) ──── */}
            {step === 2 && (
              <>
                <h3 className="mb-6">Respondent Details</h3>
                <div className="form-group">
                  <label className="form-label form-label--required">Respondent Type</label>
                  <div className="grid-2" style={{ marginBottom: 0 }}>
                    {RESPONDENT_TYPES.map((o) => (
                      <label
                        key={o.value}
                        className={`radio-card${form.respondentType === o.value ? " radio-card--selected" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => set("respondentType", o.value)}
                      >
                        <div className="radio-card__dot" />
                        <div>
                          <div className="radio-card__label">{o.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.respondentType && <p className="form-error mt-2">{errors.respondentType}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label form-label--required">Respondent Name</label>
                  <input
                    className="input"
                    placeholder="Name of the Data Fiduciary / organization"
                    value={form.respondentName}
                    onChange={(e) => set("respondentName", e.target.value)}
                  />
                  {errors.respondentName && <p className="form-error">{errors.respondentName}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required">Respondent Email / Contact</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="Email address"
                    value={form.respondentEmail}
                    onChange={(e) => set("respondentEmail", e.target.value)}
                  />
                  {errors.respondentEmail && <p className="form-error">{errors.respondentEmail}</p>}
                </div>

                {/* Dynamic fields for Data Fiduciary */}
                {form.respondentType === "data-fiduciary" && (
                  <>
                    <div className="alert alert--info mb-4">
                      📋 Please provide the DPB registration number of the Data Fiduciary (if known).
                    </div>
                    <div className="form-group">
                      <label className="form-label">DPB Registration No.</label>
                      <input
                        className="input"
                        placeholder="e.g. DPB/DF/2024/001"
                        value={form.respondentRegNo}
                        onChange={(e) => set("respondentRegNo", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Type of Data Processing Complained About</label>
                      <select className="select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                        <option value="">Select...</option>
                        {DF_SPECIFIC_CATEGORIES.map((v) => (
                          <option key={v} value={v}>
                            {CATEGORY_OPTIONS.find((c) => c.value === v)?.label || v}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Dynamic fields for Consent Manager */}
                {form.respondentType === "consent-manager" && (
                  <>
                    <div className="alert alert--info mb-4">
                      📋 A Consent Manager (CM) is a body that manages your consent on your behalf.
                    </div>
                    <div className="form-group">
                      <label className="form-label">CM Registration No. (if known)</label>
                      <input
                        className="input"
                        placeholder="e.g. DPB/CM/2024/001"
                        value={form.respondentRegNo}
                        onChange={(e) => set("respondentRegNo", e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Dynamic fields for Government Entity */}
                {form.respondentType === "government" && (
                  <div className="alert alert--warning mb-4">
                    ⚠️ Complaints against Government entities are subject to additional scrutiny.
                    Please ensure you have supporting documents ready.
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Respondent Address (optional)</label>
                  <textarea
                    className="textarea"
                    rows={2}
                    placeholder="Registered office address..."
                    value={form.respondentAddress}
                    onChange={(e) => set("respondentAddress", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* ── Step 3: Evidence Upload ────────────────────────── */}
            {step === 3 && (
              <>
                <h3 className="mb-6">Evidence Upload</h3>
                <div className="alert alert--info mb-6">
                  📎 Supported formats: PDF, JPG, PNG, DOCX (max 10 MB each)
                </div>
                <div className="upload-zone">
                  <div className="upload-zone__icon">📁</div>
                  <p style={{ fontWeight: 500 }}>Click to upload or drag &amp; drop</p>
                  <p className="text-muted">Evidence documents, screenshots, communication records</p>
                </div>
                <div className="form-group mt-4">
                  <label className="form-label">Additional Notes (optional)</label>
                  <textarea
                    className="textarea"
                    rows={3}
                    placeholder="Any additional context..."
                    value={form.evidence}
                    onChange={(e) => set("evidence", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* ── Step 4: Preview & Submit ───────────────────────── */}
            {step === 4 && (
              <>
                <h3 className="mb-6">Preview &amp; Submit</h3>
                <div className="alert alert--info mb-4">
                  👁 Please review all details carefully before submitting. Once submitted, you will
                  receive a GRN and cannot edit the complaint.
                </div>

                <div className="card mb-4" style={{ background: "var(--surface-hover)" }}>
                  <div className="card__header">
                    <span className="card__title">Grievance Information</span>
                  </div>
                  <div className="card__body">
                    <div className="desc-grid">
                      <div className="desc-item">
                        <div className="desc-label">Category</div>
                        <div className="desc-value">{CATEGORY_OPTIONS.find(c => c.value === form.category)?.label || form.category || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Incident Date</div>
                        <div className="desc-value">{form.incidentDate || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Approached Respondent On</div>
                        <div className="desc-value">{form.approachDate || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Response Received</div>
                        <div className="desc-value">{form.approachResponseReceived || "—"}</div>
                      </div>
                      <div className="desc-item" style={{ gridColumn: "1/-1" }}>
                        <div className="desc-label">Subject</div>
                        <div className="desc-value">{form.subject}</div>
                      </div>
                      <div className="desc-item" style={{ gridColumn: "1/-1" }}>
                        <div className="desc-label">Description</div>
                        <div className="desc-value" style={{ whiteSpace: "pre-wrap" }}>{form.description}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-6" style={{ background: "var(--surface-hover)" }}>
                  <div className="card__header">
                    <span className="card__title">Respondent Details</span>
                  </div>
                  <div className="card__body">
                    <div className="desc-grid">
                      <div className="desc-item">
                        <div className="desc-label">Name</div>
                        <div className="desc-value">{form.respondentName || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Email</div>
                        <div className="desc-value">{form.respondentEmail || "—"}</div>
                      </div>
                      <div className="desc-item">
                        <div className="desc-label">Type</div>
                        <div className="desc-value">{RESPONDENT_TYPES.find(r => r.value === form.respondentType)?.label || "—"}</div>
                      </div>
                      {form.respondentRegNo && (
                        <div className="desc-item">
                          <div className="desc-label">Registration No.</div>
                          <div className="desc-value">{form.respondentRegNo}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 14 }}>
                  <input
                    type="checkbox"
                    checked={form.agreedToTerms}
                    onChange={(e) => set("agreedToTerms", e.target.checked)}
                    style={{ marginTop: 3, accentColor: "var(--primary)" }}
                  />
                  I declare that the information provided is true and correct to the best of my knowledge and
                  I understand that false information may result in legal action under DPDP Act 2023.
                </label>
                {errors.agreedToTerms && <p className="form-error mt-2">{errors.agreedToTerms}</p>}
              </>
            )}

            <hr className="divider" />
            <div className="flex justify-between">
              <button
                className="btn btn--default"
                onClick={step === 0 ? () => navigate("/data-principal") : handleBack}
              >
                {step === 0 ? "Cancel" : "← Back"}
              </button>
              {step < STEPS.length - 1 ? (
                <button className="btn btn--primary" onClick={handleNext}>
                  {step === 0 ? "Proceed to File →" : "Next →"}
                </button>
              ) : (
                <button className="btn btn--primary" onClick={handleSubmit}>
                  ✓ Submit Grievance
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

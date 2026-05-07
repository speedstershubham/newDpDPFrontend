import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Modal from "../shared/Modal";
import { useDataFiduciary } from "./hooks/useDataFiduciary";
import { COMPLAINTS, COMPLIANCE_ITEMS, RECENT_ACTIVITY, NOTICES } from "./helpfunction/constants";
import "./styles/DataFiduciaryDashboard.css";

export default function DataFiduciaryDashboard({ user, onLogout }) {
  const {
    activeTab, setActiveTab,
    responseOpen, setResponseOpen,
    selectedComplaint, setSelectedComplaint,
    toast,
    showToast,
  } = useDataFiduciary();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Data Fiduciary Portal"
          subtitle={`Manage complaints and compliance — ${user?.name}`}
        />

        <div className="stats-row">
          <StatCard icon="⚠️" value={2} label="Active Complaints" color="var(--warning)" />
          <StatCard icon="📨" value={4} label="Notices Received" color="var(--info)" />
          <StatCard icon="📅" value={1} label="Hearings Pending" color="var(--primary)" />
          <StatCard icon="✅" value={8} label="Resolved" color="var(--success)" />
        </div>

        <div className="tabs">
          <div className="tabs__nav">
            {[["overview", "📊 Overview"], ["complaints", "⚠️ Complaints"], ["notices", "📨 Notices"], ["profile", "🏢 Company Profile"]].map(
              ([k, l]) => (
                <button key={k} className={`tab-btn${activeTab === k ? " tab-btn--active" : ""}`} onClick={() => setActiveTab(k)}>
                  {l}
                </button>
              )
            )}
          </div>

          {activeTab === "overview" && (
            <div>
              <div className="alert alert--warning mb-6">
                ⚠️ You have <strong>1 upcoming hearing</strong> on 05 May 2026 at 10:30 AM. Ensure your legal team is available.
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="card__header">
                    <span className="card__title">Compliance Status</span>
                  </div>
                  <div className="card__body">
                    {COMPLIANCE_ITEMS.map((c, i) => (
                      <div key={i} className="compliance-row">
                        <span style={{ fontSize: 14 }}>{c.item}</span>
                        <span className={`badge badge--${c.status === "compliant" ? "success" : "warning"}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="card__header">
                    <span className="card__title">Recent Activity</span>
                  </div>
                  {RECENT_ACTIVITY.map((n, i) => (
                    <div key={i} className="notif-item">
                      <div className="notif-item__title">{n.title}</div>
                      <div className="notif-item__time">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "complaints" && (
            <div className="card">
              <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
                <table>
                  <thead>
                    <tr><th>GRN</th><th>Subject</th><th>Status</th><th>Filed Date</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {COMPLAINTS.map((c, i) => (
                      <tr key={i}>
                        <td><span className="td-mono">{c.grn}</span></td>
                        <td>{c.subject}</td>
                        <td>
                          <span className={`badge badge--${c.status === "hearing-scheduled" ? "success" : "info"}`}>
                            {c.status.replace(/-/g, " ")}
                          </span>
                        </td>
                        <td>{c.date}</td>
                        <td>
                          <button
                            className="btn btn--link btn--sm"
                            onClick={() => { setSelectedComplaint(c); setResponseOpen(true); }}
                          >
                            File Response
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "notices" && (
            <div className="card">
              <div className="card__body">
                {NOTICES.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "12px 0",
                      borderBottom: i < NOTICES.length - 1 ? "1px solid var(--border-solid)" : "none",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>📄 {n.title}</div>
                      <div className="text-muted">Received: {n.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span className="tag tag--blue">{n.type}</span>
                      <button className="btn btn--ghost btn--sm">⬇ Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="card">
              <div className="card__body">
                <div className="desc-grid">
                  <div className="desc-item">
                    <div className="desc-label">Organization</div>
                    <div className="desc-value">{user?.name}</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Registration No.</div>
                    <div className="desc-value font-mono">DPB/DF/2024/001</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Type</div>
                    <div className="desc-value">Significant Data Fiduciary</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">Sector</div>
                    <div className="desc-value">E-Commerce</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">DPO Name</div>
                    <div className="desc-value">Anita Gupta</div>
                  </div>
                  <div className="desc-item">
                    <div className="desc-label">DPO Email</div>
                    <div className="desc-value">dpo@company.com</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Response Modal */}
      {responseOpen && selectedComplaint && (
        <Modal title={`File Response — ${selectedComplaint.grn}`} onClose={() => setResponseOpen(false)} maxWidth={580}
          footer={<><button className="btn btn--default" onClick={() => setResponseOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("Response filed successfully"); setResponseOpen(false); }}>Submit Response</button></>}
        >
          <div className="form-group"><label className="form-label form-label--required">Response Statement</label><textarea className="textarea" rows={6} placeholder="Provide your official response to the grievance..." /></div>
          <div className="form-group"><label className="form-label">Supporting Documents</label><div style={{ border: "2px dashed var(--border-solid)", borderRadius: "var(--radius)", padding: 24, textAlign: "center", background: "#fafafa", cursor: "pointer" }}>📁 Click to upload documents</div></div>
        </Modal>
      )}
    </div>
  );
}

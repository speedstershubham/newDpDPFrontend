import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import Drawer from "../shared/Drawer";
import { useDataFiduciary } from "./hooks/useDataFiduciary";
import { NOTICES, HEARINGS, RECENT_ACTIVITY, SEVERITY_CLASS } from "./helpfunction/constants";
import "./styles/DataFiduciaryDashboard.css";

export default function DataFiduciaryDashboard({ user, onLogout }) {
  const {
    replyOpen, setReplyOpen,
    selectedNotice,
    replyText, setReplyText,
    profileDismissed, setProfileDismissed,
    toast,
    showToast,
    openReply,
  } = useDataFiduciary();

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        <PageHeader
          title="Data Fiduciary Portal"
          subtitle="Manage notices, replies, and hearings"
        />

        {/* Profile Completion Banner */}
        {!profileDismissed && (
          <div className="df-banner">
            <div className="df-banner__left">
              <span className="df-banner__icon">⚠️</span>
              <div>
                <div className="df-banner__title">Complete Your Profile</div>
                <div className="df-banner__sub">Complete your organization profile to access all features</div>
                <div className="df-banner__progress-wrap">
                  <div className="df-banner__progress-bar">
                    <div className="df-banner__progress-fill" style={{ width: "75%" }} />
                  </div>
                  <span className="df-banner__progress-label">75%</span>
                </div>
              </div>
            </div>
            <button className="df-banner__close" onClick={() => setProfileDismissed(true)}>✕</button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="df-stats-row">
          <div className="df-stat-card">
            <div className="df-stat-card__label">Active Notices</div>
            <div className="df-stat-card__body">
              <span className="df-stat-card__icon">🔔</span>
              <span className="df-stat-card__value">{NOTICES.length}</span>
            </div>
            <div className="df-stat-card__sub">1 critical deadline</div>
          </div>
          <div className="df-stat-card">
            <div className="df-stat-card__label">Pending Replies</div>
            <div className="df-stat-card__body">
              <span className="df-stat-card__icon">📄</span>
              <span className="df-stat-card__value">3</span>
            </div>
            <div className="df-stat-card__sub">Earliest: 2 days</div>
          </div>
          <div className="df-stat-card">
            <div className="df-stat-card__label">Upcoming Hearings</div>
            <div className="df-stat-card__body">
              <span className="df-stat-card__icon">📋</span>
              <span className="df-stat-card__value">{HEARINGS.length}</span>
            </div>
            <div className="df-stat-card__sub">Next: Tomorrow 10:30 AM</div>
          </div>
          <div className="df-stat-card">
            <div className="df-stat-card__label">Cases This Month</div>
            <div className="df-stat-card__body">
              <span className="df-stat-card__icon">⏱</span>
              <span className="df-stat-card__value">12</span>
            </div>
            <div className="df-stat-card__sub df-stat-card__sub--up">↑ 15% increase</div>
          </div>
        </div>

        {/* Active Notices Requiring Response */}
        <div className="card mb-6">
          <div className="card__header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="card__title">Active Notices Requiring Response</span>
              <span className="badge badge--error df-badge-count">{NOTICES.length}</span>
            </div>
            <button className="btn btn--link btn--sm">View All</button>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>Notice ID</th>
                  <th>Subject</th>
                  <th>Deadline</th>
                  <th>Severity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {NOTICES.map((n) => (
                  <tr key={n.id}>
                    <td><span className="td-mono">{n.id}</span></td>
                    <td>{n.subject}</td>
                    <td>
                      <div>{n.deadline}</div>
                      <div className="text-muted">{n.daysLeft} days left</div>
                    </td>
                    <td>
                      <span className={`df-severity ${SEVERITY_CLASS[n.severity]}`}>{n.severity}</span>
                    </td>
                    <td>
                      <button className="btn btn--primary btn--sm" onClick={() => openReply(n)}>
                        View &amp; Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Virtual Hearings */}
        <div className="card mb-6">
          <div className="card__header">
            <span className="card__title">Upcoming Virtual Hearings</span>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th>Date &amp; Time</th>
                  <th>Bench</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {HEARINGS.map((h) => (
                  <tr key={h.grn}>
                    <td><span className="td-mono">{h.grn}</span></td>
                    <td>{h.subject}</td>
                    <td>
                      <div>{h.date}</div>
                      <div className="text-muted">{h.time}</div>
                    </td>
                    <td>{h.bench}</td>
                    <td>
                      <a className="btn btn--link btn--sm" href={h.vcLink} target="_blank" rel="noreferrer">
                        📹 Join
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity + Quick Actions */}
        <div className="grid-2">
          <div className="card">
            <div className="card__header">
              <span className="card__title">Recent Activity</span>
            </div>
            <div className="card__body">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="df-activity-item">
                  <span className="df-activity-dot" style={{ background: a.color }} />
                  <div className="df-activity-text">
                    <span>{a.text}</span>
                    <span className="df-activity-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">Quick Actions</span>
            </div>
            <div className="card__body df-quick-actions">
              <button className="btn btn--primary btn--full" onClick={() => showToast("Open reply form")}>
                📄 Submit Reply
              </button>
              <button className="btn btn--default btn--full">📋 View All Notices</button>
              <button className="btn btn--default btn--full">📹 Join Hearing Room</button>
              <button className="btn btn--default btn--full" onClick={() => showToast("Opening profile…")}>👤 Update Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* View & Reply Drawer */}
      {replyOpen && selectedNotice && (
        <Drawer
          title="Notice Details"
          onClose={() => setReplyOpen(false)}
          footer={
            <button
              className="btn btn--primary btn--full"
              onClick={() => {
                showToast("Reply submitted successfully");
                setReplyOpen(false);
              }}
            >
              ▷ Submit Reply
            </button>
          }
        >
          {/* Deadline warning banner */}
          <div className="nd-deadline-banner">
            <span className="nd-deadline-banner__icon">⚠️</span>
            <div>
              <div className="nd-deadline-banner__title">Deadline: {selectedNotice.deadline}</div>
              <div className="nd-deadline-banner__sub">{selectedNotice.daysLeft} days remaining to respond</div>
            </div>
          </div>

          {/* Notice Information table */}
          <div className="nd-section-title">Notice Information</div>
          <table className="nd-info-table">
            <tbody>
              <tr>
                <td className="nd-info-label">Notice ID</td>
                <td className="nd-info-value font-mono">{selectedNotice.id}</td>
              </tr>
              <tr>
                <td className="nd-info-label">GRN</td>
                <td className="nd-info-value font-mono">{selectedNotice.grn}</td>
              </tr>
              <tr>
                <td className="nd-info-label">Subject</td>
                <td className="nd-info-value">{selectedNotice.subject}</td>
              </tr>
              <tr>
                <td className="nd-info-label">Issue Date</td>
                <td className="nd-info-value">{selectedNotice.issueDate}</td>
              </tr>
              <tr>
                <td className="nd-info-label">Deadline</td>
                <td className="nd-info-value">{selectedNotice.deadline}</td>
              </tr>
              <tr>
                <td className="nd-info-label">Severity</td>
                <td className="nd-info-value">
                  <span className={`df-severity ${SEVERITY_CLASS[selectedNotice.severity]}`}>
                    {selectedNotice.severity}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Notice Content */}
          <div className="nd-section-title">Notice Content</div>
          <div className="nd-content">
            {selectedNotice.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Submit Reply */}
          <div className="nd-section-title">Submit Reply</div>
          <div className="form-group">
            <label className="form-label form-label--required">Written Response</label>
            <textarea
              className="textarea"
              rows={6}
              placeholder="Provide detailed response to the notice..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>

          {/* Supporting Documents */}
          <div className="form-group">
            <label className="form-label">Supporting Documents</label>
            <div className="nd-upload-zone">
              <div className="nd-upload-icon">📥</div>
              <div className="nd-upload-text">Click or drag files to upload</div>
              <div className="nd-upload-hint">PDF or Word documents, max 10 files</div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

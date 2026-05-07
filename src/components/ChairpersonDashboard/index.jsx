import React from "react";
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
  const {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    noticeOpen, setNoticeOpen,
    benchMembers, setBenchMembers,
    toast,
    showToast,
    toggleBench,
    profileOpen, setProfileOpen,
    timelineOpen, setTimelineOpen, timelineCase, openTimeline,
    search, handleSearch,
    activeTab, handleTab,
    page, setPage, totalPages, pagedReports, filteredReports,
  } = useChairpersonDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Chairperson Dashboard"
          subtitle="Review scrutiny reports and make adjudication decisions"
          actions={<>
            <select className="select" style={{ width: 130 }}><option>This Week</option><option>Today</option><option>This Month</option></select>
            <button className="btn btn--default" onClick={() => setProfileOpen(true)}>👤 Profile</button>
          </>}
        />

        <div className="stats-row">
          <StatCard icon="📋" value={45} label="Active Complaints" trend="↑ 12%" onClick={() => {}} />
          <StatCard icon="📨" value={28} label="Notices Sent" trend="↑ 5%" onClick={() => {}} />
          <StatCard icon="⏳" value={12} label="Pending Decisions" onClick={() => {}} />
          <StatCard icon="📅" value={6} label="Hearings Today" onClick={() => {}} />
          <StatCard icon="✅" value={89} label="Orders Passed" trend="↑ 8%" onClick={() => {}} />
          <StatCard icon="📊" value="78%" label="Admission Rate" onClick={() => {}} />
        </div>

        <div className="card mb-6">
          <div className="card__header">
            <span className="card__title">Scrutiny Reports — Pending Decision</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                className="input"
                style={{ width: 220 }}
                placeholder="🔍 Search GRN, subject..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <select className="select" style={{ width: 150 }} value={activeTab} onChange={(e) => handleTab(e.target.value)}>
                <option value="all">All</option>
                <option value="admit">Admit</option>
                <option value="reject">Reject</option>
                <option value="clarify">Clarification</option>
              </select>
            </div>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
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
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "var(--text-secondary)" }}>No records found.</td></tr>
                ) : pagedReports.map((r) => (
                  <tr key={r.key}>
                    <td><span className="td-mono">{r.grn}</span></td>
                    <td style={{ maxWidth: 240 }}>{r.subject}</td>
                    <td><span className="tag tag--blue">{r.scrutinyLevel}</span></td>
                    <td>
                      <span className={`tag tag--${REC_CLASS[r.recommendation] || "default"}`}>
                        {r.recommendation}
                      </span>
                    </td>
                    <td>{r.receivedDate}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn btn--link btn--sm" onClick={() => { setSelected(r); setDrawerOpen(true); }}>Review</button>
                        <button className="btn btn--link btn--sm" onClick={() => { setSelected(r); setNoticeOpen(true); }}>Send Notice</button>
                        <button className="btn btn--link btn--sm" onClick={() => openTimeline(r)}>Timeline</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} total={filteredReports.length} onPage={setPage} />
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <span className="card__title">Bench Assignment</span>
          </div>
          <div className="card__body">
            <p className="text-muted mb-4">Select board members to assign to the bench for pending hearings:</p>
            <div className="grid-2">
              {BENCH_MEMBERS.map((m) => (
                <div
                  key={m.id}
                  className={`radio-card bench-member-card${benchMembers.includes(m.id) ? " radio-card--selected" : ""}${!m.available ? " bench-member-card--disabled" : ""}`}
                  onClick={() => m.available && toggleBench(m.id)}
                >
                  <div className="radio-card__dot" />
                  <span style={{ fontSize: 20 }}>👤</span>
                  <div>
                    <div className="radio-card__label">{m.name}</div>
                    <div className="radio-card__desc">
                      {m.role} &nbsp;
                      <span className={`badge badge--${m.available ? "success" : "error"}`} style={{ fontSize: 11 }}>
                        {m.available ? "Available" : "Busy"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {benchMembers.length > 0 && (
              <button
                className="btn btn--primary mt-4"
                onClick={() => { showToast("Bench assigned successfully"); setBenchMembers([]); }}
              >
                Assign Bench ({benchMembers.length} selected)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {timelineOpen && timelineCase && (
        <Modal title={`Case Timeline — ${timelineCase.grn}`} onClose={() => setTimelineOpen(false)} maxWidth={500}
          footer={<button className="btn btn--default" onClick={() => setTimelineOpen(false)}>Close</button>}
        >
          <ul className="timeline">
            {[
              { title: "Complaint Submitted", date: timelineCase.receivedDate, desc: "Data Principal filed the grievance.", done: true },
              { title: "Scrutiny Assigned", date: timelineCase.receivedDate, desc: `Assigned at ${timelineCase.scrutinyLevel} level.`, done: true },
              { title: "Scrutiny Completed", date: timelineCase.receivedDate, desc: `Recommendation: ${timelineCase.recommendation}`, done: true },
              { title: "Chairperson Review", date: "Pending", desc: "Awaiting Chairperson decision.", done: false },
              { title: "Hearing Scheduled", date: "—", desc: "", done: false },
              { title: "Order Issued", date: "—", desc: "", done: false },
            ].map((t, i) => (
              <li key={i} className="timeline__item">
                <div className="timeline__dot" style={{ background: t.done ? "var(--success)" : "var(--border-solid)" }} />
                <div className="timeline__content">
                  <div className="timeline__title">{t.title}</div>
                  {t.desc && <div className="timeline__desc">{t.desc}</div>}
                  <div className="timeline__time">{t.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* Profile Modal */}
      {profileOpen && (
        <Modal title="My Profile" onClose={() => setProfileOpen(false)} maxWidth={460}
          footer={<button className="btn btn--default" onClick={() => setProfileOpen(false)}>Close</button>}
        >
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🏛️</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Chairperson</div>
            <div className="text-muted">chairperson@dpb.gov.in</div>
          </div>
          <div className="desc-grid">
            <div className="desc-item"><div className="desc-label">Role</div><div className="desc-value">Chairperson</div></div>
            <div className="desc-item"><div className="desc-label">Employee ID</div><div className="desc-value">DPB/CP/2024/001</div></div>
            <div className="desc-item"><div className="desc-label">Designation</div><div className="desc-value">Chairperson, DPB</div></div>
            <div className="desc-item"><div className="desc-label">Jurisdiction</div><div className="desc-value">Pan India</div></div>
            <div className="desc-item"><div className="desc-label">Bench</div><div className="desc-value">Full Bench</div></div>
            <div className="desc-item"><div className="desc-label">Orders Passed</div><div className="desc-value">89</div></div>
          </div>
        </Modal>
      )}

      {/* Review Drawer */}
      {drawerOpen && selected && (
        <Drawer
          title="Review Scrutiny Report"
          onClose={() => setDrawerOpen(false)}
          footer={<>
            <button className="btn btn--danger" onClick={() => { showToast("Grievance rejected"); setDrawerOpen(false); }}>✗ Reject</button>
            <button className="btn btn--default" onClick={() => { showToast("Returned for clarification"); setDrawerOpen(false); }}>↩ Return</button>
            <button className="btn btn--primary" onClick={() => { showToast("Grievance admitted for hearing"); setDrawerOpen(false); }}>✓ Admit for Hearing</button>
          </>}
        >
              <div className="desc-grid mb-6">
                <div className="desc-item">
                  <div className="desc-label">GRN</div>
                  <div className="desc-value font-mono">{selected.grn}</div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Recommendation</div>
                  <div className="desc-value">
                    <span className={`tag tag--${REC_CLASS[selected.recommendation] || "default"}`}>
                      {selected.recommendation}
                    </span>
                  </div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Scrutiny Level</div>
                  <div className="desc-value">
                    <span className="tag tag--blue">{selected.scrutinyLevel}</span>
                  </div>
                </div>
                <div className="desc-item">
                  <div className="desc-label">Respondent</div>
                  <div className="desc-value">{selected.respondent}</div>
                </div>
              </div>
              <div className="desc-item mb-6">
                <div className="desc-label">Subject</div>
                <div className="desc-value">{selected.subject}</div>
              </div>
              <div className="form-group">
                <label className="form-label">Chairperson Remarks</label>
                <textarea className="textarea" rows={4} placeholder="Enter your decision remarks..." />
              </div>
        </Drawer>
      )}

      {/* Send Notice Modal */}
      {noticeOpen && selected && (
        <Modal title="Send Notice" onClose={() => setNoticeOpen(false)}
          footer={<><button className="btn btn--default" onClick={() => setNoticeOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("Notice sent successfully"); setNoticeOpen(false); }}>📨 Send Notice</button></>}
        >
          <div className="form-group"><label className="form-label">Notice Type</label><select className="select"><option>Admission Notice</option><option>Hearing Notice</option><option>Clarification Notice</option></select></div>
          <div className="form-group"><label className="form-label">Recipient</label><select className="select"><option>Both Parties</option><option>Data Principal</option><option>Respondent</option></select></div>
          <div className="form-group"><label className="form-label">Notice Content</label><textarea className="textarea" rows={5} placeholder="Enter notice content..." /></div>
        </Modal>
      )}
    </div>
  );
}

import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Drawer from "../shared/Drawer";
import Modal from "../shared/Modal";
import Pagination from "../shared/Pagination";
import { useBoardMemberDashboard } from "./hooks/useBoardMemberDashboard";
import { CASES, DECISION_OPTIONS } from "./helpfunction/constants";
import "./styles/BoardMemberDashboard.css";

export default function BoardMemberDashboard({ user, onLogout }) {
  const {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    orderOpen, setOrderOpen,
    orderText, setOrderText,
    toast,
    showToast,
    profileOpen, setProfileOpen,
    timelineOpen, setTimelineOpen, timelineCase, openTimeline,
    activeTab, handleTab,
    search, handleSearch,
    page, setPage, totalPages, pagedCases, filteredCases,
  } = useBoardMemberDashboard();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Board Member Dashboard"
          subtitle="Conduct hearings and pass orders"
          actions={<button className="btn btn--default" onClick={() => setProfileOpen(true)}>👤 Profile</button>}
        />

        <div className="stats-row">
          <StatCard icon="📅" value={3} label="Today's Hearings" active={activeTab === "today"} onClick={() => handleTab("today")} />
          <StatCard icon="📋" value={18} label="Assigned Cases" active={activeTab === "cases"} onClick={() => handleTab("cases")} />
          <StatCard icon="⏳" value={4} label="Orders Pending" active={activeTab === "scheduled"} onClick={() => handleTab("scheduled")} />
          <StatCard icon="✅" value={45} label="Completed" active={activeTab === "cases"} onClick={() => handleTab("cases")} />
        </div>

        <div className="alert alert--info mb-6">
          📅 You have <strong>3 hearings scheduled today</strong>. First hearing at 10:30 AM.
        </div>

        <div className="card">
          <div className="card__header">
            <span className="card__title">Assigned Cases</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                className="input"
                style={{ width: 220 }}
                placeholder="🔍 Search GRN, subject..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="tabs__nav" style={{ marginBottom: 0 }}>
                {[["cases","All"],["today","Hearing Today"],["scheduled","Scheduled"]].map(([val,label]) => (
                  <button
                    key={val}
                    className={`tab-btn${activeTab === val ? " tab-btn--active" : ""}`}
                    onClick={() => handleTab(val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>GRN</th><th>Subject</th><th>Respondent</th>
                  <th>Hearing Date</th><th>Time</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedCases.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--text-secondary)" }}>No cases found.</td></tr>
                ) : pagedCases.map((c) => (
                  <tr key={c.key}>
                    <td><span className="td-mono">{c.grn}</span></td>
                    <td style={{ maxWidth: 200 }}>{c.subject}</td>
                    <td>{c.respondent}</td>
                    <td>{c.hearingDate}</td>
                    <td>{c.time}</td>
                    <td>
                      <span className={`badge badge--${c.status === "hearing-today" ? "processing" : "info"}`}>
                        {c.status === "hearing-today" ? "Hearing Today" : "Scheduled"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn btn--link btn--sm" onClick={() => { setSelected(c); setDrawerOpen(true); }}>View</button>
                        <button className="btn btn--link btn--sm" onClick={() => { setSelected(c); setOrderOpen(true); }}>Pass Order</button>
                        <button className="btn btn--link btn--sm" onClick={() => openTimeline(c)}>Timeline</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={page} totalPages={totalPages} total={filteredCases.length} onPage={setPage} />
          </div>
        </div>

        {/* Published Orders Section */}
        <div className="card mt-6">
          <div className="card__header">
            <span className="card__title">📄 Published Orders</span>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr><th>Order No.</th><th>GRN</th><th>Decision</th><th>Passed On</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {CASES.slice(0, 3).map((c, i) => (
                  <tr key={c.key}>
                    <td><span className="td-mono">ORD/2026/{String(i+1).padStart(4,"0")}</span></td>
                    <td><span className="td-mono">{c.grn}</span></td>
                    <td><span className="tag tag--green">In favour of complainant</span></td>
                    <td>{c.hearingDate}</td>
                    <td><span className="badge badge--success">Published</span></td>
                    <td>
                      <button className="btn btn--link btn--sm">⬇ Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {timelineOpen && timelineCase && (
        <Modal title={`Case Timeline — ${timelineCase.grn}`} onClose={() => setTimelineOpen(false)} maxWidth={500}
          footer={<><button className="btn btn--default" onClick={() => setTimelineOpen(false)}>Close</button><button className="btn btn--primary" onClick={() => { setTimelineOpen(false); setSelected(timelineCase); setOrderOpen(true); }}>📝 Pass Order</button></>}
        >
          <ul className="timeline">
            {[
              { title: "Complaint Filed by Data Principal", date: "10 Jan 2026", done: true },
              { title: "Scrutiny Completed", date: "18 Jan 2026", done: true },
              { title: "Admitted by Chairperson", date: "25 Jan 2026", done: true },
              { title: `Hearing Scheduled — ${timelineCase.hearingDate}`, date: timelineCase.hearingDate, done: true },
              { title: "Hearing Conducted", date: timelineCase.hearingDate, done: timelineCase.status === "hearing-today" || false },
              { title: "Order to be Passed", date: "—", done: false },
              { title: "Order Published", date: "—", done: false },
            ].map((t, i) => (
              <li key={i} className="timeline__item">
                <div className="timeline__dot" style={{ background: t.done ? "var(--success)" : "var(--border-solid)" }} />
                <div className="timeline__content">
                  <div className="timeline__title">{t.title}</div>
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
            <div style={{ fontSize: 56, marginBottom: 8 }}>⚖️</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Board Member</div>
            <div className="text-muted">boardmember@dpb.gov.in</div>
          </div>
          <div className="desc-grid">
            <div className="desc-item"><div className="desc-label">Role</div><div className="desc-value">Board Member (Bench)</div></div>
            <div className="desc-item"><div className="desc-label">Employee ID</div><div className="desc-value">DPB/BM/2024/003</div></div>
            <div className="desc-item"><div className="desc-label">Designation</div><div className="desc-value">Adjudicating Officer</div></div>
            <div className="desc-item"><div className="desc-label">Bench</div><div className="desc-value">Bench A</div></div>
            <div className="desc-item"><div className="desc-label">Cases Assigned</div><div className="desc-value">18</div></div>
            <div className="desc-item"><div className="desc-label">Orders Passed</div><div className="desc-value">45</div></div>
          </div>
        </Modal>
      )}

      {/* Case Drawer */}
      {drawerOpen && selected && (
        <Drawer title="Case Details" onClose={() => setDrawerOpen(false)}
          footer={<><button className="btn btn--default" onClick={() => setDrawerOpen(false)}>Close</button><button className="btn btn--primary" onClick={() => { setDrawerOpen(false); setOrderOpen(true); }}>📝 Pass Order</button></>}
        >
          <div className="desc-grid mb-6">
            <div className="desc-item"><div className="desc-label">GRN</div><div className="desc-value font-mono">{selected.grn}</div></div>
            <div className="desc-item"><div className="desc-label">Respondent</div><div className="desc-value">{selected.respondent}</div></div>
            <div className="desc-item"><div className="desc-label">Hearing Date</div><div className="desc-value">{selected.hearingDate}</div></div>
            <div className="desc-item"><div className="desc-label">Time</div><div className="desc-value">{selected.time}</div></div>
          </div>
          <div className="desc-item mb-4"><div className="desc-label">Subject</div><div className="desc-value">{selected.subject}</div></div>
          <div className="alert alert--info">📹 Join Bharat VC: <a href="#" style={{ color: "var(--primary)" }}>Click to join video hearing</a></div>
        </Drawer>
      )}

      {/* Pass Order Modal */}
      {orderOpen && selected && (
        <Modal title={`Pass Order — ${selected?.grn}`} onClose={() => setOrderOpen(false)} maxWidth={620}
          footer={<><button className="btn btn--default" onClick={() => setOrderOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("Order passed and sent for publishing"); setOrderOpen(false); }}>✓ Pass &amp; Submit Order</button></>}
        >
          <div className="form-group"><label className="form-label">Decision</label><select className="select">{DECISION_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}</select></div>
          <div className="form-group"><label className="form-label form-label--required">Order Text</label><textarea className="textarea" rows={6} placeholder="Enter the full order text..." value={orderText} onChange={(e) => setOrderText(e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Fine Amount (if applicable)</label><input className="input" type="number" placeholder="Amount in INR" /></div>
        </Modal>
      )}
    </div>
  );
}

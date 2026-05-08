import React, { useState } from "react";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import Modal from "../shared/Modal";
import ComplaintDetailsView from "../ComplaintDetailsView";
import { useBoardMemberDashboard } from "./hooks/useBoardMemberDashboard";
import { CASES, DECISION_OPTIONS, EXPERTS } from "./helpfunction/constants";
import "./styles/BoardMemberDashboard.css";

export default function BoardMemberDashboard({ user, onLogout }) {
  const {
    selected, setSelected,
    drawerOpen, setDrawerOpen,
    orderOpen, setOrderOpen,
    orderText, setOrderText,
    toast, showToast,
    profileOpen, setProfileOpen,
    activeTab, handleTab,
    search, handleSearch,
    page, setPage, totalPages, pagedCases, filteredCases,
  } = useBoardMemberDashboard();

  const [weekFilter, setWeekFilter] = useState("This Week");
  const [expertOpen, setExpertOpen] = useState(false);
  const [expertCase, setExpertCase] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState("");
  const [expertNote, setExpertNote] = useState("");

  const upcomingHearings = CASES.filter((c) => c.status === "hearing-today" || c.status === "scheduled");

  const handlePassOrder = (c) => { setSelected(c); setOrderOpen(true); };
  const handleExpertOpinion = (c) => { setExpertCase(c); setSelectedExpert(""); setExpertNote(""); setExpertOpen(true); };

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        {/* Page header */}
        <div className="bmd-page-header">
          <div>
            <h1 className="bmd-page-title">Board Member Dashboard</h1>
            <p className="bmd-page-subtitle">Manage hearings and adjudication</p>
          </div>
          <div className="bmd-week-filter">
            <select className="bmd-week-select" value={weekFilter} onChange={(e) => setWeekFilter(e.target.value)}>
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        {/* Stat Cards — 6 cards */}
        <div className="bmd-stats-grid">
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Cases Listed Today</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              6
            </div>
            <div className="bmd-stat-sub">3 completed</div>
          </div>
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Orders Pending</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
              4
            </div>
            <div className="bmd-stat-sub bmd-stat-sub--warn">↑ 1 due today</div>
          </div>
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Published This Week</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              15
            </div>
            <div className="bmd-stat-sub bmd-stat-sub--up">↑ 12% increase</div>
          </div>
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Adjourned Cases</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              7
            </div>
            <div className="bmd-stat-sub bmd-stat-sub--down">↓ 30% reduction</div>
          </div>
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Upcoming in 7 Days</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              18
            </div>
            <div className="bmd-stat-sub">Next: Tomorrow 10:30 AM</div>
          </div>
          <div className="bmd-stat-card">
            <div className="bmd-stat-label">Cases Disposed</div>
            <div className="bmd-stat-value">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              142
            </div>
            <div className="bmd-stat-sub">This month</div>
          </div>
        </div>

        {/* Upcoming Hearings */}
        <div className="bmd-section-card">
          <div className="bmd-section-header">
            <span className="bmd-section-title">Upcoming Hearings</span>
            <button className="bmd-join-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17,2 12,7 7,2"/>
              </svg>
              Join Hearing Room
            </button>
          </div>
          <div className="bmd-table-wrap">
            <table className="bmd-table">
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th className="bmd-th--highlight">Hearing Date &amp; Time</th>
                  <th>Bench</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingHearings.length === 0 ? (
                  <tr><td colSpan={5} className="bmd-empty-row">No upcoming hearings.</td></tr>
                ) : upcomingHearings.map((c) => (
                  <tr key={c.key}>
                    <td><span className="bmd-grn">{c.grn}</span></td>
                    <td>{c.subject}</td>
                    <td>
                      <div className="bmd-hearing-dt">
                        <span className="bmd-hearing-date">{c.hearingDate}</span>
                        <span className="bmd-hearing-time">{c.hearingTime || c.time}</span>
                      </div>
                    </td>
                    <td><span className="bmd-bench-tag">Bench A</span></td>
                    <td>
                      <button
                        className="bmd-view-case-btn"
                        onClick={() => { setSelected(c); setDrawerOpen(true); }}
                      >
                        View Case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bmd-section-card">
          <div className="bmd-section-header">
            <span className="bmd-section-title">Quick Actions</span>
          </div>
          <div className="bmd-quick-actions">
            <button className="bmd-quick-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              View Case Files
            </button>
            <button className="bmd-quick-btn" onClick={() => { if (CASES[0]) { setSelected(CASES[0]); setOrderOpen(true); } }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Draft Daily Order
            </button>
            <button className="bmd-quick-btn" onClick={() => { setExpertCase(null); setSelectedExpert(""); setExpertNote(""); setExpertOpen(true); }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Request Expert Opinion
            </button>
          </div>
        </div>
      </div>

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

      {/* Case Drawer — full ComplaintDetailsView */}
      {drawerOpen && selected && (
        <ComplaintDetailsView
          user={user}
          onLogout={onLogout}
          caseData={{
            grn: selected.grn,
            subject: selected.subject,
            respondent: selected.respondent,
            status: selected.cdvStatus || "hearing-scheduled",
            priority: selected.priority || "high",
            filedDate: selected.filedDate || selected.hearingDate,
            hearingDate: selected.hearingDate,
            hearingTime: selected.hearingTime || selected.time,
            category: selected.category || "General",
          }}
          onClose={() => setDrawerOpen(false)}
          onPassOrder={() => { setDrawerOpen(false); setOrderOpen(true); }}
          onRequestExpert={() => { setExpertCase(selected); setSelectedExpert(""); setExpertNote(""); setDrawerOpen(false); setExpertOpen(true); }}
        />
      )}

      {/* Pass Order Modal */}
      {orderOpen && selected && (
        <Modal
          title={`Pass Order — ${selected?.grn}`}
          onClose={() => setOrderOpen(false)}
          maxWidth={620}
          footer={
            <>
              <button className="btn btn--default" onClick={() => setOrderOpen(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={() => { showToast("Order passed and sent for publishing"); setOrderOpen(false); setOrderText(""); }}>
                ✓ Pass &amp; Submit Order
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label form-label--required">Decision</label>
            <select className="select">
              {DECISION_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label form-label--required">Order Text</label>
            <textarea
              className="textarea"
              rows={6}
              placeholder="Write the full order text here..."
              value={orderText}
              onChange={(e) => setOrderText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fine Amount (if applicable)</label>
            <input className="input" type="number" placeholder="Amount in INR" />
          </div>
          <div className="form-group">
            <label className="form-label">Compliance Deadline</label>
            <input className="input" type="date" />
          </div>
        </Modal>
      )}

      {/* Request Expert Opinion Modal */}
      {expertOpen && (
        <Modal
          title="Request Expert Opinion"
          onClose={() => setExpertOpen(false)}
          maxWidth={520}
          footer={
            <>
              <button className="btn btn--default" onClick={() => setExpertOpen(false)}>Cancel</button>
              <button
                className="btn btn--primary"
                disabled={!selectedExpert}
                onClick={() => { showToast(`Expert opinion requested from ${selectedExpert}`); setExpertOpen(false); }}
              >
                Assign Expert
              </button>
            </>
          }
        >
          {expertCase && (
            <div className="bmd-expert-case-info">
              <span className="bmd-expert-grn">{expertCase.grn}</span>
              <span className="bmd-expert-subject">{expertCase.subject}</span>
            </div>
          )}
          <div className="form-group">
            <label className="form-label form-label--required">Select Expert</label>
            <select className="select" value={selectedExpert} onChange={(e) => setSelectedExpert(e.target.value)}>
              <option value="">-- Select an expert --</option>
              {EXPERTS.map((e) => (
                <option key={e.id} value={e.name}>{e.name} — {e.specialisation}</option>
              ))}
            </select>
          </div>
          {selectedExpert && (
            <div className="bmd-expert-selected-card">
              {(() => {
                const exp = EXPERTS.find((e) => e.name === selectedExpert);
                return exp ? (
                  <>
                    <div className="bmd-expert-avatar">{exp.name.charAt(0)}</div>
                    <div>
                      <div className="bmd-expert-name">{exp.name}</div>
                      <div className="bmd-expert-spec">{exp.specialisation}</div>
                      <div className="bmd-expert-org">{exp.organisation}</div>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Nature of Opinion Required</label>
            <select className="select">
              <option>Technical / Forensic Analysis</option>
              <option>Legal Interpretation</option>
              <option>Data Privacy Assessment</option>
              <option>Industry Practice Review</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Describe what opinion is needed..."
              value={expertNote}
              onChange={(e) => setExpertNote(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}


import React from "react";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import Drawer from "../shared/Drawer";
import Pagination from "../shared/Pagination";
import { useRoleDashboard } from "./hooks/useRoleDashboard";
import "./styles/RoleDashboard.css";

/* ── Priority badge ─────────────────────────────────────── */
const PRIORITY_COLORS = {
  Critical: "rd-badge--critical",
  High:     "rd-badge--high",
  Medium:   "rd-badge--medium",
  Low:      "rd-badge--low",
};

function PriorityBadge({ priority }) {
  return (
    <span className={`rd-badge ${PRIORITY_COLORS[priority] ?? "rd-badge--low"}`}>
      {priority}
    </span>
  );
}

/* ── Days pill ──────────────────────────────────────────── */
function DaysPill({ days }) {
  const cls =
    days > 14 ? "rd-days--danger" :
    days > 7  ? "rd-days--warn"   :
                "rd-days--ok";
  return <span className={`rd-days ${cls}`}>{days}d</span>;
}

/* ── Action Confirm Modal ───────────────────────────────── */
function ActionModal({ modal, note, setNote, onConfirm, onClose }) {
  if (!modal) return null;
  const { complaint, action } = modal;

  return (
    <div className="rd-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rd-action-modal" role="dialog" aria-modal="true">
        <div className="rd-am-header">
          <h2 className="rd-am-title">Confirm: {action.label}</h2>
          <button className="rd-am-close" onClick={onClose}>×</button>
        </div>
        <div className="rd-am-body">
          <div className="rd-am-info">
            <span className="rd-am-label">Complaint</span>
            <span className="rd-am-value">{complaint.grn}</span>
          </div>
          <div className="rd-am-info">
            <span className="rd-am-label">Subject</span>
            <span className="rd-am-value">{complaint.subject}</span>
          </div>
          <div className="rd-am-divider" />
          <div className="rd-am-form-group">
            <label className="rd-am-form-label">Note / Remarks</label>
            <textarea
              className="rd-am-textarea"
              placeholder="Optional note for audit trail..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <div className="rd-am-footer">
          <button className="rd-am-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="rd-am-btn-confirm" onClick={onConfirm}>
            Confirm: {action.label}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Complaint History Timeline ─────────────────────────── */
function HistoryTimeline({ history }) {
  if (!history.length) {
    return <p className="rd-detail-empty">No history yet.</p>;
  }
  return (
    <div className="rd-timeline">
      {history.map((h, i) => (
        <div key={i} className="rd-tl-item">
          <div className="rd-tl-dot" />
          <div className="rd-tl-content">
            <div className="rd-tl-action">{h.action.replace(/-/g, " ")}</div>
            <div className="rd-tl-meta">
              {h.userName} · {new Date(h.timestamp).toLocaleString("en-IN")}
            </div>
            {h.note && <div className="rd-tl-note">"{h.note}"</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export default function RoleDashboard({ user, onLogout }) {
  const {
    roleObj,
    paged, filtered, stats,
    totalPages, page, setPage,
    search, handleSearch,
    activeTab, handleTab,
    sortKey, handleSort,
    getStageFor, getActionsFor, getWorkflowFor,
    daysAtCurrentStage,
    actionModal, openActionModal, closeActionModal,
    actionNote, setActionNote, confirmAction,
    selected, drawerOpen, openDetail, closeDetail,
    toast,
    can,
  } = useRoleDashboard(user);

  const roleName = roleObj?.name ?? user?.role ?? "Dashboard";

  return (
    <div className="layout">
      <ToastNotification message={toast?.msg} type={toast?.type} />

      {/* Action confirmation modal */}
      <ActionModal
        modal={actionModal}
        note={actionNote}
        setNote={setActionNote}
        onConfirm={confirmAction}
        onClose={closeActionModal}
      />

      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        {/* Page header */}
        <div className="rd-page-header">
          <div>
            <h1 className="rd-page-title">{roleName} Dashboard</h1>
            <p className="rd-page-subtitle">
              Complaints assigned to your role · {filtered.length} active
            </p>
          </div>
          {/* Sort control */}
          <div className="rd-sort-row">
            <label className="rd-sort-label">Sort by</label>
            <select
              className="rd-sort-select"
              value={sortKey}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="days">Days Pending</option>
              <option value="priority">Priority</option>
              <option value="grn">GRN</option>
            </select>
          </div>
        </div>

        {/* Stat cards */}
        <div className="rd-stats-grid">
          {[
            { label: "Total Assigned", value: stats.total,    color: "blue"   },
            { label: "Critical",       value: stats.critical, color: "red"    },
            { label: "High Priority",  value: stats.high,     color: "orange" },
            { label: "Medium / Low",   value: stats.medium + stats.low, color: "green" },
          ].map((s) => (
            <div key={s.label} className={`rd-stat-card rd-stat-card--${s.color}`}>
              <div className="rd-stat-value">{s.value}</div>
              <div className="rd-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="rd-toolbar">
          <div className="rd-tabs">
            {[
              { key: "all",      label: "All" },
              { key: "critical", label: "Critical" },
              { key: "high",     label: "High Priority" },
              { key: "pending",  label: "Pending > 3 days" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`rd-tab${activeTab === key ? " rd-tab--active" : ""}`}
                onClick={() => handleTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            className="rd-search"
            placeholder="Search GRN, subject, name…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Complaints table */}
        <div className="rd-card">
          {paged.length === 0 ? (
            <div className="rd-empty">
              <span>No complaints found for current filters.</span>
            </div>
          ) : (
            <table className="rd-table">
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th>Filed By</th>
                  <th>Priority</th>
                  <th>Current Stage</th>
                  <th>Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((complaint) => {
                  const stage   = getStageFor(complaint);
                  const actions = getActionsFor(complaint);
                  const days    = daysAtCurrentStage(complaint);

                  return (
                    <tr key={complaint.id}>
                      <td>
                        <button
                          className="rd-grn-link"
                          onClick={() => openDetail(complaint)}
                        >
                          {complaint.grn}
                        </button>
                      </td>
                      <td className="rd-subject">{complaint.subject}</td>
                      <td className="rd-filed-by">{complaint.filedBy.name}</td>
                      <td><PriorityBadge priority={complaint.priority} /></td>
                      <td>
                        <span className="rd-stage-chip">
                          {stage?.name ?? "—"}
                        </span>
                      </td>
                      <td><DaysPill days={days} /></td>
                      <td>
                        <div className="rd-action-btns">
                          {actions.map((action) => (
                            can(user, action.key) && (
                              <button
                                key={action.id}
                                className={`rd-action-btn${action.isTerminal ? " rd-action-btn--terminal" : ""}`}
                                onClick={() => openActionModal(complaint, action)}
                              >
                                {action.label}
                              </button>
                            )
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        )}
      </div>

      {/* Detail drawer */}
      <Drawer
        title={selected?.grn ?? "Complaint Detail"}
        onClose={closeDetail}
        open={drawerOpen}
      >
        {selected && (
          <div className="rd-detail">
            <div className="rd-detail-section">
              <div className="rd-detail-row">
                <span className="rd-detail-label">Subject</span>
                <span className="rd-detail-val">{selected.subject}</span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Description</span>
                <span className="rd-detail-val">{selected.description}</span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Filed By</span>
                <span className="rd-detail-val">
                  {selected.filedBy.name} · {selected.filedBy.email}
                </span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Priority</span>
                <PriorityBadge priority={selected.priority} />
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Current Stage</span>
                <span className="rd-stage-chip">
                  {getStageFor(selected)?.name ?? "—"}
                </span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Workflow</span>
                <span className="rd-detail-val">
                  {getWorkflowFor(selected)?.name ?? "—"}
                </span>
              </div>
              <div className="rd-detail-row">
                <span className="rd-detail-label">Filed On</span>
                <span className="rd-detail-val">{selected.createdAt}</span>
              </div>
            </div>

            <div className="rd-detail-section-title">History</div>
            <HistoryTimeline history={selected.history} />

            {/* Available actions in drawer too */}
            <div className="rd-detail-section-title">Available Actions</div>
            <div className="rd-detail-actions">
              {getActionsFor(selected).map((action) => (
                <button
                  key={action.id}
                  className={`rd-action-btn${action.isTerminal ? " rd-action-btn--terminal" : ""}`}
                  onClick={() => { closeDetail(); openActionModal(selected, action); }}
                >
                  {action.label}
                </button>
              ))}
              {getActionsFor(selected).length === 0 && (
                <p className="rd-detail-empty">No actions available at this stage.</p>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

import React, { useMemo } from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import Drawer from "../shared/Drawer";
import Modal from "../shared/Modal";
import { useRegistryDashboard } from "./hooks/useRegistryDashboard";
import { HEARINGS, BOARD_MEMBERS } from "./helpfunction/constants";
import "./styles/RegistryDashboard.css";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const STATS = [
  { label: "Total Complaints",       icon: "📋", value: 245, sub: "↑ 18% from last month", positive: true  },
  { label: "Pending Registration",   icon: "⏱",  value: 12,  sub: "↓ 25% reduction",       positive: true  },
  { label: "Orders Published Today", icon: "✅",  value: 8,   sub: "3 pending review",       positive: false },
  { label: "Notices Dispatched",     icon: "✉️",  value: 34,  sub: "This week",              positive: false },
  { label: "Awaiting Filing",        icon: "📁",  value: 6,   sub: "Avg 2.3 days",           positive: false },
  { label: "Weekly Inflow",          icon: "📈",  value: 45,  sub: "38 outflow",             positive: false },
];

function buildCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let day = 1 - firstDay;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++, day++) {
      week.push(day >= 1 && day <= daysInMonth ? day : null);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function RegistryDashboard({ user, onLogout }) {
  const {
    activeTab, setActiveTab,
    scheduleOpen, setScheduleOpen,
    selectedHearing, setSelectedHearing,
    drawerOpen, setDrawerOpen,
    toast, copied,
    showToast, copyVcLink,
    calendarYear, setCalendarYear,
    calendarMonth, setCalendarMonth,
  } = useRegistryDashboard();

  const today = new Date();

  const calendarWeeks = useMemo(
    () => buildCalendarWeeks(calendarYear, calendarMonth),
    [calendarYear, calendarMonth],
  );

  const hearingsByDay = useMemo(() => {
    const map = {};
    HEARINGS.forEach((h) => {
      const d = new Date(h.date);
      if (d.getFullYear() === calendarYear && d.getMonth() === calendarMonth) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(h);
      }
    });
    return map;
  }, [calendarYear, calendarMonth]);

  const isToday = (day) =>
    day !== null &&
    today.getFullYear() === calendarYear &&
    today.getMonth() === calendarMonth &&
    today.getDate() === day;

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">

        <PageHeader
          title="Registry &amp; Scheduling"
          subtitle="Manage hearing schedules and notifications"
          actions={<>
            <button className="btn btn--default">🔔 View Notifications</button>
            <button className="btn btn--primary" onClick={() => setScheduleOpen(true)}>
              📅 Schedule Hearing
            </button>
          </>}
        />

        {/* Stats — 6 cards */}
        <div className="stats-row registry-stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="card registry-stat-card">
              <div className="rsc-label">{s.label}</div>
              <div className="rsc-value">{s.icon} {s.value}</div>
              <div className={`rsc-sub${s.positive ? " rsc-sub--positive" : ""}`}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className="tabs__nav">
            {[
              ["calendar", "📅 Calendar View"],
              ["hearings", "📋 Scheduled Hearings"],
              ["members",  "👥 Board Member Availability"],
            ].map(([k, l]) => (
              <button
                key={k}
                className={`tab-btn${activeTab === k ? " tab-btn--active" : ""}`}
                onClick={() => setActiveTab(k)}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Calendar View */}
          {activeTab === "calendar" && (
            <div className="card">
              <div className="cal-controls">
                <select
                  className="select"
                  style={{ width: 90 }}
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(Number(e.target.value))}
                >
                  {[2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <select
                  className="select"
                  style={{ width: 120 }}
                  value={calendarMonth}
                  onChange={(e) => setCalendarMonth(Number(e.target.value))}
                >
                  {MONTH_NAMES.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
                <button className="btn btn--primary btn--sm">Month</button>
                <button className="btn btn--ghost btn--sm">Year</button>
              </div>

              <table className="cal-grid">
                <thead>
                  <tr>
                    {DAY_LABELS.map((d) => <th key={d}>{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {calendarWeeks.map((week, wi) => (
                    <tr key={wi}>
                      {week.map((day, di) => (
                        <td
                          key={di}
                          className={[
                            "cal-td",
                            day === null  ? "cal-td--empty" : "",
                            isToday(day) ? "cal-td--today" : "",
                          ].filter(Boolean).join(" ")}
                        >
                          {day !== null && (
                            <>
                              <div className="cal-day-num">
                                {String(day).padStart(2, "0")}
                              </div>
                              {(hearingsByDay[day] || []).map((h, hi) => (
                                <div key={hi} className="cal-event">
                                  {h.time} - {h.grn.split("/").pop()}
                                </div>
                              ))}
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Scheduled Hearings */}
          {activeTab === "hearings" && (
            <div className="card">
              <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
                <table>
                  <thead>
                    <tr>
                      <th>GRN</th>
                      <th>Date &amp; Time</th>
                      <th>Bench</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HEARINGS.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: "center", padding: 24, color: "var(--text-secondary)" }}>
                          No hearings found.
                        </td>
                      </tr>
                    ) : HEARINGS.map((h) => (
                      <tr key={h.key}>
                        <td><span className="hearing-grn">{h.grn}</span></td>
                        <td>
                          <div className="hearing-date">{h.date}</div>
                          <div className="hearing-time">{h.time}</div>
                        </td>
                        <td>{h.bench}</td>
                        <td>
                          <div className="hearing-status">
                            <span className="hearing-status__dot" />
                            {h.status}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <button
                              className="btn btn--link btn--sm"
                              style={{ display: "flex", alignItems: "center", gap: 4 }}
                              onClick={() => { setSelectedHearing(h); setDrawerOpen(true); }}
                            >
                              👁 View
                            </button>
                            <button className="btn btn--link btn--sm">Edit</button>
                            <button
                              className="btn btn--link btn--sm"
                              onClick={() => copyVcLink(h.vcLink, h.key)}
                            >
                              {copied === h.key ? "✓ Copied" : "Copy VC Link"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Board Member Availability */}
          {activeTab === "members" && (
            <div className="card">
              {BOARD_MEMBERS.map((m) => (
                <div key={m.id} className="board-member-row">
                  <div>
                    <div className="board-member-name">{m.name}</div>
                    <div className="board-member-role">{m.role}</div>
                  </div>
                  <span className={m.available ? "avail--available" : "avail--busy"}>
                    {m.available ? "available" : "busy"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hearing Detail Drawer */}
      {drawerOpen && selectedHearing && (
        <Drawer
          title="Hearing Details"
          onClose={() => setDrawerOpen(false)}
          footer={<>
            <button
              className="btn btn--default"
              onClick={() => { showToast("Notifications resent to all parties"); }}
            >
              ▷ Resend Notifications
            </button>
            <button
              className="btn btn--primary"
              onClick={() => { showToast("Joining hearing room..."); setDrawerOpen(false); }}
            >
              📹 Join Hearing Room
            </button>
          </>}
        >
          {/* Info table */}
          <table className="hd-table">
            <tbody>
              <tr>
                <td className="hd-label">GRN</td>
                <td className="hd-value hd-value--bold">{selectedHearing.grn}</td>
              </tr>
              <tr>
                <td className="hd-label">Date</td>
                <td className="hd-value">{selectedHearing.date}</td>
              </tr>
              <tr>
                <td className="hd-label">Time</td>
                <td className="hd-value">{selectedHearing.time}</td>
              </tr>
              <tr>
                <td className="hd-label">Bench</td>
                <td className="hd-value">{selectedHearing.bench}</td>
              </tr>
              <tr>
                <td className="hd-label">Status</td>
                <td className="hd-value">
                  <span className="hearing-status">
                    <span className="hearing-status__dot" />
                    {selectedHearing.status}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="hd-label">Bharat VC Link</td>
                <td className="hd-value">
                  <a
                    href={selectedHearing.vcLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vc-link"
                  >
                    {selectedHearing.vcLink}
                  </a>
                  <button
                    className="btn btn--link btn--sm"
                    style={{ marginLeft: 8 }}
                    onClick={() => copyVcLink(selectedHearing.vcLink, "drawer")}
                  >
                    {copied === "drawer" ? "✓ Copied" : "Copy"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Case Information */}
          <div className="hd-section">
            <div className="hd-section-title">Case Information</div>
            <p className="hd-desc">
              This hearing is scheduled for grievance {selectedHearing.grn}. The hearing will be
              conducted via Bharat VC platform. All parties have been notified via SMTP and push
              notifications.
            </p>
            <p className="hd-desc">
              <strong>Hearing Room:</strong> Virtual Court Room - {selectedHearing.bench}
            </p>
          </div>

          {/* Notifications Sent */}
          <div className="hd-section">
            <div className="hd-section-title">Notifications Sent</div>
            {[
              { party: "Data Principal", type: "SMTP + SMS", status: "Delivered" },
              { party: "Respondent",     type: "SMTP",       status: "Delivered" },
              { party: "Board Members",  type: "SMTP + FCM", status: "Delivered" },
            ].map((n) => (
              <div key={n.party} className="hd-notif-row">
                <div>
                  <div className="hd-notif-party">{n.party}</div>
                  <div className="hd-notif-type">Type: {n.type}</div>
                </div>
                <span className="hd-notif-status">{n.status}</span>
              </div>
            ))}
          </div>
        </Drawer>
      )}

      {/* Schedule Hearing Modal */}
      {scheduleOpen && (
        <Modal
          title="Schedule Hearing"
          onClose={() => setScheduleOpen(false)}
          maxWidth={600}
          footer={<>
            <button className="btn btn--default" onClick={() => setScheduleOpen(false)}>Cancel</button>
            <button
              className="btn btn--primary"
              onClick={() => { showToast("Hearing scheduled and VC link generated"); setScheduleOpen(false); }}
            >
              Schedule &amp; Generate VC
            </button>
          </>}
        >
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label form-label--required">GRN</label>
              <input className="input" placeholder="Enter GRN..." />
            </div>
            <div className="form-group">
              <label className="form-label form-label--required">Hearing Date</label>
              <input type="date" className="input" />
            </div>
            <div className="form-group">
              <label className="form-label form-label--required">Time</label>
              <input type="time" className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Bench</label>
              <select className="select">
                <option>Bench A</option>
                <option>Bench B</option>
              </select>
            </div>
          </div>
          <div className="alert alert--info mt-2">
            📹 Bharat VC link will be auto-generated after scheduling.
          </div>
        </Modal>
      )}
    </div>
  );
}


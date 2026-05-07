import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import StatCard from "../shared/StatCard";
import {
  MONTHLY,
  CATEGORIES,
  BAR_COLORS,
  RESOLUTION_DISTRIBUTION,
  TOP_RESPONDENTS,
} from "./helpfunction/constants";
import "./styles/AnalyticsDashboard.css";

export default function AnalyticsDashboard({ user, onLogout }) {
  const maxMonthly = Math.max(...MONTHLY.map((m) => m.filed));

  return (
    <div className="layout">
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Analytics Dashboard"
          subtitle="Data Protection Board performance metrics"
          actions={<>
            <select className="select" style={{ width: 130 }}><option>This Year</option><option>Last 6 Months</option></select>
            <button className="btn btn--default">⬇ Export Report</button>
          </>}
        />

        <div className="stats-row">
          <StatCard icon="📋" value={412} label="Total Grievances" sub="↑ 18% from last quarter" />
          <StatCard icon="✅" value={298} label="Resolved" sub="72% resolution rate" />
          <StatCard icon="⏱" value={34} label="Avg. Resolution Days" sub="Target: 30 days" />
          <StatCard icon="📅" value={189} label="Hearings Conducted" sub="This year" />
          <StatCard icon="📄" value={156} label="Orders Passed" sub="82% of hearings" />
          <StatCard icon="🏢" value={43} label="Data Fiduciaries" sub="Registered" />
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card__header">
              <span className="card__title">Monthly Grievances Filed vs Resolved</span>
            </div>
            <div className="card__body">
              <div className="bar-chart-container">
                {MONTHLY.map((m) => (
                  <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", width: "100%" }}>
                      <div
                        style={{
                          flex: 1, background: "var(--primary)",
                          borderRadius: "3px 3px 0 0",
                          height: `${(m.filed / maxMonthly) * 120}px`, minHeight: 4,
                        }}
                        title={`Filed: ${m.filed}`}
                      />
                      <div
                        style={{
                          flex: 1, background: "var(--success)",
                          borderRadius: "3px 3px 0 0",
                          height: `${(m.resolved / maxMonthly) * 120}px`, minHeight: 4,
                        }}
                        title={`Resolved: ${m.resolved}`}
                      />
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.month}</div>
                  </div>
                ))}
              </div>
              <div className="bar-chart-legend">
                <span className="bar-chart-legend__item">
                  <span className="bar-chart-legend__dot" style={{ background: "var(--primary)" }} />Filed
                </span>
                <span className="bar-chart-legend__item">
                  <span className="bar-chart-legend__dot" style={{ background: "var(--success)" }} />Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">Grievances by Category</span>
            </div>
            <div className="card__body">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CATEGORIES.map((c, i) => (
                  <div key={c.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13 }}>{c.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: BAR_COLORS[i] }}>
                        {c.count} ({c.pct}%)
                      </span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${c.pct}%`, background: BAR_COLORS[i] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid-2 mt-6">
          <div className="card">
            <div className="card__header">
              <span className="card__title">Resolution Time Distribution</span>
            </div>
            <div className="card__body">
              {RESOLUTION_DISTRIBUTION.map((r) => (
                <div key={r.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{r.pct}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${r.pct}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">Top Respondents (by Complaints)</span>
            </div>
            <div className="card__body">
              {TOP_RESPONDENTS.map((r, i) => (
                <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="respondent-rank">{i + 1}</div>
                    <span style={{ fontSize: 13 }}>{r.name}</span>
                  </div>
                  <span className="tag tag--red">{r.count} cases</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

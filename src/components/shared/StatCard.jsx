import React from "react";

/**
 * StatCard — reusable stat card used in every dashboard's stats-row.
 *
 * Props:
 *   icon      {string}   — emoji icon
 *   value     {string|number}
 *   suffix    {string}   — shown as "/ suffix" (optional)
 *   label     {string}   — label below value
 *   color     {string}   — CSS color for value text (optional)
 *   trend     {string}   — small trend line below label (optional)
 *   sub       {string}   — sub-label line (optional)
 *   onClick   {fn}       — makes card clickable (optional)
 *   active    {boolean}  — highlights card with primary outline (optional)
 */
export default function StatCard({ icon, value, suffix, label, color, trend, sub, onClick, active }) {
  return (
    <div
      className="card"
      style={{
        cursor: onClick ? "pointer" : undefined,
        outline: active ? "2px solid var(--primary)" : undefined,
      }}
      onClick={onClick}
    >
      <div className="stat-card">
        <div className="stat-card__value" style={color ? { color } : undefined}>
          {icon} {value}
          {suffix && <span className="stat-card__suffix">/ {suffix}</span>}
        </div>
        <div className="stat-card__label">{label}</div>
        {trend && <div className="stat-trend">{trend}</div>}
        {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

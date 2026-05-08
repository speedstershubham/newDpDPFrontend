import React, { useState } from "react";
import { SLA_RULES_DATA } from "./helpfunction/constants";

export default function SlaEscalation() {
  const [rules, setRules] = useState(SLA_RULES_DATA);

  const toggleRule = (id) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="sa-card">
      <div className="sa-card-toolbar">
        <button className="sa-btn-create">+ Add Escalation Rule</button>
      </div>
      <div className="sla-info-banner">
        <span className="sla-info-icon">⏱</span>
        <div>
          <div className="sla-info-title">Service Level Agreements</div>
          <div className="sla-info-desc">
            Configure SLA timers and automatic escalation rules for each workflow stage.
          </div>
        </div>
      </div>
      <table className="sa-table">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Trigger Condition</th>
            <th>Escalation Action</th>
            <th>Notification</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>
                <span className="sla-stage-badge">{rule.stage}</span>
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#f97316", fontSize: 13 }}>⏱</span>
                  <span style={{ fontSize: 13 }}>{rule.trigger}</span>
                </div>
              </td>
              <td style={{ fontWeight: 600, fontSize: 13.5 }}>{rule.action}</td>
              <td>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {rule.notifications.map((n) => (
                    <span key={n} className={`sla-notif sla-notif--${n.toLowerCase()}`}>
                      {n}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <button
                  className={`rr-toggle${rule.enabled ? " rr-toggle--on" : ""}`}
                  onClick={() => toggleRule(rule.id)}
                  aria-label={rule.enabled ? "Disable" : "Enable"}
                >
                  <span className="rr-toggle-thumb" />
                </button>
              </td>
              <td>
                <div className="sa-actions">
                  <button className="sa-action-btn">✏ Edit</button>
                  <button className="sa-action-btn sa-action-btn--danger">🗑 Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

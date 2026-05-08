import React, { useState } from "react";
import { ROUTING_RULES_DATA } from "./helpfunction/constants";

export default function RoutingRules() {
  const [rules, setRules] = useState(ROUTING_RULES_DATA);

  const toggleRule = (id) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="sa-card">
      <div className="sa-card-toolbar">
        <button className="sa-btn-create">+ Add Rule</button>
      </div>
      <table className="sa-table">
        <thead>
          <tr>
            <th>Rule Name</th>
            <th>Condition</th>
            <th>Action</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td style={{ fontWeight: 600, fontSize: 13.5 }}>{rule.name}</td>
              <td>
                <span className="rr-condition-badge">{rule.condition}</span>
              </td>
              <td style={{ fontSize: 13, color: "#374151" }}>{rule.action}</td>
              <td>
                <span className={`rr-priority rr-priority--${rule.priority.toLowerCase()}`}>
                  {rule.priority}
                </span>
              </td>
              <td>
                <button
                  className={`rr-toggle${rule.enabled ? " rr-toggle--on" : ""}`}
                  onClick={() => toggleRule(rule.id)}
                  aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
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

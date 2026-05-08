import React, { useState } from "react";
import { WORKFLOW_ACTIONS_DATA } from "./helpfunction/constants";

const ACTION_CATEGORIES = [
  { value: "READ",  label: "View/Read operations (non-destructive)",  color: "blue"   },
  { value: "WRITE", label: "Create/Update operations",                color: "blue"   },
  { value: "DELETE",label: "Delete operations (destructive)",          color: "red"    },
  { value: "ADMIN", label: "Administrative operations",                color: "purple" },
];

/* ── Create Workflow Action Modal ─────────────────────────── */
function CreateActionModal({ onClose }) {
  const [actionName, setActionName]   = useState("");
  const [actionKey,  setActionKey]    = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]       = useState("WRITE");

  const handleNameChange = (val) => {
    setActionName(val);
    // auto-generate kebab-case key from name
    setActionKey(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const handleOk = () => {
    if (!actionName.trim() || !actionKey.trim() || !category) return;
    onClose();
  };

  return (
    <div className="cwa-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cwa-modal" role="dialog" aria-modal="true" aria-labelledby="cwa-title">
        {/* Header */}
        <div className="cwa-header">
          <h2 className="cwa-title" id="cwa-title">Create Workflow Action</h2>
          <button className="cwa-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="cwa-body">
          {/* Guidelines banner */}
          <div className="cwa-guidelines">
            <span className="cwa-guidelines-icon">ℹ</span>
            <div>
              <div className="cwa-guidelines-title">Custom Action Guidelines</div>
              <div className="cwa-guidelines-desc">
                Create reusable actions that can be assigned to different workflow stages. Choose clear, descriptive names and appropriate categories.
              </div>
            </div>
          </div>

          {/* Action Name */}
          <div className="cwa-form-group">
            <label className="cwa-label"><span className="cwa-required">*</span> Action Name <span className="cwa-required">*</span></label>
            <input
              className="cwa-input"
              placeholder="e.g., Request Additional Evidence"
              value={actionName}
              onChange={(e) => handleNameChange(e.target.value)}
              autoFocus
            />
            <div className="cwa-hint">User-friendly name displayed in the UI (e.g., 'Request Additional Evidence')</div>
          </div>

          {/* Action Key */}
          <div className="cwa-form-group">
            <label className="cwa-label"><span className="cwa-required">*</span> Action Key <span className="cwa-required">*</span></label>
            <input
              className="cwa-input cwa-input--mono"
              placeholder="e.g., request-additional-evidence"
              value={actionKey}
              onChange={(e) => setActionKey(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            />
            <div className="cwa-hint">Use lowercase letters and hyphens only</div>
            <div className="cwa-hint">Unique identifier in kebab-case (e.g., 'request-additional-evidence')</div>
          </div>

          {/* Description */}
          <div className="cwa-form-group">
            <label className="cwa-label">Description</label>
            <textarea
              className="cwa-textarea"
              placeholder="Describe the purpose and effect of this action"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <div className="cwa-hint">Brief description of what this action does</div>
          </div>

          {/* Category */}
          <div className="cwa-form-group">
            <label className="cwa-label"><span className="cwa-required">*</span> Category <span className="cwa-required">*</span></label>
            <div className="cwa-radio-list">
              {ACTION_CATEGORIES.map((cat) => (
                <label key={cat.value} className="cwa-radio-row">
                  <input
                    type="radio"
                    name="cwa-category"
                    value={cat.value}
                    checked={category === cat.value}
                    onChange={() => setCategory(cat.value)}
                    className="cwa-radio-input"
                  />
                  <span className={`rp-cat-badge rp-cat-badge--${cat.color === "blue" && cat.value === "READ" ? "read" : cat.color === "blue" ? "write" : cat.value.toLowerCase()}`}>
                    {cat.value}
                  </span>
                  <span className="cwa-radio-label">{cat.label}</span>
                </label>
              ))}
            </div>
            <div className="cwa-hint">Select the appropriate category based on the action's impact</div>
          </div>
        </div>

        {/* Footer */}
        <div className="cwa-footer">
          <button className="cwa-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="cwa-btn-ok"
            onClick={handleOk}
            disabled={!actionName.trim() || !actionKey.trim() || !category}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowActions() {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      {createOpen && <CreateActionModal onClose={() => setCreateOpen(false)} />}
      <div className="sa-card">
        <div className="sa-card-toolbar">
          <button className="sa-btn-create" onClick={() => setCreateOpen(true)}>+ Create Action</button>
        </div>
      <div className="wa-info-banner">
        <span className="wa-info-icon">ℹ</span>
        <div>
          <div className="wa-info-title">Workflow Actions Library</div>
          <div className="wa-info-desc">
            Manage custom actions that can be assigned to workflow stages. System actions cannot be deleted.
          </div>
        </div>
      </div>
      <table className="sa-table">
        <thead>
          <tr>
            <th>Action Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {WORKFLOW_ACTIONS_DATA.map((action) => (
            <tr key={action.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{action.name}</span>
                  <span className="wa-system-badge">System</span>
                </div>
              </td>
              <td style={{ fontSize: 13, color: "#374151" }}>{action.description}</td>
              <td>
                <span className={`rp-cat-badge rp-cat-badge--${action.category.toLowerCase()}`}>
                  {action.category}
                </span>
              </td>
              <td>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#6b7280" }}>
                  {action.key}
                </span>
              </td>
              <td>
                <button className="sa-action-btn">✏ Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

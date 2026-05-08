import React, { useState } from "react";
import { FORM_FIELDS_DATA } from "./helpfunction/constants";

const TYPE_COLOR = {
  "Text Input": "purple",
  "Email":      "blue",
  "Dropdown":   "blue",
  "Text Area":  "orange",
};

const FIELD_TYPES = [
  "Text Input", "Email", "Dropdown", "Text Area",
  "Number", "Date", "Checkbox", "File Upload",
];

const TRIGGER_FIELDS = FORM_FIELDS_DATA.map((f) => f.name);

/* ── Add Form Field Modal ───────────────────────────────── */
function AddFieldModal({ onClose, nextOrder }) {
  const [label, setLabel]             = useState("");
  const [displayOrder, setDisplayOrder] = useState(nextOrder);
  const [fieldType, setFieldType]     = useState("");
  const [required, setRequired]       = useState(false);
  const [minLength, setMinLength]     = useState("");
  const [maxLength, setMaxLength]     = useState("");
  const [pattern, setPattern]         = useState("");
  const [conditional, setConditional] = useState(false);
  const [triggerField, setTriggerField] = useState("");
  const [triggerValue, setTriggerValue] = useState("");

  const handleOk = () => {
    if (!label.trim() || !fieldType) return;
    onClose();
  };

  return (
    <div className="aff-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="aff-modal" role="dialog" aria-modal="true" aria-labelledby="aff-title">
        {/* Header */}
        <div className="aff-header">
          <h2 className="aff-title" id="aff-title">Add Form Field</h2>
          <button className="aff-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="aff-body">
          {/* Row: Field Label + Display Order */}
          <div className="aff-row-2">
            <div className="aff-form-group">
              <label className="aff-label"><span className="aff-required">*</span> Field Label</label>
              <input
                className="aff-input"
                placeholder="e.g., Complainant Name"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                autoFocus
              />
            </div>
            <div className="aff-form-group">
              <label className="aff-label"><span className="aff-required">*</span> Display Order</label>
              <input
                className="aff-input"
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
              />
            </div>
          </div>

          {/* Field Type */}
          <div className="aff-form-group">
            <label className="aff-label"><span className="aff-required">*</span> Field Type</label>
            <select
              className="aff-select"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              <option value="">Select field type</option>
              {FIELD_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Validation Rules */}
          <div className="aff-section-title">Validation Rules</div>
          <div className="aff-toggle-row">
            <button
              className={`aff-toggle${required ? " aff-toggle--on" : ""}`}
              onClick={() => setRequired((v) => !v)}
              aria-label="Toggle required"
            >
              <span className="aff-toggle-thumb" />
            </button>
            <span className="aff-toggle-label">Required field</span>
          </div>
          <input
            className="aff-input aff-input--sm"
            placeholder="Min length (e.g., 3)"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
          />
          <input
            className="aff-input aff-input--sm"
            placeholder="Max length (e.g., 500)"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
          <input
            className="aff-input aff-input--sm"
            placeholder="Pattern/Regex (optional)"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />

          {/* Conditional Display */}
          <div className="aff-section-title">Conditional Display</div>
          <div className="aff-toggle-row">
            <button
              className={`aff-toggle${conditional ? " aff-toggle--on" : ""}`}
              onClick={() => setConditional((v) => !v)}
              aria-label="Toggle conditional display"
            >
              <span className="aff-toggle-thumb" />
            </button>
            <span className="aff-toggle-label">Show field conditionally</span>
          </div>
          {conditional && (
            <>
              <div className="aff-cond-hint">Display this field only when:</div>
              <select
                className="aff-select aff-select--sm"
                value={triggerField}
                onChange={(e) => setTriggerField(e.target.value)}
              >
                <option value="">Select trigger field</option>
                {TRIGGER_FIELDS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <select
                className="aff-select aff-select--sm"
                value={triggerValue}
                onChange={(e) => setTriggerValue(e.target.value)}
              >
                <option value="">Select value</option>
                <option value="is-filled">Is filled</option>
                <option value="equals">Equals...</option>
                <option value="not-empty">Is not empty</option>
              </select>
            </>
          )}
          {!conditional && (
            <>
              <select className="aff-select aff-select--sm aff-select--disabled" disabled>
                <option>Select trigger field</option>
              </select>
              <select className="aff-select aff-select--sm aff-select--disabled" disabled>
                <option>Select value</option>
              </select>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="aff-footer">
          <button className="aff-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="aff-btn-ok"
            onClick={handleOk}
            disabled={!label.trim() || !fieldType}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FormFields() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      {addOpen && (
        <AddFieldModal
          onClose={() => setAddOpen(false)}
          nextOrder={FORM_FIELDS_DATA.length + 1}
        />
      )}
      <div className="sa-card">
        <div className="sa-card-toolbar">
          <button className="sa-btn-create" onClick={() => setAddOpen(true)}>+ Add Field</button>
        </div>
        <div className="ff-info-banner">
          <span className="ff-info-icon">ℹ</span>
          <div>
            <div className="ff-info-title">Dynamic Form Configuration</div>
            <div className="ff-info-desc">
              Manage form fields, validation rules, and conditional logic for grievance submission forms.
            </div>
          </div>
        </div>
        <table className="sa-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Field Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Validation</th>
              <th>Conditional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {FORM_FIELDS_DATA.map((field) => (
              <tr key={field.order}>
                <td style={{ color: "#9ca3af", fontSize: 13 }}>{field.order}</td>
                <td style={{ fontWeight: 600, fontSize: 13.5 }}>{field.name}</td>
                <td>
                  <span className={`ff-type-badge ff-type-badge--${TYPE_COLOR[field.type] || "blue"}`}>
                    {field.type}
                  </span>
                </td>
                <td>
                  {field.required ? (
                    <span className="ff-yes">Yes</span>
                  ) : (
                    <span style={{ fontSize: 13, color: "#374151" }}>No</span>
                  )}
                </td>
                <td style={{ fontSize: 13, color: "#374151" }}>{field.validation}</td>
                <td>
                  <span className={field.conditional === "Conditional" ? "ff-conditional" : "ff-always-show"}>
                    {field.conditional}
                  </span>
                </td>
                <td>
                  <div className="sa-actions">
                    <button className="sa-action-btn">✏ Edit</button>
                    <button className="sa-action-btn sa-action-btn--danger">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


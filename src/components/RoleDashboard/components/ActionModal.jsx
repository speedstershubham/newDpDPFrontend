import React, { useState } from "react";

/**
 * ActionModal — confirmation dialog shown when a row action has no onAction
 * handler (i.e. it needs a server-side confirm + optional remarks).
 *
 * Props:
 *   action    — the rowAction config object { key, label, variant }
 *   item      — the row data object
 *   onClose   — cancel handler
 *   onConfirm — (note: string) => void — called with the typed remarks
 */
export default function ActionModal({ action, onClose, onConfirm }) {
  const [note, setNote] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal__header">
          <span className="modal__title">{action.label}</span>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">
          <p className="text-muted mb-4">
            Confirm: <strong>{action.label.toLowerCase()}</strong> this item?
          </p>
          <div className="form-group">
            <label className="form-label">Remarks (optional)</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Enter remarks..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn btn--default" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn btn--${action.variant === "danger" ? "danger" : "primary"}`}
            onClick={() => onConfirm(note)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

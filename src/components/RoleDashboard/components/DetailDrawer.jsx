import React from "react";

/**
 * DetailDrawer — slide-in panel that shows all detailFields for a selected item.
 *
 * Props:
 *   item   — the row data object
 *   config — the role's dashboardConfig (used for detailFields + roleLabel)
 *   onClose — close handler
 */
export default function DetailDrawer({ item, config, onClose }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <span className="rd-drawer-title">
            {item.grn ?? item.id ?? config.roleLabel}
          </span>
          <button className="drawer__close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer__body">
          <dl className="rd-detail-list">
            {config.detailFields.map((f) => (
              <div key={f.label} className="rd-detail-row">
                <dt className="rd-detail-label">{f.label}</dt>
                <dd className="rd-detail-value">{f.getValue(item)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

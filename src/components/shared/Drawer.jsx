import React from "react";

/**
 * Drawer — slide-in detail drawer with overlay.
 *
 * Props:
 *   title     {string}     — drawer heading
 *   onClose   {fn}         — called when overlay or × is clicked
 *   children  {ReactNode}  — drawer body content
 *   footer    {ReactNode}  — drawer footer content (optional)
 *   className {string}     — extra class on drawer (optional)
 *   closePosition {"left"|"right"} — close button position (optional)
 */
export default function Drawer({
  title,
  onClose,
  children,
  footer,
  className = "",
  closePosition = "right",
}) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className={`drawer ${className}`.trim()}>
        <div className="drawer__header">
          {closePosition === "left" && (
            <button className="drawer__close" onClick={onClose} aria-label="Close">
              ×
            </button>
          )}
          <span className="drawer__title">{title}</span>
          {closePosition === "right" && (
            <button className="drawer__close" onClick={onClose} aria-label="Close">
              ×
            </button>
          )}
        </div>
        <div className="drawer__body">{children}</div>
        {footer && <div className="drawer__footer">{footer}</div>}
      </div>
    </>
  );
}

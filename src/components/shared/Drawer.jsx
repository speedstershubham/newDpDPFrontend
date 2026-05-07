import React from "react";

/**
 * Drawer — slide-in detail drawer with overlay.
 *
 * Props:
 *   title     {string}     — drawer heading
 *   onClose   {fn}         — called when overlay or × is clicked
 *   children  {ReactNode}  — drawer body content
 *   footer    {ReactNode}  — drawer footer content (optional)
 */
export default function Drawer({ title, onClose, children, footer }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer__header">
          <span className="drawer__title">{title}</span>
          <button className="drawer__close" onClick={onClose}>×</button>
        </div>
        <div className="drawer__body">{children}</div>
        {footer && <div className="drawer__footer">{footer}</div>}
      </div>
    </>
  );
}

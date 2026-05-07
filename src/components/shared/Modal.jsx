import React from "react";

/**
 * Modal — generic modal overlay wrapper.
 *
 * Props:
 *   title     {string}     — modal title
 *   onClose   {fn}         — called when × is clicked
 *   children  {ReactNode}  — modal body content
 *   footer    {ReactNode}  — modal footer content (optional)
 *   maxWidth  {number}     — max-width in px (default 500)
 */
export default function Modal({ title, onClose, children, footer, maxWidth = 500 }) {
  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth }}>
        <div className="modal__header">
          <span className="modal__title">{title}</span>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

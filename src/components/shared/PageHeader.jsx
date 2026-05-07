import React from "react";

/**
 * PageHeader — shared page header used by all dashboard/page components.
 *
 * Props:
 *   title    {string}      — main heading text (required)
 *   subtitle {string}      — secondary description text (optional)
 *   actions  {ReactNode}   — right-side action buttons / selects (optional)
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <div className="page-header__title">{title}</div>
        {subtitle && <div className="page-header__subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}

import React from "react";

/**
 * Cell — renders one table cell based on the CellDescriptor returned by
 * a column's render() function in roleConfigs.js.
 *
 * Supported descriptor types:
 *   mono | text | tag | badge | deadline | days | status
 */

function DeadlineCell({ date, days }) {
  const over = days < 0;
  return (
    <div className="rd-deadline">
      <span className={`rd-deadline-date${over ? " rd-deadline-date--over" : ""}`}>
        {date}
      </span>
      <span className={`rd-days-pill rd-days-pill--${over ? "red" : "green"}`}>
        {over ? `${days}d` : `+${days}d`}
      </span>
    </div>
  );
}

function DaysPill({ days }) {
  const color = days <= 1 ? "red" : days <= 3 ? "orange" : "green";
  return <span className={`rd-days-pill rd-days-pill--${color}`}>{days}d</span>;
}

export default function Cell({ cell }) {
  if (cell == null) return null;
  const { type } = cell;

  if (type === "mono")
    return <span className="rd-mono">{cell.text}</span>;

  if (type === "text")
    return <span>{cell.text}</span>;

  if (type === "tag")
    return <span className="rd-tag">{cell.text}</span>;

  if (type === "badge")
    return (
      <span className={`rd-badge rd-badge--${cell.color ?? "default"}`}>
        {cell.label}
      </span>
    );

  if (type === "deadline")
    return <DeadlineCell date={cell.date} days={cell.days} />;

  if (type === "days")
    return <DaysPill days={cell.days} />;

  if (type === "status")
    return (
      <span className={`rd-status rd-status--${cell.dot ?? "default"}`}>
        <span className="rd-status-dot" />
        {cell.label}
      </span>
    );

  return <span>{String(cell)}</span>;
}

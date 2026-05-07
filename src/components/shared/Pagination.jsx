import React from "react";

/**
 * Pagination — reusable pagination bar.
 *
 * Props:
 *   page        {number}   — current page (1-indexed)
 *   totalPages  {number}
 *   total       {number}   — total item count
 *   pageSize    {number}   — items per page (default 5)
 *   onPage      {fn}       — called with new page number
 */
export default function Pagination({ page, totalPages, total, pageSize = 5, onPage }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderTop: "1px solid var(--border-solid)",
      }}
    >
      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        Showing {from}–{to} of {total}
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        <button
          className="btn btn--ghost btn--sm"
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
        >
          ‹ Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`btn btn--sm${page === p ? " btn--primary" : " btn--ghost"}`}
            onClick={() => onPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="btn btn--ghost btn--sm"
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}

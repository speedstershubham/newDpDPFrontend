import React from "react";

/**
 * ToastNotification — shared fixed-position toast banner.
 *
 * Props:
 *   message {string}                   — text to display (required)
 *   type    {"success"|"error"|"info"}  — controls background colour (default "success")
 */
export default function ToastNotification({ message, type = "success" }) {
  if (!message) return null;

  const bgMap = {
    success: "var(--success)",
    error: "var(--error)",
    info: "var(--info)",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 24,
        zIndex: 2000,
        background: bgMap[type] ?? bgMap.success,
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-md)",
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}

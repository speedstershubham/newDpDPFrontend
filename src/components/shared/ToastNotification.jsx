import React from "react";

/**
 * ToastNotification — shared fixed-position toast banner.
 *
 * Props:
 *   message {string}                   — text to display (required)
 *   type    {"success"|"error"|"info"}  — controls icon/border colour (default "success")
 */
function IconCheckCircleFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#52c41a" />
      <polyline
        points="7 12.5 10.5 16 17 9"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconErrorCircleFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#ff4d4f" />
      <line
        x1="8"
        y1="8"
        x2="16"
        y2="16"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="8"
        x2="8"
        y2="16"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconInfoCircleFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1677ff" />
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="17"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="1.2" fill="#fff" />
    </svg>
  );
}

const ICON_MAP = {
  success: <IconCheckCircleFilled />,
  error: <IconErrorCircleFilled />,
  info: <IconInfoCircleFilled />,
};

export default function ToastNotification({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        background: "#fff",
        color: "#111827",
        padding: "12px 20px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
        fontSize: 14,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
        minWidth: 240,
      }}
    >
      {ICON_MAP[type] ?? ICON_MAP.success}
      {message}
    </div>
  );
}

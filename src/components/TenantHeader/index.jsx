import React from "react";
import { useNavigate } from "react-router-dom";
import { useLangDropdown } from "./hooks/useLangDropdown";
import { formatRoleName } from "./helpfunction/formatRoleName";
import "./styles/TenantHeader.css";

export default function TenantHeader({ user, onLogout }) {
  const { tenant, langOpen, setLangOpen, selectLanguage } = useLangDropdown();
  const navigate = useNavigate();

  const roleName = formatRoleName(user?.role);

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">{tenant.tenantLogo}</span>
        <div>
          <div className="header__name">{tenant.tenantName}</div>
          {user && <div className="header__role">{roleName}</div>}
        </div>
      </div>

      <div className="header__actions">
        <div style={{ position: "relative" }}>
          <button
            className="btn btn--default btn--sm"
            onClick={() => setLangOpen((o) => !o)}
          >
            🌐 {tenant.language === "en" ? "EN" : "हिं"}
          </button>
          {langOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "var(--radius-sm)",
                minWidth: 100,
                boxShadow: "var(--shadow)",
                zIndex: 200,
              }}
            >
              {[
                ["en", "English"],
                ["hi", "हिन्दी"],
              ].map(([code, label]) => (
                <div
                  key={code}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 14,
                    background:
                      tenant.language === code
                        ? "var(--surface-hover)"
                        : "transparent",
                  }}
                  onClick={() => selectLanguage(code)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {user && (
          <>
            <button className="btn btn--ghost btn--sm">🔔</button>
            <button
              className="btn btn--default btn--sm"
              onClick={() => navigate(`/${user.role}/profile`)}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              👤 {user.name}
            </button>
            <button className="btn btn--default btn--sm" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

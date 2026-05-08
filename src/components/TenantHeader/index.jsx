import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLangDropdown } from "./hooks/useLangDropdown";
import { formatRoleName } from "./helpfunction/formatRoleName";
import "./styles/TenantHeader.css";

export default function TenantHeader({ user, onLogout, notifCount = 5 }) {
  const { tenant, langOpen, setLangOpen, selectLanguage } = useLangDropdown();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const langRef = useRef(null);

  const roleName = formatRoleName(user?.role);
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setLangOpen]);

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
        {/* Language switcher */}
        <div style={{ position: "relative" }} ref={langRef}>
          <button
            className="th-lang-btn"
            onClick={() => setLangOpen((o) => !o)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
            {tenant.language === "en" ? "EN" : "हिं"}
          </button>
          {langOpen && (
            <div className="th-dropdown">
              {[
                ["en", "English"],
                ["hi", "हिन्दी"],
              ].map(([code, label]) => (
                <div
                  key={code}
                  className={`th-dropdown__item${tenant.language === code ? " th-dropdown__item--active" : ""}`}
                  onClick={() => selectLanguage(code)}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bell with count badge */}
        {user && (
          <button className="th-icon-btn" aria-label="Notifications">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {notifCount > 0 && (
              <span className="th-badge">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>
        )}

        {/* Avatar + dropdown */}
        {user && (
          <div className="th-user-wrap" ref={userMenuRef}>
            <button
              className="th-avatar"
              onClick={() => setUserMenuOpen((o) => !o)}
              aria-label="User menu"
            >
              {initial}
            </button>
            {userMenuOpen && (
              <div className="th-user-menu">
                <div
                  className="th-user-menu__item"
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate(`/${user.role}/profile`);
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </div>
                <div
                  className="th-user-menu__item"
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout();
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

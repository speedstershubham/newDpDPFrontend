import React from "react";
import { useTenant } from "../../App";
import TenantHeader from "../TenantHeader";
import { useLoginForm } from "./hooks/useLoginForm";
import { OTP_LENGTH, ID_OPTIONS, OFFICIAL_ROLES } from "./helpfunction/constants";
import "./styles/Login.css";

export default function Login({ onLogin }) {
  const tenant = useTenant();
  const {
    activeTab, setActiveTab,
    citizenStep, setCitizenStep,
    idType, setIdType,
    otp, setOtp,
    citizenErr,
    username, setUsername,
    password, setPassword,
    role, setRole,
    officialErr,
    handleOtpChange,
    handleOtpKeyDown,
    handleCitizenVerify,
    handleOfficialLogin,
  } = useLoginForm(onLogin);

  const citizenLoginPane = (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="steps mb-6">
        {["Select ID Type", "Enter OTP"].map((title, i) => (
          <div
            key={i}
            className={`step${i < citizenStep ? " step--finish" : i === citizenStep ? " step--process" : ""}`}
          >
            <div className="step__dot">{i < citizenStep ? "✓" : i + 1}</div>
            <div className="step__title">{title}</div>
          </div>
        ))}
      </div>

      {citizenStep === 0 ? (
        <>
          <p className="text-muted mb-4">Select your government ID for verification:</p>
          <div className="radio-group mb-4">
            {ID_OPTIONS.map((opt) => (
              <div
                key={opt.value}
                className={`radio-card${idType === opt.value ? " radio-card--selected" : ""}`}
                onClick={() => setIdType(opt.value)}
              >
                <div className="radio-card__dot" />
                <span className="radio-card__icon">{opt.icon}</span>
                <div>
                  <div className="radio-card__label">{opt.label}</div>
                  <div className="radio-card__desc">{opt.description}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn--default btn--block btn--lg mb-4" type="button">
            ☁️ Fetch from DigiLocker
          </button>
          <button
            className="btn btn--primary btn--block btn--lg"
            type="button"
            onClick={handleCitizenVerify}
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <div className="text-center mb-4">
            <p style={{ fontSize: 16 }}>Enter OTP sent to your registered mobile number</p>
            <p className="text-muted">ending with ****89</p>
          </div>
          <div className="otp-group mb-6">
            {otp.map((val, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-input"
                value={val}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              />
            ))}
          </div>
          {citizenErr && (
            <p className="form-error mb-4" style={{ textAlign: "center" }}>{citizenErr}</p>
          )}
          <button
            className="btn btn--primary btn--block btn--lg mb-3"
            type="button"
            onClick={handleCitizenVerify}
          >
            Verify &amp; Login
          </button>
          <button
            className="btn btn--link btn--block"
            type="button"
            onClick={() => { setCitizenStep(0); setOtp(Array(OTP_LENGTH).fill("")); }}
          >
            ← Change ID Type
          </button>
        </>
      )}
    </div>
  );

  const officialLoginPane = (
    <form style={{ maxWidth: 400, margin: "0 auto" }} onSubmit={handleOfficialLogin}>
      <div className="form-group">
        <label className="form-label form-label--required">Username</label>
        <div className="input-wrapper">
          <span className="input-prefix-icon">👤</span>
          <input
            className="input input--lg input--prefix"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label form-label--required">Password</label>
        <div className="input-wrapper">
          <span className="input-prefix-icon">🔒</span>
          <input
            type="password"
            className="input input--lg input--prefix"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Role</label>
        <div className="radio-group">
          {OFFICIAL_ROLES.map((r) => (
            <label
              key={r.value}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}
            >
              <input
                type="radio"
                name="officialRole"
                value={r.value}
                checked={role === r.value}
                onChange={() => setRole(r.value)}
                style={{ accentColor: "var(--primary)" }}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>
      {officialErr && <p className="form-error mb-4">{officialErr}</p>}
      <button type="submit" className="btn btn--primary btn--block btn--lg">
        Login with OTP
      </button>
      <p className="text-center text-muted mt-4">
        📱 Multi-factor authentication required
        <br />
        Session timeout: 15 minutes of inactivity
      </p>
    </form>
  );

  return (
    <div className="login-page">
      <TenantHeader />
      <div className="login-hero">
        <div className="login-hero__logo">{tenant.tenantLogo}</div>
        <h1 className="login-hero__title">{tenant.tenantName}</h1>
        <p className="login-hero__subtitle">Digital Adjudication Portal</p>
      </div>
      <div className="login-card-wrap">
        <div className="card">
          <div className="card__body">
            <div className="tabs">
              <div className="tabs__nav tabs__nav--centered">
                <button
                  className={`tab-btn${activeTab === "citizen" ? " tab-btn--active" : ""}`}
                  onClick={() => setActiveTab("citizen")}
                >
                  Citizen Login
                </button>
                <button
                  className={`tab-btn${activeTab === "official" ? " tab-btn--active" : ""}`}
                  onClick={() => setActiveTab("official")}
                >
                  Official Login
                </button>
              </div>
              <div>{activeTab === "citizen" ? citizenLoginPane : officialLoginPane}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer">Powered by DPDP Act 2023 | Version 1.0.0</div>
    </div>
  );
}

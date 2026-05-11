import { useState } from "react";
import { OTP_LENGTH, getRoleId } from "../helpfunction/constants";
import { ROLE_CONFIGS } from "../../RoleDashboard/roleConfigs";

/**
 * Simulates what a real backend login response would look like.
 * The backend returns: { role, roleId, id, name, email, tenantId, dashboardConfig }
 * dashboardConfig drives what stat-cards and table columns appear — no extra front-end
 * code is needed when a new role is added.
 */
function buildUserFromBackend(role, extra = {}) {
  return {
    role,
    roleId:          getRoleId(role),
    id:              `user-${Date.now()}`,
    tenantId:        "tenant-dpdp",
    // The backend returns this — locally we look it up from ROLE_CONFIGS
    // In production: replace ROLE_CONFIGS[role] with the API response field
    dashboardConfig: ROLE_CONFIGS[role] ?? null,
    ...extra,
  };
}
export function useLoginForm(onLogin) {
  const [activeTab, setActiveTab] = useState("citizen");
  const [citizenStep, setCitizenStep] = useState(0);
  const [idType, setIdType] = useState("aadhaar");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [citizenErr, setCitizenErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("scrutiny");
  const [officialErr, setOfficialErr] = useState("");

  const handleOtpChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < OTP_LENGTH - 1) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleCitizenVerify = () => {
    setCitizenErr("");
    if (citizenStep === 0) {
      setCitizenStep(1);
    } else {
      const code = otp.join("");
      if (code.length < OTP_LENGTH) {
        setCitizenErr("Please enter the complete 6-digit OTP.");
        return;
      }
      onLogin(buildUserFromBackend("data-principal", { name: "Rahul Kumar", idType }));
    }
  };

  const handleOfficialLogin = (e) => {
    e.preventDefault();
    setOfficialErr("");
    if (!username.trim()) {
      setOfficialErr("Please enter your username.");
      return;
    }
    if (!password.trim()) {
      setOfficialErr("Please enter your password.");
      return;
    }
    onLogin(buildUserFromBackend(role, { name: username, email: username }));
  };

  return {
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
  };
}

import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import StatCard from "../shared/StatCard";
import Modal from "../shared/Modal";
import { usePlatformSuperAdmin } from "./hooks/usePlatformSuperAdmin";
import { TENANTS, PLATFORM_SERVICES, MONITORING_METRICS } from "./helpfunction/constants";
import "./styles/PlatformSuperAdmin.css";

export default function PlatformSuperAdmin({ user, onLogout }) {
  const { activeTab, setActiveTab, addTenantOpen, setAddTenantOpen, toast, showToast } =
    usePlatformSuperAdmin();

  return (
    <div className="layout">
      <ToastNotification message={toast} />

      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Platform Super Admin"
          subtitle="Manage tenants and platform-level configuration"
          actions={<button className="btn btn--primary" onClick={() => setAddTenantOpen(true)}>+ Onboard Tenant</button>}
        />

        <div className="stats-row">
          <StatCard icon="🏛️" value={1} label="Active Tenants" />
          <StatCard icon="👥" value={29} label="Total Users" />
          <StatCard icon="✅" value="99.9%" label="Platform Uptime" />
          <StatCard icon="📡" value="12.4K" label="API Calls Today" />
        </div>

        <div className="tabs">
          <div className="tabs__nav">
            {[["tenants", "🏛️ Tenants"], ["platform", "⚙️ Platform Config"], ["monitoring", "📊 Monitoring"]].map(
              ([k, l]) => (
                <button key={k} className={`tab-btn${activeTab === k ? " tab-btn--active" : ""}`} onClick={() => setActiveTab(k)}>
                  {l}
                </button>
              )
            )}
          </div>

          {activeTab === "tenants" && (
            <div className="card">
              <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
                <table>
                  <thead>
                    <tr><th>Tenant Name</th><th>Domain</th><th>Users</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {TENANTS.map((t) => (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 500 }}>{t.name}</td>
                        <td>{t.domain}</td>
                        <td>{t.users}</td>
                        <td>
                          <span className={`badge badge--${t.status === "active" ? "success" : "default"}`}>
                            {t.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button className="btn btn--link btn--sm">Configure</button>
                            <button className="btn btn--link btn--sm" style={{ color: "var(--error)" }}>
                              {t.status === "active" ? "Suspend" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "platform" && (
            <div className="card">
              <div className="card__body">
                <div className="grid-2">
                  {PLATFORM_SERVICES.map(([name, status]) => (
                    <div key={name} className="card" style={{ background: "#fafafa" }}>
                      <div className="card__body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
                        <span style={{ fontWeight: 500, fontSize: 14 }}>{name}</span>
                        <span style={{ fontSize: 13, color: "var(--success)" }}>{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "monitoring" && (
            <div className="card">
              <div className="card__body">
                <div className="grid-2">
                  {MONITORING_METRICS.map((m) => (
                    <div key={m.label} className={`card monitoring-card--${m.ok ? "ok" : "error"}`}>
                      <div className="stat-card">
                        <div className="stat-card__value" style={{ color: m.ok ? "var(--success)" : "var(--error)" }}>
                          {m.value}
                        </div>
                        <div className="stat-card__label">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Onboard Tenant Modal */}
      {addTenantOpen && (
        <Modal title="Onboard New Tenant" onClose={() => setAddTenantOpen(false)}
          footer={<><button className="btn btn--default" onClick={() => setAddTenantOpen(false)}>Cancel</button><button className="btn btn--primary" onClick={() => { showToast("Tenant onboarded successfully"); setAddTenantOpen(false); }}>Onboard Tenant</button></>}
        >
          <div className="form-group"><label className="form-label form-label--required">Organization Name</label><input className="input" placeholder="e.g. Ministry of Electronics" /></div>
          <div className="form-group"><label className="form-label form-label--required">Domain</label><input className="input" placeholder="e.g. meity.gov.in" /></div>
          <div className="form-group"><label className="form-label form-label--required">Admin Email</label><input type="email" className="input" placeholder="Admin email" /></div>
        </Modal>
      )}
    </div>
  );
}

import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import ToastNotification from "../shared/ToastNotification";
import Modal from "../shared/Modal";
import { usePlatformSuperAdmin } from "./hooks/usePlatformSuperAdmin";
import { TENANTS, SYSTEM_HEALTH, RECENT_ACTIVITY } from "./helpfunction/constants";
import "./styles/PlatformSuperAdmin.css";

export default function PlatformSuperAdmin({ user, onLogout }) {
  const {
    provisionOpen, provisionStep, setProvisionStep,
    openProvision, closeProvision,
    toast, showToast,
  } = usePlatformSuperAdmin();

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        <PageHeader
          title="Platform Super Admin"
          subtitle="Multi-tenant platform management"
          actions={
            <button className="btn btn--primary" onClick={openProvision}>
              + Provision New Tenant
            </button>
          }
        />

        {/* Stat Cards */}
        <div className="psa-stats-row">
          <div className="psa-stat-card">
            <div className="psa-stat-card__label">Total Tenants</div>
            <div className="psa-stat-card__body">
              <span className="psa-stat-card__icon">🏛️</span>
              <span className="psa-stat-card__value">{TENANTS.length}</span>
            </div>
          </div>
          <div className="psa-stat-card">
            <div className="psa-stat-card__label">Total Users</div>
            <div className="psa-stat-card__body">
              <span className="psa-stat-card__icon psa-stat-card__icon--blue">👥</span>
              <span className="psa-stat-card__value psa-stat-card__value--blue">
                {TENANTS.reduce((s, t) => s + t.users, 0)}
              </span>
            </div>
          </div>
          <div className="psa-stat-card">
            <div className="psa-stat-card__label">Total Grievances</div>
            <div className="psa-stat-card__body">
              <span className="psa-stat-card__icon psa-stat-card__icon--green">📄</span>
              <span className="psa-stat-card__value psa-stat-card__value--green">
                {TENANTS.reduce((s, t) => s + t.grievances, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="psa-stat-card">
            <div className="psa-stat-card__label">System Uptime</div>
            <div className="psa-stat-card__body">
              <span className="psa-stat-card__value psa-stat-card__value--green">99.9 %</span>
            </div>
          </div>
        </div>

        {/* Tenant Overview Table */}
        <div className="card mb-6">
          <div className="card__header">
            <span className="card__title">Tenant Overview</span>
          </div>
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>Tenant Name</th>
                  <th>Status</th>
                  <th>Users</th>
                  <th>Grievances</th>
                  <th>Storage Used</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {TENANTS.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600 }}>{t.name}</td>
                    <td>
                      <span className={`badge badge--${t.status === "active" ? "success" : "default"}`}>
                        {t.status === "active" ? "Active" : "Onboarding"}
                      </span>
                    </td>
                    <td>{t.users}</td>
                    <td>{t.grievances}</td>
                    <td>
                      <div className="psa-storage-wrap">
                        <div className="psa-storage-bar">
                          <div className="psa-storage-fill" style={{ width: `${t.storageUsed}%` }} />
                        </div>
                        <span className="psa-storage-pct">{t.storageUsed}%</span>
                      </div>
                    </td>
                    <td>{t.created}</td>
                    <td>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <button className="btn btn--link btn--sm psa-action-link">
                          👁 View
                        </button>
                        <button className="btn btn--link btn--sm psa-action-link">
                          ⚙ Configure
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health + Recent Activity */}
        <div className="grid-2">
          <div className="card">
            <div className="card__header">
              <span className="card__title">System Health</span>
            </div>
            <div className="card__body">
              {SYSTEM_HEALTH.map((m) => (
                <div key={m.label} className="psa-health-row">
                  <div className="psa-health-label">{m.label}</div>
                  <div className="psa-health-bar-wrap">
                    <div className="psa-health-bar">
                      <div
                        className="psa-health-fill"
                        style={{ width: `${m.percent}%`, background: m.color }}
                      />
                    </div>
                    <span className="psa-health-pct">{m.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <span className="card__title">Recent Activity</span>
            </div>
            <div className="card__body">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="psa-activity-item">
                  <div className="psa-activity-text">{a.text}</div>
                  <div className="psa-activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Provision New Tenant Modal */}
      {provisionOpen && (
        <Modal
          title=""
          onClose={closeProvision}
          maxWidth={640}
          footer={
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button
                className="btn btn--default"
                onClick={() => provisionStep > 1 ? setProvisionStep(provisionStep - 1) : closeProvision()}
              >
                Previous
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  if (provisionStep < 2) { setProvisionStep(provisionStep + 1); }
                  else { showToast("Tenant provisioned successfully"); closeProvision(); }
                }}
              >
                Next
              </button>
            </div>
          }
        >
          {/* Step banner */}
          <div className="psa-modal-banner">
            <span className="psa-modal-banner__icon">ℹ️</span>
            <div>
              <div className="psa-modal-banner__title">Tenant Basic Information</div>
              <div className="psa-modal-banner__sub">Provide the fundamental details for the new tenant organization</div>
            </div>
          </div>

          {/* Organization Name */}
          <div className="form-group">
            <label className="form-label form-label--required">Organization Name</label>
            <input className="input" placeholder="E.g., State Data Protection Board - Maharashtra" />
          </div>

          {/* Tenant Type */}
          <div className="form-group">
            <label className="form-label form-label--required">Tenant Type</label>
            <select className="input">
              <option>State Data Protection Board</option>
              <option>Central Data Protection Board</option>
              <option>Regulatory Authority</option>
            </select>
          </div>

          {/* Subdomain */}
          <div className="form-group">
            <label className="form-label form-label--required">Tenant Identifier (Subdomain)</label>
            <div className="psa-subdomain-wrap">
              <span className="psa-subdomain-prefix">https://</span>
              <input className="input psa-subdomain-input" placeholder="maharashtra-dpb" />
              <span className="psa-subdomain-suffix">.dpb.gov.in</span>
            </div>
            <div className="form-hint">This will be used for tenant isolation (e.g., maharashtra-dpb)</div>
          </div>

          {/* Registered Address */}
          <div className="form-group">
            <label className="form-label form-label--required">Registered Address</label>
            <textarea className="textarea" rows={3} placeholder="Complete registered office address" />
          </div>

          {/* State/UT */}
          <div className="form-group">
            <label className="form-label form-label--required">State/UT</label>
            <select className="input">
              <option value="">Select state</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Tamil Nadu</option>
              <option>Uttar Pradesh</option>
              <option>Gujarat</option>
              <option>Rajasthan</option>
              <option>West Bengal</option>
            </select>
          </div>

          {/* Contact Email */}
          <div className="form-group">
            <label className="form-label form-label--required">Contact Email</label>
            <input type="email" className="input" placeholder="admin@maharashtra-dpb.gov.in" />
          </div>

          {/* Contact Phone */}
          <div className="form-group">
            <label className="form-label form-label--required">Contact Phone</label>
            <div className="psa-phone-wrap">
              <span className="psa-phone-prefix">+91</span>
              <input className="input psa-phone-input" placeholder="9876543210" maxLength={10} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from "react";
import TenantHeader from "../TenantHeader";
import ToastNotification from "../shared/ToastNotification";
import Modal from "../shared/Modal";
import VisualBuilder from "./VisualBuilder";
import RolesPermissions from "./RolesPermissions";
import RoutingRules from "./RoutingRules";
import FormFields from "./FormFields";
import SlaEscalation from "./SlaEscalation";
import WorkflowActions from "./WorkflowActions";
import { useSystemAdmin } from "./hooks/useSystemAdmin";
import {
  ASSIGNABLE_ROLES,
  MAIN_TABS,
  WORKFLOW_SUB_TABS,
  WORKFLOW_TEMPLATES,
} from "./helpfunction/constants";
import "./styles/SystemAdminDashboard.css";

/* ── Create Workflow Modal ────────────────────────────────── */
const WF_CATEGORIES = ["General", "Data Breach", "Appeal", "Compliance", "Inquiry"];

function CreateWorkflowModal({ onClose, onSave }) {
  const [name, setName]             = useState("");
  const [category, setCategory]     = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus]         = useState("Draft");
  const [stages, setStages]         = useState([]);

  const addStage = () => {
    setStages((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  const updateStage = (id, value) => {
    setStages((prev) => prev.map((s) => s.id === id ? { ...s, name: value } : s));
  };

  const removeStage = (id) => {
    setStages((prev) => prev.filter((s) => s.id !== id));
  };

  const handleOk = () => {
    if (!name.trim()) return;
    onSave && onSave({ name, category, description, status, stages });
    onClose();
  };

  return (
    <div className="cwm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cwm-modal" role="dialog" aria-modal="true" aria-labelledby="cwm-title">
        {/* Header */}
        <div className="cwm-header">
          <h2 className="cwm-title" id="cwm-title">Create New Workflow</h2>
          <button className="cwm-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="cwm-body">
          {/* Row: Name + Category */}
          <div className="cwm-row-2">
            <div className="cwm-form-group">
              <label className="cwm-label"><span className="cwm-required">*</span> Workflow Name</label>
              <input
                className="cwm-input"
                placeholder="e.g., Standard Grievance Workflow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="cwm-form-group">
              <label className="cwm-label"><span className="cwm-required">*</span> Category</label>
              <select
                className="cwm-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {WF_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="cwm-form-group">
            <label className="cwm-label">Description</label>
            <textarea
              className="cwm-textarea"
              placeholder="Brief description of this workflow"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="cwm-form-group">
            <label className="cwm-label">Status</label>
            <div className="cwm-radio-row">
              {["Draft", "Active", "Archived"].map((s) => (
                <label key={s} className="cwm-radio-option">
                  <input
                    type="radio"
                    name="cwm-status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                  <span className={`cwm-radio-circle${status === s ? " cwm-radio-circle--checked" : ""}`} />
                  <span className="cwm-radio-label">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="cwm-divider" />

          {/* Workflow Stages */}
          <div className="cwm-stages-section">
            <div className="cwm-stages-title">Workflow Stages</div>
            {stages.map((stage, i) => (
              <div key={stage.id} className="cwm-stage-row">
                <span className="cwm-stage-num">{i + 1}</span>
                <input
                  className="cwm-input cwm-stage-input"
                  placeholder="Stage name"
                  value={stage.name}
                  onChange={(e) => updateStage(stage.id, e.target.value)}
                />
                <button className="cwm-stage-remove" onClick={() => removeStage(stage.id)} title="Remove">×</button>
              </div>
            ))}
            <button className="cwm-add-stage" onClick={addStage}>
              + Add New Stage
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="cwm-footer">
          <button className="cwm-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="cwm-btn-ok"
            onClick={handleOk}
            disabled={!name.trim()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SystemAdminDashboard({ user, onLogout }) {
  const {
    activeTab, handleTab,
    activeSubTab, handleSubTab,
    toast, showToast,
    createWorkflowOpen, openCreateWorkflow, closeCreateWorkflow, saveWorkflow,
    handleEditWorkflow, handleDuplicateWorkflow,
    addUserOpen, openAddUser, closeAddUser, handleCreateUser,
    pagedUsers,
    handleEditUser, handleDeactivateUser,
    filteredAuditLogs,
  } = useSystemAdmin();

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      {createWorkflowOpen && (
        <CreateWorkflowModal
          onClose={closeCreateWorkflow}
          onSave={saveWorkflow}
        />
      )}
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        {/* Page Title */}
        <div className="sa-page-title">
          <h1 className="sa-title">System Administration</h1>
          <p className="sa-subtitle">Manage users, roles, and system configuration</p>
        </div>

        {/* Main Tabs */}
        <div className="sa-main-tabs">
          {MAIN_TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`sa-main-tab${activeTab === key ? " sa-main-tab--active" : ""}`}
              onClick={() => handleTab(key)}
            >
              <span className="sa-tab-icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Sub-tabs for Workflow Management */}
        {activeTab === "workflow" && (
          <div className="sa-sub-tabs">
            {WORKFLOW_SUB_TABS.map(({ key, label }) => (
              <button
                key={key}
                className={`sa-sub-tab${activeSubTab === key ? " sa-sub-tab--active" : ""}`}
                onClick={() => handleSubTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="sa-content">

          {/* ── Workflow Management ── */}
          {activeTab === "workflow" && activeSubTab === "visual-builder" && (
            <VisualBuilder />
          )}

          {activeTab === "workflow" && activeSubTab === "workflow-templates" && (
            <div className="sa-card">
              <div className="sa-card-toolbar">
                <button className="sa-btn-create" onClick={openCreateWorkflow}>
                  + Create Workflow
                </button>
              </div>
              <table className="sa-table">
                <thead>
                  <tr>
                    <th>Workflow Name</th>
                    <th>Category</th>
                    <th>Stages</th>
                    <th>Status</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKFLOW_TEMPLATES.map((wf) => (
                    <tr key={wf.id}>
                      <td>
                        <div className="sa-wf-name">{wf.name}</div>
                        <div className="sa-wf-desc">{wf.description}</div>
                      </td>
                      <td>
                        <span className={`sa-category-badge sa-category-badge--${wf.category.toLowerCase().replace(/\s+/g, "-")}`}>
                          {wf.category}
                        </span>
                      </td>
                      <td>{wf.stages} stages</td>
                      <td>
                        <span className={`sa-status${wf.status === "ACTIVE" ? " sa-status--active" : ""}`}>
                          {wf.status}
                        </span>
                      </td>
                      <td>{wf.lastModified}</td>
                      <td>
                        <div className="sa-actions">
                          <button className="sa-action-btn" onClick={() => handleEditWorkflow(wf)}>
                            ✏ Edit
                          </button>
                          <button className="sa-action-btn" onClick={() => handleDuplicateWorkflow(wf)}>
                            ⧉ Duplicate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "workflow" && activeSubTab === "roles-permissions" && (
            <RolesPermissions />
          )}

          {activeTab === "workflow" && activeSubTab === "routing-rules" && (
            <RoutingRules />
          )}

          {activeTab === "workflow" && activeSubTab === "form-fields" && (
            <FormFields />
          )}

          {activeTab === "workflow" && activeSubTab === "sla-escalation" && (
            <SlaEscalation />
          )}

          {activeTab === "workflow" && activeSubTab === "workflow-actions" && (
            <WorkflowActions />
          )}

          {/* ── User Management ── */}
          {activeTab === "users" && (
            <div className="sa-card">
              <div className="sa-card-toolbar">
                <button className="sa-btn-create" onClick={openAddUser}>+ Add User</button>
              </div>
              <table className="sa-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {pagedUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="sa-category-badge sa-category-badge--general">{u.role}</span></td>
                      <td>
                        <span className={`sa-status${u.status === "active" ? " sa-status--active" : ""}`}>
                          {u.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{u.lastLogin}</td>
                      <td>
                        <div className="sa-actions">
                          <button className="sa-action-btn" onClick={() => handleEditUser(u)}>✏ Edit</button>
                          <button className="sa-action-btn sa-action-btn--danger" onClick={() => handleDeactivateUser(u)}>Deactivate</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Roles & Permissions ── */}
          {activeTab === "roles" && <RolesPermissions />}

          {/* ── Notification Templates ── */}
          {activeTab === "notifications" && (
            <div className="sa-card sa-placeholder"><p>Notification Templates — coming soon</p></div>
          )}

          {/* ── API Health ── */}
          {activeTab === "api" && (
            <div className="sa-card sa-placeholder"><p>API Health — coming soon</p></div>
          )}

          {/* ── Audit Log ── */}
          {activeTab === "audit" && (
            <div className="sa-card">
              <table className="sa-table">
                <thead>
                  <tr><th>Timestamp</th><th>User</th><th>Action</th><th>Entity</th><th>IP Address</th></tr>
                </thead>
                <tbody>
                  {filteredAuditLogs.map((log, i) => (
                    <tr key={i}>
                      <td>{log.time}</td>
                      <td>{log.user}</td>
                      <td>{log.action}</td>
                      <td><span style={{ fontFamily: "monospace", fontSize: 12 }}>{log.entity}</span></td>
                      <td>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {addUserOpen && (
        <Modal
          title="Add New User"
          onClose={closeAddUser}
          footer={
            <>
              <button className="btn btn--default" onClick={closeAddUser}>Cancel</button>
              <button className="btn btn--primary" onClick={handleCreateUser}>Create User</button>
            </>
          }
        >
          <div className="form-group"><label className="form-label form-label--required">Full Name</label><input className="input" placeholder="User's full name" /></div>
          <div className="form-group"><label className="form-label form-label--required">Email</label><input type="email" className="input" placeholder="Official email" /></div>
          <div className="form-group"><label className="form-label">Role</label><select className="select">{ASSIGNABLE_ROLES.map((r) => <option key={r}>{r}</option>)}</select></div>
        </Modal>
      )}
    </div>
  );
}


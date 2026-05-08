import React, { useState } from "react";
import { useRolesPermissions }    from "./hooks/useRolesPermissions";
import { useRoleCreationWizard }  from "./hooks/useRoleCreationWizard";
import { useVisualRoleBuilder }   from "./hooks/useVisualRoleBuilder";
import {
  PERMISSIONS_DATA,
  ROLES_DETAIL_DATA,
  RP_INNER_TABS,
  ROLE_COLORS,
  ROLE_COLOR_MAP,
  PERM_CATEGORIES,
} from "./helpfunction/rpConstants";

const PERM_READ  = PERMISSIONS_DATA.filter((p) => p.category === "READ");
const PERM_WRITE = PERMISSIONS_DATA.filter((p) => p.category === "WRITE");

/* ── Accessibility Banner ───────────────────────────────── */
function AccessibilityBanner({ onDismiss }) {
  return (
    <div className="rp-a11y-banner">
      <div className="rp-a11y-inner">
        <span className="rp-a11y-icon">ℹ</span>
        <div className="rp-a11y-content">
          <div className="rp-a11y-title">Accessibility Features</div>
          <div className="rp-a11y-line">
            <strong>Keyboard Navigation:</strong> Use Tab to move between elements, Enter/Space to activate buttons, Arrow keys in lists. Press ? for help.
          </div>
          <div className="rp-a11y-line">
            <strong>Screen Readers:</strong> All actions and changes are announced. NVDA, JAWS, and VoiceOver supported.
          </div>
        </div>
      </div>
      <button className="rp-a11y-close" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  );
}

/* ── Role Creation Wizard ───────────────────────────────── */
function RoleCreationWizard() {
  const { roleName, setRoleName, description, setDescription, color, setColor } =
    useRoleCreationWizard();

  return (
    <div className="rp-wizard-wrap">
      <div className="rp-wizard-header">
        <span className="rp-wizard-icon">🛡</span>
        <span className="rp-wizard-title">Step-by-Step Role Creation</span>
        <button className="rp-wizard-help" title="Help">?</button>
      </div>

      <div className="rp-form-group">
        <label className="rp-label">Role Name <span className="rp-required">*</span></label>
        <input
          className="rp-input"
          placeholder="e.g., Senior Scrutiny Officer"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <div className="rp-hint">Enter a descriptive name for the role (e.g., Senior Scrutiny Officer)</div>
      </div>

      <div className="rp-form-group">
        <label className="rp-label">Description</label>
        <textarea
          className="rp-textarea"
          placeholder="Brief description of this role's responsibilities"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <div className="rp-hint">Briefly describe the role's responsibilities and purpose</div>
      </div>

      <div className="rp-form-group">
        <label className="rp-label">Color</label>
        <div className="rp-color-row">
          {ROLE_COLORS.map((c) => (
            <label key={c.key} className="rp-color-option">
              <input
                type="radio"
                name="role-color"
                value={c.key}
                checked={color === c.key}
                onChange={() => setColor(c.key)}
              />
              <span className="rp-color-dot" style={{ background: c.hex }} />
              <span className="rp-color-label">{c.label}</span>
            </label>
          ))}
        </div>
        <div className="rp-hint">Choose a color to visually identify this role</div>
      </div>

      <div className="rp-wizard-footer">
        <button className="rp-btn-prev">Previous</button>
        <button className="rp-btn-next">Next</button>
      </div>
    </div>
  );
}

/* ── Visual Role Builder ────────────────────────────────── */
function VisualRoleBuilder() {
  const {
    rolePerms,
    dragging,
    dragOverRole, setDragOverRole,
    dragOverLeft, setDragOverLeft,
    onLeftDragStart,
    onRolePermDragStart,
    onRoleCardDrop,
    onLeftPanelDrop,
    onDragEnd,
    removePermFromRole,
  } = useVisualRoleBuilder();

  return (
    <div className="vrb-layout">
      {/* Left panel */}
      <div
        className={`vrb-left-panel${dragOverLeft ? " vrb-left-panel--dragover" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOverLeft(true); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverLeft(false); }}
        onDrop={onLeftPanelDrop}
      >
        {dragOverLeft && dragging?.source === "role" && (
          <div className="vrb-left-drop-hint">Drop here to remove from role</div>
        )}

        <div className="vrb-panel-section">
          <div className="vrb-panel-section-label">READ</div>
          {PERM_READ.map((p) => (
            <div
              key={p.id}
              className="vrb-perm-item vrb-perm-item--read"
              draggable
              onDragStart={(e) => onLeftDragStart(e, p)}
              onDragEnd={onDragEnd}
            >
              <span className="vrb-perm-plus">+</span>
              <span className="vrb-perm-lock">🔒</span>
              <div className="vrb-perm-info">
                <div className="vrb-perm-name">{p.name}</div>
                <div className="vrb-perm-desc">{p.description}</div>
              </div>
              <span className="vrb-cat-badge vrb-cat-badge--read">READ</span>
            </div>
          ))}
        </div>

        <div className="vrb-panel-section">
          <div className="vrb-panel-section-label">WRITE ({PERM_WRITE.length})</div>
          {PERM_WRITE.map((p) => (
            <div
              key={p.id}
              className="vrb-perm-item vrb-perm-item--write"
              draggable
              onDragStart={(e) => onLeftDragStart(e, p)}
              onDragEnd={onDragEnd}
            >
              <span className="vrb-perm-plus">+</span>
              <span className="vrb-perm-lock">🔒</span>
              <div className="vrb-perm-info">
                <div className="vrb-perm-name">{p.name}</div>
                <div className="vrb-perm-desc">{p.description}</div>
              </div>
              <span className="vrb-cat-badge vrb-cat-badge--write">WRITE</span>
            </div>
          ))}
        </div>
      </div>

      {/* Role cards grid */}
      <div className="vrb-roles-grid">
        {ROLES_DETAIL_DATA.map((role) => (
          <div
            key={role.id}
            className={`vrb-role-card vrb-role-card--${role.colorKey}${dragOverRole === role.id ? " vrb-role-card--dragover" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverRole(role.id); }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverRole(null); }}
            onDrop={(e) => onRoleCardDrop(e, role.id)}
          >
            <div className="vrb-role-card-header">
              <div className="vrb-role-card-title">
                <span className={`vrb-role-avatar vrb-role-avatar--${role.colorKey}`}>
                  {role.name.charAt(0)}
                </span>
                <span className="vrb-role-card-name">{role.name}</span>
                <span className="vrb-system-badge">System</span>
              </div>
              <button className="vrb-edit-btn">✏</button>
            </div>
            <div className="vrb-role-card-desc">{role.description}</div>
            <div className="vrb-role-card-users">
              <span>👥</span> {role.users} users assigned
            </div>
            <div className="vrb-perms-label">
              Permissions ({rolePerms[role.id]?.length || 0})
            </div>

            {/* Drop zone */}
            <div className={`vrb-card-dropzone${dragOverRole === role.id && dragging?.source !== "role" || (dragOverRole === role.id && dragging?.fromRoleId !== role.id) ? " vrb-card-dropzone--active" : ""}`}>
              {(rolePerms[role.id] || []).length === 0 && (
                <div className="vrb-card-drop-hint">
                  <span>🔒</span> Drop permissions here
                </div>
              )}
              <div className="vrb-perms-list">
                {(rolePerms[role.id] || []).map((p) => (
                  <div
                    key={p.uid}
                    className="vrb-perm-row"
                    draggable
                    onDragStart={(e) => onRolePermDragStart(e, p, role.id)}
                    onDragEnd={onDragEnd}
                  >
                    <span className="vrb-perm-row-lock">🔒</span>
                    <div className="vrb-perm-row-info">
                      <div className="vrb-perm-row-name">{p.name}</div>
                      <div className="vrb-perm-row-desc">{p.description}</div>
                    </div>
                    <span className={`vrb-cat-badge vrb-cat-badge--${p.category.toLowerCase()}`}>
                      {p.category}
                    </span>
                    <button
                      className="vrb-perm-remove"
                      onClick={() => removePermFromRole(role.id, p.uid)}
                      title="Remove permission"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Create Role Modal ─────────────────────────────────── */
function CreateRoleModal({ onClose }) {
  const { roleName, setRoleName, description, setDescription, color, setColor, isValid } =
    useRoleCreationWizard();

  const handleCreate = () => {
    if (!isValid) return;
    onClose();
  };

  return (
    <div className="crm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="crm-modal" role="dialog" aria-modal="true" aria-labelledby="crm-title">
        {/* Header */}
        <div className="crm-header">
          <h2 className="crm-title" id="crm-title">Create New Role</h2>
          <button className="crm-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="crm-body">
          <div className="crm-form-group">
            <label className="crm-label">
              <span className="crm-required">*</span> Role Name <span className="crm-required">*</span>
            </label>
            <input
              className="crm-input"
              placeholder="e.g., Senior Scrutiny Officer"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              autoFocus
            />
            <div className="crm-hint">Enter a descriptive name for the role</div>
          </div>

          <div className="crm-form-group">
            <label className="crm-label">Description</label>
            <textarea
              className="crm-textarea"
              placeholder="Brief description of this role's responsibilities"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <div className="crm-hint">Briefly describe the role's responsibilities</div>
          </div>

          <div className="crm-form-group">
            <label className="crm-label">Color</label>
            <div className="crm-color-row">
              {ROLE_COLORS.map((c) => (
                <label key={c.key} className="crm-color-option">
                  <input
                    type="radio"
                    name="crm-color"
                    value={c.key}
                    checked={color === c.key}
                    onChange={() => setColor(c.key)}
                  />
                  <span
                    className={`crm-radio-ring${color === c.key ? " crm-radio-ring--checked" : ""}`}
                    style={{ borderColor: color === c.key ? c.hex : "#d1d5db" }}
                  >
                    <span className="crm-color-dot" style={{ background: c.hex }} />
                  </span>
                  <span className="crm-color-label">{c.label}</span>
                </label>
              ))}
            </div>
            <div className="crm-hint">Choose a color to identify this role visually</div>
          </div>

          <div className="crm-next-step">
            <span className="crm-next-icon">ℹ</span>
            <div>
              <div className="crm-next-title">Next Step</div>
              <div className="crm-next-desc">
                After creating the role, you can assign permissions using the Visual Role Builder or the wizard.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="crm-footer">
          <button className="crm-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="crm-btn-create"
            onClick={handleCreate}
            disabled={!isValid}
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Roles List ─────────────────────────────────────────── */
function RolesList({ createOpen, openCreateRole, closeCreateRole }) {
  const maxPerms = Math.max(...ROLES_DETAIL_DATA.map((r) => r.permissions));

  return (
    <>
      {createOpen && <CreateRoleModal onClose={closeCreateRole} />}
      <div className="rp-table-card">
        <div className="rp-table-toolbar">
          <div className="rp-table-title">All Roles</div>
          <div className="rp-table-actions">
            <button className="rp-btn-export">⬇ Export</button>
            <button className="rp-btn-create-role" onClick={openCreateRole}>+ Create Role</button>
          </div>
        </div>
      <table className="sa-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Type</th>
            <th>Permissions</th>
            <th>Users</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ROLES_DETAIL_DATA.map((role) => (
            <tr key={role.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className={`rp-role-avatar rp-role-avatar--${role.colorKey}`}>
                    {role.name.charAt(0)}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{role.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{role.description}</div>
                  </div>
                </div>
              </td>
              <td><span className="rp-system-tag">SYSTEM</span></td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: "#374151", whiteSpace: "nowrap" }}>
                    {role.permissions} permissions
                  </span>
                  <div className="rp-perm-bar">
                    <div
                      className="rp-perm-bar-fill"
                      style={{ width: `${(role.permissions / maxPerms) * 100}%` }}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span>👤</span>
                  <span style={{ fontSize: 13 }}>{role.users}</span>
                </div>
              </td>
              <td>
                <div className="sa-actions">
                  <button className="sa-action-btn">✏ Edit</button>
                  <button className="sa-action-btn">👁 View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <div className="rp-pagination">
          <button className="rp-page-btn">‹</button>
          <span className="rp-page-active">1</span>
          <button className="rp-page-btn">›</button>
        </div>
      </div>
    </>
  );
}

/* ── Create Permission Modal ────────────────────────────── */
function CreatePermissionModal({ onClose }) {
  const [permName, setPermName]       = useState("");
  const [permKey, setPermKey]         = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]       = useState("");

  const handleCreate = () => {
    if (!permName.trim() || !permKey.trim() || !category) return;
    onClose();
  };

  return (
    <div className="cpm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cpm-modal" role="dialog" aria-modal="true" aria-labelledby="cpm-title">
        {/* Header */}
        <div className="cpm-header">
          <h2 className="cpm-title" id="cpm-title">Create New Permission</h2>
          <button className="cpm-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className="cpm-body">
          {/* Guideline banner */}
          <div className="cpm-guideline">
            <span className="cpm-guideline-icon">ℹ</span>
            <div>
              <div className="cpm-guideline-title">Permission Guidelines</div>
              <div className="cpm-guideline-desc">
                Create granular permissions that follow the principle of least privilege. Use clear, descriptive names.
              </div>
            </div>
          </div>

          {/* Permission Name */}
          <div className="cpm-form-group">
            <label className="cpm-label">
              <span className="cpm-required">*</span> Permission Name <span className="cpm-required">*</span>
            </label>
            <input
              className="cpm-input"
              placeholder="e.g., View Analytics Dashboard"
              value={permName}
              onChange={(e) => setPermName(e.target.value)}
              autoFocus
            />
            <div className="cpm-hint">User-friendly name (e.g., 'View Analytics Dashboard')</div>
          </div>

          {/* Permission Key */}
          <div className="cpm-form-group">
            <label className="cpm-label">
              <span className="cpm-required">*</span> Permission Key <span className="cpm-required">*</span>
            </label>
            <input
              className="cpm-input cpm-input--mono"
              placeholder="e.g., analytics.dashboard.view"
              value={permKey}
              onChange={(e) => setPermKey(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))}
            />
            <div className="cpm-hint">Unique identifier in dot notation (e.g., analytics.dashboard.view)</div>
          </div>

          {/* Description */}
          <div className="cpm-form-group">
            <label className="cpm-label">Description</label>
            <textarea
              className="cpm-textarea"
              placeholder="What does this permission allow?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <div className="cpm-hint">What does this permission allow?</div>
          </div>

          {/* Category */}
          <div className="cpm-form-group">
            <label className="cpm-label">
              <span className="cpm-required">*</span> Category <span className="cpm-required">*</span>
            </label>
            <div className="cpm-cat-list">
              {PERM_CATEGORIES.map((c) => (
                <label key={c.key} className="cpm-cat-option">
                  <input
                    type="radio"
                    name="cpm-category"
                    value={c.key}
                    checked={category === c.key}
                    onChange={() => setCategory(c.key)}
                  />
                  <span className={`cpm-radio-circle${category === c.key ? " cpm-radio-circle--checked" : ""}`} />
                  <span className={`cpm-cat-badge cpm-cat-badge--${c.key.toLowerCase()}`}>{c.key}</span>
                  <span className="cpm-cat-desc">{c.label}</span>
                </label>
              ))}
            </div>
            <div className="cpm-hint">Select the appropriate category based on the action type</div>
          </div>
        </div>

        {/* Footer */}
        <div className="cpm-footer">
          <button className="cpm-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="cpm-btn-create"
            onClick={handleCreate}
            disabled={!permName.trim() || !permKey.trim() || !category}
          >
            Create Permission
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Permissions List ───────────────────────────────────── */
function PermissionsList({ createOpen, openCreatePerm, closeCreatePerm }) {
  return (
    <>
      {createOpen && <CreatePermissionModal onClose={closeCreatePerm} />}
      <div className="rp-table-card">
        <div className="rp-table-toolbar">
          <div className="rp-table-title">All Permissions</div>
          <div className="rp-table-actions">
            <button className="rp-btn-export">⬇ Export</button>
            <button className="rp-btn-create-role" onClick={openCreatePerm}>+ Create Permission</button>
          </div>
        </div>
      <table className="sa-table">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Description</th>
            <th>Category</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {PERMISSIONS_DATA.map((perm) => (
            <tr key={perm.id}>
              <td>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 14, marginTop: 1 }}>🔒</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{perm.name}</div>
                    <div style={{ fontSize: 11.5, color: "#9ca3af", fontFamily: "monospace" }}>
                      {perm.code}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ fontSize: 13, color: "#374151" }}>{perm.description}</td>
              <td>
                <span className={`rp-cat-badge rp-cat-badge--${perm.category.toLowerCase()}`}>
                  {perm.category}
                </span>
              </td>
              <td>
                {perm.assignedTo.length === 0 ? (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>Not assigned</span>
                ) : (
                  <div className="rp-assigned-chips">
                    {perm.assignedTo.map((r) => (
                      <span
                        key={r}
                        className={`rp-assigned-chip rp-assigned-chip--${ROLE_COLOR_MAP[r] || "blue"}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

/* ── Main Export ────────────────────────────────────────── */
export default function RolesPermissions() {
  const {
    innerTab, handleInnerTab,
    showA11y, dismissA11y,
    createRoleOpen, openCreateRole, closeCreateRole,
    createPermOpen, openCreatePerm, closeCreatePerm,
  } = useRolesPermissions();

  return (
    <div>
      {showA11y && <AccessibilityBanner onDismiss={dismissA11y} />}

      <div className="rp-inner-tabs">
        {RP_INNER_TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`rp-inner-tab${innerTab === key ? " rp-inner-tab--active" : ""}`}
            onClick={() => handleInnerTab(key)}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <div className="rp-inner-content">
        {innerTab === "role-creation-wizard" && <RoleCreationWizard />}
        {innerTab === "visual-role-builder"  && <VisualRoleBuilder />}
        {innerTab === "roles-list" && (
          <RolesList
            createOpen={createRoleOpen}
            openCreateRole={openCreateRole}
            closeCreateRole={closeCreateRole}
          />
        )}
        {innerTab === "permissions-list" && (
          <PermissionsList
            createOpen={createPermOpen}
            openCreatePerm={openCreatePerm}
            closeCreatePerm={closeCreatePerm}
          />
        )}
      </div>
    </div>
  );
}

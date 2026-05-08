import React, { useState } from "react";
import { VISUAL_BUILDER_ROLES } from "./helpfunction/constants";
import { useWorkflow } from "../../context/WorkflowContext";

const INITIAL_STAGES = [
  {
    id: "stage-1",
    name: "Submitted",
    sla: "24 hours",
    assignedRoles: [],
    actions: ["View", "Forward to Scrutiny"],
  },
];

export default function VisualBuilder({ onSaved }) {
  const { createWorkflow, updateWorkflow } = useWorkflow();
  const [stages, setStages] = useState(INITIAL_STAGES);
  const [workflowName, setWorkflowName] = useState("New Workflow");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [draggingRole, setDraggingRole] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const handleDragStart = (e, role) => {
    setDraggingRole(role);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverStage(stageId);
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (!draggingRole) return;
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id !== stageId) return stage;
        if (stage.assignedRoles.some((r) => r.id === draggingRole.id)) return stage;
        return { ...stage, assignedRoles: [...stage.assignedRoles, draggingRole] };
      })
    );
    setDraggingRole(null);
    setDragOverStage(null);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverStage(null);
    }
  };

  const handleDragEnd = () => {
    setDraggingRole(null);
    setDragOverStage(null);
  };

  const removeRole = (stageId, roleId) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === stageId
          ? { ...stage, assignedRoles: stage.assignedRoles.filter((r) => r.id !== roleId) }
          : stage
      )
    );
  };

  const deleteStage = (stageId) => {
    setStages((prev) => prev.filter((s) => s.id !== stageId));
  };

  const addStage = () => {
    const id = `stage-${Date.now()}`;
    setStages((prev) => [
      ...prev,
      { id, name: "New Stage", sla: "48 hours", assignedRoles: [], actions: [] },
    ]);
  };

  const handleSave = () => {
    const def = {
      name: workflowName,
      description,
      category,
      status: "Active",
      stages: stages.map((s, idx) => ({
        id:            s.id,
        name:          s.name,
        order:         idx + 1,
        sla:           s.sla,
        // Convert role objects → roleId strings for the context
        assignedRoles: s.assignedRoles.map((r) => r.id),
        actions: s.actions.map((label, i) => ({
          key:         label.toLowerCase().replace(/\s+/g, "-"),
          label,
          nextStageId: stages[idx + 1]?.id ?? null,
        })),
      })),
    };
    createWorkflow(def);
    if (onSaved) onSaved(def);
  };

  return (
    <div className="vb-layout">
      {/* ── Left Sidebar ── */}
      <div className="vb-sidebar">
        <div className="vb-sidebar-header">
          <span className="vb-sidebar-icon">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="#374151" strokeWidth="1.5"/>
              <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          Available Roles
        </div>

        <div className="vb-section-label">SYSTEM ROLES</div>

        <div className="vb-roles-list">
          {VISUAL_BUILDER_ROLES.map((role) => (
            <div
              key={role.id}
              className={`vb-role-card vb-role-card--${role.colorKey}`}
              draggable
              onDragStart={(e) => handleDragStart(e, role)}
              onDragEnd={handleDragEnd}
            >
              <span className={`vb-role-plus vb-role-plus--${role.colorKey}`}>+</span>
              <span className={`vb-role-avatar vb-role-avatar--${role.colorKey}`}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="vb-role-name">{role.name}</span>
              <span className={`vb-role-badge vb-role-badge--${role.colorKey}`}>Role</span>
            </div>
          ))}
        </div>

        <div className="vb-tip">
          <div className="vb-tip-title">💡 Tip:</div>
          <div className="vb-tip-body">
            Drag and drop roles onto workflow stages to assign responsibilities. Each role can handle multiple stages.
          </div>
        </div>
      </div>

      {/* ── Main Canvas ── */}
      <div className="vb-main">
        {/* Workflow Header */}
        <div className="vb-workflow-header">
          <div className="vb-workflow-meta">
            <input
              className="vb-workflow-name-input"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
            <input
              className="vb-workflow-desc-input"
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="vb-workflow-header-actions">
            <select
              className="vb-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>General</option>
              <option>Data Breach</option>
              <option>Appeal</option>
            </select>
            <button className="vb-btn-preview">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              Preview
            </button>
            <button className="vb-btn-save" onClick={handleSave}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M7 3v5h6V3M7 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Save Workflow
            </button>
          </div>
        </div>

        {/* Stages */}
        <div className="vb-stages-list">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`vb-stage${dragOverStage === stage.id ? " vb-stage--dragover" : ""}`}
            >
              {/* Stage header */}
              <div className="vb-stage-topbar">
                <div className="vb-stage-title-row">
                  <span className="vb-stage-dot" />
                  <span className="vb-stage-name">{stage.name}</span>
                </div>
                <div className="vb-stage-topbar-actions">
                  <button className="vb-icon-btn" title="Stage settings">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="2" fill="#6b7280"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M10 1a1 1 0 011 1v1.07A7.001 7.001 0 0116.93 9H18a1 1 0 010 2h-1.07A7.001 7.001 0 0111 16.93V18a1 1 0 01-2 0v-1.07A7.001 7.001 0 013.07 11H2a1 1 0 010-2h1.07A7.001 7.001 0 019 3.07V2a1 1 0 011-1zm0 4a5 5 0 100 10A5 5 0 0010 5z" fill="#6b7280"/>
                    </svg>
                  </button>
                  <button className="vb-icon-btn vb-icon-btn--danger" title="Delete stage" onClick={() => deleteStage(stage.id)}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4h8M4 4h12M8 4V3h4v1M5 4l1 13h8l1-13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="vb-stage-sla">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{marginRight:4,flexShrink:0}}>
                  <circle cx="10" cy="10" r="8" stroke="#6b7280" strokeWidth="1.5"/>
                  <path d="M10 6v4l2.5 2.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                SLA: {stage.sla}
              </div>

              {/* Assigned Roles */}
              <div className="vb-section-title">Assigned Roles</div>
              <div
                className={`vb-drop-zone${dragOverStage === stage.id ? " vb-drop-zone--active" : ""}`}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragLeave={handleDragLeave}
              >
                {stage.assignedRoles.length === 0 ? (
                  <div className="vb-drop-placeholder">
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="7" r="3.5" stroke="#d1d5db" strokeWidth="1.4"/>
                      <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <span>Drag roles here</span>
                  </div>
                ) : (
                  <div className="vb-assigned-chips">
                    {stage.assignedRoles.map((role) => (
                      <span key={role.id} className={`vb-assigned-chip vb-assigned-chip--${role.colorKey}`}>
                        {role.name}
                        <button
                          className="vb-chip-remove"
                          onClick={() => removeRole(stage.id, role.id)}
                          title="Remove"
                        >×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Available Actions */}
              <div className="vb-section-title vb-section-title--actions">Available Actions</div>
              <div className="vb-actions-row">
                {stage.actions.map((action, i) => (
                  <span key={i} className="vb-action-chip">{action}</span>
                ))}
                {stage.actions.length === 0 && (
                  <span className="vb-no-actions">No actions configured</span>
                )}
              </div>
            </div>
          ))}

          {/* Add Stage */}
          <button className="vb-add-stage" onClick={addStage}>
            + Add Stage
          </button>
        </div>
      </div>
    </div>
  );
}

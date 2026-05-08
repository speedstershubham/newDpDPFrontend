import React, { createContext, useContext, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   LOCKED DATA SHAPES — Do not change field names without updating
   every component that reads them.
   ═══════════════════════════════════════════════════════════════════ */

// ── Tenant ───────────────────────────────────────────────────────────
// { id, name, config: { primaryColor, logo, language } }

// ── Role ─────────────────────────────────────────────────────────────
// { id, tenantId, name, colorKey, permissions: [permissionId] }

// ── Permission ───────────────────────────────────────────────────────
// { id, tenantId, name, key, category: "READ"|"WRITE"|"DELETE"|"ADMIN" }

// ── WorkflowAction ───────────────────────────────────────────────────
// { id, tenantId, label, key, category }

// ── Stage ────────────────────────────────────────────────────────────
// { id, name, order, assignedRoles: [roleId], actions: [StageAction] }

// ── StageAction ──────────────────────────────────────────────────────
// { id, label, key, nextStageId, isTerminal: bool }

// ── Workflow ─────────────────────────────────────────────────────────
// { id, tenantId, name, category, status, stages: [Stage] }

// ── Complaint ────────────────────────────────────────────────────────
// { id, grn, tenantId, workflowId, currentStageId,
//   subject, description, priority, category,
//   filedBy: { userId, name, email },
//   formData: {},
//   createdAt, updatedAt,
//   history: [{ stageId, roleId, userId, userName, action, timestamp, note }] }

/* ═══════════════════════════════════════════════════════════════════
   MOCK DATA  (replace with API calls later — shapes stay the same)
   ═══════════════════════════════════════════════════════════════════ */

const TENANT_ID = "tenant-dpdp";

export const MOCK_ROLES = [
  { id: "role-registry",    tenantId: TENANT_ID, name: "Registry",      colorKey: "blue"   },
  { id: "role-scrutiny",    tenantId: TENANT_ID, name: "Scrutiny Wing", colorKey: "green"  },
  { id: "role-chairperson", tenantId: TENANT_ID, name: "Chairperson",   colorKey: "purple" },
  { id: "role-board",       tenantId: TENANT_ID, name: "Board Member",  colorKey: "pink"   },
  { id: "role-reader",      tenantId: TENANT_ID, name: "Reader",        colorKey: "teal"   },
];

export const MOCK_PERMISSIONS = [
  { id: "p-1", tenantId: TENANT_ID, name: "View Complaints",   key: "complaint.view",     category: "READ"   },
  { id: "p-2", tenantId: TENANT_ID, name: "Submit Complaint",  key: "complaint.create",   category: "WRITE"  },
  { id: "p-3", tenantId: TENANT_ID, name: "Approve Complaint", key: "complaint.approve",  category: "WRITE"  },
  { id: "p-4", tenantId: TENANT_ID, name: "Reject Complaint",  key: "complaint.reject",   category: "WRITE"  },
  { id: "p-5", tenantId: TENANT_ID, name: "Delete Complaint",  key: "complaint.delete",   category: "DELETE" },
  { id: "p-6", tenantId: TENANT_ID, name: "Manage Users",      key: "users.manage",       category: "ADMIN"  },
  { id: "p-7", tenantId: TENANT_ID, name: "Schedule Hearing",  key: "hearing.schedule",   category: "WRITE"  },
  { id: "p-8", tenantId: TENANT_ID, name: "Assign Bench",      key: "bench.assign",       category: "WRITE"  },
];

// Default DPDP Standard Grievance Workflow
export const MOCK_WORKFLOWS = [
  {
    id: "wf-1",
    tenantId: TENANT_ID,
    name: "Standard Grievance Workflow",
    category: "General",
    status: "ACTIVE",
    stages: [
      {
        id: "stage-1",
        name: "Registration",
        order: 1,
        assignedRoles: ["role-registry"],
        actions: [
          { id: "act-1-1", label: "Submit for Scrutiny", key: "submit-scrutiny", nextStageId: "stage-2", isTerminal: false },
          { id: "act-1-2", label: "Reject (Incomplete)", key: "reject-incomplete", nextStageId: "stage-closed-reject", isTerminal: true },
        ],
      },
      {
        id: "stage-2",
        name: "Scrutiny Review",
        order: 2,
        assignedRoles: ["role-scrutiny"],
        actions: [
          { id: "act-2-1", label: "Approve & Forward",    key: "approve-forward",    nextStageId: "stage-3", isTerminal: false },
          { id: "act-2-2", label: "Request Clarification",key: "request-clarify",    nextStageId: "stage-clarification", isTerminal: false },
          { id: "act-2-3", label: "Reject",               key: "reject",             nextStageId: "stage-closed-reject", isTerminal: true  },
        ],
      },
      {
        id: "stage-clarification",
        name: "Awaiting Clarification",
        order: 3,
        assignedRoles: ["role-scrutiny"],
        actions: [
          { id: "act-c-1", label: "Clarification Received — Continue", key: "clarify-continue", nextStageId: "stage-3", isTerminal: false },
          { id: "act-c-2", label: "No Response — Close",               key: "clarify-close",    nextStageId: "stage-closed-reject", isTerminal: true },
        ],
      },
      {
        id: "stage-3",
        name: "Chairperson Review",
        order: 4,
        assignedRoles: ["role-chairperson"],
        actions: [
          { id: "act-3-1", label: "Admit & Assign Bench", key: "admit-bench",    nextStageId: "stage-4", isTerminal: false },
          { id: "act-3-2", label: "Reject",               key: "reject",         nextStageId: "stage-closed-reject", isTerminal: true  },
          { id: "act-3-3", label: "Issue Notice",         key: "issue-notice",   nextStageId: "stage-4", isTerminal: false },
        ],
      },
      {
        id: "stage-4",
        name: "Bench Hearing",
        order: 5,
        assignedRoles: ["role-board"],
        actions: [
          { id: "act-4-1", label: "Pass Order", key: "pass-order",  nextStageId: "stage-5", isTerminal: false },
          { id: "act-4-2", label: "Adjourn",    key: "adjourn",     nextStageId: "stage-4", isTerminal: false },
        ],
      },
      {
        id: "stage-5",
        name: "Order Publishing",
        order: 6,
        assignedRoles: ["role-registry"],
        actions: [
          { id: "act-5-1", label: "Publish Order", key: "publish-order", nextStageId: "stage-closed-resolved", isTerminal: true },
        ],
      },
      {
        id: "stage-closed-resolved",
        name: "Resolved",
        order: 7,
        assignedRoles: [],
        actions: [],
        isTerminal: true,
      },
      {
        id: "stage-closed-reject",
        name: "Rejected / Closed",
        order: 8,
        assignedRoles: [],
        actions: [],
        isTerminal: true,
      },
    ],
  },
  {
    id: "wf-2",
    tenantId: TENANT_ID,
    name: "Data Breach Expedited Workflow",
    category: "Data Breach",
    status: "ACTIVE",
    stages: [
      {
        id: "wf2-stage-1",
        name: "Emergency Registration",
        order: 1,
        assignedRoles: ["role-registry"],
        actions: [
          { id: "wf2-act-1-1", label: "Escalate to Chairperson", key: "escalate-chairperson", nextStageId: "wf2-stage-2", isTerminal: false },
        ],
      },
      {
        id: "wf2-stage-2",
        name: "Chairperson Immediate Review",
        order: 2,
        assignedRoles: ["role-chairperson"],
        actions: [
          { id: "wf2-act-2-1", label: "Convene Emergency Bench", key: "emergency-bench", nextStageId: "wf2-stage-3", isTerminal: false },
        ],
      },
      {
        id: "wf2-stage-3",
        name: "Emergency Hearing",
        order: 3,
        assignedRoles: ["role-board"],
        actions: [
          { id: "wf2-act-3-1", label: "Issue Order & Close", key: "issue-close", nextStageId: "wf2-stage-closed", isTerminal: true },
        ],
      },
      {
        id: "wf2-stage-closed",
        name: "Closed",
        order: 4,
        assignedRoles: [],
        actions: [],
        isTerminal: true,
      },
    ],
  },
];

export const MOCK_COMPLAINTS = [
  {
    id: "c-001",
    grn: "GRN/2026/DPB/001245",
    tenantId: TENANT_ID,
    workflowId: "wf-1",
    currentStageId: "stage-2",
    subject: "Unauthorised data sharing by XYZ Corp",
    description: "Respondent shared personal data without consent under DPDP Act Section 4.",
    priority: "High",
    category: "General",
    filedBy: { userId: "u-dp-1", name: "Anita Singh", email: "anita@example.com" },
    formData: {},
    createdAt: "2026-04-10",
    updatedAt: "2026-05-01",
    history: [
      { stageId: "stage-1", roleId: "role-registry", userId: "u-reg-1", userName: "Rajesh Kumar", action: "submit-scrutiny", timestamp: "2026-04-11T09:00:00Z", note: "Verified documents, forwarding for scrutiny." },
    ],
  },
  {
    id: "c-002",
    grn: "GRN/2026/DPB/001246",
    tenantId: TENANT_ID,
    workflowId: "wf-1",
    currentStageId: "stage-2",
    subject: "Data breach notification delay",
    description: "Fiduciary failed to notify breach within 72 hours as mandated.",
    priority: "High",
    category: "General",
    filedBy: { userId: "u-dp-2", name: "Mohan Das", email: "mohan@example.com" },
    formData: {},
    createdAt: "2026-04-15",
    updatedAt: "2026-05-03",
    history: [
      { stageId: "stage-1", roleId: "role-registry", userId: "u-reg-1", userName: "Rajesh Kumar", action: "submit-scrutiny", timestamp: "2026-04-16T10:30:00Z", note: "" },
    ],
  },
  {
    id: "c-003",
    grn: "GRN/2026/DPB/001247",
    tenantId: TENANT_ID,
    workflowId: "wf-1",
    currentStageId: "stage-3",
    subject: "Refusal to process data deletion request",
    description: "Fiduciary refused to delete personal data upon request.",
    priority: "Medium",
    category: "General",
    filedBy: { userId: "u-dp-3", name: "Priya Verma", email: "priya@example.com" },
    formData: {},
    createdAt: "2026-03-20",
    updatedAt: "2026-04-25",
    history: [
      { stageId: "stage-1", roleId: "role-registry", userId: "u-reg-1", userName: "Rajesh Kumar", action: "submit-scrutiny", timestamp: "2026-03-21T08:00:00Z", note: "" },
      { stageId: "stage-2", roleId: "role-scrutiny", userId: "u-scr-1", userName: "Priya Sharma", action: "approve-forward", timestamp: "2026-04-01T09:15:00Z", note: "Prima facie case established." },
    ],
  },
  {
    id: "c-004",
    grn: "GRN/2026/DPB/001248",
    tenantId: TENANT_ID,
    workflowId: "wf-1",
    currentStageId: "stage-4",
    subject: "Excessive data collection by e-commerce platform",
    description: "Platform collecting data beyond stated purpose.",
    priority: "Medium",
    category: "General",
    filedBy: { userId: "u-dp-4", name: "Suresh Pillai", email: "suresh@example.com" },
    formData: {},
    createdAt: "2026-03-01",
    updatedAt: "2026-04-20",
    history: [
      { stageId: "stage-1", roleId: "role-registry",    userId: "u-reg-1", userName: "Rajesh Kumar",   action: "submit-scrutiny",  timestamp: "2026-03-02T09:00:00Z", note: "" },
      { stageId: "stage-2", roleId: "role-scrutiny",    userId: "u-scr-1", userName: "Priya Sharma",   action: "approve-forward",  timestamp: "2026-03-15T10:00:00Z", note: "" },
      { stageId: "stage-3", roleId: "role-chairperson", userId: "u-chr-1", userName: "Justice Mehta",  action: "admit-bench",       timestamp: "2026-04-01T11:00:00Z", note: "Admitted. Bench constituted." },
    ],
  },
  {
    id: "c-005",
    grn: "GRN/2026/DPB/001249",
    tenantId: TENANT_ID,
    workflowId: "wf-1",
    currentStageId: "stage-1",
    subject: "Unsolicited marketing messages despite opt-out",
    description: "Continued receiving messages after withdrawing consent.",
    priority: "Low",
    category: "General",
    filedBy: { userId: "u-dp-5", name: "Kavita Nair", email: "kavita@example.com" },
    formData: {},
    createdAt: "2026-05-05",
    updatedAt: "2026-05-05",
    history: [],
  },
  {
    id: "c-006",
    grn: "GRN/2026/DPB/001250",
    tenantId: TENANT_ID,
    workflowId: "wf-2",
    currentStageId: "wf2-stage-1",
    subject: "Major data breach at HealthCorp — 2M records",
    description: "Large-scale breach affecting 2 million patients' health records.",
    priority: "Critical",
    category: "Data Breach",
    filedBy: { userId: "u-dp-6", name: "Dr. Ram Iyer", email: "ram@example.com" },
    formData: {},
    createdAt: "2026-05-07",
    updatedAt: "2026-05-07",
    history: [],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════════════════ */

const WorkflowContext = createContext(null);

export function useWorkflow() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error("useWorkflow must be used inside <WorkflowProvider>");
  return ctx;
}

export function WorkflowProvider({ children }) {
  const [roles,       setRoles]       = useState(MOCK_ROLES);
  const [permissions, setPermissions] = useState(MOCK_PERMISSIONS);
  const [workflows,   setWorkflows]   = useState(MOCK_WORKFLOWS);
  const [complaints,  setComplaints]  = useState(MOCK_COMPLAINTS);

  /* ── Workflow helpers ────────────────────────────────── */

  /** Returns the Stage object for a given complaint */
  const getCurrentStage = useCallback((complaint) => {
    const wf = workflows.find((w) => w.id === complaint.workflowId);
    return wf?.stages.find((s) => s.id === complaint.currentStageId) ?? null;
  }, [workflows]);

  /** Returns all complaints currently sitting at stages owned by roleId (scoped to tenant) */
  const getComplaintsForRole = useCallback((roleId, tenantId = TENANT_ID) => {
    return complaints.filter((c) => {
      if (c.tenantId !== tenantId) return false;
      const stage = getCurrentStage(c);
      return stage?.assignedRoles.includes(roleId);
    });
  }, [complaints, getCurrentStage]);

  /** Returns all stages in a workflow that are assigned to roleId */
  const getStagesForRole = useCallback((workflowId, roleId) => {
    const wf = workflows.find((w) => w.id === workflowId);
    return wf?.stages.filter((s) => s.assignedRoles.includes(roleId)) ?? [];
  }, [workflows]);

  /* ── Core action dispatch ────────────────────────────── */

  /**
   * dispatchAction({ complaintId, actionKey, userId, userName, note })
   * Moves the complaint to the next stage determined by the action.
   */
  const dispatchAction = useCallback(({ complaintId, actionKey, userId, userName, note = "" }) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;

        const stage = getCurrentStage(c);
        if (!stage) return c;

        const action = stage.actions.find((a) => a.key === actionKey);
        if (!action) return c;

        const historyEntry = {
          stageId:   stage.id,
          roleId:    stage.assignedRoles[0] ?? "",
          userId,
          userName,
          action:    actionKey,
          timestamp: new Date().toISOString(),
          note,
        };

        return {
          ...c,
          currentStageId: action.nextStageId,
          updatedAt:       new Date().toISOString().slice(0, 10),
          history:         [...c.history, historyEntry],
        };
      })
    );
  }, [getCurrentStage]);

  /* ── Admin CRUD ──────────────────────────────────────── */

  const createWorkflow = useCallback((def) => {
    setWorkflows((prev) => [...prev, { ...def, id: `wf-${Date.now()}`, tenantId: TENANT_ID }]);
  }, []);

  const updateWorkflow = useCallback((id, def) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, ...def } : w)));
  }, []);

  const createRole = useCallback((role) => {
    setRoles((prev) => [...prev, { ...role, id: `role-${Date.now()}`, tenantId: TENANT_ID }]);
  }, []);

  const createPermission = useCallback((perm) => {
    setPermissions((prev) => [...prev, { ...perm, id: `perm-${Date.now()}`, tenantId: TENANT_ID }]);
  }, []);

  /** Submit a new complaint — enters Stage 1 of the chosen workflow */
  const submitComplaint = useCallback((formData, workflowId = "wf-1") => {
    const wf      = workflows.find((w) => w.id === workflowId);
    const stage1  = wf?.stages.find((s) => s.order === 1);
    if (!stage1) return null;

    const grn = `GRN/2026/DPB/${String(Date.now()).slice(-6)}`;
    const newComplaint = {
      id:             `c-${Date.now()}`,
      grn,
      tenantId:       TENANT_ID,
      workflowId,
      currentStageId: stage1.id,
      subject:        formData.subject ?? "",
      description:    formData.description ?? "",
      priority:       formData.priority ?? "Medium",
      category:       formData.category ?? "General",
      filedBy:        formData.filedBy ?? { userId: "", name: "", email: "" },
      formData,
      createdAt:      new Date().toISOString().slice(0, 10),
      updatedAt:      new Date().toISOString().slice(0, 10),
      history:        [],
    };

    setComplaints((prev) => [...prev, newComplaint]);
    return grn;
  }, [workflows]);

  /* ── can() permission check ─────────────────────────── */
  const can = useCallback((user, permissionKey) => {
    if (!user?.roleId) return false;
    const role = roles.find((r) => r.id === user.roleId);
    if (!role) return false;
    // If role.permissions is absent (legacy), default to allow
    if (!Array.isArray(role.permissions)) return true;
    return role.permissions.includes(permissionKey);
  }, [roles]);

  const value = {
    /* data */
    roles, permissions, workflows, complaints,
    /* helpers */
    getCurrentStage,
    getComplaintsForRole,
    getStagesForRole,
    /* dispatch */
    dispatchAction,
    submitComplaint,
    /* admin CRUD */
    createWorkflow, updateWorkflow,
    createRole,
    createPermission,
    /* permission */
    can,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

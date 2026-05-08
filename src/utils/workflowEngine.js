/**
 * workflowEngine.js
 * Pure functions — no React, no state, no side effects.
 * Swap mock logic for API calls in WorkflowContext without touching this file.
 */

/**
 * Given a complaint and a workflow definition, returns the current Stage object.
 * @param {object} complaint
 * @param {object} workflow
 * @returns {object|null} stage
 */
export function getCurrentStage(complaint, workflow) {
  if (!workflow) return null;
  return workflow.stages.find((s) => s.id === complaint.currentStageId) ?? null;
}

/**
 * Given a stage and an actionKey, returns the action object.
 * @param {object} stage
 * @param {string} actionKey
 * @returns {object|null} action
 */
export function getActionFromStage(stage, actionKey) {
  if (!stage) return null;
  return stage.actions.find((a) => a.key === actionKey) ?? null;
}

/**
 * Evaluates routing rules (from RoutingRules config) to find a conditional
 * override for the next stage. If no rule matches, returns null (fall back to
 * action.nextStageId defined in the stage itself).
 *
 * Rule shape:
 * { actionKey, conditions: [{ field, operator, value }], nextStageId }
 *
 * Supported operators: "equals", "not-equals", "contains", "greater-than", "less-than"
 *
 * @param {object}   complaint
 * @param {string}   actionKey
 * @param {object[]} routingRules
 * @returns {string|null} nextStageId override, or null
 */
export function evaluateRoutingRules(complaint, actionKey, routingRules = []) {
  const matchingRules = routingRules.filter((r) => r.actionKey === actionKey);

  for (const rule of matchingRules) {
    const allMatch = (rule.conditions ?? []).every((cond) => {
      const fieldValue = getFieldValue(complaint, cond.field);
      return evaluateCondition(fieldValue, cond.operator, cond.value);
    });
    if (allMatch) return rule.nextStageId;
  }
  return null;
}

function getFieldValue(complaint, field) {
  // Support dot-notation: "formData.category", "priority", etc.
  return field.split(".").reduce((obj, key) => obj?.[key], complaint);
}

function evaluateCondition(fieldValue, operator, ruleValue) {
  switch (operator) {
    case "equals":
      return String(fieldValue).toLowerCase() === String(ruleValue).toLowerCase();
    case "not-equals":
      return String(fieldValue).toLowerCase() !== String(ruleValue).toLowerCase();
    case "contains":
      return String(fieldValue).toLowerCase().includes(String(ruleValue).toLowerCase());
    case "greater-than":
      return Number(fieldValue) > Number(ruleValue);
    case "less-than":
      return Number(fieldValue) < Number(ruleValue);
    default:
      return false;
  }
}

/**
 * The main transition function.
 * Returns the nextStageId for a given complaint + action, applying
 * conditional routing rules if any match, otherwise using the action default.
 *
 * @param {object}   complaint
 * @param {string}   actionKey
 * @param {object}   workflow
 * @param {object[]} routingRules
 * @returns {{ nextStageId: string, isTerminal: boolean } | null}
 */
export function resolveTransition(complaint, actionKey, workflow, routingRules = []) {
  const stage = getCurrentStage(complaint, workflow);
  if (!stage) return null;

  const action = getActionFromStage(stage, actionKey);
  if (!action) return null;

  // Conditional routing takes precedence
  const conditionalNext = evaluateRoutingRules(complaint, actionKey, routingRules);
  const nextStageId     = conditionalNext ?? action.nextStageId;

  const nextStage = workflow.stages.find((s) => s.id === nextStageId);

  return {
    nextStageId,
    isTerminal:    action.isTerminal ?? nextStage?.isTerminal ?? false,
    actionLabel:   action.label,
    nextStageName: nextStage?.name ?? "Unknown",
  };
}

/**
 * Returns a list of complaints filtered to a specific role —
 * only complaints whose current stage lists that roleId in assignedRoles.
 *
 * @param {object[]} complaints
 * @param {object[]} workflows
 * @param {string}   roleId
 * @returns {object[]}
 */
export function filterComplaintsForRole(complaints, workflows, roleId) {
  return complaints.filter((c) => {
    const workflow = workflows.find((w) => w.id === c.workflowId);
    const stage    = getCurrentStage(c, workflow);
    return stage?.assignedRoles.includes(roleId) ?? false;
  });
}

/**
 * Count complaints by status/priority/stage for a role — used for stat cards.
 *
 * @param {object[]} complaints  (already filtered for a role)
 * @returns {{ total, critical, high, medium, low }}
 */
export function getStatsForRole(complaints) {
  return {
    total:    complaints.length,
    critical: complaints.filter((c) => c.priority === "Critical").length,
    high:     complaints.filter((c) => c.priority === "High").length,
    medium:   complaints.filter((c) => c.priority === "Medium").length,
    low:      complaints.filter((c) => c.priority === "Low").length,
  };
}

/**
 * Returns how many calendar days a complaint has been at its current stage.
 * Uses the last history entry timestamp; if no history, uses createdAt.
 *
 * @param {object} complaint
 * @returns {number} days
 */
export function daysAtCurrentStage(complaint) {
  const lastEntry  = complaint.history[complaint.history.length - 1];
  const sinceDate  = lastEntry ? lastEntry.timestamp : complaint.createdAt;
  const diff       = Date.now() - new Date(sinceDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

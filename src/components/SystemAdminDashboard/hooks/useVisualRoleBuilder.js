import { useState } from "react";
import { ROLES_DETAIL_DATA, VRB_ROLE_PERMISSIONS } from "../helpfunction/rpConstants";

export function useVisualRoleBuilder() {
  /* ── Permission assignment per role ─────────────────────── */
  const [rolePerms, setRolePerms] = useState(() =>
    Object.fromEntries(
      ROLES_DETAIL_DATA.map((r) => [r.id, [...(VRB_ROLE_PERMISSIONS[r.id] || [])]])
    )
  );

  /* ── Drag state ─────────────────────────────────────────── */
  // dragging = { source: "left" | "role", perm, fromRoleId? }
  const [dragging, setDragging]         = useState(null);
  const [dragOverRole, setDragOverRole] = useState(null);
  const [dragOverLeft, setDragOverLeft] = useState(false);

  /* ── Left panel drag start ──────────────────────────────── */
  const onLeftDragStart = (e, perm) => {
    setDragging({ source: "left", perm });
    e.dataTransfer.effectAllowed = "copy";
  };

  /* ── Role card perm drag start ──────────────────────────── */
  const onRolePermDragStart = (e, perm, fromRoleId) => {
    e.stopPropagation();
    setDragging({ source: "role", perm, fromRoleId });
    e.dataTransfer.effectAllowed = "move";
  };

  /* ── Drop onto a role card ──────────────────────────────── */
  const onRoleCardDrop = (e, targetRoleId) => {
    e.preventDefault();
    if (!dragging) return;

    if (dragging.source === "left") {
      // Assign from left panel → role (no duplicates)
      const newPerm = {
        uid:         `${targetRoleId}-${dragging.perm.id}-${Date.now()}`,
        name:        dragging.perm.name,
        description: dragging.perm.description,
        category:    dragging.perm.category,
      };
      setRolePerms((prev) => {
        const existing = prev[targetRoleId] || [];
        if (existing.some((p) => p.name === dragging.perm.name)) return prev;
        return { ...prev, [targetRoleId]: [...existing, newPerm] };
      });
    } else if (dragging.source === "role" && dragging.fromRoleId !== targetRoleId) {
      // Move between role cards
      const movingPerm = dragging.perm;
      setRolePerms((prev) => {
        const fromList = (prev[dragging.fromRoleId] || []).filter(
          (p) => p.uid !== movingPerm.uid
        );
        const toList = prev[targetRoleId] || [];
        if (toList.some((p) => p.name === movingPerm.name)) {
          return { ...prev, [dragging.fromRoleId]: fromList };
        }
        const newPerm = {
          ...movingPerm,
          uid: `${targetRoleId}-${movingPerm.name}-${Date.now()}`,
        };
        return {
          ...prev,
          [dragging.fromRoleId]: fromList,
          [targetRoleId]:        [...toList, newPerm],
        };
      });
    }

    setDragging(null);
    setDragOverRole(null);
  };

  /* ── Drop back onto left panel (unassign) ───────────────── */
  const onLeftPanelDrop = (e) => {
    e.preventDefault();
    if (!dragging || dragging.source !== "role") return;
    setRolePerms((prev) => ({
      ...prev,
      [dragging.fromRoleId]: (prev[dragging.fromRoleId] || []).filter(
        (p) => p.uid !== dragging.perm.uid
      ),
    }));
    setDragging(null);
    setDragOverLeft(false);
  };

  /* ── Global drag end ────────────────────────────────────── */
  const onDragEnd = () => {
    setDragging(null);
    setDragOverRole(null);
    setDragOverLeft(false);
  };

  /* ── Remove permission chip from a role ─────────────────── */
  const removePermFromRole = (roleId, uid) => {
    setRolePerms((prev) => ({
      ...prev,
      [roleId]: prev[roleId].filter((p) => p.uid !== uid),
    }));
  };

  return {
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
  };
}

import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import StatCard from "../shared/StatCard";
import Pagination from "../shared/Pagination";
import ToastNotification from "../shared/ToastNotification";
import { useRoleDashboard } from "./hooks/useRoleDashboard";
import { COLOR_MAP, ICONS, rowKey } from "./helpfunction/constants.jsx";
import Cell from "./components/Cell";
import DetailDrawer from "./components/DetailDrawer";
import ActionModal from "./components/ActionModal";
import "./styles/RoleDashboard.css";

/**
 * RoleDashboard — Generic role-agnostic dashboard.
 *
 * Props:
 *   user      — current user object (from backend / login)
 *   onLogout  — logout handler
 *   config    — dashboardConfig returned by the backend (or a ROLE_CONFIGS entry)
 *               shape: { roleLabel, roleSubtitle, getData, stats, tabs,
 *                        columns, rowActions, detailFields, searchKeys }
 */
export default function RoleDashboard({ user, onLogout, config }) {
  const {
    stats, filtered, paged, totalPages,
    search, activeTab, page, setPage,
    drawer, modal, toast,
    handleTab, handleSearch, handleRowAction,
    closeDrawer, confirmAction, closeModal,
  } = useRoleDashboard(config);

  return (
    <div className="layout">
      <ToastNotification message={toast} />
      <TenantHeader user={user} onLogout={onLogout} />

      <div className="page-content">
        <PageHeader title={config.roleLabel} subtitle={config.roleSubtitle} />

        {/* ── Stat Cards ── */}
        <div className="rd-stats-row">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              value={s.value}
              label={s.label}
              color={COLOR_MAP[s.color]}
            />
          ))}
        </div>

        {/* ── Tabs + Search ── */}
        <div className="rd-toolbar">
          <div className="rd-tabs">
            {config.tabs.map((t) => (
              <button
                key={t.key}
                className={`rd-tab${activeTab === t.key ? " rd-tab--active" : ""}`}
                onClick={() => handleTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <input
            className="input rd-search"
            placeholder={`Search by ${config.searchKeys.join(", ")}…`}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* ── Table ── */}
        <div className="card">
          <div className="card__header">
            <span className="card__title">{config.roleLabel}</span>
            <span className="rd-record-count">
              {filtered.length} record{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  {config.columns.map((c) => <th key={c.key}>{c.header}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={config.columns.length + 1} className="rd-empty">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  paged.map((item, idx) => (
                    <tr key={rowKey(item, idx)}>
                      {config.columns.map((c) => (
                        <td key={c.key}>
                          <Cell cell={c.render(item)} />
                        </td>
                      ))}
                      <td>
                        <div className="rd-actions">
                          {config.rowActions.map((action) => (
                            <button
                              key={action.key}
                              className={`btn btn--${action.variant === "link" ? "link" : action.variant} btn--sm rd-action-btn`}
                              onClick={() => handleRowAction(action, item)}
                            >
                              {ICONS[action.icon]}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={filtered.length}
              onPage={setPage}
            />
          </div>
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      {drawer.open && drawer.item && (
        <DetailDrawer item={drawer.item} config={config} onClose={closeDrawer} />
      )}

      {/* ── Action Modal ── */}
      {modal.open && modal.action && (
        <ActionModal
          action={modal.action}
          item={modal.item}
          onClose={closeModal}
          onConfirm={confirmAction}
        />
      )}
    </div>
  );
}

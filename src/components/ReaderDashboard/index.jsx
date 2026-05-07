import React from "react";
import TenantHeader from "../TenantHeader";
import PageHeader from "../shared/PageHeader";
import { useOrderSearch } from "./hooks/useOrderSearch";
import "./styles/ReaderDashboard.css";

export default function ReaderDashboard({ user, onLogout }) {
  const { search, setSearch, filtered } = useOrderSearch();

  return (
    <div className="layout">
      <TenantHeader user={user} onLogout={onLogout} />
      <div className="page-content">
        <PageHeader
          title="Order Repository"
          subtitle="Browse and download published DPB orders"
        />

        <div className="card mb-6">
          <div className="card__body">
            <div className="input-wrapper">
              <span className="input-prefix-icon">🔍</span>
              <input
                className="input input--prefix"
                placeholder="Search by GRN, subject, or respondent..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-wrapper" style={{ borderRadius: 0, border: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>Subject</th>
                  <th>Respondent</th>
                  <th>Order Date</th>
                  <th>Decision</th>
                  <th>Fine</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={i}>
                    <td><span className="td-mono">{o.grn}</span></td>
                    <td>{o.subject}</td>
                    <td>{o.respondent}</td>
                    <td>{o.date}</td>
                    <td><span className="tag tag--green">{o.decision}</span></td>
                    <td>{o.fine}</td>
                    <td>
                      <button className="btn btn--link btn--sm">⬇ Download PDF</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="no-results">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

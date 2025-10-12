import { useMemo, useState } from "react";
import { Filter, Plus, Pencil, ShieldAlert } from "lucide-react";
import "./Safety.css";
import SafetyConcernDetails from "./SafetyDetails/SafetyDetails";

const summary = [
  { label: "Submitted By Me", inReview: 1, inProcess: 1, onHold: 0 },
  { label: "Assigned To Me", inReview: 2, inProcess: 0, onHold: 1 },
  { label: "Assigned to My Team", inReview: 3, inProcess: 0, onHold: 0 },
  { label: "Company Wide", inReview: 9, inProcess: 3, onHold: 2 },
];

// --- moved into component (so we can useState) ---
const initialRows = [
  {
    id: "S020",
    submitted: "2/16/23",
    description: "Guard Missing",
    area: "Production 1",
    equipment: "Haas 2370",
    submittedBy: "Carl",
    team: "Safety",
    assigned: "Brad",
    status: "In Progress",
  },
  {
    id: "S045",
    submitted: "4/20/23",
    description: "Sharp Edge on Desk",
    area: "Office",
    equipment: "N/A",
    submittedBy: "Chad",
    team: "Safety",
    assigned: "Mike",
    status: "In Progress",
  },
  {
    id: "S023",
    submitted: "5/17/23",
    description: "Scrap is a slipping hazard",
    area: "Sub Assembly",
    equipment: "Cutting Machine",
    submittedBy: "Chad",
    team: "Maintenance",
    assigned: "Brad",
    status: "On hold",
  },
  {
    id: "S0453",
    submitted: "1/22/23",
    description: "Leaking Hose",
    area: "Production 2",
    equipment: "Welder 1",
    submittedBy: "Eric",
    team: "Safety",
    assigned: "Brad",
    status: "Resolved",
  },
  {
    id: "S050",
    submitted: "12/20/23",
    description: "Door lock broken",
    area: "Production 1",
    equipment: "Haas VMC",
    submittedBy: "Mike",
    team: "Safety",
    assigned: "William",
    status: "Resolved",
  },
];

function mapRowToDetails(row) {
  return {
    id: row.id,
    date: row.submitted,
    submittedBy: row.submittedBy,
    area: row.area,
    item: row.equipment,
    assignedUser: row.assigned,
    assignedTeam: row.team,
    status: row.status,
    conditions: {
      nearMiss: true,
      safetySuggestion: false,
      safetyConcern: row.status !== "Resolved",
    },
    typeOfConcern: {
      unsafeAct: false,
      unsafeArea: row.area?.toLowerCase().includes("production") || false,
      unsafeUse: false,
      unsafeCondition: true,
    },
    description:
      row.description ||
      "Provide additional details about the safety concern.",
  };
}

function StatusPill({ status }) {
  const map = {
    "In Progress": "blue",
    "On hold": "amber",
    "Resolved": "green",
  };
  const color = map[status] || "gray";
  return <span className={`sn-pill ${color}`}>{status}</span>;
}

function Pagination({ page, setPage, total, perPage, setPerPage, options = [5, 10, 15] }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(total, start + perPage - 1);
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <nav className="pgm" aria-label="Pagination">
      <div className="pgm-left">
        <span className="pgm-left-title">Items per Page</span>
        <div className="pgm-select-wrap">
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            aria-label="Items per page"
          >
            {options.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="pgm-caret" aria-hidden="true">▾</span>
        </div>
        <div className="pgm-range">
          <span className="pgm-badge">{start} - {end}</span>
          <span className="pgm-left-text">of</span>
          <span className="pgm-badge">{total}</span>
          <span className="pgm-left-text">in total</span>
        </div>
      </div>

      <div className="pgm-right">
        <button
          className={`pgm-nav ${prevDisabled ? "disabled" : ""}`}
          onClick={() => !prevDisabled && setPage(page - 1)}
          disabled={prevDisabled}
        >
          ← Previous
        </button>

        <div className="pgm-pages" role="group" aria-label="Pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`pgm-page ${p === page ? "active" : ""}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className={`pgm-next ${nextDisabled ? "disabled" : ""}`}
          onClick={() => !nextDisabled && setPage(page + 1)}
          disabled={nextDisabled}
        >
          Next →
        </button>
      </div>
    </nav>
  );
}

export default function SafetyNearMiss() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // ✅ now rows are stored in state
  const [rows, setRows] = useState(initialRows);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsInitial, setDetailsInitial] = useState(null);

  const total = rows.length;
  const start = (page - 1) * perPage;
  const visibleRows = useMemo(() => rows.slice(start, start + perPage), [rows, start, perPage]);

  const handleRowClick = (row) => {
    setDetailsInitial(mapRowToDetails(row));
    setDetailsOpen(true);
  };

  const handleSave = (updated) => {
    // ✅ map back from modal data to row format
    setRows((prev) =>
      prev.map((r) =>
        r.id === updated.id
          ? {
              ...r,
              assigned: updated.assignedUser,
              team: updated.assignedTeam,
              status: updated.status,
              description: updated.description,
            }
          : r
      )
    );
    setDetailsOpen(false);
  };

  return (
    <section className="sn-page">
      <main className="sn-main">
        <div className="sn-summary-wrap">
          <div className="sn-badge" aria-hidden="true">
            <ShieldAlert size={26} />
          </div>

          <div className="sn-summary">
            <table>
              <thead>
                <tr>
                  <th />
                  <th>In Review</th>
                  <th>In Process</th>
                  <th>On Hold</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((r) => (
                  <tr key={r.label}>
                    <td className="left heading">{r.label}</td>
                    <td className="cell">{r.inReview}</td>
                    <td className="cell">{r.inProcess}</td>
                    <td className="cell">{r.onHold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sn-table-wrap">
          <table className="sn-table">
            <thead>
              <tr>
                <th className="left">Request</th>
                <th className="left">Submitted</th>
                <th className="left">Description</th>
                <th className="left">Area</th>
                <th className="left">Equipment</th>
                <th className="left">Submitted By</th>
                <th className="left">Team</th>
                <th className="left">Assigned</th>
                <th className="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => (
                <tr key={r.id} className="row-link" onClick={() => handleRowClick(r)}>
                  <td className="cell left">{r.id}</td>
                  <td className="cell left">{r.submitted}</td>
                  <td className="cell left">{r.description}</td>
                  <td className="cell left">{r.area}</td>
                  <td className="cell left">{r.equipment}</td>
                  <td className="cell left">{r.submittedBy}</td>
                  <td className="cell left">{r.team}</td>
                  <td className="cell left">{r.assigned}</td>
                  <td className="cell left"><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          total={total}
          perPage={perPage}
          setPerPage={setPerPage}
        />

        <div className="sn-fabs">
          <button className="sn-fab" title="Edit"><Pencil size={18} /></button>
          <button className="sn-fab" title="Add"><Plus size={22} /></button>
        </div>
      </main>

      <SafetyConcernDetails
        open={detailsOpen}
        initial={detailsInitial}
        onClose={() => setDetailsOpen(false)}
        onSave={handleSave}  
      />
    </section>
  );
}

import { useMemo, useState } from "react";
import { Filter, Plus, Pencil, Wrench } from "lucide-react";
import "./MaintenanceRequests.css"

const summary = [
  { label: "Submitted By Me", inReview: 1, inProcess: 1, onHold: 0 },
  { label: "Assigned To Me", inReview: 2, inProcess: 0, onHold: 1 },
  { label: "Assigned to My Team", inReview: 3, inProcess: 0, onHold: 1 },
  { label: "Company Wide", inReview: 9, inProcess: 3, onHold: 2 },
];

const allRows = [
  {
    id: "M020",
    submitted: "2/16/23",
    description: "Guard Missing",
    area: "Production 1",
    equipment: "Haas 2370",
    submittedBy: "Carl",
    team: "Maintenance",
    assigned: "Brad",
    status: "In Progress",
  },
  {
    id: "M045",
    submitted: "4/20/23",
    description: "Sharp Edge on Desk",
    area: "Office",
    equipment: "N/A",
    submittedBy: "Chad",
    team: "Engineering",
    assigned: "Mike",
    status: "In Progress",
  },
  {
    id: "M023",
    submitted: "5/12/23",
    description: "Scrap is a slipping haze",
    area: "Sub Assembly",
    equipment: "Cutting Machine",
    submittedBy: "Chad",
    team: "Maintenance",
    assigned: "Brad",
    status: "On hold",
  },
  {
    id: "M045A",
    submitted: "1/22/23",
    description: "Leaking Hose",
    area: "Production 2",
    equipment: "Welder 1",
    submittedBy: "Eric",
    team: "Production 1",
    assigned: "Brad",
    status: "In Progress",
  },
  {
    id: "M050",
    submitted: "12/20/23",
    description: "Door lock broken",
    area: "Production 1",
    equipment: "Haas VMC",
    submittedBy: "Mike",
    team: "Production 2",
    assigned: "William",
    status: "Resolved",
  },
];

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

function StatusPill({ status }) {
  const map = {
    "In Progress": "blue",
    "On hold": "amber",
    "Resolved": "green",
  };
  const color = map[status] || "gray";
  return <span className={`mr-pill ${color}`}>{status}</span>;
}

export default function MaintenanceRequests({ onRowClick }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = allRows.length;
  const start = (page - 1) * perPage;
  const rows = useMemo(() => allRows.slice(start, start + perPage), [start, perPage]);

  const handleRowClick = (row) => {
    if (typeof onRowClick === "function") onRowClick(row);
  };

  return (
    <section className="mr-page">
      <main className="mr-main">
        {/* Top summary */}
        <div className="mr-summary-wrap">
          <div className="mr-badge" aria-hidden="true">
            <Wrench size={20} />
          </div>

          <div className="mr-summary">
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

        {/* Table */}
        <div className="mr-table-wrap">
          <table className="mr-table">
            <thead>
              <tr>
                <th className="left">Request</th>
                <th className="left">
                  Submitted <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Description <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Area <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Equipment <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Submitted By <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Team <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Assigned <Filter size={12} className="ml4" />
                </th>
                <th className="left">
                  Status <Filter size={12} className="ml4" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
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

        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          total={total}
          perPage={perPage}
          setPerPage={setPerPage}
        />

        {/* Floating actions */}
        <div className="mr-fabs">
          <button className="mr-fab" title="Edit"><Pencil size={18} /></button>
          <button className="mr-fab" title="Add"><Plus size={22} /></button>
        </div>
      </main>
    </section>
  );
}
import { useMemo, useState } from "react";
import { Eye, Download, Edit, Trash2, Plus } from "lucide-react";
import "./PreventiveMaintenance.css";

const summaryRows = [
  { label: "30 Day On-Time", company: "90%", team: "95%", me: "97%" },
  { label: "Overdue", company: 20, team: 10, me: 4 },
  { label: "Upcoming", company: 31, team: 15, me: 7 },
];

const allTasks = [
  { equipment: "E1", category: "CNC Machines",    status: "Overdue",  color: "red",    assigned: "Chad | Eric", task: "Grease Bearings",  desc: "Use 5257 bearing grease",                                   due: "4/20/2023" },
  { equipment: "E1", category: "CNC Machines",    status: "Overdue",  color: "red",    assigned: "Eric",        task: "Check Belt Tension",desc: "Belt should deflect 1 inch under 10 lbs of force",          due: "5/1/2023" },
  { equipment: "E3", category: "Sewing Machines", status: "Upcoming", color: "yellow", assigned: "Sam",         task: "Calibrate Head",   desc: "Run calibration program XYX",                                 due: "5/15/2023" },
  { equipment: "E3", category: "Sewing Machines", status: "Good",     color: "green",  assigned: "Lucy | Josh", task: "Charge Oil",       desc: "Drain oil and refill with SAE-20",                           due: "7/20/2023" },
  { equipment: "E3", category: "Sewing Machines", status: "Good",     color: "green",  assigned: "Murphy",      task: "Check Air Pressure",desc: "Check Pressure Gauge near machine and verify it is",         due: "8/5/2023" },
];

function Dot({ color }) {
  return <span className={`pm-dot ${color}`} aria-hidden="true" />;
}

function RowActions() {
  return (
    <div className="pm-actions">
      <button className="pm-icon-btn" title="View"><Eye size={14} /></button>
      <button className="pm-icon-btn" title="Download"><Download size={14} /></button>
      <button className="pm-icon-btn" title="Edit"><Edit size={14} /></button>
      <button className="pm-icon-btn" title="Delete"><Trash2 size={14} /></button>
    </div>
  );
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

export default function PreventiveMaintenance({ onRowClick, onAdd }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = allTasks.length;
  const start = (page - 1) * perPage;
  const rows = useMemo(() => allTasks.slice(start, start + perPage), [start, perPage]);

  const handleRowClick = (row) => {
    if (typeof onRowClick === "function") onRowClick(row);
  };

  return (
    <section className="pm-page">
      <main className="pm-main">
        <h2 className="pm-title">Preventative Maintenance</h2>

        {/* Summary */}
        <div className="pm-summary">
          <table>
            <thead>
              <tr>
                <th />
                <th>Company</th>
                <th>My Team</th>
                <th>Me</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((r) => (
                <tr key={r.label}>
                  <td className="left heading">{r.label}</td>
                  <td className="cell">{r.company}</td>
                  <td className="cell">{r.team}</td>
                  <td className="cell">{r.me}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table */}
        <div className="pm-table-wrap">
          <table className="pm-table">
            <thead>
              <tr>
                <th className="left">Equipment</th>
                <th className="left">Category</th>
                <th className="left">Status</th>
                <th className="left">Assigned To</th>
                <th className="left">Tasks</th>
                <th className="left">Descriptions</th>
                <th className="left">Due Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.equipment}-${i}`} className="row-link" onClick={() => handleRowClick(r)}>
                  <td className="cell left">
                    <span className="pm-equip"><Dot color={r.color} /> {r.equipment}</span>
                  </td>
                  <td className="cell left">{r.category}</td>
                  <td className="cell left">{r.status}</td>
                  <td className="cell left">{r.assigned}</td>
                  <td className="cell left">{r.task}</td>
                  <td className="cell left">{r.desc}</td>
                  <td className="cell left">{r.due}</td>
                  <td className="cell">
                    <RowActions />
                  </td>
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

        {/* FAB */}
        <button
          className="pm-fab"
          title="Add"
          onClick={() => (typeof onAdd === "function" ? onAdd() : alert("Add PM task"))}
        >
          <Plus size={26} />
        </button>
      </main>
    </section>
  );
}
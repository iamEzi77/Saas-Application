import { useMemo, useState } from "react";
import { LayoutGrid, List, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Equipment.css";

/* ----- Mock data (from your snippet) ----- */
export const baseEquipment = [
  {
    id: "E1",
    name: "E1",
    display: "Eastman 1",
    cell: "CNC Machines",
    pmPriority: 2.0,
    safety: 2,
    maint: 2,
    pmOverdue: 2,
    pmUpcoming: 3,
    details: {
      description: "Eastman Cutting Machine",
      productionArea: "Sub Assembly",
      workStation: "Eastman 1",
      category: "CNC Cutting Machine",
      trackRunTime: "Yes (Hours)",
      notes: "This is the older cutting machine",
      serial: "1234abc",
      manufacturer: "Eastman Cutting",
      model: "C123",
      servicePhone: "(555) 555-5555",
    },
  },
  {
    id: "E2",
    name: "E2",
    display: "Sewing 1",
    cell: "Welders",
    pmPriority: 1.5,
    safety: 1,
    maint: 1,
    pmOverdue: 1,
    pmUpcoming: 2,
    details: {
      description: "Industrial Sewing Machine",
      productionArea: "Assembly",
      workStation: "Sewing 1",
      category: "Sewers",
      trackRunTime: "No",
      notes: "New belt fitted last month",
      serial: "S-2045",
      manufacturer: "SewAll",
      model: "SX-1",
      servicePhone: "(555) 111-2222",
    },
  },
  {
    id: "E3",
    name: "E3",
    display: "PH5800",
    cell: "Welders",
    pmPriority: 0.95,
    safety: 0,
    maint: 2,
    pmOverdue: 0,
    pmUpcoming: 3,
    details: {
      description: "Precision Head 5800",
      productionArea: "Assembly",
      workStation: "PH5800",
      category: "Heads",
      trackRunTime: "Yes (Hours)",
      notes: "Requires calibration quarterly",
      serial: "PH-5800-99",
      manufacturer: "Precise",
      model: "PH-5800",
      servicePhone: "(555) 777-8888",
    },
  },
  {
    id: "E4",
    name: "E4",
    display: "Welder 1",
    cell: "Printers",
    pmPriority: 0.7,
    safety: 0,
    maint: 0,
    pmOverdue: 0,
    pmUpcoming: 0,
    details: {
      description: "Arc Welder Station 1",
      productionArea: "Welding",
      workStation: "Welder 1",
      category: "Welders",
      trackRunTime: "No",
      notes: "Stable",
      serial: "WLD-1",
      manufacturer: "SparkCo",
      model: "ARC-1",
      servicePhone: "(555) 222-3333",
    },
  },
  {
    id: "E5",
    name: "E5",
    display: "Welder 3",
    cell: "CNC Machines",
    pmPriority: 0.6,
    safety: 0,
    maint: 0,
    pmOverdue: 0,
    pmUpcoming: 0,
    details: {
      description: "Arc Welder Station 3",
      productionArea: "Welding",
      workStation: "Welder 3",
      category: "Welders",
      trackRunTime: "No",
      notes: "Baseline unit",
      serial: "WLD-3",
      manufacturer: "SparkCo",
      model: "ARC-3",
      servicePhone: "(555) 222-9999",
    },
  },
];

export function getEquipmentList() {
  const list = [];
  for (let i = 0; i < 15; i++) {
    const b = baseEquipment[i % baseEquipment.length];
    list.push({
      ...b,
      id: `E${i + 1}`,
      name: `E${i + 1}`,
      display: i < baseEquipment.length ? b.display : `${b.display} (${i + 1})`,
    });
  }
  return list;
}
/* ---------------------------------------- */

function PriorityDot({ value }) {
  const color = value >= 1.5 ? "red" : value >= 0.9 ? "yellow" : "green";
  return <span className={`eq-dot ${color}`} aria-hidden="true" />;
}

function Pill({ color = "green", children }) {
  return <span className={`eq-pill ${color}`}>{children}</span>;
}

function Pagination({ page, setPage, total, perPage, setPerPage }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end = Math.min(total, start + perPage - 1);

  return (
    <div className="eq-pagination">
      <div className="eq-page-left">
        <span>Items per Page</span>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 15].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span>{start} - {end} of {total} in total</span>
      </div>

      <div className="eq-page-right">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={n === page ? "active" : ""}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default function EquipmentView({ onEquipmentClick }) {
  // Use the list function you defined above
  const all = useMemo(() => getEquipmentList(), []);
  const [view, setView] = useState("grid"); // "grid" | "table"
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const navigate = useNavigate();

    const handleClick = (eq) => {
      if (typeof onEquipmentClick === "function") onEquipmentClick(eq);
      else navigate(`/equipment/${eq.id}`);
    };
  const total = all.length;
  const start = (page - 1) * perPage;
  const pageItems = all.slice(start, start + perPage);

  return (
    <section className="equipment">
      {/* Header */}
      <div className="eq-header">
        <h1>Equipment</h1>
        <div className="eq-view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            title="Grid view"
            onClick={() => setView("grid")}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={view === "table" ? "active" : ""}
            title="Table view"
            onClick={() => setView("table")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="eq-grid">
          {all.map((eq) => (
            <button
              key={eq.id}
              className="eq-card"
              onClick={() => handleClick(eq)}
              title={eq.name}
            >
              <div className="eq-thumb" />
              <div className="eq-card-name">{eq.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* Table view */}
      {view === "table" && (
        <>
          <div className="eq-table-wrap">
            <div className="eq-title">Equipment</div>
            <table className="eq-table">
              <thead>
                <tr>
                  <th>
                    PM Priority
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    Equipment Name
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    Cell
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    Safety Requests
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    Maintenance Requests
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    PM Overdue
                    <Filter size={12} className="ml4" />
                  </th>
                  <th>
                    PM Upcoming
                    <Filter size={12} className="ml4" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((eq) => (
                  <tr key={eq.id} className="row-link" onClick={() => handleClick(eq)}>
                    <td className="left">
                      <span className="prio">
                        <PriorityDot value={eq.pmPriority} />
                        {eq.pmPriority}
                      </span>
                    </td>
                    <td className="left">{eq.name}</td>
                    <td className="left">{eq.cell}</td>
                    <td><Pill color={eq.safety ? "red" : "green"}>{eq.safety}</Pill></td>
                    <td><Pill color={eq.maint ? "yellow" : "green"}>{eq.maint}</Pill></td>
                    <td><Pill color={eq.pmOverdue ? "red" : "green"}>{eq.pmOverdue}</Pill></td>
                    <td><Pill color={eq.pmUpcoming ? "yellow" : "green"}>{eq.pmUpcoming}</Pill></td>
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
        </>
      )}

      {/* FAB */}
      <button className="eq-fab" title="Add equipment">
        <Plus size={22} />
      </button>
    </section>
  );
}
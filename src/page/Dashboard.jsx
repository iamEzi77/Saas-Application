import "./Dashboard.css";

function Card({ title, children, className = "" }) {
  return (
    <div className={`db-card ${className}`}>
      {title ? <div className="db-card-title">{title}</div> : null}
      <div className="db-card-body">{children}</div>
    </div>
  );
}

function MetricTable({ columns = [], rows = [], label = "" }) {
  return (
    <div className="db-metric-table">
      <table>
        <thead>
          <tr>
            <th className="left">{label}</th>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="left">{r.label}</td>
              {r.values.map((v, i) => (
                <td key={`${r.label}-${i}`} className="cell">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dot({ color = "red" }) {
  return <span className={`dot dot-${color}`} aria-hidden="true" />;
}

function CheckBadge() {
  return <span className="check-badge">✓</span>;
}

export default function Dashboard() {
  const pmSummary = {
    columns: ["Company", "My Team", "Me"],
    rows: [
      { label: "30 Day On-Time", values: ["90%", "95%", "97%"] },
      { label: "Overdue", values: [20, 10, 4] },
      { label: "Upcoming", values: [31, 15, 7] },
    ],
  };

  const safety = {
    columns: ["In Review", "In Process", "On Hold"],
    rows: [
      { label: "Submitted by Me", values: [1, 2, 0] },
      { label: "Assigned to Me", values: [1, 3, 0] },
      { label: "Assigned to My Team", values: [1, 5, 1] },
      { label: "Company Wide", values: [9, 3, 2] },
    ],
  };

  const maintReq = {
    columns: ["In Review", "In Process", "On Hold"],
    rows: [
      { label: "Submitted by Me", values: [1, 2, 0] },
      { label: "Assigned to Me", values: [1, 3, 0] },
      { label: "Assigned to My Team", values: [1, 5, 1] },
      { label: "Company Wide", values: [9, 3, 2] },
    ],
  };

  const equipment = [
    { priority: 15, color: "red", name: "Eastman 1", overdue: 3, upcoming: 0 },
    { priority: 12, color: "red", name: "Sewing 1", overdue: 2, upcoming: 2 },
    { priority: 3, color: "red", name: "PH5800", overdue: 4, upcoming: 1 },
    { priority: 1.5, color: "yellow", name: "Welder 1", overdue: 1, upcoming: 4 },
    { priority: 0.9, color: "yellow", name: "Welder 3", overdue: 0, upcoming: 3 },
  ];

  const tasks = [
    { priority: 1.5, color: "red", equipment: "Eastman 1", task: "Grease Bearings" },
    { priority: 1.2, color: "red", equipment: "Sewing 1", task: "Check Belt Tension" },
    { priority: 0.9, color: "yellow", equipment: "PH5800", task: "Calibrate Head" },
    { priority: 0.9, color: "yellow", equipment: "Welder 1", task: "Charge Oil" },
    { priority: 0.7, color: "yellow", equipment: "Welder 1", task: "Change Filter" },
  ];

  return (
    <section className="dashboard">
      {/* Page header */}
      <div className="db-header">
        <h1>Chad Meeks Dashboard</h1>
      </div>

      {/* Two-column layout */}
      <div className="db-grid">
        {/* LEFT COLUMN */}
        <div className="db-col">
          <Card title="Preventative Maintenance">
            <MetricTable
              label=""
              columns={pmSummary.columns}
              rows={pmSummary.rows}
            />
          </Card>

          <Card title="Equipment">
            <div className="equip-table">
              <table>
                <thead>
                  <tr>
                    <th className="left">Priority</th>
                    <th className="left">Equipment</th>
                    <th>PM Overdue</th>
                    <th>PM Upcoming</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((e) => (
                    <tr key={`${e.name}-${e.priority}`}>
                      <td className="left priority">
                        <Dot color={e.color} />
                        <span className="prio-text">{e.priority}</span>
                      </td>
                      <td className="left">{e.name}</td>
                      <td className="cell">{e.overdue}</td>
                      <td className="cell">{e.upcoming}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="My PM Tasks" className="pm-tasks-card">
            <div className="tasks-table">
              <table>
                <thead>
                  <tr>
                    <th className="left">Priority</th>
                    <th className="left">Equipment</th>
                    <th className="left">Tasks</th>
                    <th className="icon-col"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t, i) => (
                    <tr key={`${t.equipment}-${i}`}>
                      <td className="left priority">
                        <Dot color={t.color} />
                        <span className="prio-text">{t.priority}</span>
                      </td>
                      <td className="left">{t.equipment}</td>
                      <td className="left">{t.task}</td>
                      <td className="icon-cell">
                        <CheckBadge />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="db-col">
          <Card title="Safety Concerns">
            <MetricTable
              label=""
              columns={safety.columns}
              rows={safety.rows}
            />
          </Card>

          <Card title="Maintenance Requests">
            <MetricTable
              label=""
              columns={maintReq.columns}
              rows={maintReq.rows}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
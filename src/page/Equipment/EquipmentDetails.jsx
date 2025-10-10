import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Pencil, Wrench, Hammer, Plus,
  Download, Eye, Edit, Trash2, Info
} from "lucide-react";
import { getEquipmentList } from "./EquipmentView"; // if you moved data, import from that file
import "./EquipmentDetails.css";

const TABS = [
  "Details",
  "Documentation",
  "Requests",
  "Maintenance",
  "Spare Parts",
  "Data Logging",
  "History",
];

function Dot({ color }) {
  return <span className={`eq-dot ${color}`} aria-hidden="true" />;
}

function ActionBtns() {
  return (
    <div className="eq-actions">
      <button className="eq-icon-btn" title="View"><Eye size={14} /></button>
      <button className="eq-icon-btn" title="Download"><Download size={14} /></button>
      <button className="eq-icon-btn" title="Edit"><Edit size={14} /></button>
      <button className="eq-icon-btn" title="Delete"><Trash2 size={14} /></button>
    </div>
  );
}

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const list = useMemo(() => getEquipmentList(), []);
  const eq = list.find((e) => e.id === id);

  const [tab, setTab] = useState("Details");

  if (!eq) {
    return (
      <section className="equipment">
        <div className="eq-header">
          <div className="eq-back-wrap">
            <button className="eq-back" onClick={() => navigate(-1)} title="Back">
              <ArrowLeft size={18} />
            </button>
            <h1>Equipment</h1>
          </div>
        </div>
        <div style={{ padding: 16 }}>Not found.</div>
      </section>
    );
  }

  // Mock data for tabs
  const docs = [
    { type: "PDF", id: "SOP-101", description: "Standard Operating Procedure - Cutting", updated: "5/21/2018", version: "v1.2" },
    { type: "PDF", id: "OM-212", description: "Eastman Owners Manual", updated: "3/5/2005", version: "v2.6" },
    { type: "PDF", id: "JBS-101", description: "Job Breakdown Sheet - Maintenance", updated: "7/28/2022", version: "v2.3" },
    { type: "PDF", id: "SOP-103", description: "SOP - Setup Picture", updated: "7/28/2022", version: "v2.3" },
    { type: "PDF", id: "WAR-232", description: "Warranty - Eastman", updated: "6/9/2015", version: "v1.7" },
  ];

  const requests = [
    { id: "M40", type: "Maintenance", priority: "High", date: "4/21/2023", status: "In Process", assigned: "C. Meeks", description: "Belt is loose and needs to be retightened" },
    { id: "S010", type: "Safety", priority: "High", date: "3/22/2023", status: "In Review", assigned: "J. Wilson", description: "Safety guard is missing" },
    { id: "M053", type: "Maintenance", priority: "Medium", date: "5/1/2023", status: "In Process", assigned: "C. Meeks", description: "Air hose is leaking" },
    { id: "M052", type: "Maintenance", priority: "Medium", date: "4/30/2023", status: "On Hold", assigned: "E. Rogers", description: "Tool is dull" },
    { id: "M10", type: "Maintenance", priority: "Low", date: "1/1/2023", status: "Resolved", assigned: "E. Rogers", description: "Making a funny noise" },
  ];

  const pmTasks = [
    { status: "Overdue", color: "red", assigned: "Chad | Eric", task: "Grease Bearings", desc: "Use 5257 bearing grease", due: "4/20/2023" },
    { status: "Overdue", color: "red", assigned: "Eric", task: "Check Belt Tension", desc: "Deflect 1 inch under 10 lbs", due: "5/1/2023" },
    { status: "Upcoming", color: "yellow", assigned: "Sam", task: "Calibrate Head", desc: "Run program XYX", due: "5/15/2023" },
    { status: "Good", color: "green", assigned: "Lucy | Josh", task: "Charge Oil", desc: "Drain and refill with SAE‑20", due: "7/20/2023" },
    { status: "Good", color: "green", assigned: "Murphy", task: "Check Air Pressure", desc: "Verify gauge near machine", due: "8/5/2023" },
  ];

  const parts = [
    { part: "ABC0001", desc: "Guard - Fan", supplier: "Copeland", spn: "024-0217-00" },
    { part: "ABC0002", desc: "Condenser", supplier: "Copeland", spn: "066-0320-04" },
    { part: "ABC0003", desc: "Shroud Assembly", supplier: "Copeland", spn: "545-0029-00" },
    { part: "ABC0010", desc: "Liquid Receiver", supplier: "Copeland", spn: "566-1181-00" },
    { part: "ABC0025", desc: "Service Valve Kit", supplier: "Copeland", spn: "577-0315-05" },
  ];

  const logs = [
    { name: "Motor 1 Temp", color: "yellow", value: "110 F", measured: "5/29/23", range: "70 F to 105 F" },
    { name: "Oil Level", color: "yellow", value: "90 %", measured: "5/20/23", range: "70 to 100%" },
    { name: "Air Pressure", color: "green", value: "25 PSIG", measured: "5/20/23", range: "20 to 30 PSIG" },
    { name: "Motor 2 Temp", color: "yellow", value: "104 F", measured: "5/29/23", range: "70 to 105 F" },
    { name: "System Amps", color: "green", value: "17.8 Amps", measured: "5/20/23", range: "15 to 19 A" },
  ];

  const feed = [
    { id: 1, title: "Grease Bearings", author: "Chad M", time: "May 30, 2023 at 2:30 PM", body: "Task marked as complete" },
    { id: 2, title: "S030", author: "Chad M", time: "May 30, 2023 at 2:30 PM", body: "@Eric Can you take care of this?" },
    { id: 3, title: "M025", author: "Eric R", time: "May 30, 2023 at 2:30 PM", body: "Changed status to resolved" },
  ];

  return (
    <section className="equipment">
      {/* Header */}
      <div className="eq-header">
        <div className="eq-back-wrap">
          <button className="eq-back" onClick={() => navigate(-1)} title="Back">
            <ArrowLeft size={18} />
          </button>
          <h1>{eq.display}</h1>
        </div>
      </div>

      {/* Meta / hero */}
      <div className="eq-detail">
        <div className="eq-thumb-large" aria-label="Equipment image placeholder" />
        <dl className="eq-kv">
          <div><dt>Name:</dt><dd>{eq.id}</dd></div>
          <div><dt>Description:</dt><dd>{eq.details.description}</dd></div>
          <div><dt>Production Area:</dt><dd>{eq.details.productionArea}</dd></div>
          <div><dt>Work Station:</dt><dd>{eq.details.workStation}</dd></div>
          <div><dt>Category:</dt><dd>{eq.details.category}</dd></div>
          <div><dt>Track run Time:</dt><dd>{eq.details.trackRunTime}</dd></div>
          <div><dt>Notes:</dt><dd>{eq.details.notes}</dd></div>
        </dl>
        <div className="eq-detail-actions">
          <button className="eq-round-btn" title="Edit"><Pencil size={18} /></button>
          <button className="eq-round-btn" title="Service"><Wrench size={18} /></button>
          <button className="eq-round-btn" title="Tools"><Hammer size={18} /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="eq-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`eq-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="eq-tab-panel">
        {tab === "Details" && (
          <table className="eq-details-table">
            <tbody>
              <tr><td>Serial Number</td><td>{eq.details.serial}</td></tr>
              <tr><td>Manufacturer</td><td>{eq.details.manufacturer}</td></tr>
              <tr><td>Model Number</td><td>{eq.details.model}</td></tr>
              <tr><td>Service Phone</td><td>{eq.details.servicePhone}</td></tr>
            </tbody>
          </table>
        )}

        {tab === "Documentation" && (
          <>
            <table className="eq-table">
              <thead>
                <tr>
                  <th className="left">Document Type</th>
                  <th className="left">Document ID</th>
                  <th className="left">Description</th>
                  <th className="left">Updated</th>
                  <th className="left">Version</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {docs.map((d, i) => (
                  <tr key={`${d.id}-${i}`}>
                    <td className="cell left">
                      <span className="eq-doc-type">{d.type}</span>
                    </td>
                    <td className="cell left">{d.id}</td>
                    <td className="cell left">{d.description}</td>
                    <td className="cell left">{d.updated}</td>
                    <td className="cell left">{d.version}</td>
                    <td className="cell">
                      <ActionBtns />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="eq-fab" onClick={() => alert("Add document")} title="Add">
              <Plus size={22} />
            </button>
          </>
        )}

        {tab === "Requests" && (
          <table className="eq-table">
            <thead>
              <tr>
                <th className="left">ID</th>
                <th className="left">Type</th>
                <th className="left">Priority</th>
                <th className="left">Date</th>
                <th className="left">Status</th>
                <th className="left">Assigned</th>
                <th className="left">Description</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="cell left">{r.id}</td>
                  <td className="cell left">{r.type}</td>
                  <td className="cell left">{r.priority}</td>
                  <td className="cell left">{r.date}</td>
                  <td className="cell left">{r.status}</td>
                  <td className="cell left">{r.assigned}</td>
                  <td className="cell left">{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Maintenance" && (
          <>
            <table className="eq-table">
              <thead>
                <tr>
                  <th className="left">Status</th>
                  <th className="left">Assigned To</th>
                  <th className="left">Tasks</th>
                  <th className="left">Descriptions</th>
                  <th className="left">Due Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {pmTasks.map((t, i) => (
                  <tr key={`${t.task}-${i}`}>
                    <td className="cell left">
                      <span className="eq-status">
                        <Dot color={t.color} />
                        {t.status}
                      </span>
                    </td>
                    <td className="cell left">{t.assigned}</td>
                    <td className="cell left">{t.task}</td>
                    <td className="cell left">{t.desc}</td>
                    <td className="cell left">{t.due}</td>
                    <td className="cell">
                      <ActionBtns />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="eq-fab" onClick={() => alert("Add task")} title="Add">
              <Plus size={22} />
            </button>
          </>
        )}

        {tab === "Spare Parts" && (
          <table className="eq-table">
            <thead>
              <tr>
                <th className="left">Part Number</th>
                <th className="left">Description</th>
                <th className="left">Supplier</th>
                <th className="left">Supplier P/N</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.part}>
                  <td className="cell left">{p.part}</td>
                  <td className="cell left">{p.desc}</td>
                  <td className="cell left">{p.supplier}</td>
                  <td className="cell left">{p.spn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Data Logging" && (
          <table className="eq-table">
            <thead>
              <tr>
                <th className="left">Name</th>
                <th className="left">Last Value</th>
                <th className="left">Last Measured</th>
                <th className="left">Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={`${l.name}-${i}`}>
                  <td className="cell left">
                    <Dot color={l.color} /> {l.name}
                  </td>
                  <td className="cell left">
                    <span className="eq-highlight">{l.value}</span>
                  </td>
                  <td className="cell left">{l.measured}</td>
                  <td className="cell left">
                    {l.range}
                    <button className="eq-icon-btn ml8" title="Info">
                      <Info size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "History" && (
          <div className="eq-feed">
            <div className="eq-composer">
              <input type="text" placeholder="Write Something..." />
              <button className="eq-share">Share</button>
            </div>

            {feed.map((p) => (
              <div key={p.id} className="eq-post">
                <div className="eq-avatar" />
                <div className="eq-post-body">
                  <div className="eq-post-title">{p.title} — <span className="muted">{p.author}</span></div>
                  <div className="eq-post-time">{p.time}</div>
                  <div className="eq-post-text">{p.body}</div>
                  <div className="eq-post-actions">
                    <button>Comment</button>
                    <button>Like</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
import { useState } from "react";
import { Pencil, Check, Plus, Trash2, Filter, Ban } from "lucide-react";
import "./EquipmentCategories.css";

const initialCategory = {
  name: "CNC Machines",
  description: "CNC Machines",
  notes: "This includes CNC Lathes and Mills",
};

const initialDefaults = [
  { id: "serial", left: "Serial Number", right: "Serial Number" },
  { id: "manufacturer", left: "Manufacturer", right: "Manufacturer" },
  { id: "model", left: "Model Number", right: "Model Number" },
  { id: "service", left: "Service Phone", right: "(####) ###-####" },
];

const equipmentRows = [
  { id: "E1", name: "E1", description: "Machine 1", priority: 2.0 },
  { id: "E2", name: "E2", description: "Machine 2", priority: 1.5 },
  { id: "E3", name: "E3", description: "Machine 3", priority: 0.95 },
  { id: "E4", name: "E4", description: "Machine 4", priority: 0.7 },
  { id: "E5", name: "E5", description: "Machine 5", priority: 0.6 },
];

function Dot({ value }) {
  const color = value >= 1.5 ? "red" : value >= 0.9 ? "yellow" : "green";
  return <span className={`ec-dot ${color}`} aria-hidden="true" />;
}
function RowHandle() {
  return <span className="ec-handle" aria-hidden="true" />;
}

export default function EquipmentCategory({ onRowClick, onCreate }) {
  const [tab, setTab] = useState("Equipment"); // Equipment default
  const [edit, setEdit] = useState(false); // for Defaults tab
  const [category, setCategory] = useState(initialCategory);
  const [defaults, setDefaults] = useState(initialDefaults);

  const isDefaults = tab === "Defaults";

  const handleFieldChange = (key) => (e) =>
    setCategory((c) => ({ ...c, [key]: e.target.value }));

  const updateRow = (id, side) => (e) => {
    const val = e.target.value;
    setDefaults((rows) => rows.map((r) => (r.id === id ? { ...r, [side]: val } : r)));
  };

  const addRow = () => {
    const id = `f_${Date.now()}`;
    setDefaults((rows) => [...rows, { id, left: "New Field", right: "Value" }]);
  };
  const removeRow = (id) => setDefaults((rows) => rows.filter((r) => r.id !== id));

  const onSave = () => {
    console.log("Saved:", { category, defaults });
    setEdit(false);
  };
  const onCancel = () => {
    setCategory(initialCategory);
    setDefaults(initialDefaults);
    setEdit(false);
  };

  return (
    <section className="ec-page">
      <main className="ec-main">
        {/* Header row with action */}
        <div className="ec-header">
          <h2 className="ec-title">Category</h2>
          {isDefaults ? (
            <button
              className="ec-round"
              title={edit ? "Save" : "Edit"}
              onClick={edit ? onSave : () => setEdit(true)}
            >
              {edit ? <Check size={18} /> : <Pencil size={18} />}
            </button>
          ) : (
            <button className="ec-round" title="View only">
              <Ban size={18} />
            </button>
          )}
        </div>

        {/* Hero: image + key/values */}
        <div className="ec-hero">
          <div className="ec-thumb" aria-label="Graphic placeholder" />
          <dl className="ec-kv">
            <div>
              <dt>Name:</dt>
              <dd>
                {isDefaults && edit ? (
                  <input
                    className="ec-input"
                    value={category.name}
                    onChange={handleFieldChange("name")}
                  />
                ) : (
                  category.name
                )}
              </dd>
            </div>
            <div>
              <dt>Description:</dt>
              <dd>
                {isDefaults && edit ? (
                  <input
                    className="ec-input"
                    value={category.description}
                    onChange={handleFieldChange("description")}
                  />
                ) : (
                  category.description
                )}
              </dd>
            </div>
            <div>
              <dt>Notes:</dt>
              <dd>
                {isDefaults && edit ? (
                  <input
                    className="ec-input"
                    value={category.notes}
                    onChange={handleFieldChange("notes")}
                  />
                ) : (
                  category.notes
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Tabs */}
        <div className="ec-tabs">
          <button
            className={`ec-tab ${isDefaults ? "active" : ""}`}
            onClick={() => setTab("Defaults")}
          >
            Defaults
          </button>
          <button
            className={`ec-tab ${!isDefaults ? "active" : ""}`}
            onClick={() => setTab("Equipment")}
          >
            Equipment
          </button>
        </div>

        {/* Content */}
        {isDefaults ? (
          <div className="ec-table-block">
            <table className="ec-table">
              <tbody>
                {defaults.map((r) => (
                  <tr key={r.id}>
                    <td className="left">
                      {edit ? (
                        <input
                          className="ec-input"
                          value={r.left}
                          onChange={updateRow(r.id, "left")}
                        />
                      ) : (
                        r.left
                      )}
                    </td>
                    <td className="left">
                      {edit ? (
                        <input
                          className="ec-input"
                          value={r.right}
                          onChange={updateRow(r.id, "right")}
                        />
                      ) : (
                        r.right
                      )}
                    </td>
                    {edit ? (
                      <td className="ec-row-actions">
                        <button
                          className="ec-mini-icon"
                          title="Remove row"
                          onClick={() => removeRow(r.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    ) : (
                      <td />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {edit && (
              <div className="ec-table-foot">
                <button className="ec-mini-round" onClick={addRow} title="Add row">
                  <Plus size={16} />
                </button>
                <div className="ec-edit-actions">
                  <button className="ec-btn ghost" onClick={onCancel}>
                    Cancel
                  </button>
                  <button className="ec-btn primary" onClick={onSave}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="ec-table-wrap">
            <table className="ec-table">
              <thead>
                <tr>
                  <th className="w-handle" />
                  <th className="left">
                    Name <Filter size={12} className="ml4" />
                  </th>
                  <th className="left">
                    Description <Filter size={12} className="ml4" />
                  </th>
                  <th className="left">
                    Priority <Filter size={12} className="ml4" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {equipmentRows.map((r) => (
                  <tr
                    key={r.id}
                    className="row-link"
                    onClick={() => (typeof onRowClick === "function" ? onRowClick(r) : null)}
                  >
                    <td className="w-handle">
                      <RowHandle />
                    </td>
                    <td className="cell left">{r.name}</td>
                    <td className="cell left">{r.description}</td>
                    <td className="cell left ec-prio">
                      <span>{r.priority}</span>
                      <Dot value={r.priority} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="ec-fab"
              title="Add equipment"
              onClick={() => (typeof onCreate === "function" ? onCreate() : alert("Create"))}
            >
              <Plus size={24} />
            </button>
          </div>
        )}
      </main>
    </section>
  );
}
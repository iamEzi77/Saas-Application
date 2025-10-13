// src/pages/Users/TrainingMatrix.jsx
import { useMemo } from "react";
import { sampleUsers, sampleTraining } from "./UserManagment/UserDetailsData";
import "./Training.css";

// Helper: get unique operation list (columns) from training data
function getAllOperations(trainingByUser) {
  const set = new Set();
  Object.values(trainingByUser).forEach((rows) => {
    (rows || []).forEach((r) => set.add(r.operation));
  });
  return Array.from(set);
}

// Optional: enforce a preferred order; others go after in alphabetical order
const preferredOrder = ["Motor Assembly", "Pump Assembly", "Bracket Assembly"];
function orderOperations(ops) {
  const pref = ops.filter((o) => preferredOrder.includes(o))
                  .sort((a, b) => preferredOrder.indexOf(a) - preferredOrder.indexOf(b));
  const rest = ops.filter((o) => !preferredOrder.includes(o)).sort();
  return [...pref, ...rest];
}

// Parse date and decide status color
function monthsBetween(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return Infinity;
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}
function cellClass(dateStr) {
  if (!dateStr || dateStr === "-") return "empty";
  const m = monthsBetween(dateStr);
  return m <= 24 ? "ok" : "warn"; // <= 24 months is green; older is yellow
}

// Keep a consistent user list (you can filter to only those that have training if you prefer)
function getUsers() {
  return sampleUsers; // or sampleUsers.filter(u => sampleTraining[u.id]?.length)
}

export default function TrainingMatrix() {
  // Build operations from data
  const ops = useMemo(() => orderOperations(getAllOperations(sampleTraining)), []);
  const users = useMemo(() => getUsers(), []);

  // Build a quick lookup: userId -> op -> dateStr
  const matrix = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      const rows = sampleTraining[u.id] || [];
      const opMap = {};
      rows.forEach((r) => {
        opMap[r.operation] = r.certificationDate || r.date || r.certification || r.certDate || ""; // support alt keys if any
      });
      map[u.id] = opMap;
    });
    return map;
  }, [users]);

  return (
    <section className="users">
      <div className="tmx-header">
        <h1>Training Matrix</h1>
      </div>

      <div className="tmx-wrap">
        <table className="tmx-table">
          <thead>
            <tr>
              <th className="left sticky-col">User</th>
              {ops.map((op) => (
                <th className="center" key={op}>{op}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="sticky-col">
                  <span className="tmx-user-tag">{u.name}</span>
                </td>
                {ops.map((op) => {
                  const dateStr = matrix[u.id]?.[op] || "-";
                  const cls = cellClass(dateStr); 
                  return (
                    <td key={`${u.id}-${op}`} className={`tmx-cell ${cls}`}>
                      {dateStr}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
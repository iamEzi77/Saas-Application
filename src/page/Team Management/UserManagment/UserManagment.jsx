import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, List, Filter, Plus } from "lucide-react";
import { getUsersList } from "./UserDetailsData";
import "./UserManagment.css";

function PMDot({ color }) {
  return <span className={`us-dot ${color}`} aria-hidden="true" />;
}

function Pagination({ page, setPage, total, perPage, setPerPage }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(total, start + perPage - 1);
  const options = [5, 10, 15];

  return (
    <nav className="pgm" aria-label="Pagination">
      <div className="pgm-left">
        <span className="pgm-left-title">Items per Page</span>
        <div className="pgm-select-wrap">
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
            {options.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pgm-caret">▾</span>
        </div>
        <div className="pgm-range">
          <span className="pgm-badge">{start} - {end}</span>
          <span className="pgm-left-text">of</span>
          <span className="pgm-badge">{total}</span>
          <span className="pgm-left-text">in total</span>
        </div>
      </div>

      <div className="pgm-right">
        <button className="pgm-nav" disabled={page === 1} onClick={() => setPage(page - 1)}>← Previous</button>
        <div className="pgm-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} className={`pgm-page ${p === page ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
          ))}
        </div>
        <button className="pgm-next" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </nav>
  );
}

export default function UsersView() {
  const navigate = useNavigate();
  const all = useMemo(() => getUsersList(), []);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = all.length;
  const start = (page - 1) * perPage;
  const pageItems = all.slice(start, start + perPage);

  const goDetail = (id) => navigate(`/team/user-management/${id}`);

  return (
    <section className="users">
      <div className="us-header">
        <h1>Users</h1>
        <div className="us-view-toggle">
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} title="Grid"><LayoutGrid size={18} /></button>
          <button className={view === "table" ? "active" : ""} onClick={() => setView("table")} title="Table"><List size={18} /></button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="us-grid">
          {all.map((u) => (
            <button key={u.id} className="us-card" onClick={() => goDetail(u.id)} title={u.name}>
              <div className="us-thumb" />
              <div className="us-card-name">{u.name}</div>
              <div className="us-card-sub">{u.userType}</div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="us-table-wrap">
            <div className="us-title">Users</div>
            <table className="us-table">
              <thead>
                <tr>
                  <th className="left">Name <Filter size={12} className="ml4" /></th>
                  <th className="left">User Type <Filter size={12} className="ml4" /></th>
                  <th className="left">Role <Filter size={12} className="ml4" /></th>
                  <th className="left">Status</th>
                  <th className="left">PM</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((u) => (
                  <tr key={u.id} className="row-link" onClick={() => goDetail(u.id)}>
                    <td className="cell left">{u.name}</td>
                    <td className="cell left">{u.userType}</td>
                    <td className="cell left">{u.role}</td>
                    <td className="cell left">{u.status}</td>
                    <td className="cell left"><PMDot color={u.pm} /></td>
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

      <button className="us-fab" onClick={() => alert("Add user")} title="Add user">
        <Plus size={24} />
      </button>
    </section>
  );
}
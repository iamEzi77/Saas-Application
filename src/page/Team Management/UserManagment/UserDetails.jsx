import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Check, Eye, Filter } from "lucide-react";
import { getUsersList, sampleRequests, samplePM, sampleTeams, sampleTraining } from "./UserDetailsData";
import "./UserManagment.css";

const TABS = ["Details", "Requests", "PM", "Teams", "Training", "Manage"];

function RowHandle() {
  return <span className="us-handle" aria-hidden="true" />;
}

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const list = useMemo(() => getUsersList(), []);
  const user = list.find((u) => u.id === id);

  const [tab, setTab] = useState("Details");

  const isAdmin = user?.userType?.toLowerCase() === "administrator";

  const [manageEdit, setManageEdit] = useState(false);
  const [manage, setManage] = useState(() => ({
    status: user?.status || "Approved",
    userType: user?.userType?.includes("Standard") ? "Standard User" : "Basic User",
    permissions: {
      standard: true,
      manager: false,
      administrator: isAdmin,
    },
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    nickName: user?.name || "",
    email: user?.email || "user@example.com",
  }));

  if (!user) {
    return (
      <section className="users">
        <div className="us-header">
          <div className="us-back-wrap">
            <button className="us-back" onClick={() => navigate(-1)} title="Back">
              <ArrowLeft size={18} />
            </button>
            <h1>Users</h1>
          </div>
        </div>
        <div style={{ padding: 16 }}>User not found.</div>
      </section>
    );
  }

  const requests = sampleRequests[user.id] || [];
  const pmTasks = samplePM[user.id] || [];
  const teamRows = sampleTeams[user.id] || [];
  const trainingRows = sampleTraining[user.id] || [];

  const pmColor = (status) => (status === "Overdue" ? "red" : status === "Upcoming" ? "yellow" : "green");
  const prioColor = (val) => (val >= 1.5 ? "red" : val >= 0.9 ? "yellow" : "green");

  const onPencilClick = () => {
    if (tab !== "Manage") return;
    if (!isAdmin) {
      alert("Only administrators can edit this data.");
      return;
    }
    setManageEdit(true);
  };

  const onSaveManage = () => setManageEdit(false);

  const setField = (key) => (e) => setManage((m) => ({ ...m, [key]: e.target.value }));
  const setPerm = (key) => (e) =>
    setManage((m) => ({ ...m, permissions: { ...m.permissions, [key]: e.target.checked } }));

  return (
    <section className="users">
      <div className="us-header">
        <div className="us-back-wrap">
          <button className="us-back" onClick={() => navigate(-1)} title="Back">
            <ArrowLeft size={18} />
          </button>
          <h1>{user.name}</h1>
        </div>

        <div className="us-actions-right">
          {tab === "Manage" && manageEdit ? (
            <button className="us-round-btn" title="Save" onClick={onSaveManage}>
              <Check size={18} />
            </button>
          ) : (
            <button
              className={`us-round-btn ${tab !== "Manage" ? "disabled" : ""} ${!isAdmin ? "disabled" : ""}`}
              title={tab === "Manage" ? (isAdmin ? "Edit" : "View only") : "View only"}
              onClick={onPencilClick}
              disabled={!isAdmin}
            >
              <Pencil size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="us-detail">
        <div className="us-thumb-large" aria-label="User avatar placeholder" />
        <dl className="us-kv">
          <div>
            <dt>First Name:</dt>
            <dd>{tab === "Manage" && manageEdit ? <input className="us-input" value={manage.firstName} onChange={setField("firstName")} /> : manage.firstName}</dd>
          </div>
          <div>
            <dt>Last Name:</dt>
            <dd>{tab === "Manage" && manageEdit ? <input className="us-input" value={manage.lastName} onChange={setField("lastName")} /> : manage.lastName}</dd>
          </div>
          <div>
            <dt>Nick Name:</dt>
            <dd>{tab === "Manage" && manageEdit ? <input className="us-input" value={manage.nickName} onChange={setField("nickName")} /> : manage.nickName}</dd>
          </div>
          <div>
            <dt>Email:</dt>
            <dd>{tab === "Manage" && manageEdit ? <input className="us-input" value={manage.email} onChange={setField("email")} /> : manage.email}</dd>
          </div>
          <div><dt>User Type:</dt><dd>{manage.userType}</dd></div>
          <div><dt>Status:</dt><dd>{manage.status}</dd></div>
        </dl>
      </div>

      <div className="us-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`us-tab ${tab === t ? "active" : ""}`}
            onClick={() => {
              setTab(t);
              if (t !== "Manage") setManageEdit(false);
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="us-tab-panel">
        {tab === "Details" && (
          <table className="us-details-table">
            <tbody>
              <tr><td>First Name</td><td>{manage.firstName}</td></tr>
              <tr><td>Last Name</td><td>{manage.lastName}</td></tr>
              <tr><td>Nick Name</td><td>{manage.nickName}</td></tr>
              <tr><td>Email</td><td>{manage.email}</td></tr>
            </tbody>
          </table>
        )}

        {tab === "Requests" && (
          <table className="us-table">
            <thead>
              <tr>
                <th className="left">ID</th>
                <th className="left">Type</th>
                <th className="left">Priority</th>
                <th className="left">Date</th>
                <th className="left">Status</th>
                <th className="left">Submitted</th>
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
                  <td className="cell left">{r.submitted}</td>
                  <td className="cell left">{r.assigned}</td>
                  <td className="cell left">{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "PM" && (
          <table className="us-table">
            <thead>
              <tr>
                <th className="left">Equipment</th>
                <th className="left">Status</th>
                <th className="left">Tasks</th>
                <th className="left">Descriptions</th>
                <th className="left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {pmTasks.map((t, i) => (
                <tr key={`${t.equipment}-${i}`}>
                  <td className="cell left">
                    <span className="us-equip">
                      <span className={`us-dot ${pmColor(t.status)}`} />
                      {t.equipment}
                    </span>
                  </td>
                  <td className="cell left">{t.status}</td>
                  <td className="cell left">{t.task}</td>
                  <td className="cell left">{t.desc}</td>
                  <td className="cell left">{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Teams" && (
          <table className="us-table">
            <thead>
              <tr>
                <th className="w-handle" />
                <th className="left">Role <Filter size={12} className="ml4" /></th>
                <th className="left">Team <Filter size={12} className="ml4" /></th>
                <th className="left">Description <Filter size={12} className="ml4" /></th>
                <th className="left">Team Type <Filter size={12} className="ml4" /></th>
                <th className="left">Priority <Filter size={12} className="ml4" /></th>
              </tr>
            </thead>
            <tbody>
              {teamRows.map((r, i) => (
                <tr key={`${r.team}-${i}`}>
                  <td className="w-handle"><RowHandle /></td>
                  <td className="cell left">{r.role}</td>
                  <td className="cell left">{r.team}</td>
                  <td className="cell left">{r.description}</td>
                  <td className="cell left">{r.teamType}</td>
                  <td className="cell left">
                    <span className="us-prio">
                      <span>{r.priority}</span>
                      <span className={`us-dot ${prioColor(r.priority)}`} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Training" && (
          <table className="us-table">
            <thead>
              <tr>
                <th className="left">Operation <Filter size={12} className="ml4" /></th>
                <th className="left">Description <Filter size={12} className="ml4" /></th>
                <th className="left">Certification Date <Filter size={12} className="ml4" /></th>
                <th className="left">Skill Level <Filter size={12} className="ml4" /></th>
              </tr>
            </thead>
            <tbody>
              {trainingRows.map((t, i) => (
                <tr key={`${t.operation}-${i}`}>
                  <td className="cell left">{t.operation}</td>
                  <td className="cell left">{t.description}</td>
                  <td className="cell left">{t.certificationDate}</td>
                  <td className="cell left">{t.skillLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "Manage" && (
          <div className="us-manage">
            <div className="us-section">
              <div className="us-section-title">User Status</div>
              <select className="us-select" value={manage.status} onChange={setField("status")} disabled={!manageEdit}>
                <option>Approved</option>
                <option>Pending</option>
                <option>Suspended</option>
                <option>Disabled</option>
              </select>
            </div>

            <div className="us-section">
              <div className="us-section-title">User Type</div>
              <div className="us-checkcol">
                <label className="us-check">
                  <input type="radio" name="userType" value="Basic User" checked={manage.userType === "Basic User"} onChange={setField("userType")} disabled={!manageEdit} />
                  <span>Basic User</span>
                </label>
                <label className="us-check">
                  <input type="radio" name="userType" value="Standard User" checked={manage.userType === "Standard User"} onChange={setField("userType")} disabled={!manageEdit} />
                  <span>Standard User</span>
                </label>
              </div>
            </div>

            <div className="us-section">
              <div className="us-section-title">User Permissions</div>
              <div className="us-checkcol">
                <label className="us-check">
                  <input type="checkbox" checked={manage.permissions.standard} onChange={setPerm("standard")} disabled={!manageEdit} />
                  <span>Standard</span>
                </label>
                <label className="us-check">
                  <input type="checkbox" checked={manage.permissions.manager} onChange={setPerm("manager")} disabled={!manageEdit} />
                  <span>Manager</span>
                </label>
                <label className="us-check">
                  <input type="checkbox" checked={manage.permissions.administrator} onChange={setPerm("administrator")} disabled={!manageEdit} />
                  <span>Administrator</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

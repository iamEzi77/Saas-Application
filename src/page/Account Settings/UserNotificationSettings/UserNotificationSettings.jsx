import { useState } from "react";
import "./UserNotificationSettings.css";

const items = [
  { key: "dailyUpdate", label: "Daily Update" },
  { key: "newMaintAssigned", label: "New Maintenance Request Assigned to me" },
  { key: "newSafetyAssigned", label: "New Safety Concern Assigned to me" },
  { key: "addedToTeam", label: "Added to a new team" },
  { key: "madeTeamLead", label: "Made a team lead" },
];

export default function NotificationSettings() {
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [prefs, setPrefs] = useState({
    dailyUpdate: true,
    newMaintAssigned: true,
    newSafetyAssigned: true,
    addedToTeam: true,
    madeTeamLead: true,
  });

  const togglePref = (key) => (e) =>
    setPrefs((p) => ({ ...p, [key]: e.target.checked }));

  const onSave = () => {
    const payload = { receiveEmails, ...prefs };
    console.log("Saving Notification Settings:", payload);
    alert("Saved (mock)!");
  };

  return (
    <section className="notify-settings">
      {/* Header */}
      <div className="ns-header">
        <h1>Notification Settings</h1>
        <button className="ns-btn-primary" type="button" onClick={onSave}>
          Save Changes
        </button>
      </div>

      {/* Email Notifications master toggle */}
      <div className="ns-section">
        <h2 className="ns-section-title">Email Notifications</h2>

        <div className="ns-row">
          <label htmlFor="receiveEmails" className="ns-row-label">
            Receive Emails
          </label>
          <input
            id="receiveEmails"
            type="checkbox"
            checked={receiveEmails}
            onChange={(e) => setReceiveEmails(e.target.checked)}
          />
        </div>
      </div>

      {/* Individual Email Notifications */}
      <div className="ns-section">
        <h2 className="ns-section-title">Email Notifications:</h2>

        <div className="ns-list">
          {items.map((it) => (
            <div className="ns-row" key={it.key}>
              <label htmlFor={it.key} className="ns-row-label">
                {it.label}
              </label>
              <input
                id={it.key}
                type="checkbox"
                checked={prefs[it.key]}
                onChange={togglePref(it.key)}
                disabled={!receiveEmails}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
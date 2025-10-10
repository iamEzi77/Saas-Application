import React from "react";
import { Link, useLocation } from "react-router-dom";
import './AccountSetting.css';

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || "");
  return (first + last).toUpperCase();
}

const defaultNavItems = [
  { key: "user", label: "User Settings", path: "/settings/user" },
  { key: "company", label: "Company Settings", path: "/settings/company" },
  { key: "billing", label: "Plans & Billing", path: "/settings/billing" },
  { key: "notifications", label: "Notification Settings", path: "/settings/notifications" },
  { key: "preferences", label: "User Preferences", path: "/settings/preferences" },
  { key: "escalation", label: "Escalation Settings", path: "/settings/escalation" },
];

function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${Math.round(val * 10) / 10} ${units[i]}`;
}

function AccountSettings({
  user = { name: "Your Name", email: "you@example.com" },
  selected = "company",
  navItems = defaultNavItems,
  storage = {
    usedBytes: 0.1 * 1024 * 1024 * 1024, 
    limitBytes: 1 * 1024 * 1024 * 1024,
  },
  className = "",
}) {
  const location = useLocation();
  const used = storage.usedBytes ?? 0;
  const limit = storage.limitBytes || 1;
  const pct = Math.min(100, Math.max(0, Math.round((used / limit) * 100)));
  const barColor = pct < 70 ? "ok" : pct < 90 ? "warn" : "danger";

  return (
    <aside className={`settings-sidebar ${className}`}>
      <div className="ss-header">
        <div className="ss-avatar" aria-hidden="true">
          {initials(user.name)}
        </div>
        <div className="ss-user">
          <div className="ss-name" title={user.name}>{user.name || "—"}</div>
          <div className="ss-email" title={user.email}>{user.email || ""}</div>
        </div>
      </div>

      <nav className="ss-nav" aria-label="Settings">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                to={item.path}
                className={`ss-nav-item ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ss-footer">
        <div className="ss-storage">
          <div
            className="ss-storage-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Data storage used"
          >
            <div className={`ss-storage-fill ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="ss-storage-text">{pct}% of {formatBytes(limit)} used</div>
        </div>
        <button type="button" className="ss-cta">Get More Data</button>
      </div>
    </aside>
  );
}

export default AccountSettings;

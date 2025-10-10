import { useRef, useState } from "react";
import "./CompanySetting.css";

const tzOptions = [
  { value: "MST", label: "MST (UTC−07:00)" },
  { value: "PST", label: "PST (UTC−08:00)" },
  { value: "CST", label: "CST (UTC−06:00)" },
  { value: "EST", label: "EST (UTC−05:00)" },
  { value: "UTC", label: "UTC (±00:00)" },
];

const dayKeys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CompanySettings() {
  const fileRef = useRef(null);
  const [logo, setLogo] = useState(null);
  const [form, setForm] = useState({
    companyName: "My Company Name",
    primaryContactName: "Chad",
    primaryContactEmail: "Chad@gmail.com",
    companyPhone: "(555) 123-4567",
    companyAddress: "1750 West 2100 South\nSalt Lake City, UT 84119",
    timeZone: "MST",
    serviceDays: { Sun: false, Mon: true, Tue: true, Wed: true, Thu: true, Fri: false, Sat: false },
  });

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleDayToggle = (day) => (e) => {
    const checked = e.target.checked;
    setForm((f) => ({ ...f, serviceDays: { ...f.serviceDays, [day]: checked } }));
  };

  const onPickLogo = () => fileRef.current?.click();
  const onLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogo(url);
  };

  const onSave = () => {
    console.log("Saving company settings:", { ...form, logo });
    alert("Saved (mock)!");
  };

  return (
    <section className="company-settings">
      <div className="cs-header">
        <h1>Company Settings</h1>
        <button className="cs-btn-primary" type="button" onClick={onSave}>
          Save Changes
        </button>
      </div>

      <div className="cs-section">
        <h2 className="cs-section-title">Company Details</h2>

        <div className="cs-details-grid">
          <div className="cs-logo-col">
            <div className="cs-logo-box" aria-label="Company logo">
              {logo ? <img src={logo} alt="Company logo" /> : <div className="cs-logo-cross" />}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onLogoFile} hidden />
            <button className="cs-btn-primary" type="button" onClick={onPickLogo}>
              Change Logo
            </button>
          </div>

          <div className="cs-form">
            <div className="cs-row">
              <label htmlFor="companyName">Company Name:</label>
              <input
                id="companyName"
                type="text"
                value={form.companyName}
                onChange={handleChange("companyName")}
              />
            </div>

            <div className="cs-row">
              <label htmlFor="primaryContactName">Primary Contact Name:</label>
              <input
                id="primaryContactName"
                type="text"
                value={form.primaryContactName}
                onChange={handleChange("primaryContactName")}
              />
            </div>

            <div className="cs-row">
              <label htmlFor="primaryContactEmail">Primary Contact Email:</label>
              <input
                id="primaryContactEmail"
                type="email"
                value={form.primaryContactEmail}
                onChange={handleChange("primaryContactEmail")}
              />
            </div>

            <div className="cs-row">
              <label htmlFor="companyPhone">Company Phone:</label>
              <input
                id="companyPhone"
                type="tel"
                value={form.companyPhone}
                onChange={handleChange("companyPhone")}
              />
            </div>

            <div className="cs-row">
              <label htmlFor="companyAddress">Company Address:</label>
              <textarea
                id="companyAddress"
                rows={2}
                value={form.companyAddress}
                onChange={handleChange("companyAddress")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cs-section">
        <h2 className="cs-section-title">Default Time Zone</h2>
        <div className="cs-tz-wrap">
          <select
            className="cs-select"
            value={form.timeZone}
            onChange={handleChange("timeZone")}
          >
            {tzOptions.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cs-section">
        <h2 className="cs-section-title">Standard Service Days</h2>

        <div className="cs-days">
          <div className="cs-days-row">
            {dayKeys.map((d) => (
              <label key={d} className="cs-day">
                <input
                  type="checkbox"
                  checked={!!form.serviceDays[d]}
                  onChange={handleDayToggle(d)}
                />
              </label>
            ))}
          </div>
          <div className="cs-days-row cs-days-labels">
            {dayKeys.map((d) => (
              <span key={`${d}-label`} className="cs-day-label">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
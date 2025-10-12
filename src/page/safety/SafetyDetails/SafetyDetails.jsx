import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import "./SafetyDetails.css";

const defaultData = {
  id: "S020",
  date: "5/30/2023",
  submittedBy: "Carl",
  area: "Production Line 1",
  item: "Haas 3230",
  assignedUser: "Brad",
  assignedTeam: "Safety",
  status: "In Process",
  conditions: {
    nearMiss: false,
    safetySuggestion: false,
    safetyConcern: false,
  },
  typeOfConcern: {
    unsafeAct: false,
    unsafeArea: false,
    unsafeUse: false,
    unsafeCondition: false,
  },
  description:
    "Safety interlock is not working. Machine runs with door open. This is extremely dangerous if someone forgets to close the door.",
};

export default function SafetyConcernDetails({
  open = true,
  onClose = () => {},
  initial = defaultData,
  onSave = (payload) => console.log("Save", payload),
}) {
  const overlayRef = useRef(null);

  // ✅ Always ensure `form` is valid (avoid null crash)
  const [form, setForm] = useState(initial || defaultData);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setForm(initial || defaultData);
  }, [initial, open]);

  // ✅ Don’t render if modal closed or data missing
  if (!open || !form) return null;

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleCond = (key) => (e) =>
    setForm((f) => ({
      ...f,
      conditions: { ...f.conditions, [key]: e.target.checked },
    }));

  const toggleType = (key) => (e) =>
    setForm((f) => ({
      ...f,
      typeOfConcern: { ...f.typeOfConcern, [key]: e.target.checked },
    }));

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleShare = () => {
    if (!comment.trim()) return;
    console.log("Share note:", comment);
    setComment("");
  };

  const handleSave = () => onSave(form);

  return (
    <div className="scd-overlay" ref={overlayRef} onMouseDown={handleOverlayClick}>
      <div className="scd-modal" role="dialog" aria-modal="true" aria-labelledby="scd-title">
        <div className="scd-header">
          <div className="scd-subtitle">Safety Concern Details</div>
          <div className="scd-title" id="scd-title">
            {form.id}
          </div>
          <button className="scd-close" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="scd-body">
          <div className="scd-grid">
            <label>Date:</label>
            <div className="scd-value">{form.date}</div>

            <label>Submitted By:</label>
            <div className="scd-value">{form.submittedBy}</div>

            <label>Area:</label>
            <div className="scd-value">{form.area}</div>

            <label>Item:</label>
            <div className="scd-value">{form.item}</div>

            <label>Assigned User:</label>
            <div>
              <select
                className="scd-select"
                value={form.assignedUser}
                onChange={setField("assignedUser")}
              >
                <option>Brad</option>
                <option>Mike</option>
                <option>William</option>
                <option>Eric</option>
                <option>C. Meeks</option>
              </select>
            </div>

            <label>Assigned Team:</label>
            <div>
              <select
                className="scd-select"
                value={form.assignedTeam}
                onChange={setField("assignedTeam")}
              >
                <option>Safety</option>
                <option>Engineering</option>
                <option>Maintenance</option>
                <option>Production</option>
              </select>
            </div>

            <label>Status:</label>
            <div>
              <select
                className="scd-select"
                value={form.status}
                onChange={setField("status")}
              >
                <option>In Process</option>
                <option>In Review</option>
                <option>On Hold</option>
                <option>Resolved</option>
              </select>
            </div>

            <label>Conditions</label>
            <div className="scd-checkcol">
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.conditions.nearMiss}
                  onChange={toggleCond("nearMiss")}
                />
                <span>Near Miss</span>
              </label>
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.conditions.safetySuggestion}
                  onChange={toggleCond("safetySuggestion")}
                />
                <span>Safety Suggestion</span>
              </label>
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.conditions.safetyConcern}
                  onChange={toggleCond("safetyConcern")}
                />
                <span>Safety Concern</span>
              </label>
            </div>

            <label>Type of Concern</label>
            <div className="scd-checkcol">
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.typeOfConcern.unsafeAct}
                  onChange={toggleType("unsafeAct")}
                />
                <span>Unsafe Act</span>
              </label>
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.typeOfConcern.unsafeArea}
                  onChange={toggleType("unsafeArea")}
                />
                <span>Unsafe Condition of Area</span>
              </label>
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.typeOfConcern.unsafeUse}
                  onChange={toggleType("unsafeUse")}
                />
                <span>Unsafe Use of Equipment</span>
              </label>
              <label className="scd-check">
                <input
                  type="checkbox"
                  checked={form.typeOfConcern.unsafeCondition}
                  onChange={toggleType("unsafeCondition")}
                />
                <span>Unsafe Condition of Equipment</span>
              </label>
            </div>

            <label>Detailed Description</label>
            <div>
              <textarea
                className="scd-textarea"
                rows={4}
                value={form.description}
                onChange={setField("description")}
              />
              <div className="scd-hint">
                Extremely dangerous if someone forgets to close the door.
              </div>
            </div>
          </div>

          {/* Comment composer */}
          <div className="scd-composer">
            <input
              type="text"
              placeholder="Write Something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="scd-share" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>

        <div className="scd-footer">
          <button className="scd-btn ghost" onClick={onClose}>
            Close
          </button>
          <button className="scd-btn primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

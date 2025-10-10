import { useState } from "react";
import { Check, Download, MoreVertical } from "lucide-react";
import "./plansBilling.css";

const features = [
  "Preventative Maintenance",
  "Maintenance Requests",
  "Safety Tracking",
  "Team Management",
  "Document Management",
  "1GB Free Storage",
  "Training Management",
];

const invoices = [
  { date: "6/13/2023", product: "VizmaPro", amount: 329.7 },
  { date: "5/13/2023", product: "VizmaPro", amount: 329.7 },
  { date: "4/13/2023", product: "VizmaPro", amount: 329.7 },
  { date: "3/13/2023", product: "VizmaPro", amount: 329.7 },
];

export default function PlansBilling() {
  const [plan, setPlan] = useState("yearly");

  return (
    <section className="plans-billing">
      {/* Header */}
      <div className="pb-header">
        <h1>Plans & Billing</h1>
      </div>

      <div className="pb-grid">
        {/* Left: Your Plan */}
        <div className="pb-left">
          <h2 className="pb-subtitle">Your Plan</h2>

          <div className="pb-plan-card">
            <div className="pb-plan-title">Essential</div>

            <div className="pb-plan-options">
              {/* Yearly */}
              <label className="pb-option">
                <input
                  type="radio"
                  name="billing"
                  value="yearly"
                  checked={plan === "yearly"}
                  onChange={() => setPlan("yearly")}
                />
                <div className="pb-option-text">
                  <span className="pb-option-label">Yearly Billing</span>
                  <span className="pb-price">
                    $44.76/mo <em>($537.12/yr)</em>
                  </span>
                </div>
              </label>

              {/* Monthly */}
              <label className="pb-option">
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={plan === "monthly"}
                  onChange={() => setPlan("monthly")}
                />
                <div className="pb-option-text">
                  <span className="pb-option-label">Monthly Billing</span>
                  <span className="pb-price">
                    $55.95/mo <em>($671.40/yr)</em>
                  </span>
                </div>
              </label>
            </div>

            <ul className="pb-feature-list">
              {features.map((f) => (
                <li key={f} className="pb-feature">
                  <Check size={16} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Billing Information */}
        <div className="pb-right">
          <h2 className="pb-subtitle">Billing Information</h2>

          <div className="pb-right-section">
            <div className="pb-block-title">Billing History</div>
            <div className="pb-history-list">
              {invoices.map((inv, i) => (
                <div key={`${inv.date}-${i}`} className="pb-history-item">
                  <div className="pb-history-main">
                    <span className="pb-history-date">{inv.date}</span>
                    <span className="pb-history-product">{inv.product}</span>
                    <span className="pb-history-amount">
                      ${inv.amount.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="icon-btn"
                    aria-label={`Download invoice ${inv.date}`}
                    onClick={() => alert(`Download invoice ${inv.date}`)}
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-right-section">
            <div className="pb-block-title with-actions">
              <span>Payment method</span>
              <button
                className="icon-btn"
                aria-label="More payment method actions"
                onClick={() => alert("Payment method actions")}
              >
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="pb-card-on-file">
              <div className="pb-card-brand" aria-hidden="true">
                AMERICAN
                <br />
                EXPRESS
              </div>
              <div className="pb-card-digits">••••&nbsp;&nbsp;2004</div>
              <div className="pb-card-exp">Expires 07/2027</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import type { FormData, NetworkCarrier, Step } from "@/types/form";
import { useState } from "react";
import NetworkRating from "./NetworkRating";
import StarRating from "./StarRating";

const STEPS: Step[] = [
  { id: 1, label: "Location", short: "01" },
  { id: 2, label: "Infrastructure", short: "02" },
  { id: 3, label: "Safety & Access", short: "03" },
  { id: 4, label: "Connectivity", short: "04" },
  { id: 5, label: "Submit", short: "05" },
];

const LGAS = [
  "Alimosho",
  "Ajeromi-Ifelodun",
  "Kosofe",
  "Mushin",
  "Oshodi-Isolo",
  "Ojo",
  "Ikorodu",
  "Surulere",
  "Agege",
  "Ifako-Ijaye",
  "Shomolu",
  "Abeokuta",
  "Lagos Island",
  "Lagos Mainland",
  "Somolu",
  "Apapa",
  "Badagry",
  "Epe",
  "Ibeju-Lekki",
  "Ikeja",
  "Eti-Osa",
];

const initialFormData: FormData = {
  lga: "",
  estate: "",
  street: "",
  tenureYears: "",
  power: 0,
  flooding: 0,
  roads: 0,
  security: 0,
  marketAccess: 0,
  transport: 0,
  transportCostRange: "",
  mtn: 0,
  airtel: 0,
  glo: 0,
  mobile9: 0,
  overallComment: "",
  anonymous: true,
};

export default function NeighbourlyForm() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const update = (key: keyof FormData, val: FormData[keyof FormData]) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const navigate = (dir: number) => {
    setDirection(dir > 0 ? "forward" : "back");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + dir);
      setAnimating(false);
    }, 220);
  };

  const canProceed = (): boolean => {
    if (step === 1) return !!formData.lga && !!formData.estate;
    if (step === 2)
      return formData.power > 0 && formData.flooding > 0 && formData.roads > 0;
    if (step === 3)
      return (
        formData.security > 0 &&
        formData.marketAccess > 0 &&
        formData.transport > 0
      );
    if (step === 4)
      return (
        formData.mtn > 0 ||
        formData.airtel > 0 ||
        formData.glo > 0 ||
        formData.mobile9 > 0
      );
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setFormData(initialFormData);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const carriers: NetworkCarrier[] = [
    { key: "mtn", label: "MTN", color: "#FFCC00" },
    { key: "airtel", label: "Airtel", color: "#FF0000" },
    { key: "glo", label: "Glo", color: "#00A651" },
    { key: "mobile9", label: "9mobile", color: "#006F3C" },
  ];

  const summaryItems = [
    { label: "Power", val: formData.power, icon: "⚡" },
    { label: "Flooding", val: formData.flooding, icon: "🌧" },
    { label: "Roads", val: formData.roads, icon: "🛣" },
    { label: "Security", val: formData.security, icon: "🔒" },
    { label: "Markets", val: formData.marketAccess, icon: "🛒" },
    { label: "Transport", val: formData.transport, icon: "🚌" },
  ];

  if (submitted) {
    return (
      <div className="app">
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <h2>Review Submitted</h2>
          <p>
            Your data helps thousands of Lagos renters make smarter housing
            decisions.
          </p>
          <div className="success-meta">
            <span>
              {formData.estate}, {formData.lga}
            </span>
            <span>·</span>
            <span>Contributes to 8 category scores</span>
          </div>
          <button className="btn-primary" onClick={resetForm}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <a href="/" className="logo-link">
            <span className="logo-mark">N</span>
            <span className="logo-text">NeighbourlyNG</span>
          </a>
        </div>
        <div className="header-tag">Rate Your Neighborhood</div>
      </header>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Step indicators */}
      <div className="steps-row">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`step-chip ${step === s.id ? "current" : step > s.id ? "done" : ""}`}
          >
            <span className="step-num">{step > s.id ? "✓" : s.short}</span>
            <span className="step-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Form card */}
      <div
        className={`card ${animating ? (direction === "forward" ? "slide-out-left" : "slide-out-right") : "slide-in"}`}
      >
        {step === 1 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Where do you live?</h2>
              <p>Help others find this neighborhood on the map.</p>
            </div>

            <div className="field">
              <label>
                Local Government Area (LGA) <span className="req">*</span>
              </label>
              <div className="select-wrap">
                <select
                  value={formData.lga}
                  onChange={(e) => update("lga", e.target.value)}
                >
                  <option value="">Select LGA</option>
                  {LGAS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                <span className="select-arrow">↓</span>
              </div>
            </div>

            <div className="field">
              <label>
                Estate / Area Name <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Iyana Ipaja Estate, Magodo Phase 2"
                value={formData.estate}
                onChange={(e) => update("estate", e.target.value)}
              />
            </div>

            <div className="field">
              <label>
                Street Name <span className="opt">optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Adewale Street"
                value={formData.street}
                onChange={(e) => update("street", e.target.value)}
              />
              <span className="field-hint">
                More specific = more useful for others
              </span>
            </div>

            <div className="field">
              <label>How long have you lived here?</label>
              <div className="tenure-pills">
                {["< 6 months", "6–12 months", "1–3 years", "3+ years"].map(
                  (t) => (
                    <button
                      key={t}
                      type="button"
                      className={`pill ${formData.tenureYears === t ? "selected" : ""}`}
                      onClick={() => update("tenureYears", t)}
                    >
                      {t}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="anon-row">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={(e) => update("anonymous", e.target.checked)}
                />
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                </span>
                Submit anonymously
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Infrastructure</h2>
              <p>Rate what you experience on a typical week.</p>
            </div>
            <StarRating
              label="Power Supply (NEPA/PHCN)"
              description="How many hours of grid power per day on average?"
              icon="⚡"
              value={formData.power}
              onChange={(v) => update("power", v)}
            />
            <div className="divider" />
            <StarRating
              label="Flood Risk"
              description="Does the area flood during rainy season?"
              icon="🌧"
              value={formData.flooding}
              onChange={(v) => update("flooding", v)}
            />
            <div className="divider" />
            <StarRating
              label="Road Conditions"
              description="Quality of roads — potholes, surface, accessibility"
              icon="🛣"
              value={formData.roads}
              onChange={(v) => update("roads", v)}
            />

            <div className="scale-guide">
              <span>1 = Very Poor</span>
              <span>3 = Average</span>
              <span>5 = Excellent</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Safety & Daily Access</h2>
              <p>Factors that affect your everyday life.</p>
            </div>
            <StarRating
              label="Security"
              description="Safety at night, crime incidents, vigilante presence"
              icon="🔒"
              value={formData.security}
              onChange={(v) => update("security", v)}
            />
            <div className="divider" />
            <StarRating
              label="Market Access"
              description="Proximity to markets, supermarkets, food vendors"
              icon="🛒"
              value={formData.marketAccess}
              onChange={(v) => update("marketAccess", v)}
            />
            <div className="divider" />
            <StarRating
              label="Transportation"
              description="Ease of getting danfo, BRT, okada, or ride-hailing"
              icon="🚌"
              value={formData.transport}
              onChange={(v) => update("transport", v)}
            />

            <div className="field mt">
              <label>Typical daily transport cost</label>
              <div className="tenure-pills">
                {["₦0–500", "₦500–1,000", "₦1,000–2,000", "₦2,000+"].map(
                  (t) => (
                    <button
                      key={t}
                      type="button"
                      className={`pill ${formData.transportCostRange === t ? "selected" : ""}`}
                      onClick={() => update("transportCostRange", t)}
                    >
                      {t}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Mobile Network</h2>
              <p>
                Rate signal strength per carrier in your area. Skip carriers you
                don&apos;t use.
              </p>
            </div>

            <div className="network-grid">
              {carriers.map(({ key, label, color }) => (
                <div key={key} className="network-card">
                  <div className="carrier-dot" style={{ background: color }} />
                  <NetworkRating
                    carrier={label}
                    value={formData[key]}
                    onChange={(v) => update(key, v)}
                  />
                </div>
              ))}
            </div>

            <div className="field mt">
              <label>
                Anything else to add? <span className="opt">optional</span>
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 'Area floods badly from July–September near the bridge...'"
                value={formData.overallComment}
                onChange={(e) => update("overallComment", e.target.value)}
              />
              <span className="field-hint">
                {formData.overallComment.length}/300 characters
              </span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Review Summary</h2>
              <p>Confirm your ratings before submitting.</p>
            </div>

            <div className="summary-location">
              <span className="summary-pin">📍</span>
              <div>
                <div className="summary-estate">{formData.estate || "—"}</div>
                <div className="summary-lga">
                  {formData.lga}
                  {formData.tenureYears ? ` · ${formData.tenureYears}` : ""}
                </div>
              </div>
            </div>

            <div className="summary-grid">
              {summaryItems.map(({ label, val, icon }) => (
                <div key={label} className="summary-item">
                  <span className="sum-icon">{icon}</span>
                  <span className="sum-label">{label}</span>
                  <div className="sum-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`sum-star ${s <= val ? "lit" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {(formData.mtn ||
              formData.airtel ||
              formData.glo ||
              formData.mobile9) > 0 && (
              <div className="summary-network">
                <div className="sum-section-title">Network</div>
                <div className="network-summary-row">
                  {carriers
                    .filter(({ key }) => formData[key] > 0)
                    .map(({ key, label }) => (
                      <span key={key} className="network-badge">
                        {label} {"★".repeat(formData[key])}
                      </span>
                    ))}
                </div>
              </div>
            )}

            <div className="submit-notice">
              <span>🔒</span>
              {formData.anonymous
                ? "Submitting anonymously. No personal data stored."
                : "Your account will be linked to this review."}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="nav-row">
          {step > 1 && (
            <button className="btn-ghost" onClick={() => navigate(-1)}>
              ← Back
            </button>
          )}
          {step < 5 ? (
            <button
              className={`btn-primary ${!canProceed() ? "disabled" : ""}`}
              onClick={() => canProceed() && navigate(1)}
            >
              Continue →
            </button>
          ) : (
            <button className="btn-submit" onClick={handleSubmit}>
              Submit Review
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-note">
        Free & open data · Built for Lagos renters · No ads, no agents
      </div>
    </div>
  );
}

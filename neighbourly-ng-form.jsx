import { useState, useEffect } from "react";

const STEPS = [
  { id: 1, label: "Location", short: "01" },
  { id: 2, label: "Infrastructure", short: "02" },
  { id: 3, label: "Safety & Access", short: "03" },
  { id: 4, label: "Connectivity", short: "04" },
  { id: 5, label: "Submit", short: "05" },
];

const LGAS = [
  "Alimosho", "Ajeromi-Ifelodun", "Kosofe", "Mushin", "Oshodi-Isolo",
  "Ojo", "Ikorodu", "Surulere", "Agege", "Ifako-Ijaye", "Shomolu",
  "Abeokuta", "Lagos Island", "Lagos Mainland", "Somolu", "Apapa",
  "Badagry", "Epe", "Ibeju-Lekki", "Ikeja", "Eti-Osa",
];

const StarRating = ({ value, onChange, label, description, icon }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="rating-row">
      <div className="rating-label">
        <span className="rating-icon">{icon}</span>
        <div>
          <div className="rating-name">{label}</div>
          <div className="rating-desc">{description}</div>
        </div>
      </div>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= (hovered || value) ? "active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
        <span className="rating-value">{value > 0 ? `${value}/5` : "—"}</span>
      </div>
    </div>
  );
};

const NetworkRating = ({ carrier, value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="network-row">
      <span className="carrier-label">{carrier}</span>
      <div className="stars small">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star sm ${star <= (hovered || value) ? "active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default function NeighbourlyForm() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  const update = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const navigate = (dir) => {
    setDirection(dir > 0 ? "forward" : "back");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + dir);
      setAnimating(false);
    }, 220);
  };

  const canProceed = () => {
    if (step === 1) return formData.lga && formData.estate;
    if (step === 2) return formData.power > 0 && formData.flooding > 0 && formData.roads > 0;
    if (step === 3) return formData.security > 0 && formData.marketAccess > 0 && formData.transport > 0;
    if (step === 4) return formData.mtn > 0 || formData.airtel > 0 || formData.glo > 0 || formData.mobile9 > 0;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  if (submitted) {
    return (
      <div className="app">
        <style>{css}</style>
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <h2>Review Submitted</h2>
          <p>Your data helps thousands of Lagos renters make smarter housing decisions.</p>
          <div className="success-meta">
            <span>{formData.estate}, {formData.lga}</span>
            <span>·</span>
            <span>Contributes to 8 category scores</span>
          </div>
          <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setFormData({ lga: "", estate: "", street: "", tenureYears: "", power: 0, flooding: 0, roads: 0, security: 0, marketAccess: 0, transport: 0, transportCostRange: "", mtn: 0, airtel: 0, glo: 0, mobile9: 0, overallComment: "", anonymous: true }); }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{css}</style>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-mark">N</span>
          <span className="logo-text">NeighbourlyNG</span>
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
          <div key={s.id} className={`step-chip ${step === s.id ? "current" : step > s.id ? "done" : ""}`}>
            <span className="step-num">{step > s.id ? "✓" : s.short}</span>
            <span className="step-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className={`card ${animating ? (direction === "forward" ? "slide-out-left" : "slide-out-right") : "slide-in"}`}>

        {step === 1 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Where do you live?</h2>
              <p>Help others find this neighborhood on the map.</p>
            </div>

            <div className="field">
              <label>Local Government Area (LGA) <span className="req">*</span></label>
              <div className="select-wrap">
                <select value={formData.lga} onChange={(e) => update("lga", e.target.value)}>
                  <option value="">Select LGA</option>
                  {LGAS.map((l) => <option key={l}>{l}</option>)}
                </select>
                <span className="select-arrow">↓</span>
              </div>
            </div>

            <div className="field">
              <label>Estate / Area Name <span className="req">*</span></label>
              <input
                type="text"
                placeholder="e.g. Iyana Ipaja Estate, Magodo Phase 2"
                value={formData.estate}
                onChange={(e) => update("estate", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Street Name <span className="opt">optional</span></label>
              <input
                type="text"
                placeholder="e.g. Adewale Street"
                value={formData.street}
                onChange={(e) => update("street", e.target.value)}
              />
              <span className="field-hint">More specific = more useful for others</span>
            </div>

            <div className="field">
              <label>How long have you lived here?</label>
              <div className="tenure-pills">
                {["< 6 months", "6–12 months", "1–3 years", "3+ years"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${formData.tenureYears === t ? "selected" : ""}`}
                    onClick={() => update("tenureYears", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="anon-row">
              <label className="toggle-label">
                <input type="checkbox" checked={formData.anonymous} onChange={(e) => update("anonymous", e.target.checked)} />
                <span className="toggle-track"><span className="toggle-thumb" /></span>
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
                {["₦0–500", "₦500–1,000", "₦1,000–2,000", "₦2,000+"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${formData.transportCostRange === t ? "selected" : ""}`}
                    onClick={() => update("transportCostRange", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-section">
            <div className="section-header">
              <h2>Mobile Network</h2>
              <p>Rate signal strength per carrier in your area. Skip carriers you don't use.</p>
            </div>

            <div className="network-grid">
              {[
                { key: "mtn", label: "MTN", color: "#FFCC00" },
                { key: "airtel", label: "Airtel", color: "#FF0000" },
                { key: "glo", label: "Glo", color: "#00A651" },
                { key: "mobile9", label: "9mobile", color: "#006F3C" },
              ].map(({ key, label, color }) => (
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
              <label>Anything else to add? <span className="opt">optional</span></label>
              <textarea
                rows={3}
                placeholder="e.g. 'Area floods badly from July–September near the bridge...'"
                value={formData.overallComment}
                onChange={(e) => update("overallComment", e.target.value)}
              />
              <span className="field-hint">{formData.overallComment.length}/300 characters</span>
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
                <div className="summary-lga">{formData.lga}{formData.tenureYears ? ` · ${formData.tenureYears}` : ""}</div>
              </div>
            </div>

            <div className="summary-grid">
              {[
                { label: "Power", val: formData.power, icon: "⚡" },
                { label: "Flooding", val: formData.flooding, icon: "🌧" },
                { label: "Roads", val: formData.roads, icon: "🛣" },
                { label: "Security", val: formData.security, icon: "🔒" },
                { label: "Markets", val: formData.marketAccess, icon: "🛒" },
                { label: "Transport", val: formData.transport, icon: "🚌" },
              ].map(({ label, val, icon }) => (
                <div key={label} className="summary-item">
                  <span className="sum-icon">{icon}</span>
                  <span className="sum-label">{label}</span>
                  <div className="sum-stars">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={`sum-star ${s <= val ? "lit" : ""}`}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {(formData.mtn || formData.airtel || formData.glo || formData.mobile9) > 0 && (
              <div className="summary-network">
                <div className="sum-section-title">Network</div>
                <div className="network-summary-row">
                  {[
                    { key: "mtn", label: "MTN" },
                    { key: "airtel", label: "Airtel" },
                    { key: "glo", label: "Glo" },
                    { key: "mobile9", label: "9mobile" },
                  ].filter(({ key }) => formData[key] > 0).map(({ key, label }) => (
                    <span key={key} className="network-badge">{label} {"★".repeat(formData[key])}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="submit-notice">
              <span>🔒</span>
              {formData.anonymous ? "Submitting anonymously. No personal data stored." : "Your account will be linked to this review."}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="nav-row">
          {step > 1 && (
            <button className="btn-ghost" onClick={() => navigate(-1)}>← Back</button>
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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: #F5F4F0;
    font-family: 'DM Sans', sans-serif;
    color: #1A1A18;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px 40px;
  }

  .header {
    width: 100%;
    max-width: 560px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-mark {
    width: 32px;
    height: 32px;
    background: #1A1A18;
    color: #F5F4F0;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.3px;
  }

  .header-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #888;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .progress-bar-wrap {
    width: 100%;
    max-width: 560px;
    height: 2px;
    background: #E0DED8;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: #1A1A18;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .steps-row {
    width: 100%;
    max-width: 560px;
    display: flex;
    gap: 6px;
    padding: 16px 0 20px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .steps-row::-webkit-scrollbar { display: none; }

  .step-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 99px;
    background: #E8E6E0;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .step-chip.current {
    background: #1A1A18;
    color: #F5F4F0;
  }

  .step-chip.done {
    background: #D4F0C8;
    color: #2A6B1A;
  }

  .step-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
  }

  .step-lbl {
    font-size: 12px;
    font-weight: 500;
  }

  .card {
    width: 100%;
    max-width: 560px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px;
    border: 1px solid #E8E6E0;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  }

  @keyframes slideInForward {
    from { opacity: 0; transform: translateX(24px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInBack {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .slide-in { animation: slideInForward 0.25s ease forwards; }
  .slide-out-left { opacity: 0; transform: translateX(-24px); }
  .slide-out-right { opacity: 0; transform: translateX(24px); }

  .section-header { margin-bottom: 28px; }

  .section-header h2 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 22px;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
    color: #1A1A18;
  }

  .section-header p {
    font-size: 14px;
    color: #777;
    font-weight: 300;
  }

  .field { margin-bottom: 20px; }
  .field.mt { margin-top: 24px; }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 8px;
  }

  .req { color: #D94F3D; }
  .opt { color: #AAA; font-weight: 400; text-transform: none; letter-spacing: 0; }

  .field input, .field textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #E0DED8;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    background: #FAFAF8;
    color: #1A1A18;
    outline: none;
    transition: border-color 0.15s;
  }

  .field input:focus, .field textarea:focus {
    border-color: #1A1A18;
    background: #fff;
  }

  .field textarea { resize: vertical; min-height: 80px; }

  .field-hint {
    display: block;
    font-size: 12px;
    color: #AAA;
    margin-top: 6px;
  }

  .select-wrap {
    position: relative;
  }

  .select-wrap select {
    width: 100%;
    padding: 12px 40px 12px 14px;
    border: 1.5px solid #E0DED8;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    background: #FAFAF8;
    color: #1A1A18;
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .select-wrap select:focus { border-color: #1A1A18; background: #fff; }

  .select-arrow {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #888;
    pointer-events: none;
  }

  .tenure-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pill {
    padding: 8px 16px;
    border-radius: 99px;
    border: 1.5px solid #E0DED8;
    background: #FAFAF8;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    color: #444;
  }

  .pill:hover { border-color: #1A1A18; color: #1A1A18; }
  .pill.selected { background: #1A1A18; border-color: #1A1A18; color: #fff; }

  .anon-row {
    margin-top: 4px;
    padding-top: 16px;
    border-top: 1px solid #F0EEE8;
  }

  .toggle-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
    user-select: none;
  }

  .toggle-label input { display: none; }

  .toggle-track {
    width: 38px;
    height: 22px;
    background: #E0DED8;
    border-radius: 99px;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .toggle-label input:checked + .toggle-track { background: #1A1A18; }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  .toggle-label input:checked + .toggle-track .toggle-thumb {
    transform: translateX(16px);
  }

  /* Rating rows */
  .rating-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 4px 0;
  }

  .rating-label {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .rating-icon { font-size: 20px; flex-shrink: 0; }

  .rating-name {
    font-size: 14px;
    font-weight: 500;
    color: #1A1A18;
    line-height: 1.3;
  }

  .rating-desc {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
    line-height: 1.4;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .star {
    background: none;
    border: none;
    font-size: 22px;
    color: #D8D6D0;
    cursor: pointer;
    padding: 2px;
    line-height: 1;
    transition: color 0.1s, transform 0.1s;
  }

  .star:hover, .star.active { color: #F4B942; }
  .star:hover { transform: scale(1.15); }
  .star.sm { font-size: 18px; }

  .rating-value {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #AAA;
    margin-left: 6px;
    min-width: 28px;
  }

  .divider {
    height: 1px;
    background: #F0EEE8;
    margin: 16px 0;
  }

  .scale-guide {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #F0EEE8;
    font-size: 11px;
    color: #BBB;
    font-family: 'DM Mono', monospace;
  }

  /* Network */
  .network-grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .network-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #F0EEE8;
  }

  .carrier-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .network-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .carrier-label {
    font-size: 14px;
    font-weight: 500;
    min-width: 64px;
  }

  .stars.small { gap: 1px; }

  /* Summary */
  .summary-location {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #F5F4F0;
    border-radius: 10px;
    margin-bottom: 24px;
  }

  .summary-pin { font-size: 20px; }

  .summary-estate {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #1A1A18;
  }

  .summary-lga { font-size: 13px; color: #888; margin-top: 2px; }

  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: #FAFAF8;
    border-radius: 8px;
    border: 1px solid #ECEAE4;
  }

  .sum-icon { font-size: 16px; }

  .sum-label {
    font-size: 12px;
    color: #777;
    flex: 1;
  }

  .sum-stars { display: flex; gap: 1px; }

  .sum-star {
    font-size: 13px;
    color: #D8D6D0;
  }

  .sum-star.lit { color: #F4B942; }

  .summary-network { margin-bottom: 20px; }

  .sum-section-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #AAA;
    margin-bottom: 8px;
    font-family: 'DM Mono', monospace;
  }

  .network-summary-row { display: flex; flex-wrap: wrap; gap: 6px; }

  .network-badge {
    padding: 4px 10px;
    background: #F0EEE8;
    border-radius: 99px;
    font-size: 12px;
    color: #555;
    font-family: 'DM Mono', monospace;
  }

  .submit-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: #F0F7EC;
    border-radius: 8px;
    font-size: 13px;
    color: #4A7A38;
  }

  /* Navigation */
  .nav-row {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid #F0EEE8;
  }

  .btn-ghost {
    padding: 12px 20px;
    border: 1.5px solid #E0DED8;
    border-radius: 8px;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-ghost:hover { border-color: #1A1A18; color: #1A1A18; }

  .btn-primary {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background: #1A1A18;
    color: #F5F4F0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    margin-left: auto;
  }

  .btn-primary:hover { background: #333; transform: translateY(-1px); }
  .btn-primary.disabled { opacity: 0.35; cursor: not-allowed; }
  .btn-primary.disabled:hover { background: #1A1A18; transform: none; }

  .btn-submit {
    padding: 13px 28px;
    border: none;
    border-radius: 8px;
    background: #2A7D1F;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.15s;
    margin-left: auto;
    letter-spacing: -0.2px;
  }

  .btn-submit:hover { background: #236018; transform: translateY(-1px); }

  /* Success */
  .success-screen {
    margin-top: 80px;
    text-align: center;
    max-width: 380px;
  }

  .success-icon {
    width: 64px;
    height: 64px;
    background: #D4F0C8;
    color: #2A6B1A;
    font-size: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
  }

  .success-screen h2 {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .success-screen p {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .success-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #AAA;
    margin-bottom: 32px;
  }

  .footer-note {
    margin-top: 24px;
    font-size: 12px;
    color: #BBB;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.03em;
    text-align: center;
  }

  @media (max-width: 480px) {
    .card { padding: 22px 18px; }
    .summary-grid { grid-template-columns: 1fr; }
    .rating-row { flex-direction: column; align-items: flex-start; gap: 10px; }
    .stars { margin-left: 32px; }
  }
`;

"use client";

import type { FormData, NetworkCarrier, Step } from "@/types/form";
import { useState, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem("neighbourlyFormData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        // ignore parse error
      }
    }
    const savedStep = localStorage.getItem("neighbourlyFormStep");
    if (savedStep) {
      const parsed = parseInt(savedStep, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= STEPS.length) {
        setStep(parsed);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("neighbourlyFormData", JSON.stringify(formData));
    }
  }, [formData, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("neighbourlyFormStep", step.toString());
    }
  }, [step, isMounted]);

  useEffect(() => {
    const el = document.getElementById(`step-${step}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [step]);

  useEffect(() => {
    const searchEstate = async () => {
      if (!formData.estate || formData.estate.length < 3 || !showSuggestions) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const query = encodeURIComponent(formData.estate);
        const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ng&limit=10&types=neighborhood,locality,place,address,poi&access_token=${token}`
        );
        const data = await res.json();
        if (data.features) {

          console.log(data.features);
          setSuggestions(data.features);
        }
      } catch (err) {
        console.error("Error fetching locations from Mapbox:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      searchEstate();
    }, 600);

    return () => clearTimeout(timer);
  }, [formData.estate, showSuggestions]);

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

  const clearStorage = () => {
    localStorage.removeItem("neighbourlyFormData");
    localStorage.removeItem("neighbourlyFormStep");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review. Please try again.");
      }

      setSubmitted(true);
      clearStorage();
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setFormData(initialFormData);
    clearStorage();
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
    <Toast.Provider swipeDirection="down">
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
            id={`step-${s.id}`}
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

            <div className="field" style={{ position: "relative" }}>
              <label>
                Estate / Area Name <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Iyana Ipaja Estate, Magodo Phase 2"
                value={formData.estate}
                onChange={(e) => {
                  update("estate", e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              
              {showSuggestions && formData.estate.length >= 3 && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #e0ded8",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  zIndex: 50,
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginTop: "4px"
                }}>
                  {isSearching ? (
                    <div style={{ padding: "12px", fontSize: "13px", color: "#888", textAlign: "center" }}>
                      Searching...
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "10px 14px",
                          borderBottom: i < suggestions.length - 1 ? "1px solid #f0eee8" : "none",
                          fontSize: "14px",
                          cursor: "pointer",
                          color: "#1a1a18"
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          update("estate", s.text);
                          setShowSuggestions(false);
                        }}
                      >
                        <div style={{ fontWeight: 500 }}>{s.text}</div>
                        <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                          {s.place_name.replace(`${s.text}, `, "")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "12px", fontSize: "13px", color: "#888", textAlign: "center" }}>
                      No results found
                    </div>
                  )}
                </div>
              )}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>
              <button 
                className={`btn-submit ${isSubmitting ? "disabled" : ""}`} 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-note">
        Free & open data · Built for Lagos renters · No ads, no agents
      </div>

      <Toast.Root
        className="ToastRoot"
        open={!!submitError}
        onOpenChange={(open) => {
          if (!open) setSubmitError("");
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#d94f3d", fontSize: "16px" }}>⚠️</span>
          <Toast.Description className="ToastDescription">
            {submitError}
          </Toast.Description>
        </div>
        <Toast.Action className="ToastAction" asChild altText="Close notification">
          <button className="ToastCloseBtn" onClick={() => setSubmitError("")}>×</button>
        </Toast.Action>
      </Toast.Root>
      
      <Toast.Viewport className="ToastViewport" />
    </div>
    </Toast.Provider>
  );
}

import { useState } from "react";

const categories = [
  { key: "power", label: "Power Supply", icon: "⚡", score: 2.4, reviews: 142, unit: "NEPA/PHCN" },
  { key: "security", label: "Security", icon: "🛡", score: 4.1, reviews: 198, unit: "Safety Index" },
  { key: "flood", label: "Flood Risk", icon: "🌊", score: 3.8, reviews: 87, unit: "Rainy Season" },
  { key: "roads", label: "Road Conditions", icon: "🛣", score: 3.2, reviews: 211, unit: "Motorability" },
  { key: "market", label: "Market Access", icon: "🛒", score: 4.6, reviews: 176, unit: "Daily Needs" },
  { key: "transport", label: "Transport", icon: "🚌", score: 3.9, reviews: 163, unit: "Connectivity" },
  { key: "network", label: "Mobile Network", icon: "📶", score: 2.9, reviews: 134, unit: "Signal Strength" },
  { key: "noise", label: "Noise Level", icon: "🔊", score: 3.5, reviews: 98, unit: "Ambience" },
];

const carriers = [
  { name: "MTN", score: 3.8, color: "#f5c518" },
  { name: "Airtel", score: 2.9, color: "#e83030" },
  { name: "Glo", score: 2.1, color: "#3db33d" },
  { name: "9mobile", score: 3.2, color: "#00a651" },
];

const recentReviews = [
  {
    id: 1,
    author: "Tunde O.",
    date: "Feb 2025",
    text: "Power situation has improved slightly — we now get about 6 hours a day but it's still unreliable. Security is genuinely good; the estate has active vigilantes. Would recommend for young professionals.",
    ratings: { power: 3, security: 5, roads: 4 },
    verified: true,
  },
  {
    id: 2,
    author: "Chisom A.",
    date: "Jan 2025",
    text: "Flooding during October rains was manageable on our street but I saw bad pooling near the gate. Market at Jakande is 5 minutes walk — huge plus. BRT access from Lekki-Epe expressway is decent.",
    ratings: { flood: 3, market: 5, transport: 4 },
    verified: true,
  },
  {
    id: 3,
    author: "Emeka N.",
    date: "Dec 2024",
    text: "MTN works fine indoors, Glo is basically dead inside buildings. Roads inside estate are well tarred but the feeder road from the main expressway has serious potholes. Negotiate rent — they're flexible.",
    ratings: { network: 3, roads: 2, security: 4 },
    verified: false,
  },
];

function ScoreRing({ score, size = 120 }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const pct = score / 5;
  const dash = pct * circumference;
  const color = score >= 4 ? "#0ec97f" : score >= 3 ? "#f0b429" : "#e05252";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#e8e8e8" strokeWidth="6" />
      <circle
        cx="50" cy="50" r={radius} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="50" y="46" textAnchor="middle" fontSize="20" fontWeight="700"
        fontFamily="'DM Serif Display', serif" fill="#111">
        {score.toFixed(1)}
      </text>
      <text x="50" y="60" textAnchor="middle" fontSize="9"
        fontFamily="'IBM Plex Mono', monospace" fill="#888" letterSpacing="1">
        / 5.0
      </text>
    </svg>
  );
}

function CategoryBar({ cat, active, onClick }) {
  const pct = (cat.score / 5) * 100;
  const color = cat.score >= 4 ? "#0ec97f" : cat.score >= 3 ? "#f0b429" : "#e05252";
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        display: "block",
        width: "100%",
        cursor: "pointer",
        padding: "14px 18px",
        borderRadius: "8px",
        background: active ? "#f7f7f5" : "transparent",
        border: active ? "1px solid #e0e0dc" : "1px solid transparent",
        transition: "all .18s ease",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>{cat.icon}</span>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, color: "#111", letterSpacing: ".5px" }}>
              {cat.label.toUpperCase()}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#999", letterSpacing: ".3px" }}>
              {cat.reviews} reviews
            </div>
          </div>
        </div>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#111" }}>
          {cat.score.toFixed(1)}
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: 2,
          background: color,
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </button>
  );
}

function StarRow({ score }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(score) ? "#f0b429" : "#ddd", fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

export default function NeighborhoodScorecard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeCat, setActiveCat] = useState(null);

  const overall = (categories.reduce((s, c) => s + c.score, 0) / categories.length).toFixed(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f4f0; }
        .card { background: #fff; border-radius: 12px; border: 1px solid #e8e8e3; }
        .tab-btn {
          all: unset; cursor: pointer;
          padding: 8px 18px; border-radius: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; font-weight: 600; letter-spacing: .8px;
          text-transform: uppercase; transition: all .15s;
        }
        .tab-btn.active { background: #111; color: #fff; }
        .tab-btn:not(.active) { color: #888; }
        .tab-btn:not(.active):hover { color: #333; background: #f0f0ec; }
        .pill {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; font-weight: 600; letter-spacing: .5px;
          padding: 3px 8px; border-radius: 4px;
          text-transform: uppercase;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .4s ease both; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f4f4f0", fontFamily: "'IBM Plex Sans', sans-serif", padding: "0 0 60px" }}>

        {/* Top nav */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e3", padding: "0 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, background: "#111", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#0ec97f", fontSize: 14, fontWeight: 700 }}>N</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#111", letterSpacing: ".5px" }}>
                NeighbourlyNG
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", letterSpacing: ".5px" }}>LAGOS, NG</span>
              <button style={{
                all: "unset", cursor: "pointer",
                background: "#0ec97f", color: "#fff",
                padding: "6px 14px", borderRadius: 6,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11, fontWeight: 600, letterSpacing: ".5px",
              }}>
                + RATE THIS AREA
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

          {/* Breadcrumb */}
          <div style={{ padding: "20px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", cursor: "pointer", letterSpacing: ".5px" }}>LAGOS</span>
            <span style={{ color: "#ccc", fontSize: 10 }}>›</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", cursor: "pointer", letterSpacing: ".5px" }}>ETI-OSA LGA</span>
            <span style={{ color: "#ccc", fontSize: 10 }}>›</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#111", letterSpacing: ".5px" }}>LEKKI PHASE 1</span>
          </div>

          {/* Hero header */}
          <div style={{ padding: "28px 0 24px", borderBottom: "1px solid #e8e8e3" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span className="pill" style={{ background: "#e8f8f1", color: "#0a9e61" }}>VERIFIED AREA</span>
                  <span className="pill" style={{ background: "#fef3e2", color: "#b36a00" }}>ETI-OSA LGA</span>
                </div>
                <h1 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  color: "#111", lineHeight: 1.05, marginBottom: 10,
                }}>
                  Lekki Phase 1
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#666" }}>
                    📍 Victoria Island axis, Lagos
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#666" }}>
                    {categories.reduce((s, c) => s + c.reviews, 0).toLocaleString()} total reviews
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#666" }}>
                    Last updated Feb 2025
                  </span>
                </div>
              </div>

              {/* Overall score */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <ScoreRing score={parseFloat(overall)} size={110} />
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                  color: "#888", letterSpacing: ".8px", textTransform: "uppercase",
                }}>Overall Score</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, padding: "16px 0", borderBottom: "1px solid #e8e8e3" }}>
            {["overview", "reviews", "network"].map(t => (
              <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {t === "overview" ? "Scorecard" : t === "reviews" ? "Reviews" : "Network"}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginTop: 24, alignItems: "start" }}>

              {/* Category list */}
              <div className="card" style={{ padding: "8px" }}>
                <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #f0f0ec" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: ".8px", color: "#aaa" }}>
                    ALL CATEGORIES
                  </span>
                </div>
                <div style={{ padding: "8px" }}>
                  {categories.map(cat => (
                    <CategoryBar
                      key={cat.key} cat={cat}
                      active={activeCat === cat.key}
                      onClick={() => setActiveCat(activeCat === cat.key ? null : cat.key)}
                    />
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Quick verdict */}
                <div className="card" style={{ padding: "20px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: ".8px", color: "#aaa", marginBottom: 12 }}>
                    QUICK VERDICT
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      { label: "Best for", value: "Security, Markets", good: true },
                      { label: "Watch out", value: "Power, Network", good: false },
                      { label: "Avg. rent", value: "₦200–500k/mo", good: null },
                      { label: "Commute", value: "VI: 20 min", good: null },
                    ].map(item => (
                      <div key={item.label} style={{
                        background: "#f7f7f5", borderRadius: 8, padding: "12px 14px",
                      }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#aaa", letterSpacing: ".5px", marginBottom: 4 }}>
                          {item.label.toUpperCase()}
                        </div>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600,
                          color: item.good === true ? "#0a9e61" : item.good === false ? "#c0392b" : "#111",
                        }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score distribution */}
                <div className="card" style={{ padding: "20px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: ".8px", color: "#aaa", marginBottom: 14 }}>
                    SCORE DISTRIBUTION
                  </div>
                  {[5, 4, 3, 2, 1].map(star => {
                    const pct = star === 5 ? 18 : star === 4 ? 35 : star === 3 ? 28 : star === 2 ? 12 : 7;
                    return (
                      <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#888", width: 8 }}>{star}</span>
                        <span style={{ color: "#f0b429", fontSize: 11 }}>★</span>
                        <div style={{ flex: 1, height: 6, background: "#f0f0ec", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "#0ec97f", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", width: 28 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* Similar areas */}
                <div className="card" style={{ padding: "20px" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: ".8px", color: "#aaa", marginBottom: 12 }}>
                    COMPARE NEARBY
                  </div>
                  {[
                    { name: "Ajah", score: 3.3 },
                    { name: "Ikoyi", score: 4.0 },
                    { name: "Surulere", score: 3.1 },
                  ].map(area => (
                    <div key={area.name} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 0", borderBottom: "1px solid #f4f4f0",
                      cursor: "pointer",
                    }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#333" }}>{area.name}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ height: 3, width: 60, background: "#e8e8e3", borderRadius: 2 }}>
                          <div style={{ width: `${(area.score / 5) * 100}%`, height: "100%", background: "#0ec97f", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: "#111" }}>{area.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="fade-up" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {recentReviews.map(review => (
                <div key={review.id} className="card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: "#111", display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'DM Serif Display', serif", color: "#0ec97f", fontSize: 16,
                      }}>
                        {review.author[0]}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#111" }}>
                          {review.author}
                          {review.verified && (
                            <span style={{ marginLeft: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#0a9e61", background: "#e8f8f1", padding: "2px 6px", borderRadius: 4, letterSpacing: ".5px" }}>
                              VERIFIED
                            </span>
                          )}
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", marginTop: 2 }}>{review.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {Object.entries(review.ratings).map(([key, val]) => {
                        const cat = categories.find(c => c.key === key);
                        return cat ? (
                          <div key={key} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#aaa", letterSpacing: ".5px", marginBottom: 2 }}>
                              {cat.label.toUpperCase().split(" ")[0]}
                            </div>
                            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#111" }}>{val}.0</div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                    color: "#444", lineHeight: 1.7, fontWeight: 300,
                  }}>
                    {review.text}
                  </p>
                  <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                    <button style={{
                      all: "unset", cursor: "pointer",
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                      color: "#888", letterSpacing: ".5px",
                    }}>
                      👍 HELPFUL (12)
                    </button>
                    <button style={{
                      all: "unset", cursor: "pointer",
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                      color: "#888", letterSpacing: ".5px",
                    }}>
                      🚩 REPORT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NETWORK TAB */}
          {activeTab === "network" && (
            <div className="fade-up" style={{ marginTop: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {carriers.map(carrier => (
                  <div key={carrier.name} className="card" style={{ padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#111" }}>{carrier.name}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#aaa", letterSpacing: ".5px", marginTop: 2 }}>
                          SIGNAL RATING
                        </div>
                      </div>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#111", lineHeight: 1 }}>
                        {carrier.score}
                      </div>
                    </div>
                    <div style={{ height: 6, background: "#f0f0ec", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        width: `${(carrier.score / 5) * 100}%`,
                        height: "100%", borderRadius: 3,
                        background: carrier.color,
                      }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                      {["Indoors", "Outdoors", "4G LTE", "Voice"].map((metric, i) => (
                        <div key={metric} style={{ background: "#f7f7f5", borderRadius: 6, padding: "10px 12px" }}>
                          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#aaa", letterSpacing: ".5px", marginBottom: 4 }}>
                            {metric.toUpperCase()}
                          </div>
                          <StarRow score={Math.max(1, carrier.score + (i % 2 === 0 ? -.5 : .3))} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: 16, padding: "24px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: ".8px", color: "#aaa", marginBottom: 16 }}>
                  RESIDENT NETWORK TIPS
                </div>
                {[
                  "MTN has the most consistent indoor signal on the Admiralty Way corridor",
                  "Glo struggles in the estate interiors — better on main roads",
                  "4G LTE is available on MTN and Airtel during off-peak hours",
                  "VPN users report Airtel throttling in the evenings"
                ].map((tip, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid #f4f4f0" : "none",
                  }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#0ec97f", marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#444", lineHeight: 1.6, fontWeight: 300 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA footer */}
          <div style={{
            marginTop: 40, borderRadius: 12, overflow: "hidden",
            background: "#111", padding: "32px 36px",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          }}>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#fff", marginBottom: 6 }}>
                Lived in Lekki Phase 1?
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#888", letterSpacing: ".3px" }}>
                Your review helps thousands of renters make better decisions
              </div>
            </div>
            <button style={{
              all: "unset", cursor: "pointer",
              background: "#0ec97f", color: "#fff",
              padding: "14px 28px", borderRadius: 8,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13, fontWeight: 600, letterSpacing: ".8px",
              whiteSpace: "nowrap",
            }}>
              SUBMIT A REVIEW →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

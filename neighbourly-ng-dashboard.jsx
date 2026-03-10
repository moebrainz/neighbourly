import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "all", label: "Overview", icon: "◈" },
  { id: "power", label: "Power", icon: "⚡" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "flooding", label: "Flooding", icon: "🌧" },
  { id: "roads", label: "Roads", icon: "🛣" },
  { id: "transport", label: "Transport", icon: "🚌" },
  { id: "market", label: "Markets", icon: "🛒" },
  { id: "network", label: "Network", icon: "📶" },
];

const NEIGHBORHOODS = [
  { id: 1, name: "Lekki Phase 1", lga: "Eti-Osa", x: 72, y: 58, scores: { power: 3.8, security: 4.2, flooding: 2.1, roads: 3.9, transport: 3.1, market: 4.0, network: 4.5 }, reviews: 284, trend: "+0.3" },
  { id: 2, name: "Ikeja GRA", lga: "Ikeja", x: 38, y: 28, scores: { power: 4.1, security: 4.5, flooding: 3.8, roads: 4.2, transport: 3.8, market: 3.9, network: 4.3 }, reviews: 196, trend: "+0.1" },
  { id: 3, name: "Surulere", lga: "Surulere", x: 44, y: 52, scores: { power: 2.9, security: 3.4, flooding: 2.8, roads: 3.1, transport: 4.4, market: 4.7, network: 3.8 }, reviews: 341, trend: "-0.2" },
  { id: 4, name: "Iyana Ipaja", lga: "Alimosho", x: 18, y: 38, scores: { power: 2.1, security: 2.8, flooding: 3.5, roads: 2.2, transport: 3.9, market: 3.8, network: 2.9 }, reviews: 512, trend: "+0.5" },
  { id: 5, name: "Yaba", lga: "Lagos Mainland", x: 50, y: 48, scores: { power: 3.2, security: 3.6, flooding: 2.5, roads: 3.4, transport: 4.6, market: 4.5, network: 4.1 }, reviews: 428, trend: "+0.2" },
  { id: 6, name: "Ajah", lga: "Eti-Osa", x: 80, y: 68, scores: { power: 3.0, security: 3.8, flooding: 2.2, roads: 3.0, transport: 2.4, market: 3.2, network: 3.9 }, reviews: 167, trend: "+0.8" },
  { id: 7, name: "Gbagada", lga: "Kosofe", x: 52, y: 30, scores: { power: 3.5, security: 3.9, flooding: 3.2, roads: 3.7, transport: 3.5, market: 3.8, network: 3.7 }, reviews: 203, trend: "0.0" },
  { id: 8, name: "Mushin", lga: "Mushin", x: 42, y: 42, scores: { power: 2.4, security: 2.5, flooding: 2.9, roads: 2.6, transport: 4.2, market: 4.8, network: 3.2 }, reviews: 389, trend: "-0.1" },
  { id: 9, name: "Victoria Island", lga: "Eti-Osa", x: 60, y: 62, scores: { power: 4.4, security: 4.6, flooding: 3.1, roads: 4.0, transport: 3.3, market: 4.2, network: 4.7 }, reviews: 158, trend: "+0.1" },
  { id: 10, name: "Agege", lga: "Agege", x: 26, y: 30, scores: { power: 2.0, security: 2.6, flooding: 3.0, roads: 2.3, transport: 4.0, market: 4.3, network: 2.8 }, reviews: 445, trend: "-0.3" },
  { id: 11, name: "Magodo", lga: "Kosofe", x: 55, y: 22, scores: { power: 4.0, security: 4.3, flooding: 4.1, roads: 4.1, transport: 3.0, market: 3.4, network: 4.0 }, reviews: 134, trend: "+0.4" },
  { id: 12, name: "Festac", lga: "Ajeromi", x: 30, y: 60, scores: { power: 2.7, security: 3.2, flooding: 2.4, roads: 3.0, transport: 3.7, market: 4.1, network: 3.3 }, reviews: 276, trend: "+0.2" },
];

const getOverall = (scores) => {
  const vals = Object.values(scores);
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
};

const getScore = (n, cat) => cat === "all" ? parseFloat(getOverall(n.scores)) : n.scores[cat] || 0;

const scoreColor = (score) => {
  if (score >= 4.0) return "#2A7D1F";
  if (score >= 3.0) return "#F4B942";
  if (score >= 2.0) return "#D9651A";
  return "#C0392B";
};

const scoreBg = (score) => {
  if (score >= 4.0) return "rgba(42,125,31,0.15)";
  if (score >= 3.0) return "rgba(244,185,66,0.15)";
  if (score >= 2.0) return "rgba(217,101,26,0.15)";
  return "rgba(192,57,43,0.12)";
};

const ScoreBar = ({ value, max = 5, color }) => (
  <div style={{ height: 3, background: "#2A2A26", borderRadius: 2, overflow: "hidden", flex: 1 }}>
    <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 2, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
  </div>
);

const RadarChart = ({ scores }) => {
  const keys = Object.keys(scores);
  const n = keys.length;
  const cx = 80, cy = 80, r = 58;
  const pts = keys.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const val = scores[keys[i]] / 5;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle), lx: cx + (r + 18) * Math.cos(angle), ly: cy + (r + 18) * Math.sin(angle), label: keys[i] };
  });
  const polygon = pts.map(p => `${p.x},${p.y}`).join(" ");
  const grid = [0.25, 0.5, 0.75, 1].map(scale =>
    keys.map((_, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`;
    }).join(" ")
  );

  return (
    <svg viewBox="0 0 160 160" style={{ width: "100%", maxWidth: 160 }}>
      {grid.map((pts, i) => <polygon key={i} points={pts} fill="none" stroke="#2A2A26" strokeWidth="0.8" />)}
      {keys.map((_, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="#2A2A26" strokeWidth="0.8" />;
      })}
      <polygon points={polygon} fill="rgba(244,185,66,0.2)" stroke="#F4B942" strokeWidth="1.5" />
      {pts.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fill="#888" fontSize="7" fontFamily="DM Mono, monospace">
          {p.label.slice(0, 3).toUpperCase()}
        </text>
      ))}
    </svg>
  );
};

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(NEIGHBORHOODS[1]);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const filtered = NEIGHBORHOODS
    .filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.lga.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === "score" ? getScore(b, activeCategory) - getScore(a, activeCategory) : b.reviews - a.reviews);

  const topNeighborhood = [...NEIGHBORHOODS].sort((a, b) => getScore(b, activeCategory) - getScore(a, activeCategory))[0];

  return (
    <div className="dash">
      <style>{css}</style>

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-block">
            <span className="logo-n">N</span>
            <div>
              <div className="brand">NeighbourlyNG</div>
              <div className="brand-sub">Lagos Intelligence Platform</div>
            </div>
          </div>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search area or LGA..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sort-row">
            <span className="sort-label">Sort</span>
            <button className={`sort-btn ${sortBy === "score" ? "active" : ""}`} onClick={() => setSortBy("score")}>Score</button>
            <button className={`sort-btn ${sortBy === "reviews" ? "active" : ""}`} onClick={() => setSortBy("reviews")}>Reviews</button>
          </div>
        </div>

        <div className="neighborhood-list">
          {filtered.map((n, idx) => {
            const score = getScore(n, activeCategory);
            const color = scoreColor(score);
            const isActive = selected?.id === n.id;
            return (
              <button
                key={n.id}
                className={`nb-row ${isActive ? "nb-active" : ""}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                onClick={() => setSelected(n)}
              >
                <div className="nb-rank">#{idx + 1}</div>
                <div className="nb-info">
                  <div className="nb-name">{n.name}</div>
                  <div className="nb-lga">{n.lga} · {n.reviews} reviews</div>
                </div>
                <div className="nb-score-block">
                  <div className="nb-score" style={{ color }}>{score.toFixed(1)}</div>
                  <div className={`nb-trend ${n.trend.startsWith("+") ? "up" : n.trend === "0.0" ? "flat" : "down"}`}>
                    {n.trend === "0.0" ? "→" : n.trend.startsWith("+") ? "↑" : "↓"} {n.trend !== "0.0" ? n.trend.replace("-", "") : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="sidebar-foot">
          <div className="foot-stat"><span className="foot-num">4,293</span> reviews</div>
          <div className="foot-dot" />
          <div className="foot-stat"><span className="foot-num">12</span> areas</div>
          <div className="foot-dot" />
          <div className="foot-stat"><span className="foot-num">8</span> categories</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">Neighborhood Map</h1>
            <span className="live-badge">● LIVE</span>
          </div>
          <div className="cat-pills">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`cat-pill ${activeCategory === c.id ? "cat-active" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAP + DETAIL SPLIT */}
        <div className="content-grid">

          {/* MAP */}
          <div className="map-panel">
            <div className="map-canvas">
              {/* Lagos coastline decoration */}
              <svg className="map-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#2A2A26" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                <path d="M 0 75 Q 20 65 35 70 Q 50 75 60 72 Q 75 68 90 74 L 100 78 L 100 100 L 0 100 Z" fill="#1E2A1A" opacity="0.4" />
                <path d="M 55 62 Q 60 58 65 60 Q 70 62 72 65 Q 68 68 62 66 Z" fill="#1E2A1A" opacity="0.3" />
                <text x="50" y="88" textAnchor="middle" fill="#2A3A26" fontSize="4" fontFamily="DM Mono" opacity="0.6">BIGHT OF BENIN</text>
              </svg>

              {/* Neighborhood pins */}
              {NEIGHBORHOODS.map((n) => {
                const score = getScore(n, activeCategory);
                const color = scoreColor(score);
                const bg = scoreBg(score);
                const isSelected = selected?.id === n.id;
                const isHovered = hoveredNeighborhood === n.id;
                return (
                  <button
                    key={n.id}
                    className={`map-pin ${isSelected ? "pin-selected" : ""} ${isHovered ? "pin-hovered" : ""}`}
                    style={{ left: `${n.x}%`, top: `${n.y}%`, borderColor: color, background: isSelected ? color : bg }}
                    onMouseEnter={() => setHoveredNeighborhood(n.id)}
                    onMouseLeave={() => setHoveredNeighborhood(null)}
                    onClick={() => setSelected(n)}
                  >
                    <span className="pin-score" style={{ color: isSelected ? "#1A1A18" : color }}>{score.toFixed(1)}</span>
                    {(isHovered || isSelected) && (
                      <div className="pin-tooltip">
                        <strong>{n.name}</strong>
                        <span>{n.reviews} reviews</span>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Legend */}
              <div className="map-legend">
                {[["≥4.0", "#2A7D1F"], ["3.0–3.9", "#F4B942"], ["2.0–2.9", "#D9651A"], ["<2.0", "#C0392B"]].map(([label, color]) => (
                  <div key={label} className="legend-item">
                    <span className="legend-dot" style={{ background: color }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="map-category-badge">
                {CATEGORIES.find(c => c.id === activeCategory)?.icon} {CATEGORIES.find(c => c.id === activeCategory)?.label}
              </div>
            </div>
          </div>

          {/* DETAIL PANEL */}
          {selected && (
            <div className="detail-panel" key={selected.id}>
              <div className="detail-header">
                <div>
                  <div className="detail-name">{selected.name}</div>
                  <div className="detail-lga">{selected.lga} LGA</div>
                </div>
                <div className="detail-overall" style={{ color: scoreColor(parseFloat(getOverall(selected.scores))) }}>
                  {getOverall(selected.scores)}
                  <span className="detail-outof">/5</span>
                </div>
              </div>

              <div className="detail-meta-row">
                <span className="meta-chip">{selected.reviews} reviews</span>
                <span className={`meta-chip trend-chip ${selected.trend.startsWith("+") ? "up" : selected.trend === "0.0" ? "flat" : "down"}`}>
                  {selected.trend === "0.0" ? "→ Stable" : selected.trend.startsWith("+") ? `↑ ${selected.trend}` : `↓ ${selected.trend.replace("-", "-")}`} this month
                </span>
              </div>

              <div className="radar-row">
                <RadarChart scores={selected.scores} />
                <div className="radar-legend">
                  {Object.entries(selected.scores).map(([key, val]) => (
                    <div key={key} className="radar-item">
                      <span className="radar-key">{key.slice(0, 4).toUpperCase()}</span>
                      <ScoreBar value={val} color={scoreColor(val)} />
                      <span className="radar-val" style={{ color: scoreColor(val) }}>{val.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-scores">
                {Object.entries(selected.scores).map(([key, val]) => {
                  const cat = CATEGORIES.find(c => c.id === key);
                  return (
                    <div key={key} className="score-tile" style={{ borderColor: scoreColor(val) + "44", background: scoreBg(val) }}>
                      <div className="tile-icon">{cat?.icon || "·"}</div>
                      <div className="tile-label">{cat?.label || key}</div>
                      <div className="tile-score" style={{ color: scoreColor(val) }}>{val.toFixed(1)}</div>
                      <div className="tile-stars">
                        {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(val) ? "#F4B942" : "#2A2A26", fontSize: 10 }}>★</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="review-cta">
                + Submit a Review for {selected.name}
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM STATS BAR */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Top Rated (Overall)</div>
            <div className="stat-value">{topNeighborhood.name}</div>
            <div className="stat-sub" style={{ color: scoreColor(parseFloat(getOverall(topNeighborhood.scores))) }}>
              {getOverall(topNeighborhood.scores)} / 5.0
            </div>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <div className="stat-label">Most Reviewed</div>
            <div className="stat-value">{[...NEIGHBORHOODS].sort((a,b) => b.reviews - a.reviews)[0].name}</div>
            <div className="stat-sub">{[...NEIGHBORHOODS].sort((a,b) => b.reviews - a.reviews)[0].reviews} submissions</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <div className="stat-label">Lagos Average</div>
            <div className="stat-value">
              {(NEIGHBORHOODS.reduce((s, n) => s + parseFloat(getOverall(n.scores)), 0) / NEIGHBORHOODS.length).toFixed(2)}
            </div>
            <div className="stat-sub">across all categories</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <div className="stat-label">Best for Power</div>
            <div className="stat-value">{[...NEIGHBORHOODS].sort((a,b) => b.scores.power - a.scores.power)[0].name}</div>
            <div className="stat-sub" style={{ color: "#F4B942" }}>
              ⚡ {[...NEIGHBORHOODS].sort((a,b) => b.scores.power - a.scores.power)[0].scores.power.toFixed(1)} / 5
            </div>
          </div>
          <div className="stat-divider" />
          <div className="stat-card">
            <div className="stat-label">Safest Area</div>
            <div className="stat-value">{[...NEIGHBORHOODS].sort((a,b) => b.scores.security - a.scores.security)[0].name}</div>
            <div className="stat-sub" style={{ color: "#2A7D1F" }}>
              🔒 {[...NEIGHBORHOODS].sort((a,b) => b.scores.security - a.scores.security)[0].scores.security.toFixed(1)} / 5
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dash {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #1A1A18;
    font-family: 'DM Sans', sans-serif;
    color: #F5F4F0;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 260px;
    flex-shrink: 0;
    background: #111110;
    border-right: 1px solid #2A2A26;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar-top { padding: 20px 16px 0; }

  .logo-block {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }

  .logo-n {
    width: 32px;
    height: 32px;
    background: #F5F4F0;
    color: #1A1A18;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .brand {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.3px;
    color: #F5F4F0;
  }

  .brand-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: #555;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 1px;
  }

  .search-wrap {
    position: relative;
    margin-bottom: 12px;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    font-size: 16px;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 9px 10px 9px 30px;
    background: #1A1A18;
    border: 1px solid #2A2A26;
    border-radius: 6px;
    color: #F5F4F0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
  }

  .search-input::placeholder { color: #444; }
  .search-input:focus { border-color: #F4B942; }

  .sort-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }

  .sort-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    flex: 1;
  }

  .sort-btn {
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid #2A2A26;
    background: transparent;
    color: #666;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .sort-btn.active { background: #F4B942; border-color: #F4B942; color: #1A1A18; }

  .neighborhood-list {
    flex: 1;
    overflow-y: auto;
    padding: 4px 8px;
    scrollbar-width: thin;
    scrollbar-color: #2A2A26 transparent;
  }

  @keyframes nbSlide {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .nb-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 10px;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
    animation: nbSlide 0.3s ease both;
    margin-bottom: 2px;
  }

  .nb-row:hover { background: #1E1E1C; }
  .nb-active { background: #1E1E1C !important; border-left: 2px solid #F4B942; padding-left: 8px; }

  .nb-rank {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #444;
    width: 20px;
    flex-shrink: 0;
  }

  .nb-info { flex: 1; min-width: 0; }

  .nb-name {
    font-size: 13px;
    font-weight: 500;
    color: #E8E6E0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nb-lga {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #555;
    margin-top: 1px;
  }

  .nb-score-block { text-align: right; flex-shrink: 0; }

  .nb-score {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
  }

  .nb-trend {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    margin-top: 1px;
  }

  .nb-trend.up { color: #2A7D1F; }
  .nb-trend.flat { color: #666; }
  .nb-trend.down { color: #C0392B; }

  .sidebar-foot {
    padding: 12px 16px;
    border-top: 1px solid #2A2A26;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .foot-stat { font-family: 'DM Mono', monospace; font-size: 10px; color: #555; }
  .foot-num { color: #888; }
  .foot-dot { width: 3px; height: 3px; background: #333; border-radius: 50%; }

  /* ── MAIN ── */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #F5F4F0;
  }

  .topbar {
    background: #1A1A18;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #2A2A26;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .topbar-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #F5F4F0;
    letter-spacing: -0.3px;
  }

  .live-badge {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #2A7D1F;
    letter-spacing: 0.05em;
    animation: pulse 2s infinite;
  }

  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .cat-pills {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    flex: 1;
  }

  .cat-pill {
    padding: 5px 11px;
    border-radius: 99px;
    border: 1px solid #2A2A26;
    background: transparent;
    color: #888;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .cat-pill:hover { border-color: #F4B942; color: #F4B942; }
  .cat-active { background: #F4B942 !important; border-color: #F4B942 !important; color: #1A1A18 !important; font-weight: 500; }

  .content-grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 300px;
    overflow: hidden;
  }

  /* ── MAP ── */
  .map-panel {
    position: relative;
    overflow: hidden;
    background: #1E1E1C;
  }

  .map-canvas {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .map-bg-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .map-pin {
    position: absolute;
    transform: translate(-50%, -50%);
    border: 1.5px solid;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(4px);
    z-index: 2;
  }

  .map-pin:hover, .pin-hovered { transform: translate(-50%, -50%) scale(1.15); z-index: 10; }
  .pin-selected { transform: translate(-50%, -50%) scale(1.2); z-index: 20; box-shadow: 0 0 0 3px rgba(244,185,66,0.3); }

  .pin-score {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    display: block;
  }

  .pin-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #111110;
    border: 1px solid #2A2A26;
    border-radius: 6px;
    padding: 6px 10px;
    white-space: nowrap;
    font-size: 12px;
    color: #E8E6E0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    pointer-events: none;
    z-index: 30;
  }

  .pin-tooltip strong { font-family: 'Syne', sans-serif; font-size: 12px; }
  .pin-tooltip span { font-family: 'DM Mono', monospace; font-size: 10px; color: #666; }

  .map-legend {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: rgba(17,17,16,0.88);
    border: 1px solid #2A2A26;
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    backdrop-filter: blur(6px);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #888;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .map-category-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(17,17,16,0.88);
    border: 1px solid #2A2A26;
    border-radius: 99px;
    padding: 5px 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #888;
    backdrop-filter: blur(6px);
    letter-spacing: 0.04em;
  }

  /* ── DETAIL PANEL ── */
  .detail-panel {
    background: #F5F4F0;
    border-left: 1px solid #E0DED8;
    overflow-y: auto;
    padding: 20px 16px;
    scrollbar-width: thin;
    scrollbar-color: #E0DED8 transparent;
    animation: slideInDetail 0.25s ease;
  }

  @keyframes slideInDetail {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .detail-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #1A1A18;
    letter-spacing: -0.5px;
    line-height: 1.1;
  }

  .detail-lga {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #AAA;
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .detail-overall {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 32px;
    line-height: 1;
    letter-spacing: -1px;
  }

  .detail-outof {
    font-size: 14px;
    color: #AAA;
    font-weight: 400;
    letter-spacing: 0;
  }

  .detail-meta-row {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .meta-chip {
    padding: 3px 9px;
    border-radius: 99px;
    background: #E8E6E0;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #666;
  }

  .trend-chip.up { background: #D4F0C8; color: #2A6B1A; }
  .trend-chip.flat { background: #E8E6E0; color: #888; }
  .trend-chip.down { background: #FDDDD8; color: #8B2A1A; }

  .radar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px;
    background: #1A1A18;
    border-radius: 10px;
  }

  .radar-legend { flex: 1; display: flex; flex-direction: column; gap: 5px; }

  .radar-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .radar-key {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: #666;
    width: 28px;
    flex-shrink: 0;
  }

  .radar-val {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    width: 24px;
    text-align: right;
    flex-shrink: 0;
  }

  .detail-scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 16px;
  }

  .score-tile {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .tile-icon { font-size: 16px; }
  .tile-label { font-size: 11px; color: #888; font-weight: 400; }
  .tile-score { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -0.5px; line-height: 1; }
  .tile-stars { display: flex; gap: 1px; margin-top: 2px; }

  .review-cta {
    width: 100%;
    padding: 12px;
    background: #1A1A18;
    color: #F5F4F0;
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: -0.2px;
  }

  .review-cta:hover { background: #333; transform: translateY(-1px); }

  /* ── STATS BAR ── */
  .stats-bar {
    background: #1A1A18;
    border-top: 1px solid #2A2A26;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .stats-bar::-webkit-scrollbar { display: none; }

  .stat-card { padding: 0 20px 0 0; min-width: 120px; }
  .stat-divider { width: 1px; height: 32px; background: #2A2A26; margin: 0 20px 0 0; flex-shrink: 0; }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 3px;
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #F5F4F0;
    letter-spacing: -0.3px;
    white-space: nowrap;
  }

  .stat-sub {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #666;
    margin-top: 1px;
  }
`;

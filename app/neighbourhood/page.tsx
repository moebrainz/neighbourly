"use client";

import Link from "next/link";
import { useState } from "react";

// TypeScript interfaces
interface NeighborhoodScores {
  power: number;
  security: number;
  flooding: number;
  roads: number;
  transport: number;
  market: number;
  network: number;
}

interface Neighborhood {
  id: number;
  name: string;
  lga: string;
  x: number;
  y: number;
  scores: NeighborhoodScores;
  reviews: number;
  trend: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: "all", label: "Overview", icon: "◈" },
  { id: "power", label: "Power", icon: "⚡" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "flooding", label: "Flooding", icon: "🌧" },
  { id: "roads", label: "Roads", icon: "🛣" },
  { id: "transport", label: "Transport", icon: "🚌" },
  { id: "market", label: "Markets", icon: "🛒" },
  { id: "network", label: "Network", icon: "📶" },
];

const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 1,
    name: "Lekki Phase 1",
    lga: "Eti-Osa",
    x: 72,
    y: 58,
    scores: {
      power: 3.8,
      security: 4.2,
      flooding: 2.1,
      roads: 3.9,
      transport: 3.1,
      market: 4.0,
      network: 4.5,
    },
    reviews: 284,
    trend: "+0.3",
  },
  {
    id: 2,
    name: "Ikeja GRA",
    lga: "Ikeja",
    x: 38,
    y: 28,
    scores: {
      power: 4.1,
      security: 4.5,
      flooding: 3.8,
      roads: 4.2,
      transport: 3.8,
      market: 3.9,
      network: 4.3,
    },
    reviews: 196,
    trend: "+0.1",
  },
  {
    id: 3,
    name: "Surulere",
    lga: "Surulere",
    x: 44,
    y: 52,
    scores: {
      power: 2.9,
      security: 3.4,
      flooding: 2.8,
      roads: 3.1,
      transport: 4.4,
      market: 4.7,
      network: 3.8,
    },
    reviews: 341,
    trend: "-0.2",
  },
  {
    id: 4,
    name: "Iyana Ipaja",
    lga: "Alimosho",
    x: 18,
    y: 38,
    scores: {
      power: 2.1,
      security: 2.8,
      flooding: 3.5,
      roads: 2.2,
      transport: 3.9,
      market: 3.8,
      network: 2.9,
    },
    reviews: 512,
    trend: "+0.5",
  },
  {
    id: 5,
    name: "Yaba",
    lga: "Lagos Mainland",
    x: 50,
    y: 48,
    scores: {
      power: 3.2,
      security: 3.6,
      flooding: 2.5,
      roads: 3.4,
      transport: 4.6,
      market: 4.5,
      network: 4.1,
    },
    reviews: 428,
    trend: "+0.2",
  },
  {
    id: 6,
    name: "Ajah",
    lga: "Eti-Osa",
    x: 80,
    y: 68,
    scores: {
      power: 3.0,
      security: 3.8,
      flooding: 2.2,
      roads: 3.0,
      transport: 2.4,
      market: 3.2,
      network: 3.9,
    },
    reviews: 167,
    trend: "+0.8",
  },
  {
    id: 7,
    name: "Gbagada",
    lga: "Kosofe",
    x: 52,
    y: 30,
    scores: {
      power: 3.5,
      security: 3.9,
      flooding: 3.2,
      roads: 3.7,
      transport: 3.5,
      market: 3.8,
      network: 3.7,
    },
    reviews: 203,
    trend: "0.0",
  },
  {
    id: 8,
    name: "Mushin",
    lga: "Mushin",
    x: 42,
    y: 42,
    scores: {
      power: 2.4,
      security: 2.5,
      flooding: 2.9,
      roads: 2.6,
      transport: 4.2,
      market: 4.8,
      network: 3.2,
    },
    reviews: 389,
    trend: "-0.1",
  },
  {
    id: 9,
    name: "Victoria Island",
    lga: "Eti-Osa",
    x: 60,
    y: 62,
    scores: {
      power: 4.4,
      security: 4.6,
      flooding: 3.1,
      roads: 4.0,
      transport: 3.3,
      market: 4.2,
      network: 4.7,
    },
    reviews: 158,
    trend: "+0.1",
  },
  {
    id: 10,
    name: "Agege",
    lga: "Agege",
    x: 26,
    y: 30,
    scores: {
      power: 2.0,
      security: 2.6,
      flooding: 3.0,
      roads: 2.3,
      transport: 4.0,
      market: 4.3,
      network: 2.8,
    },
    reviews: 445,
    trend: "-0.3",
  },
  {
    id: 11,
    name: "Magodo",
    lga: "Kosofe",
    x: 55,
    y: 22,
    scores: {
      power: 4.0,
      security: 4.3,
      flooding: 4.1,
      roads: 4.1,
      transport: 3.0,
      market: 3.4,
      network: 4.0,
    },
    reviews: 134,
    trend: "+0.4",
  },
  {
    id: 12,
    name: "Festac",
    lga: "Ajeromi",
    x: 30,
    y: 60,
    scores: {
      power: 2.7,
      security: 3.2,
      flooding: 2.4,
      roads: 3.0,
      transport: 3.7,
      market: 4.1,
      network: 3.3,
    },
    reviews: 276,
    trend: "+0.2",
  },
];

const getOverall = (scores: NeighborhoodScores): string => {
  const vals = Object.values(scores);
  return (
    vals.reduce((a: number, b: number) => a + b, 0) / vals.length
  ).toFixed(1);
};

const getScore = (n: Neighborhood, cat: string): number => {
  if (cat === "all") {
    return parseFloat(getOverall(n.scores));
  }
  return n.scores[cat as keyof NeighborhoodScores] || 0;
};

const scoreColor = (score: number): string => {
  if (score >= 4.0) return "#2A7D1F";
  if (score >= 3.0) return "#F4B942";
  if (score >= 2.0) return "#D9651A";
  return "#C0392B";
};

const scoreBg = (score: number): string => {
  if (score >= 4.0) return "rgba(42,125,31,0.15)";
  if (score >= 3.0) return "rgba(244,185,66,0.15)";
  if (score >= 2.0) return "rgba(217,101,26,0.15)";
  return "rgba(192,57,43,0.12)";
};

interface ScoreBarProps {
  value: number;
  max?: number;
  color: string;
}

const ScoreBar = ({ value, max = 5, color }: ScoreBarProps) => (
  <div
    style={{
      height: 3,
      background: "#2A2A26",
      borderRadius: 2,
      overflow: "hidden",
      flex: 1,
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${(value / max) * 100}%`,
        background: color,
        borderRadius: 2,
        transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}
    />
  </div>
);

interface RadarChartProps {
  scores: NeighborhoodScores;
}

const RadarChart = ({ scores }: RadarChartProps) => {
  const keys = Object.keys(scores);
  const n = keys.length;
  const cx = 80,
    cy = 80,
    r = 58;

  const pts = keys.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const val = (scores[keys[i] as keyof NeighborhoodScores] as number) / 5;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
      lx: cx + (r + 18) * Math.cos(angle),
      ly: cy + (r + 18) * Math.sin(angle),
      label: keys[i],
    };
  });

  const polygon = pts.map((p) => `${p.x},${p.y}`).join(" ");

  const grid = [0.25, 0.5, 0.75, 1].map((scale) =>
    keys
      .map((_, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        return `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`;
      })
      .join(" "),
  );

  return (
    <svg viewBox="0 0 160 160" style={{ width: "100%", maxWidth: 160 }}>
      {grid.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#2A2A26"
          strokeWidth="0.8"
        />
      ))}
      {keys.map((_, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="#2A2A26"
            strokeWidth="0.8"
          />
        );
      })}
      <polygon
        points={polygon}
        fill="rgba(244,185,66,0.2)"
        stroke="#F4B942"
        strokeWidth="1.5"
      />
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#888"
          fontSize="7"
          fontFamily="DM Mono, monospace"
        >
          {p.label.slice(0, 3).toUpperCase()}
        </text>
      ))}
    </svg>
  );
};

export default function NeighbourhoodPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selected, setSelected] = useState<Neighborhood>(NEIGHBORHOODS[1]);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("score");

  const filtered = NEIGHBORHOODS.filter(
    (n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.lga.toLowerCase().includes(searchQuery.toLowerCase()),
  ).sort((a, b) =>
    sortBy === "score"
      ? getScore(b, activeCategory) - getScore(a, activeCategory)
      : b.reviews - a.reviews,
  );

  const topNeighborhood = [...NEIGHBORHOODS].sort(
    (a, b) => getScore(b, activeCategory) - getScore(a, activeCategory),
  )[0];

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dash-sidebar-top">
          <Link href="/" className="dash-logo-block">
            <span className="dash-logo-n">N</span>
            <div>
              <div className="dash-brand">NeighbourlyNG</div>
              <div className="dash-brand-sub">Lagos Intelligence Platform</div>
            </div>
          </Link>

          <div className="dash-search-wrap">
            <span className="dash-search-icon">⌕</span>
            <input
              className="dash-search-input"
              placeholder="Search area or LGA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="dash-sort-row">
            <span className="dash-sort-label">Sort</span>
            <button
              className={`dash-sort-btn ${sortBy === "score" ? "active" : ""}`}
              onClick={() => setSortBy("score")}
            >
              Score
            </button>
            <button
              className={`dash-sort-btn ${sortBy === "reviews" ? "active" : ""}`}
              onClick={() => setSortBy("reviews")}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="dash-neighborhood-list">
          {filtered.map((n, idx) => {
            const score = getScore(n, activeCategory);
            const color = scoreColor(score);
            const isActive = selected?.id === n.id;
            return (
              <button
                key={n.id}
                className={`dash-nb-row ${isActive ? "dash-nb-active" : ""}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                onClick={() => setSelected(n)}
              >
                <div className="dash-nb-rank">#{idx + 1}</div>
                <div className="dash-nb-info">
                  <div className="dash-nb-name">{n.name}</div>
                  <div className="dash-nb-lga">
                    {n.lga} · {n.reviews} reviews
                  </div>
                </div>
                <div className="dash-nb-score-block">
                  <div className="dash-nb-score" style={{ color }}>
                    {score.toFixed(1)}
                  </div>
                  <div
                    className={`dash-nb-trend ${n.trend.startsWith("+") ? "up" : n.trend === "0.0" ? "flat" : "down"}`}
                  >
                    {n.trend === "0.0"
                      ? "→"
                      : n.trend.startsWith("+")
                        ? "↑"
                        : "↓"}{" "}
                    {n.trend !== "0.0" ? n.trend.replace("-", "") : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="dash-sidebar-foot">
          <div className="dash-foot-stat">
            <span className="dash-foot-num">4,293</span> reviews
          </div>
          <div className="dash-foot-dot" />
          <div className="dash-foot-stat">
            <span className="dash-foot-num">12</span> areas
          </div>
          <div className="dash-foot-dot" />
          <div className="dash-foot-stat">
            <span className="dash-foot-num">8</span> categories
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* TOP BAR */}
        <div className="dash-topbar">
          <div className="dash-topbar-left">
            <h1 className="dash-page-title">Neighborhood Map</h1>
            <span className="dash-live-badge">● LIVE</span>
          </div>
          <div className="dash-cat-pills">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`dash-cat-pill ${activeCategory === c.id ? "dash-cat-active" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAP + DETAIL SPLIT */}
        <div className="dash-content-grid">
          {/* MAP */}
          <div className="dash-map-panel">
            <div className="dash-map-canvas">
              {/* Lagos coastline decoration */}
              <svg
                className="dash-map-bg-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="dash-grid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 8 0 L 0 0 0 8"
                      fill="none"
                      stroke="#2A2A26"
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#dash-grid)" />
                <path
                  d="M 0 75 Q 20 65 35 70 Q 50 75 60 72 Q 75 68 90 74 L 100 78 L 100 100 L 0 100 Z"
                  fill="#1E2A1A"
                  opacity="0.4"
                />
                <path
                  d="M 55 62 Q 60 58 65 60 Q 70 62 72 65 Q 68 68 62 66 Z"
                  fill="#1E2A1A"
                  opacity="0.3"
                />
                <text
                  x="50"
                  y="88"
                  textAnchor="middle"
                  fill="#2A3A26"
                  fontSize="4"
                  fontFamily="DM Mono"
                  opacity="0.6"
                >
                  BIGHT OF BENIN
                </text>
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
                    className={`dash-map-pin ${isSelected ? "dash-pin-selected" : ""} ${isHovered ? "dash-pin-hovered" : ""}`}
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      borderColor: color,
                      background: isSelected ? color : bg,
                    }}
                    onMouseEnter={() => setHoveredNeighborhood(n.id)}
                    onMouseLeave={() => setHoveredNeighborhood(null)}
                    onClick={() => setSelected(n)}
                  >
                    <span
                      className="dash-pin-score"
                      style={{ color: isSelected ? "#1A1A18" : color }}
                    >
                      {score.toFixed(1)}
                    </span>
                    {(isHovered || isSelected) && (
                      <div className="dash-pin-tooltip">
                        <strong>{n.name}</strong>
                        <span>{n.reviews} reviews</span>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Legend */}
              <div className="dash-map-legend">
                {[
                  ["≥4.0", "#2A7D1F"],
                  ["3.0–3.9", "#F4B942"],
                  ["2.0–2.9", "#D9651A"],
                  ["<2.0", "#C0392B"],
                ].map(([label, color]) => (
                  <div key={label} className="dash-legend-item">
                    <span
                      className="dash-legend-dot"
                      style={{ background: color }}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="dash-map-category-badge">
                {CATEGORIES.find((c) => c.id === activeCategory)?.icon}{" "}
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </div>
            </div>
          </div>

          {/* DETAIL PANEL */}
          {selected && (
            <div className="dash-detail-panel" key={selected.id}>
              <div className="dash-detail-header">
                <div>
                  <div className="dash-detail-name">{selected.name}</div>
                  <div className="dash-detail-lga">{selected.lga} LGA</div>
                </div>
                <div
                  className="dash-detail-overall"
                  style={{
                    color: scoreColor(parseFloat(getOverall(selected.scores))),
                  }}
                >
                  {getOverall(selected.scores)}
                  <span className="dash-detail-outof">/5</span>
                </div>
              </div>

              <div className="dash-detail-meta-row">
                <span className="dash-meta-chip">
                  {selected.reviews} reviews
                </span>
                <span
                  className={`dash-meta-chip dash-trend-chip ${selected.trend.startsWith("+") ? "up" : selected.trend === "0.0" ? "flat" : "down"}`}
                >
                  {selected.trend === "0.0"
                    ? "→ Stable"
                    : selected.trend.startsWith("+")
                      ? `↑ ${selected.trend}`
                      : `↓ ${selected.trend.replace("-", "-")}`}{" "}
                  this month
                </span>
              </div>

              <div className="dash-radar-row">
                <RadarChart scores={selected.scores} />
                <div className="dash-radar-legend">
                  {Object.entries(selected.scores).map(([key, val]) => (
                    <div key={key} className="dash-radar-item">
                      <span className="dash-radar-key">
                        {key.slice(0, 4).toUpperCase()}
                      </span>
                      <ScoreBar
                        value={val as number}
                        color={scoreColor(val as number)}
                      />
                      <span
                        className="dash-radar-val"
                        style={{ color: scoreColor(val as number) }}
                      >
                        {(val as number).toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dash-detail-scores">
                {Object.entries(selected.scores).map(([key, val]) => {
                  const cat = CATEGORIES.find((c) => c.id === key);
                  return (
                    <div
                      key={key}
                      className="dash-score-tile"
                      style={{
                        borderColor: scoreColor(val as number) + "44",
                        background: scoreBg(val as number),
                      }}
                    >
                      <div className="dash-tile-icon">{cat?.icon || "·"}</div>
                      <div className="dash-tile-label">{cat?.label || key}</div>
                      <div
                        className="dash-tile-score"
                        style={{ color: scoreColor(val as number) }}
                      >
                        {(val as number).toFixed(1)}
                      </div>
                      <div className="dash-tile-stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            style={{
                              color:
                                s <= Math.round(val as number)
                                  ? "#F4B942"
                                  : "#2A2A26",
                              fontSize: 10,
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link href="/form" className="dash-review-cta">
                + Submit a Review for {selected.name}
              </Link>
            </div>
          )}
        </div>

        {/* BOTTOM STATS BAR */}
        <div className="dash-stats-bar">
          <div className="dash-stat-card">
            <div className="dash-stat-label">Top Rated (Overall)</div>
            <div className="dash-stat-value">{topNeighborhood.name}</div>
            <div
              className="dash-stat-sub"
              style={{
                color: scoreColor(
                  parseFloat(getOverall(topNeighborhood.scores)),
                ),
              }}
            >
              {getOverall(topNeighborhood.scores)} / 5.0
            </div>
          </div>
          <div className="dash-stat-divider" />
          <div className="dash-stat-card">
            <div className="dash-stat-label">Most Reviewed</div>
            <div className="dash-stat-value">
              {[...NEIGHBORHOODS].sort((a, b) => b.reviews - a.reviews)[0].name}
            </div>
            <div className="dash-stat-sub">
              {
                [...NEIGHBORHOODS].sort((a, b) => b.reviews - a.reviews)[0]
                  .reviews
              }{" "}
              submissions
            </div>
          </div>
          <div className="dash-stat-divider" />
          <div className="dash-stat-card">
            <div className="dash-stat-label">Lagos Average</div>
            <div className="dash-stat-value">
              {(
                NEIGHBORHOODS.reduce(
                  (s, n) => s + parseFloat(getOverall(n.scores)),
                  0,
                ) / NEIGHBORHOODS.length
              ).toFixed(2)}
            </div>
            <div className="dash-stat-sub">across all categories</div>
          </div>
          <div className="dash-stat-divider" />
          <div className="dash-stat-card">
            <div className="dash-stat-label">Best for Power</div>
            <div className="dash-stat-value">
              {
                [...NEIGHBORHOODS].sort(
                  (a, b) => b.scores.power - a.scores.power,
                )[0].name
              }
            </div>
            <div className="dash-stat-sub" style={{ color: "#F4B942" }}>
              ⚡{" "}
              {[...NEIGHBORHOODS]
                .sort((a, b) => b.scores.power - a.scores.power)[0]
                .scores.power.toFixed(1)}{" "}
              / 5
            </div>
          </div>
          <div className="dash-stat-divider" />
          <div className="dash-stat-card">
            <div className="dash-stat-label">Safest Area</div>
            <div className="dash-stat-value">
              {
                [...NEIGHBORHOODS].sort(
                  (a, b) => b.scores.security - a.scores.security,
                )[0].name
              }
            </div>
            <div className="dash-stat-sub" style={{ color: "#2A7D1F" }}>
              🔒{" "}
              {[...NEIGHBORHOODS]
                .sort((a, b) => b.scores.security - a.scores.security)[0]
                .scores.security.toFixed(1)}{" "}
              / 5
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

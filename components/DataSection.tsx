"use client";

export default function DataSection() {
  const barData = [
    { label: "Power", height: "72%", color: "var(--data1)" },
    { label: "Security", height: "85%", color: "var(--data1)" },
    { label: "Flood", height: "42%", color: "var(--data3)" },
    { label: "Roads", height: "60%", color: "#D97706" },
    { label: "Market", height: "78%", color: "var(--data1)" },
    { label: "Transport", height: "65%", color: "var(--data2)" },
    { label: "Network", height: "56%", color: "var(--data4)" },
    { label: "Water", height: "48%", color: "var(--data3)" },
  ];

  return (
    <section className="data-section landing-section" id="data">
      <div className="container">
        <p className="section-label reveal">Data Intelligence</p>
        <h2 className="section-title reveal reveal-delay-1">
          Structured data.
          <br />
          <em>Real insight.</em>
        </h2>
        <div className="data-grid">
          {/* Bar Chart Card */}
          <div className="data-card reveal reveal-delay-1">
            <div className="data-card-label">
              Average Score by Category — Lagos Aggregate
            </div>
            <div className="chart-bars">
              {barData.map((bar, index) => (
                <div key={index} className="bar-group">
                  <div
                    className="bar-col"
                    style={{
                      height: bar.height,
                      background: bar.color,
                      borderRadius: "4px 4px 0 0",
                    }}
                  ></div>
                  <span className="bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className="data-card reveal reveal-delay-2">
            <div className="data-card-label">
              Neighbourhood Radar — Lekki Phase 1 vs. Mushin
            </div>
            <div className="radar-wrap">
              <svg
                className="radar-svg"
                width="180"
                height="180"
                viewBox="0 0 180 180"
              >
                {/* Grid rings */}
                <polygon
                  points="90,20 148,55 148,125 90,160 32,125 32,55"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <polygon
                  points="90,40 136,65 136,115 90,140 44,115 44,65"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <polygon
                  points="90,60 124,75 124,105 90,120 56,105 56,75"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <polygon
                  points="90,78 112,86 112,94 90,102 68,94 68,86"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* Axes */}
                <line
                  x1="90"
                  y1="20"
                  x2="90"
                  y2="160"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <line
                  x1="32"
                  y1="55"
                  x2="148"
                  y2="125"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <line
                  x1="148"
                  y1="55"
                  x2="32"
                  y2="125"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* Lekki (green) */}
                <polygon
                  points="90,34 137,69 130,108 90,127 50,108 43,63"
                  fill="rgba(26,107,60,0.15)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                {/* Mushin (orange) */}
                <polygon
                  points="90,68 120,72 118,112 90,122 64,96 60,78"
                  fill="rgba(201,78,26,0.12)"
                  stroke="var(--warn)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                {/* Labels */}
                <text
                  x="90"
                  y="14"
                  textAnchor="middle"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Power
                </text>
                <text
                  x="156"
                  y="52"
                  textAnchor="start"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Security
                </text>
                <text
                  x="156"
                  y="130"
                  textAnchor="start"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Market
                </text>
                <text
                  x="90"
                  y="173"
                  textAnchor="middle"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Transport
                </text>
                <text
                  x="24"
                  y="130"
                  textAnchor="end"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Roads
                </text>
                <text
                  x="24"
                  y="52"
                  textAnchor="end"
                  fontFamily="var(--mono)"
                  fontSize="8"
                  fill="var(--ink3)"
                >
                  Flood
                </text>
              </svg>
              <div className="radar-legend">
                <div className="radar-leg-item">
                  <div
                    className="radar-leg-dot"
                    style={{ background: "var(--accent)" }}
                  ></div>
                  Lekki Phase 1
                </div>
                <div className="radar-leg-item">
                  <div
                    className="radar-leg-dot"
                    style={{ background: "var(--warn)" }}
                  ></div>
                  Mushin
                </div>
                <div
                  style={{
                    height: "1px",
                    background: "var(--border)",
                    margin: "4px 0",
                  }}
                ></div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "9px",
                    color: "var(--ink3)",
                    lineHeight: "1.6",
                  }}
                >
                  Outer ring = 5.0
                  <br />
                  Inner ring = 1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

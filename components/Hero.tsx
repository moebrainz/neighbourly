"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-bg"></div>
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Open-access · Lagos · Nigeria
        </div>
        <h1 className="hero-headline">
          Know your
          <br />
          next
          <br />
          <em>neighbourhood.</em>
        </h1>
        <p className="hero-sub">
          Crowd-sourced intelligence on power supply, security, flooding, roads,
          and more — so you stop discovering Lagos&apos; realities after you
          move in.
        </p>
        <div className="hero-actions">
          <Link href="/neighbourhood" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L7 13M1 7L13 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Explore Data
          </Link>
          <Link href="/form" className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M7 5v4M7 9.5v.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Submit a Review
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">8</span>
            <span className="stat-label">Rating Categories</span>
          </div>
          <div className="stat">
            <span className="stat-num">20+</span>
            <span className="stat-label">LGAs Covered</span>
          </div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Free Access</span>
          </div>
          <div className="stat">
            <span className="stat-num">OSS</span>
            <span className="stat-label">Open Source</span>
          </div>
        </div>
      </div>

      {/* Hero Visual - Floating Map Card */}
      <div className="hero-visual">
        <div className="map-card">
          <div className="map-card-header">
            <span className="map-card-title">Lagos Neighbourhood Map</span>
            <span className="map-card-badge">Live</span>
          </div>
          <div className="map-body">
            <div className="map-roads"></div>
            <div className="zone zone-green"></div>
            <div className="zone zone-orange"></div>
            <div className="zone zone-blue"></div>
            <div className="zone zone-yellow"></div>

            {/* Scorecard overlay */}
            <div className="map-scorecard">
              <div className="scorecard-area">Lekki Phase 1</div>
              <div className="scorecard-row">
                <span className="scorecard-label">Power</span>
                <div className="scorecard-bar-wrap">
                  <div className="scorecard-bar">
                    <div
                      className="scorecard-bar-fill"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                  <span className="scorecard-val">4.1</span>
                </div>
              </div>
              <div className="scorecard-row">
                <span className="scorecard-label">Security</span>
                <div className="scorecard-bar-wrap">
                  <div className="scorecard-bar">
                    <div
                      className="scorecard-bar-fill"
                      style={{ width: "74%" }}
                    ></div>
                  </div>
                  <span className="scorecard-val">3.7</span>
                </div>
              </div>
              <div className="scorecard-row">
                <span className="scorecard-label">Flooding</span>
                <div className="scorecard-bar-wrap">
                  <div className="scorecard-bar">
                    <div
                      className="scorecard-bar-fill warn"
                      style={{ width: "38%" }}
                    ></div>
                  </div>
                  <span className="scorecard-val">1.9</span>
                </div>
              </div>
              <div className="scorecard-row">
                <span className="scorecard-label">Roads</span>
                <div className="scorecard-bar-wrap">
                  <div className="scorecard-bar">
                    <div
                      className="scorecard-bar-fill mid"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="scorecard-val">3.0</span>
                </div>
              </div>
              <div className="scorecard-row">
                <span className="scorecard-label">Transport</span>
                <div className="scorecard-bar-wrap">
                  <div className="scorecard-bar">
                    <div
                      className="scorecard-bar-fill"
                      style={{ width: "66%" }}
                    ></div>
                  </div>
                  <span className="scorecard-val">3.3</span>
                </div>
              </div>
            </div>

            {/* Map pins */}
            <div className="map-pin" style={{ top: "38px", left: "52px" }}>
              <div className="map-pin-bubble">
                Surulere <span className="score">3.8</span>
              </div>
              <div className="map-pin-dot"></div>
            </div>
            <div className="map-pin" style={{ bottom: "42px", left: "90px" }}>
              <div className="map-pin-bubble">
                Mushin <span className="score warn">2.1</span>
              </div>
              <div className="map-pin-dot warn"></div>
            </div>
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--accent)" }}
              ></div>
              High Score (4–5)
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "#D97706" }}
              ></div>
              Mid (3–4)
            </div>
            <div className="legend-item">
              <div
                className="legend-dot"
                style={{ background: "var(--warn)" }}
              ></div>
              Low (1–3)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

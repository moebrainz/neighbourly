"use client";

export default function HowItWorks() {
  return (
    <section className="landing-section" id="how">
      <div className="container">
        <p className="section-label reveal">Process</p>
        <h2 className="section-title reveal reveal-delay-1">
          How <em>NeighbourlyNG</em>
          <br />
          works.
        </h2>
        <div className="how-steps">
          {/* Step 1 */}
          <div className="step reveal">
            <div className="step-num" data-n="1">
              Step one
            </div>
            <div className="step-title">
              Residents submit structured ratings
            </div>
            <div className="step-desc">
              A mobile-first, multi-step form walks you through each category.
              One review per neighbourhood per 90 days prevents spam and keeps
              data fresh.
            </div>
            <div className="step-visual">
              <div className="form-preview">
                <div className="form-field-row">
                  <span className="form-field-label">Power Supply</span>
                  <div className="form-stars">
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star off">★</span>
                  </div>
                </div>
                <div className="form-field-row">
                  <span className="form-field-label">Security</span>
                  <div className="form-stars">
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                    <span className="form-star">★</span>
                  </div>
                </div>
                <div className="form-field-row">
                  <span className="form-field-label">Flood Risk</span>
                  <div className="form-stars">
                    <span
                      className="form-star"
                      style={{ color: "var(--warn)" }}
                    >
                      ★
                    </span>
                    <span
                      className="form-star"
                      style={{ color: "var(--warn)" }}
                    >
                      ★
                    </span>
                    <span className="form-star off">★</span>
                    <span className="form-star off">★</span>
                    <span className="form-star off">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step reveal reveal-delay-1">
            <div className="step-num" data-n="2">
              Step two
            </div>
            <div className="step-title">Scores aggregate into heatmaps</div>
            <div className="step-desc">
              MongoDB geospatial queries compute averages across bounding boxes.
              Leaflet.js renders choropleth heatmaps filterable by category and
              score threshold.
            </div>
            <div className="step-visual">
              <div className="mini-map">
                <div className="mini-map-roads"></div>
                <div className="mini-map-zone"></div>
                <div className="mini-map-zone2"></div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step reveal reveal-delay-2">
            <div className="step-num" data-n="3">
              Step three
            </div>
            <div className="step-title">Renters make informed decisions</div>
            <div className="step-desc">
              Neighborhood profile pages show full scorecards, review history,
              and trend over time — enabling data-driven decisions, for the
              first time, without estate agents.
            </div>
            <div className="step-visual">
              <div className="mini-scorecard">
                <div className="mini-score-row">
                  <span className="mini-score-label">Power</span>
                  <div className="mini-score-bar">
                    <div
                      className="mini-score-fill"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                  <span className="mini-score-num">4.1</span>
                </div>
                <div className="mini-score-row">
                  <span className="mini-score-label">Security</span>
                  <div className="mini-score-bar">
                    <div
                      className="mini-score-fill"
                      style={{ width: "74%" }}
                    ></div>
                  </div>
                  <span className="mini-score-num">3.7</span>
                </div>
                <div className="mini-score-row">
                  <span className="mini-score-label">Flooding</span>
                  <div className="mini-score-bar">
                    <div
                      className="mini-score-fill warn"
                      style={{ width: "38%" }}
                    ></div>
                  </div>
                  <span className="mini-score-num">1.9</span>
                </div>
                <div className="mini-score-row">
                  <span className="mini-score-label">Roads</span>
                  <div className="mini-score-bar">
                    <div
                      className="mini-score-fill mid"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="mini-score-num">3.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

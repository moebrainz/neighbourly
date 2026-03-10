"use client";

export default function TrustSection() {
  const trustMetrics = [
    {
      metric: "90",
      suffix: "d",
      name: "Review Cooldown",
      desc: "One review per user per neighbourhood per 90 days. Rate limiting and JWT auth prevent coordinated abuse while keeping data fresh.",
    },
    {
      metric: "2d",
      suffix: "↗",
      name: "Geospatial Index",
      desc: "MongoDB 2dsphere indexes on coordinates enable millisecond bounding-box queries. GeoJSON polygon storage for LGA boundaries.",
    },
    {
      metric: "0",
      suffix: "₦",
      name: "Free Forever",
      desc: "NeighbourlyNG is open-access and free for all renters. OSM tile layers, open-source stack. No paywalls, no estate agent partnerships.",
    },
  ];

  return (
    <section className="trust-section landing-section" id="about">
      <div className="container">
        <p className="section-label reveal">Why it works</p>
        <h2 className="section-title reveal reveal-delay-1">
          Built for trust.
          <br />
          <em>Designed to scale.</em>
        </h2>
        <div className="trust-grid">
          {trustMetrics.map((item, index) => (
            <div
              key={index}
              className={`trust-card reveal ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
            >
              <div className="trust-metric">
                {item.metric}
                <span>{item.suffix}</span>
              </div>
              <div className="trust-name">{item.name}</div>
              <div className="trust-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

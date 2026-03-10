"use client";

interface Category {
  icon: string;
  name: string;
  desc: string;
  scores: number[];
  scoreColor?: string;
}

export default function Categories() {
  const categories: Category[] = [
    {
      icon: "⚡",
      name: "Power Supply",
      desc: "NEPA/PHCN reliability, hours per day, generator dependency levels.",
      scores: [1, 1, 1, 1, 0],
    },
    {
      icon: "🛡️",
      name: "Security",
      desc: "Street safety, patrol presence, incident frequency, estate security.",
      scores: [1, 1, 1, 1, 1],
    },
    {
      icon: "🌊",
      name: "Flood Risk",
      desc: "Rainy season impact, drainage quality, historical flood depth.",
      scores: [1, 1, 0, 0, 0],
      scoreColor: "var(--warn)",
    },
    {
      icon: "🛣️",
      name: "Road Conditions",
      desc: "Pothole density, commute impact, vehicle wear risk, surface quality.",
      scores: [1, 1, 1, 0, 0],
    },
    {
      icon: "🛒",
      name: "Market Access",
      desc: "Proximity to markets, supermarkets, food vendors, daily essentials.",
      scores: [1, 1, 1, 1, 0],
    },
    {
      icon: "🚌",
      name: "Transport Cost",
      desc: "Danfo, BRT, ride-hailing accessibility and typical fare ranges.",
      scores: [1, 1, 1, 1, 0],
    },
    {
      icon: "📶",
      name: "Network Strength",
      desc: "MTN, Airtel, Glo, 9mobile — per-carrier signal rating by area.",
      scores: [1, 1, 1, 0, 0],
    },
    {
      icon: "💧",
      name: "Water Supply",
      desc: "Public water access, tanker dependency, pressure consistency.",
      scores: [1, 1, 1, 0, 0],
      scoreColor: "#D97706",
    },
  ];

  return (
    <section className="categories-section landing-section" id="categories">
      <div className="container">
        <p className="section-label reveal">What we measure</p>
        <h2 className="section-title reveal reveal-delay-1">
          8 categories. <em>Everything</em>
          <br />
          that actually matters.
        </h2>
        <div className="categories-grid reveal reveal-delay-2">
          {categories.map((cat, index) => (
            <div key={index} className="cat-card">
              <span className="cat-icon">{cat.icon}</span>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-desc">{cat.desc}</div>
              <div className="cat-score-preview">
                {cat.scores.map((score, i) => (
                  <span
                    key={i}
                    className={`star ${score ? "on" : ""}`}
                    style={
                      score && cat.scoreColor ? { color: cat.scoreColor } : {}
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

export default function ProblemBand() {
  const problems = [
    {
      icon: "⚡",
      text: "Power supply is invisible. Residents discover NEPA schedules only after signing their lease.",
      strong: "Power supply is invisible.",
    },
    {
      icon: "🌊",
      text: "Flooding devastates block-by-block. Adjacent streets face radically different rainy seasons.",
      strong: "Flooding devastates block-by-block.",
    },
    {
      icon: "🏠",
      text: "Estate agents have no incentive to share bad news. Word-of-mouth only travels so far.",
      strong: "Estate agents have no incentive to share bad news.",
    },
    {
      icon: "📡",
      text: "Network strength varies per street. Critical for remote workers choosing where to live.",
      strong: "Network strength varies per street.",
    },
  ];

  return (
    <div className="problem-band">
      <div className="problem-inner">
        <div>
          <p className="problem-quote">
            Lagos has 15 million residents.{" "}
            <span>Zero reliable, public data</span> on what it&apos;s actually
            like to live there.
          </p>
        </div>
        <ul className="problem-list">
          {problems.map((problem, index) => (
            <li key={index} className="problem-item">
              <div className="problem-icon">{problem.icon}</div>
              <div className="problem-text">
                <strong>{problem.strong}</strong>{" "}
                {problem.text.replace(problem.strong, "").trim()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

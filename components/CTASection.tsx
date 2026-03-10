"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-bg-grid"></div>
      <div className="cta-inner">
        <h2 className="cta-title">
          Stop guessing.
          <br />
          <em>Start knowing.</em>
        </h2>
        <p className="cta-sub">
          Join thousands of Lagos renters making smarter housing decisions — or
          contribute your own neighbourhood knowledge to the platform.
        </p>
        <div className="cta-actions">
          <Link href="/form" className="btn-light">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7a5 5 0 1 0 10 0A5 5 0 0 0 2 7z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M7 4.5V7l1.5 1.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Explore the Map
          </Link>
          <Link href="/form" className="cta-btn-ghost">
            Submit a Review →
          </Link>
        </div>
      </div>
    </section>
  );
}

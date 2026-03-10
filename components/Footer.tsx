"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          <span className="footer-logo-dot"></span>
          NeighbourlyNG
        </Link>
        <div className="footer-links">
          <Link href="/form">Map</Link>
          <Link href="/form">Submit Review</Link>
          <Link href="#">API Docs</Link>
          <Link href="#">GitHub</Link>
          <Link href="#">About</Link>
        </div>
        <span className="footer-copy">© 2025 NeighbourlyNG. Open Source.</span>
      </div>
    </footer>
  );
}

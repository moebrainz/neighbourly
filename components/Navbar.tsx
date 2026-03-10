"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <span className="nav-logo-dot"></span>
        NeighbourlyNG
      </Link>
      <ul className="nav-links">
        <li>
          <a href="#how">How it works</a>
        </li>
        <li>
          <a href="#categories">Categories</a>
        </li>
        <li>
          <a href="#data">Data</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li className="">
          <Link href="/neighbourhood" className="nav-cta">
            Explore Map
          </Link>
          <Link href="/form" className="nav-cta">
            Submit Review
          </Link>
        </li>
      </ul>
    </nav>
  );
}

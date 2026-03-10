"use client";

import type { NetworkRatingProps } from "@/types/form";
import { useState } from "react";

export default function NetworkRating({
  carrier,
  value,
  onChange,
}: NetworkRatingProps) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="network-row">
      <span className="carrier-label">{carrier}</span>
      <div className="stars small">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star sm ${star <= (hovered || value) ? "active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import type { StarRatingProps } from "@/types/form";
import { useState } from "react";

export default function StarRating({
  value,
  onChange,
  label,
  description,
  icon,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="rating-row">
      <div className="rating-label">
        <span className="rating-icon">{icon}</span>
        <div>
          <div className="rating-name">{label}</div>
          <div className="rating-desc">{description}</div>
        </div>
      </div>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= (hovered || value) ? "active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
        <span className="rating-value">{value > 0 ? `${value}/5` : "—"}</span>
      </div>
    </div>
  );
}

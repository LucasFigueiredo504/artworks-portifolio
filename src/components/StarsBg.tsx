"use client";
import React, { useState } from "react";

interface StarFieldProps {
  density?: number;
  className?: string;
}

export const StarField: React.FC<StarFieldProps> = ({
  density = 200,
  className = "",
}) => {
  // Generate stars once on mount
  const [stars] = useState(() =>
    Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * 4 + 2,
    })),
  );

  return (
    <div
      className={`fixed inset-0 -z-0 overflow-hidden pointer-events-none ${className}`}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-twinkle"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}vmin`,
              height: `${star.size}vmin`,
              opacity: star.opacity,
              boxShadow:
                star.size > 0.25
                  ? `0 0 ${star.size * 2}vmin rgba(255,255,255,0.5)`
                  : "none",
              "--duration": `${star.twinkle}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

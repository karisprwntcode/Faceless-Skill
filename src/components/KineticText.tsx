import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface KineticTextProps {
  badge?: string;
  title: string;
  highlightWords?: string[];
  subtitle?: string;
  startFrame?: number;
  fontSize?: number;
  align?: "center" | "left";
}

export const KineticText: React.FC<KineticTextProps> = ({
  badge,
  title,
  highlightWords = [],
  subtitle,
  startFrame = 0,
  fontSize = 54,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const titleSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, mass: 0.65, stiffness: 150 },
  });

  const words = title.split(" ");

  return (
    <div
      style={{
        textAlign: align,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Optional Badge */}
      {badge && (
        <div
          style={{
            display: "inline-block",
            transform: `scale(${titleSpring})`,
            opacity: titleSpring,
            padding: "8px 18px",
            background: "rgba(6, 182, 212, 0.12)",
            border: `1px solid ${THEME.colors.cyan}`,
            borderRadius: 999,
            color: THEME.colors.cyan,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {badge}
        </div>
      )}

      {/* Main Kinetic Title */}
      <h1
        style={{
          transform: `scale(${titleSpring}) translateY(${(1 - titleSpring) * 25}px)`,
          opacity: titleSpring,
          fontSize,
          fontWeight: 900,
          lineHeight: 1.15,
          color: THEME.colors.textPrimary,
          letterSpacing: -1.5,
          margin: 0,
        }}
      >
        {words.map((word, wIdx) => {
          const isHighlight = highlightWords.some(
            (h) => word.toLowerCase().includes(h.toLowerCase())
          );

          return (
            <span
              key={wIdx}
              style={{
                color: isHighlight ? THEME.colors.cyan : THEME.colors.textPrimary,
                textShadow: isHighlight
                  ? `0 0 35px ${THEME.colors.cyanGlow}`
                  : "none",
                display: "inline-block",
                marginRight: 12,
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            marginTop: 16,
            fontSize: fontSize * 0.45,
            color: THEME.colors.textSecondary,
            lineHeight: 1.5,
            fontWeight: 400,
            opacity: titleSpring,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};


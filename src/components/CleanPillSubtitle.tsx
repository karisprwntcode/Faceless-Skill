import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface CleanPillSubtitleProps {
  text: string;
  startFrame?: number;
  highlightWords?: string[];
  highlightColor?: string;
  bottomOffset?: number; // Distance from bottom (default: 340 for 9:16 safe zone)
  variant?: "solid-black" | "glass" | "bordered";
}

export const CleanPillSubtitle: React.FC<CleanPillSubtitleProps> = ({
  text,
  startFrame = 0,
  highlightWords = [],
  highlightColor = THEME.colors.cyan,
  bottomOffset = 340,
  variant = "solid-black",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Snappy spring entrance
  const entry = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 160 },
  });

  const translateY = interpolate(entry, [0, 1], [12, 0]);
  const words = text.split(" ");

  // Styling matching the exact reference videos (soft rounded black box)
  const isSolidBlack = variant === "solid-black";
  const isBordered = variant === "bordered";

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 9000,
        pointerEvents: "none",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px) scale(${0.96 + entry * 0.04})`,
          opacity: entry,
          background: isSolidBlack
            ? "#090d14"
            : isBordered
            ? "rgba(10, 20, 35, 0.9)"
            : "rgba(15, 23, 42, 0.85)",
          border: isBordered
            ? `1.5px solid ${THEME.colors.cyan}`
            : "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 8,
          padding: "10px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          maxWidth: 900,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.35,
            letterSpacing: -0.2,
            fontFamily: THEME.fonts.sans,
          }}
        >
          {words.map((word, idx) => {
            const isHighlight = highlightWords.some((h) =>
              word.toLowerCase().includes(h.toLowerCase())
            );

            return (
              <span
                key={idx}
                style={{
                  color: isHighlight ? highlightColor : "#ffffff",
                  marginRight: 6,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

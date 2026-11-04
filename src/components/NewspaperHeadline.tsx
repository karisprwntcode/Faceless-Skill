import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface NewspaperHeadlineProps {
  publication?: string;
  date?: string;
  headline?: string;
  subheadline?: string;
  stampText?: string;
  startFrame?: number;
}

export const NewspaperHeadline: React.FC<NewspaperHeadlineProps> = ({
  publication = "THE TECH CHRONICLE",
  date = "OCTOBER 24, 2024 • SPECIAL INVESTIGATION",
  headline = "GLOBAL OUTAGE: 8.5 MILLION SYSTEMS CRASH SIMULTANEOUSLY",
  subheadline = "A single faulty update triggers the largest IT crisis in digital history.",
  stampText = "TOP SECRET",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Slam-in impact physics (scale 2.5 -> 1 with rotation)
  const slamSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 140 },
  });

  const slamScale = interpolate(slamSpring, [0, 1], [1.8, 1]);
  const slamRotate = interpolate(slamSpring, [0, 1], [-10, -1.5]);

  // Stamp impact physics
  const stampSpring = spring({
    frame: relFrame - 25,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 180 },
  });

  // Yellow highlighter stroke progress
  const highlightProgress = interpolate(relFrame, [35, 55], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${slamScale}) rotate(${slamRotate}deg)`,
        opacity: slamSpring,
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        background: "#f4ebd9",
        border: "2px solid #dcd1be",
        borderRadius: 8,
        padding: "36px 44px",
        boxShadow: "0 30px 70px rgba(0,0,0,0.85)",
        color: "#18181b",
        fontFamily: "Georgia, 'Times New Roman', serif",
        position: "relative",
      }}
    >
      {/* Top Masthead */}
      <div style={{ textAlign: "center", borderBottom: "4px double #18181b", paddingBottom: 14 }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase" }}>
          {publication}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, marginTop: 6, fontFamily: "sans-serif" }}>
          {date}
        </div>
      </div>

      {/* Main Massive Headline */}
      <div style={{ position: "relative", margin: "28px 0 20px 0" }}>
        {/* Animated Yellow Highlighter Marker */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: -6,
            width: `${highlightProgress}%`,
            height: 52,
            background: "rgba(250, 204, 21, 0.45)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: -1,
            margin: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          {headline}
        </h1>
      </div>

      <p style={{ fontSize: 24, lineHeight: 1.5, color: "#3f3f46", margin: 0, fontStyle: "italic" }}>
        {subheadline}
      </p>

      {/* Red Stamp Ink */}
      {relFrame >= 25 && (
        <div
          style={{
            position: "absolute",
            bottom: 35,
            right: 35,
            transform: `scale(${stampSpring}) rotate(-14deg)`,
            border: "5px solid #dc2626",
            borderRadius: 8,
            padding: "8px 20px",
            color: "#dc2626",
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 3,
            opacity: stampSpring,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            mixBlendMode: "multiply",
          }}
        >
          {stampText}
        </div>
      )}
    </div>
  );
};

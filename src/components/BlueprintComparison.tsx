import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface BlueprintComparisonProps {
  startFrame?: number;
}

export const BlueprintComparison: React.FC<BlueprintComparisonProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const entry = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  // Shrink animation of the left box ("benda lain" shrinks on freezing)
  const shrinkProgress = interpolate(relFrame, [20, 50], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dimension tick marks indicator opacity
  const tickOpacity = interpolate(relFrame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 920,
        height: 720,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Blueprint Grid Lines Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#081b2e",
          borderRadius: 28,
          border: "2px solid rgba(56, 189, 248, 0.25)",
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.08) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "48px 48px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        }}
      />

      {/* Main Comparison Containers */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 90,
          width: "100%",
          padding: "0 40px",
          transform: `scale(${entry})`,
          opacity: entry,
        }}
      >
        {/* LEFT COLUMN: Benda Lain (Shrinking Box) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 320 }}>
          {/* Handwritten Style Label */}
          <div
            style={{
              fontSize: 36,
              fontStyle: "italic",
              fontWeight: 700,
              color: "#f8fafc",
              marginBottom: 30,
              letterSpacing: 1,
            }}
          >
            benda lain
          </div>

          {/* Interactive Shrinking Box with Dimension Ticks */}
          <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Dimension Ticks */}
            {tickOpacity > 0 && (
              <>
                <div style={{ position: "absolute", top: -28, width: 4, height: 22, background: "#fff", opacity: tickOpacity }} />
                <div style={{ position: "absolute", bottom: -28, width: 4, height: 22, background: "#fff", opacity: tickOpacity }} />
                <div style={{ position: "absolute", left: -28, height: 4, width: 22, background: "#fff", opacity: tickOpacity }} />
                <div style={{ position: "absolute", right: -28, height: 4, width: 22, background: "#fff", opacity: tickOpacity }} />
              </>
            )}

            {/* The Shape Box */}
            <div
              style={{
                width: 210 * shrinkProgress,
                height: 210 * shrinkProgress,
                borderRadius: 18,
                background: "rgba(148, 163, 184, 0.25)",
                border: "4px solid #f8fafc",
                transition: "all 0.05s linear",
              }}
            />
          </div>

          {/* Bottom Callout: "menyusut" */}
          <div
            style={{
              marginTop: 45,
              fontSize: 32,
              fontStyle: "italic",
              fontWeight: 700,
              color: "#fbbf24",
              opacity: tickOpacity,
            }}
          >
            menyusut
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div style={{ width: 3, height: 380, background: "rgba(255,255,255,0.18)" }} />

        {/* RIGHT COLUMN: Air (Expands on Freezing) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 320 }}>
          {/* Handwritten Style Label */}
          <div
            style={{
              fontSize: 36,
              fontStyle: "italic",
              fontWeight: 700,
              color: "#38bdf8",
              marginBottom: 30,
              letterSpacing: 1,
            }}
          >
            air
          </div>

          <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* The Shape Box (Stable / Expands) */}
            <div
              style={{
                width: 215,
                height: 215,
                borderRadius: 18,
                background: "rgba(6, 182, 212, 0.25)",
                border: "4px solid #38bdf8",
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.5)",
              }}
            />
          </div>

          <div style={{ height: 45 }} />
        </div>
      </div>
    </div>
  );
};

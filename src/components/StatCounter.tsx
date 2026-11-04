import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface StatCounterProps {
  label: string;
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  unit?: string;
  startFrame?: number;
  durationFrames?: number;
  accentColor?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  label,
  from = 0,
  to,
  decimals = 0,
  prefix = "",
  unit = "",
  startFrame = 0,
  durationFrames = 45,
  accentColor = THEME.colors.cyan,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance Card Animation
  const entrySpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  // Numeric count-up interpolation
  const currentValue = interpolate(relFrame, [5, 5 + durationFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const formattedNumber = decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue);

  return (
    <div
      style={{
        transform: `scale(${entrySpring}) translateY(${(1 - entrySpring) * 20}px)`,
        opacity: entrySpring,
        background: THEME.colors.bgCard,
        border: `1px solid ${THEME.colors.borderBright}`,
        borderRadius: 20,
        padding: "36px 48px",
        textAlign: "center",
        boxShadow: `0 15px 40px rgba(0,0,0,0.5), 0 0 25px ${accentColor}33`,
        maxWidth: 500,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: THEME.colors.textSecondary,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 12,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: accentColor,
          letterSpacing: -2,
          fontFamily: THEME.fonts.code,
        }}
      >
        {prefix}
        {formattedNumber}
        {unit && <span style={{ fontSize: 36, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );
};


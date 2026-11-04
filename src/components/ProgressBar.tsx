import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface ProgressBarProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  color = THEME.colors.cyan,
  height = 8,
  position = "top",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / durationInFrames));

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...(position === "top" ? { top: 0 } : { bottom: 0 }),
        height,
        background: "rgba(255, 255, 255, 0.08)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: color,
          boxShadow: `0 0 12px ${color}`,
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};


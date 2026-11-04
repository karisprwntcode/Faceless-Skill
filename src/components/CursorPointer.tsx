import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface CursorPointerProps {
  startX?: number;
  startY?: number;
  targetX: number;
  targetY: number;
  startFrame?: number;
  clickFrame?: number;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  startX = 300,
  startY = 800,
  targetX,
  targetY,
  startFrame = 0,
  clickFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Flight glide to target
  const glideProgress = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const posX = interpolate(glideProgress, [0, 1], [startX, targetX]);
  const posY = interpolate(glideProgress, [0, 1], [startY, targetY]);

  // Click physics
  let clickScale = 1;
  let rippleScale = 0;
  let rippleOpacity = 0;

  if (clickFrame !== undefined && frame >= clickFrame) {
    const clickRel = frame - clickFrame;
    // Quick dip
    clickScale = interpolate(clickRel, [0, 3, 8], [1, 0.82, 1], {
      extrapolateRight: "clamp",
    });

    // Expanding ripple
    rippleScale = interpolate(clickRel, [0, 15], [0.5, 2.5], {
      extrapolateRight: "clamp",
    });
    rippleOpacity = interpolate(clickRel, [0, 15], [0.8, 0], {
      extrapolateRight: "clamp",
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        top: posY,
        pointerEvents: "none",
        zIndex: 99999,
        transform: `translate(-4px, -4px) scale(${clickScale})`,
      }}
    >
      {/* Click Ripple Wave */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: -12,
            top: -12,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `2px solid ${THEME.colors.cyan}`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Modern Cursor Arrow */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))" }}
      >
        <path
          d="M2.5 1.5L20.5 14L11.5 15.5L7 24.5L2.5 1.5Z"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};


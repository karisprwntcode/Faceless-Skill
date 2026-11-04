import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface VirtualCameraProps {
  children: React.ReactNode;
  zoomFrom?: number;
  zoomTo?: number;
  durationFrames?: number;
  shakeFrame?: number; // Frame where an error shake triggers
  shakeDuration?: number;
  panX?: number;
  panY?: number;
}

export const VirtualCamera: React.FC<VirtualCameraProps> = ({
  children,
  zoomFrom = 1.0,
  zoomTo = 1.04,
  durationFrames,
  shakeFrame,
  shakeDuration = 12,
  panX = 0,
  panY = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames: configDuration, fps } = useVideoConfig();
  const duration = durationFrames || configDuration;

  // 1. Subtle Continuous Zoom (The breathing camera)
  const currentZoom = interpolate(frame, [0, duration], [zoomFrom, zoomTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Camera Pan with Spring
  const cameraPanX = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 90 },
  }) * panX;

  const cameraPanY = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 90 },
  }) * panY;

  // 3. Error / Impact Shake Physics
  let shakeOffsetX = 0;
  let shakeOffsetY = 0;
  if (shakeFrame !== undefined && frame >= shakeFrame && frame < shakeFrame + shakeDuration) {
    const relShake = frame - shakeFrame;
    const decay = 1 - relShake / shakeDuration;
    shakeOffsetX = Math.sin(relShake * 2.5) * 14 * decay;
    shakeOffsetY = Math.cos(relShake * 2.8) * 9 * decay;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `
          scale(${currentZoom}) 
          translateX(${cameraPanX + shakeOffsetX}px) 
          translateY(${cameraPanY + shakeOffsetY}px)
        `,
        transformOrigin: "center center",
        transition: "transform 0.05s linear",
      }}
    >
      {children}
    </div>
  );
};


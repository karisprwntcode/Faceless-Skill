import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 1. Portal Zoom Transition
 * Zooms deeply into a specific focal point (e.g. screen or lens)
 * and expands seamlessly into the next scene.
 */
interface PortalZoomProps {
  children: React.ReactNode;
  triggerFrame: number;
  durationFrames?: number;
  originX?: string; // e.g. "50%" or "65%"
  originY?: string; // e.g. "50%" or "40%"
}

export const PortalZoom: React.FC<PortalZoomProps> = ({
  children,
  triggerFrame,
  durationFrames = 15,
  originX = "50%",
  originY = "50%",
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - triggerFrame;

  if (frame < triggerFrame) {
    return <>{children}</>;
  }

  const zoomProgress = interpolate(relFrame, [0, durationFrames], [1, 9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blurAmount = interpolate(relFrame, [0, durationFrames * 0.6, durationFrames], [0, 8, 25], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(relFrame, [durationFrames * 0.7, durationFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transformOrigin: `${originX} ${originY}`,
        transform: `scale(${zoomProgress})`,
        filter: `blur(${blurAmount}px)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
};

/**
 * 2. Whip-Pan / High-Velocity Camera Swipe
 * Swipes across the screen with simulated directional motion blur.
 */
interface WhipPanProps {
  children: React.ReactNode;
  type: "in" | "out";
  triggerFrame: number;
  direction?: "left" | "right" | "up" | "down";
  durationFrames?: number;
}

export const WhipPan: React.FC<WhipPanProps> = ({
  children,
  type,
  triggerFrame,
  direction = "left",
  durationFrames = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - triggerFrame);

  const springProgress = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 180 },
  });

  let translateX = 0;
  let translateY = 0;
  let blurX = 0;
  let blurY = 0;

  const distance = 1400;

  if (type === "out") {
    const progress = interpolate(relFrame, [0, durationFrames], [0, 1], {
      extrapolateRight: "clamp",
    });
    translateX = direction === "left" ? -progress * distance : direction === "right" ? progress * distance : 0;
    translateY = direction === "up" ? -progress * distance : direction === "down" ? progress * distance : 0;
    blurX = Math.abs(direction === "left" || direction === "right" ? progress * 24 : 0);
    blurY = Math.abs(direction === "up" || direction === "down" ? progress * 24 : 0);
  } else {
    // Type === 'in'
    translateX = direction === "left" ? (1 - springProgress) * distance : direction === "right" ? -(1 - springProgress) * distance : 0;
    translateY = direction === "up" ? (1 - springProgress) * distance : direction === "down" ? -(1 - springProgress) * distance : 0;
    blurX = Math.abs(direction === "left" || direction === "right" ? (1 - springProgress) * 20 : 0);
    blurY = Math.abs(direction === "up" || direction === "down" ? (1 - springProgress) * 20 : 0);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `translate(${translateX}px, ${translateY}px)`,
        filter: blurX > 0 || blurY > 0 ? `blur(${Math.max(blurX, blurY)}px)` : "none",
      }}
    >
      {children}
    </div>
  );
};


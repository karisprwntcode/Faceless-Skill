import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type StickmanPose = "laptop-tired" | "thinking" | "standing";

interface StickmanFigureProps {
  pose?: StickmanPose;
  color?: string;
  scale?: number;
  startFrame?: number;
}

export const StickmanFigure: React.FC<StickmanFigureProps> = ({
  pose = "laptop-tired",
  color = "#111827",
  scale = 1.4,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const entrySpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 140 },
  });

  // Micro walk / tired breathing bob
  const breathBob = Math.sin((relFrame / 15) * Math.PI) * 4;

  // Floating "z z" particles for tired pose
  const z1Opacity = interpolate(relFrame % 45, [0, 10, 35, 45], [0, 1, 1, 0]);
  const z1Y = interpolate(relFrame % 45, [0, 45], [0, -35]);
  const z2Opacity = interpolate((relFrame + 20) % 45, [0, 10, 35, 45], [0, 1, 1, 0]);
  const z2Y = interpolate((relFrame + 20) % 45, [0, 45], [0, -40]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Floating Z Z Sleep Particles */}
      {pose === "laptop-tired" && (
        <div style={{ position: "relative", width: 340, height: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: -120 * scale,
              right: 40,
              fontSize: 32,
              fontWeight: 900,
              color: "#94a3b8",
              transform: `translateY(${z1Y}px)`,
              opacity: z1Opacity,
            }}
          >
            z
          </div>
          <div
            style={{
              position: "absolute",
              top: -150 * scale,
              right: 15,
              fontSize: 42,
              fontWeight: 900,
              color: "#64748b",
              transform: `translateY(${z2Y}px)`,
              opacity: z2Opacity,
            }}
          >
            Z
          </div>
        </div>
      )}

      {/* Stickman Body Container */}
      <div
        style={{
          transform: `scale(${entrySpring * scale}) translateY(${(1 - entrySpring) * 30 + breathBob}px)`,
          opacity: entrySpring,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: 320,
        }}
      >
        <svg
          width="360"
          height="320"
          viewBox="0 0 360 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: color, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" }}
        >
          {/* Head */}
          <circle cx="150" cy="70" r="32" fill="#ffffff" />
          {/* Sleepy Eyes */}
          <line x1="138" y1="65" x2="145" y2="65" stroke={color} strokeWidth="4.5" />
          <line x1="155" y1="65" x2="162" y2="65" stroke={color} strokeWidth="4.5" />
          {/* Sad/Tired Mouth */}
          <path d="M140 85 Q150 76 160 85" stroke={color} strokeWidth="4" fill="none" />

          {/* Torso */}
          <line x1="150" y1="102" x2="140" y2="215" />

          {/* Legs */}
          <line x1="140" y1="215" x2="110" y2="315" />
          <line x1="140" y1="215" x2="155" y2="315" />

          {/* Arms holding laptop */}
          {pose === "laptop-tired" && (
            <>
              <line x1="148" y1="135" x2="175" y2="155" />
              <line x1="148" y1="150" x2="175" y2="175" />

              {/* Laptop Screen */}
              <rect
                x="175"
                y="70"
                width="115"
                height="95"
                rx="6"
                fill="#ffffff"
                stroke={color}
                strokeWidth="5"
              />
              {/* Laptop Keyboard Base */}
              <path
                d="M150 165 L310 165 L290 185 L170 185 Z"
                fill="#ffffff"
                stroke={color}
                strokeWidth="5"
              />
            </>
          )}
        </svg>
      </div>

      {/* Edge-to-Edge Horizon Floor Line (Matching Reference Screenshot) */}
      <div
        style={{
          width: "100%",
          height: 5,
          background: color,
          marginTop: -5,
        }}
      />
    </div>
  );
};

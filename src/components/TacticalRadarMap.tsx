import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface RadarPoint {
  label: string;
  x: number;
  y: number;
}

interface TacticalRadarMapProps {
  title?: string;
  points?: RadarPoint[];
  startFrame?: number;
}

export const TacticalRadarMap: React.FC<TacticalRadarMapProps> = ({
  title = "HILANG?",
  points = [
    { label: "BERMUDA", x: 450, y: 160 },
    { label: "MIAMI", x: 140, y: 520 },
    { label: "PUERTO RICO", x: 760, y: 520 },
  ],
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // VHS Timecode Counter
  const totalSeconds = Math.floor(frame / 30);
  const timecode = `00:${totalSeconds < 10 ? "0" : ""}${totalSeconds}:00`;

  // Laser line drawing progress (0 to 1)
  const lineProgress1 = interpolate(relFrame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineProgress2 = interpolate(relFrame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title spring pop
  const titleSpring = spring({
    frame: relFrame - 20,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 150 },
  });

  // Radar Pulse Rings (Bermuda coordinate)
  const pulse1 = (relFrame % 40) / 40;
  const pulse2 = ((relFrame + 20) % 40) / 40;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* CRT Top Header: PLAY & Timecode */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#94a3b8",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 3,
          padding: "0 10px",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#22c55e", fontSize: 20 }}>▶</span> PLAY
        </div>
        <div>{timecode}</div>
      </div>

      {/* Tactical Canvas Area with Scanlines */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 700,
          background: "radial-gradient(circle at 50% 40%, #061e2d 0%, #03080e 80%)",
          borderRadius: 24,
          border: "1.5px solid rgba(6, 182, 212, 0.35)",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.9)",
        }}
      >
        {/* Subtle Horizontal CRT Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 3px, transparent 3px, transparent 6px)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* SVG Laser Radar Path */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 900 660"
          style={{ position: "absolute", inset: 0, zIndex: 5 }}
        >
          {/* Triangle Background Silhouette */}
          <polygon
            points="450,160 760,520 140,520"
            fill="rgba(244, 63, 94, 0.05)"
            stroke="rgba(244, 63, 94, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Active Red Laser Line from Bermuda to Puerto Rico */}
          {lineProgress1 > 0 && (
            <line
              x1="450"
              y1="160"
              x2={450 + (760 - 450) * lineProgress1}
              y2={160 + (520 - 160) * lineProgress1}
              stroke="#f43f5e"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 12px #f43f5e)" }}
            />
          )}

          {/* Active Red Laser Line from Puerto Rico to Miami */}
          {lineProgress2 > 0 && (
            <line
              x1="760"
              y1="520"
              x2={760 - (760 - 140) * lineProgress2}
              y2="520"
              stroke="#f43f5e"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 12px #f43f5e)" }}
            />
          )}

          {/* Animated Radar Pulse Rings on Bermuda */}
          <circle
            cx="450"
            cy="160"
            r={pulse1 * 70}
            stroke="#f43f5e"
            strokeWidth="2.5"
            fill="none"
            opacity={1 - pulse1}
          />
          <circle
            cx="450"
            cy="160"
            r={pulse2 * 70}
            stroke="#f43f5e"
            strokeWidth="2.5"
            fill="none"
            opacity={1 - pulse2}
          />

          {/* Radar Points with Glowing Beacons */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="10"
                fill="#f8fafc"
                stroke="#f43f5e"
                strokeWidth="4"
                style={{ filter: "drop-shadow(0 0 10px #f43f5e)" }}
              />
              <text
                x={pt.x}
                y={pt.y + 36}
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="16"
                fontWeight="900"
                letterSpacing="2"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Center Impact Text ("HILANG?") */}
        <div
          style={{
            position: "absolute",
            bottom: 45,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 20,
            transform: `scale(${titleSpring})`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 4,
              textShadow: "0 0 35px rgba(255,255,255,0.6)",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

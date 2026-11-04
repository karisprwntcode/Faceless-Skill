import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export const DeviceMockup: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const phoneEntry = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 130 },
  });

  // Floating notification badge pop
  const notifSpring = spring({
    frame: relFrame - 25,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 170 },
  });

  return (
    <div
      style={{
        transform: `scale(${phoneEntry}) translateY(${(1 - phoneEntry) * 40}px)`,
        opacity: phoneEntry,
        width: 540,
        height: 940,
        margin: "0 auto",
        background: "#0f172a",
        borderRadius: 56,
        border: "14px solid #1e293b",
        boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 45px rgba(6, 182, 212, 0.25)",
        position: "relative",
        overflow: "hidden",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Top Dynamic Island / Speaker Notch */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 150,
          height: 34,
          background: "#000000",
          borderRadius: 24,
          zIndex: 10,
        }}
      />

      {/* Screen App UI */}
      <div style={{ padding: "80px 36px 36px 36px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <div>
          {/* Greeting */}
          <div style={{ fontSize: 18, color: THEME.colors.textMuted, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
            SaaS Analytics Pro
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", marginTop: 8 }}>
            Revenue Spike
          </div>

          {/* Animated Mini Graph Bar */}
          <div style={{ marginTop: 36, display: "flex", gap: 12, alignItems: "flex-end", height: 160 }}>
            {[40, 65, 30, 85, 55, 95].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 5 ? THEME.colors.cyan : "#334155",
                  borderRadius: 6,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Success Notification Card */}
        {relFrame >= 25 && (
          <div
            style={{
              transform: `scale(${notifSpring})`,
              opacity: notifSpring,
              background: "rgba(16, 185, 129, 0.95)",
              borderRadius: 22,
              padding: "24px",
              color: "#ffffff",
              boxShadow: "0 15px 35px rgba(16, 185, 129, 0.45)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Payment Received</div>
            <div style={{ fontSize: 36, fontWeight: 900, marginTop: 4 }}>+$4,950.00 USD</div>
          </div>
        )}

        {/* Bottom Home Indicator Bar */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 160, height: 6, background: "rgba(255,255,255,0.4)", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
};

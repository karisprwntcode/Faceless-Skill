import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export const FinanceCandlestick: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const entry = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 140 },
  });

  // Price counter ($42,100 -> $68,450)
  const price = interpolate(relFrame, [10, 60], [42100, 68450], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const percentage = interpolate(relFrame, [10, 60], [0, 62.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const candles = [
    { type: "green", height: 110, wickTop: 35, wickBottom: 25 },
    { type: "red", height: 75, wickTop: 20, wickBottom: 40 },
    { type: "green", height: 160, wickTop: 40, wickBottom: 20 },
    { type: "green", height: 240, wickTop: 50, wickBottom: 30, isCurrent: true },
  ];

  return (
    <div
      style={{
        transform: `scale(${entry})`,
        opacity: entry,
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        background: "#080e18",
        border: "1.5px solid rgba(16, 185, 129, 0.35)",
        borderRadius: 28,
        padding: "36px 44px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16, 185, 129, 0.2)",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Top Asset & Price Ticker */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#94a3b8", letterSpacing: 3 }}>BTC / USDT • 1D</div>
          <div style={{ fontSize: 68, fontWeight: 900, color: "#ffffff", fontFamily: THEME.fonts.code, marginTop: 6 }}>
            ${Math.round(price).toLocaleString()}
          </div>
        </div>
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1.5px solid #10b981",
            borderRadius: 12,
            padding: "12px 20px",
            color: "#10b981",
            fontSize: 26,
            fontWeight: 800,
            fontFamily: THEME.fonts.code,
          }}
        >
          +{percentage.toFixed(1)}%
        </div>
      </div>

      {/* Candlestick Chart Area */}
      <div
        style={{
          height: 380,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          borderBottom: "2px solid #1e293b",
          position: "relative",
          paddingBottom: 20,
        }}
      >
        {/* Horizontal Target Price Line */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            borderTop: "2px dashed rgba(16, 185, 129, 0.45)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 800, color: "#10b981", background: "#080e18", padding: "0 10px", transform: "translateY(-10px)", letterSpacing: 1 }}>
            ATH RESISTANCE $69,000
          </span>
        </div>

        {candles.map((c, idx) => {
          const delay = idx * 12;
          const candleSpring = spring({
            frame: relFrame - delay,
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 140 },
          });

          const isGreen = c.type === "green";
          const color = isGreen ? "#10b981" : "#f43f5e";

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scaleY(${candleSpring})`,
                transformOrigin: "bottom",
                opacity: candleSpring,
              }}
            >
              {/* Upper Wick */}
              <div style={{ width: 3, height: c.wickTop, background: color }} />
              {/* Candle Body */}
              <div
                style={{
                  width: 65,
                  height: c.height,
                  background: color,
                  borderRadius: 6,
                  boxShadow: c.isCurrent ? `0 0 30px ${color}` : "none",
                }}
              />
              {/* Lower Wick */}
              <div style={{ width: 3, height: c.wickBottom, background: color }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

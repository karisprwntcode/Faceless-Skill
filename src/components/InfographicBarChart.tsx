import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export interface ChartDataPoint {
  year: string;
  value: number; // Value in billions (e.g. 1, 2, 4, 8)
  isActive?: boolean;
}

interface InfographicBarChartProps {
  category?: string;
  headline?: string;
  data?: ChartDataPoint[];
  sourceText?: string;
  startFrame?: number;
}

export const InfographicBarChart: React.FC<InfographicBarChartProps> = ({
  category = "PENDUDUK DUNIA",
  headline = "1 miliar • 1804",
  data = [
    { year: "1804", value: 1.0, isActive: true },
    { year: "1927", value: 2.0 },
    { year: "1974", value: 4.0 },
    { year: "2022", value: 8.0 },
  ],
  sourceText = "Sumber: PBB (UN DESA)",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring of header
  const headerSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  const chartHeight = 600;
  const maxValue = 8;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
        position: "relative",
      }}
    >
      {/* Top Category & Headline */}
      <div style={{ transform: `scale(${headerSpring})`, opacity: headerSpring, marginBottom: 36 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: THEME.colors.textSecondary,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          {headline}
        </div>
      </div>

      {/* Chart Canvas with Y-Axis and Dotted Guidelines */}
      <div style={{ position: "relative", height: chartHeight, width: "100%", display: "flex" }}>
        {/* Y-Axis Labels */}
        <div
          style={{
            width: 45,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: THEME.colors.textMuted,
            fontSize: 20,
            fontWeight: 700,
            paddingBottom: 40,
          }}
        >
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>

        {/* Dotted Guideline Lines & Bars Container */}
        <div style={{ flex: 1, position: "relative", borderBottom: `2px solid ${THEME.colors.borderBright}` }}>
          {/* Horizontal Dotted Lines */}
          {[0.25, 0.5, 0.75].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${pos * 100}%`,
                left: 0,
                right: 0,
                borderTop: "1.5px dashed rgba(255,255,255,0.12)",
              }}
            />
          ))}

          {/* Bars Flex Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-end",
              height: "100%",
              padding: "0 20px",
            }}
          >
            {data.map((item, idx) => {
              const barDelay = idx * 10;
              const barSpring = spring({
                frame: relFrame - barDelay,
                fps,
                config: { damping: 12, mass: 0.7, stiffness: 140 },
              });

              const targetHeightPercent = (item.value / maxValue) * 100;
              const currentHeightPercent = barSpring * targetHeightPercent;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 140,
                    height: "100%",
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  {/* Dotted Outline of Max Height */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: `${targetHeightPercent}%`,
                      border: "2px dashed rgba(255,255,255,0.15)",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />

                  {/* Animated Blue Growing Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: `${currentHeightPercent}%`,
                      background: item.isActive ? "#3b82f6" : "#1e3a8a",
                      borderRadius: "10px 10px 0 0",
                      boxShadow: item.isActive ? "0 0 35px rgba(59, 130, 246, 0.6)" : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* X-Axis Year Label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -48,
                      fontSize: 24,
                      fontWeight: item.isActive ? 900 : 700,
                      color: item.isActive ? "#ffffff" : THEME.colors.textMuted,
                    }}
                  >
                    {item.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footnote Source Credit */}
      <div
        style={{
          position: "absolute",
          bottom: -90,
          right: 0,
          fontSize: 16,
          color: THEME.colors.textMuted,
          fontWeight: 600,
        }}
      >
        {sourceText}
      </div>
    </div>
  );
};

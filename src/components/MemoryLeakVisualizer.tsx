import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface MemoryLeakVisualizerProps {
  startFrame?: number;
  triggerCrashFrame?: number;
}

export const MemoryLeakVisualizer: React.FC<MemoryLeakVisualizerProps> = ({
  startFrame = 0,
  triggerCrashFrame = 90,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring of the RAM Chamber
  const entrySpring = spring({
    frame: relFrame,
    fps,
    config: THEME.physics.playful,
  });

  // Memory Fill Level (0% -> 96% -> 100% Crash)
  const fillPercentage = interpolate(
    relFrame,
    [10, triggerCrashFrame - 15, triggerCrashFrame],
    [15, 88, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isCritical = fillPercentage > 80;
  const isCrashed = relFrame >= triggerCrashFrame;

  // Active status color
  const statusColor = isCrashed
    ? THEME.colors.rose
    : isCritical
    ? THEME.colors.amber
    : THEME.colors.emerald;

  // Container shake on crash
  let containerShake = 0;
  if (isCrashed && relFrame < triggerCrashFrame + 15) {
    const crashRel = relFrame - triggerCrashFrame;
    containerShake = Math.sin(crashRel * 2.8) * (15 - crashRel);
  }

  // Leaky blocks stacking inside
  const blockCount = 8;
  const activeBlocks = Math.floor((fillPercentage / 100) * blockCount);

  return (
    <div
      style={{
        transform: `scale(${entrySpring}) translateX(${containerShake}px)`,
        opacity: entrySpring,
        background: THEME.colors.bgCard,
        border: `2px solid ${isCrashed ? THEME.colors.rose : THEME.colors.borderBright}`,
        borderRadius: 20,
        padding: "24px 30px",
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${statusColor}33`,
        fontFamily: THEME.fonts.sans,
        position: "relative",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🧠</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary }}>
              HEAP MEMORY ALLOCATION
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary }}>
              Node.js V8 Engine Pool
            </div>
          </div>
        </div>

        {/* Live Status Badge */}
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: `${statusColor}22`,
            border: `1px solid ${statusColor}`,
            color: statusColor,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {isCrashed ? "CRASH: OOM KILLER" : isCritical ? "WARNING: LEAK" : "NORMAL"}
        </div>
      </div>

      {/* The Glass RAM Chamber */}
      <div
        style={{
          height: 180,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 14,
          border: `1px dashed ${THEME.colors.borderBright}`,
          padding: 12,
          display: "flex",
          flexDirection: "column-reverse",
          gap: 6,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Leaky Memory Blocks */}
        {Array.from({ length: blockCount }).map((_, i) => {
          const isAllocated = i < activeBlocks;
          const isLeakedBlock = i >= 2; // Bottom 2 are legitimate, rest are leaked listeners

          return (
            <div
              key={i}
              style={{
                height: 14,
                borderRadius: 4,
                background: !isAllocated
                  ? "transparent"
                  : isLeakedBlock
                  ? isCrashed
                    ? THEME.colors.rose
                    : THEME.colors.amber
                  : THEME.colors.cyan,
                opacity: isAllocated ? 1 : 0.1,
                border: isAllocated ? "none" : `1px dashed ${THEME.colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px",
                fontSize: 10,
                color: "#000",
                fontWeight: 700,
                transition: "all 0.2s ease",
              }}
            >
              {isAllocated && (
                <>
                  <span>{isLeakedBlock ? "⚠️ Dangling EventListener" : "✓ Active Cache Pool"}</span>
                  <span>{isLeakedBlock ? "+128 MB (Unfreed)" : "256 MB"}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Capacity Progress Bar & Text */}
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 600,
            color: THEME.colors.textSecondary,
            marginBottom: 6,
          }}
        >
          <span>Memory Usage: {Math.round(fillPercentage)}%</span>
          <span style={{ color: statusColor }}>
            {isCrashed ? "4096 MB / 4096 MB (MAX EXCEEDED)" : `${Math.round((fillPercentage / 100) * 4096)} MB / 4096 MB`}
          </span>
        </div>

        <div
          style={{
            height: 10,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${fillPercentage}%`,
              height: "100%",
              background: statusColor,
              boxShadow: `0 0 12px ${statusColor}`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};


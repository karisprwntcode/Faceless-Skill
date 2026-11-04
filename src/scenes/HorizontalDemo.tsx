import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";
import {
  KineticText,
  FlowDiagram,
  CodeTerminal,
  StatCounter,
  ProgressBar,
  BackgroundGrid,
  CharacterFigure,
  CleanPillSubtitle,
} from "../components";

/**
 * Horizontal 16:9 Widescreen Explainer (1920 x 1080)
 * Layout: Strict Two-Column Grid (Zero Absolute Overlap)
 * Left: Architectural Flow & Character
 * Right: Live Code Terminal & Performance Metrics
 */
export const HorizontalDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 70% 30%, #0d1e38 0%, ${THEME.colors.bgCanvas} 75%)`,
        padding: "50px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Background Grid & Top Progress Bar */}
      <BackgroundGrid gridSize={60} opacity={0.08} enableBreathing={true} />
      <ProgressBar color={THEME.colors.cyan} height={6} />

      {/* =========================================================================
          TOP HEADER BAR (Height ~100px)
          ========================================================================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1.5px solid rgba(255,255,255,0.1)",
          paddingBottom: 20,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(6, 182, 212, 0.15)",
              border: `1px solid ${THEME.colors.cyan}`,
              color: THEME.colors.cyan,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            SYSTEM ARCHITECTURE
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            Scaling Database Under High Concurrency
          </h1>
        </div>

        {/* Status Pill Badge */}
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(16, 185, 129, 0.15)",
            border: `1.5px solid ${THEME.colors.emerald}`,
            color: THEME.colors.emerald,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: THEME.colors.emerald }} />
          99.4% CACHE HIT RATIO
        </div>
      </div>

      {/* =========================================================================
          MAIN TWO-COLUMN WORKSPACE (Height ~760px)
          Explicit side-by-side widths with ZERO overlap
          ========================================================================= */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
          flex: 1,
          padding: "30px 0",
          zIndex: 10,
        }}
      >
        {/* -------------------------------------------------------------
            LEFT COLUMN (Width: 780px) - Architecture Flow & Character
            ------------------------------------------------------------- */}
        <div
          style={{
            width: 780,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.cyan, letterSpacing: 2, textTransform: "uppercase" }}>
              STEP 1: REQUEST FLOW
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
              Cache-Aside Routing Pipeline
            </div>
          </div>

          {/* Connected System Nodes */}
          <FlowDiagram
            nodes={[
              { id: "1", label: "Client Traffic", sublabel: "100,000 req/sec", icon: "🌐", color: THEME.colors.violet },
              { id: "2", label: "Redis Cache (RAM)", sublabel: "Latency < 1ms", icon: "⚡", color: THEME.colors.cyan },
              { id: "3", label: "PostgreSQL Database", sublabel: "Overload Protected", icon: "💾", color: THEME.colors.emerald },
            ]}
            activeStep={frame < 220 ? 1 : 2}
            direction="vertical"
          />

          {/* Supporting Character Anchor */}
          <div style={{ marginTop: 10 }}>
            <CharacterFigure
              persona="developer"
              emotion={frame < 220 ? "neutral" : "eureka"}
              action="pointing"
              accentColor={THEME.colors.cyan}
              scale={0.85}
            />
          </div>
        </div>

        {/* Vertical Separator Line */}
        <div style={{ width: 2, height: "85%", background: "rgba(255,255,255,0.08)" }} />

        {/* -------------------------------------------------------------
            RIGHT COLUMN (Width: 920px) - Code Terminal OR Benchmark
            Strict layout='none' on Sequences to prevent AbsoluteFill overlap!
            ------------------------------------------------------------- */}
        <div
          style={{
            width: 920,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {frame < 220 ? (
            <div style={{ width: "100%" }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase" }}>
                  IMPLEMENTATION
                </span>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", marginTop: 2 }}>
                  Query Interception Logic
                </div>
              </div>
              <CodeTerminal
                title="cacheInterceptor.ts"
                lines={[
                  { text: "// 1. Check in-memory Redis cluster first", tokens: [{ text: "// 1. Check in-memory Redis cluster first", color: THEME.colors.textMuted }] },
                  { text: "const cached = await redis.get(cacheKey);", tokens: [{ text: "const", color: "#f43f5e" }, { text: " cached = ", color: "#f8fafc" }, { text: "await", color: "#06b6d4" }, { text: " redis.get(cacheKey);", color: "#10b981" }] },
                  { text: "if (cached) return JSON.parse(cached);", isHighlighted: true, tokens: [{ text: "if", color: "#f43f5e" }, { text: " (cached) ", color: "#f8fafc" }, { text: "return", color: "#f43f5e" }, { text: " JSON.parse(cached);", color: "#38bdf8" }] },
                  { text: "// 2. Fallback to SQL DB with 1h TTL", tokens: [{ text: "// 2. Fallback to SQL DB with 1h TTL", color: THEME.colors.textMuted }] },
                  { text: "const data = await db.query(sql);", tokens: [{ text: "const", color: "#f43f5e" }, { text: " data = ", color: "#f8fafc" }, { text: "await", color: "#06b6d4" }, { text: " db.query(sql);", color: "#f59e0b" }] },
                  { text: "await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);", tokens: [{ text: "await", color: "#06b6d4" }, { text: " redis.set(cacheKey, ...);", color: "#a855f7" }] },
                ]}
                highlightLineIndex={2}
              />
            </div>
          ) : (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.emerald, letterSpacing: 2, textTransform: "uppercase" }}>
                  BENCHMARK RESULTS
                </span>
                <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
                  99% Drop in Database Latency
                </div>
              </div>

              <div style={{ width: 600 }}>
                <StatCounter
                  label="Average Query Roundtrip"
                  from={320}
                  to={3}
                  unit="ms"
                  prefix="↓ "
                  accentColor={THEME.colors.emerald}
                  durationFrames={40}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SUBTITLE PILL BAR (Anchored cleanly at bottom)
          ========================================================================= */}
      <CleanPillSubtitle
        text={
          frame < 220
            ? "Simpan hasil query populer langsung di RAM sebelum menyentuh disk database."
            : "Database aman dari lonjakan traffic, latency berkurang dari 320ms menjadi 3ms!"
        }
        highlightWords={frame < 220 ? ["RAM", "sebelum"] : ["3ms!"]}
        highlightColor={THEME.colors.emerald}
        bottomOffset={40}
      />
    </AbsoluteFill>
  );
};

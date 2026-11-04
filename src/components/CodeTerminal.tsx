import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export interface CodeLine {
  text: string;
  isHighlighted?: boolean;
  indent?: number;
  tokens?: { text: string; color?: string }[];
}

interface CodeTerminalProps {
  title?: string;
  lines: CodeLine[];
  startFrame?: number;
  highlightLineIndex?: number;
  scale?: number;
}

export const CodeTerminal: React.FC<CodeTerminalProps> = ({
  title = "server.ts",
  lines,
  startFrame = 0,
  highlightLineIndex,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const entrySpring = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  return (
    <div
      style={{
        transform: `scale(${entrySpring * scale}) translateY(${(1 - entrySpring) * 30}px)`,
        opacity: entrySpring,
        background: THEME.colors.bgCard,
        borderRadius: 18,
        border: `1px solid ${THEME.colors.borderBright}`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${THEME.colors.cyanGlow}`,
        overflow: "hidden",
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        fontFamily: THEME.fonts.code,
      }}
    >
      {/* Window Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "#0f172a",
          borderBottom: `1px solid ${THEME.colors.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10b981" }} />
        </div>
        <div
          style={{
            fontSize: 16,
            color: THEME.colors.textSecondary,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </div>
        <div style={{ width: 44 }} />
      </div>

      {/* Code Body */}
      <div style={{ padding: "24px 20px", fontSize: 22, lineHeight: 1.7 }}>
        {lines.map((line, idx) => {
          // Staggered reveal per line
          const lineDelay = idx * 6;
          const lineProgress = interpolate(relativeFrame - lineDelay, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const isLineActive = highlightLineIndex === idx || line.isHighlighted;

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                opacity: lineProgress,
                transform: `translateX(${(1 - lineProgress) * 15}px)`,
                background: isLineActive ? "rgba(6, 182, 212, 0.12)" : "transparent",
                borderLeft: isLineActive ? `4px solid ${THEME.colors.cyan}` : "4px solid transparent",
                padding: "2px 10px",
                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              {/* Line Number */}
              <span
                style={{
                  width: 40,
                  color: isLineActive ? THEME.colors.cyan : THEME.colors.textMuted,
                  fontSize: 18,
                  userSelect: "none",
                  fontWeight: isLineActive ? 600 : 400,
                }}
              >
                {idx + 1}
              </span>

              {/* Code Line Content */}
              <div style={{ paddingLeft: (line.indent || 0) * 20, display: "flex", gap: 8 }}>
                {line.tokens ? (
                  line.tokens.map((token, tIdx) => (
                    <span key={tIdx} style={{ color: token.color || THEME.colors.textPrimary }}>
                      {token.text}
                    </span>
                  ))
                ) : (
                  <span style={{ color: THEME.colors.textPrimary }}>{line.text}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


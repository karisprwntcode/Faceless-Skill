import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: string;
}

interface FlowDiagramProps {
  nodes: DiagramNode[];
  startFrame?: number;
  activeStep?: number;
  direction?: "horizontal" | "vertical";
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  startFrame = 0,
  activeStep = 0,
  direction = "vertical",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const isVertical = direction === "vertical";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 24 : 32,
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {nodes.map((node, index) => {
        const nodeDelay = index * 8;
        const nodeSpring = spring({
          frame: relFrame - nodeDelay,
          fps,
          config: { damping: 13, mass: 0.7, stiffness: 140 },
        });

        const isActive = activeStep === index;
        const isPast = activeStep > index;

        // Animated pulse packet traveling to next node
        const pulseCycle = (relFrame % 30) / 30;

        return (
          <React.Fragment key={node.id}>
            {/* The Node Card */}
            <div
              style={{
                transform: `scale(${nodeSpring}) translateY(${(1 - nodeSpring) * 20}px)`,
                opacity: nodeSpring,
                background: isActive ? THEME.colors.bgCardHover : THEME.colors.bgCard,
                border: `2px solid ${
                  isActive
                    ? node.color || THEME.colors.cyan
                    : isPast
                    ? THEME.colors.emerald
                    : THEME.colors.border
                }`,
                borderRadius: 16,
                padding: "20px 28px",
                minWidth: isVertical ? 320 : 180,
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: isActive
                  ? `0 0 25px ${node.color || THEME.colors.cyanGlow}`
                  : "0 10px 30px rgba(0,0,0,0.4)",
                transition: "border 0.2s ease",
              }}
            >
              {/* Node Icon / Status Indicator */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: isActive ? (node.color || THEME.colors.cyan) : "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: isActive ? "#000" : THEME.colors.textSecondary,
                }}
              >
                {node.icon || (index + 1)}
              </div>

              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: THEME.colors.textPrimary,
                    letterSpacing: -0.5,
                  }}
                >
                  {node.label}
                </div>
                {node.sublabel && (
                  <div
                    style={{
                      fontSize: 15,
                      color: isActive ? (node.color || THEME.colors.cyan) : THEME.colors.textSecondary,
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
            </div>

            {/* Connecting Arrow & Animated Energy Packet */}
            {index < nodes.length - 1 && (
              <div
                style={{
                  position: "relative",
                  width: isVertical ? 4 : 50,
                  height: isVertical ? 40 : 4,
                  background: THEME.colors.borderBright,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Traveling glowing packet */}
                <div
                  style={{
                    position: "absolute",
                    width: isVertical ? 8 : 12,
                    height: isVertical ? 12 : 8,
                    borderRadius: 4,
                    background: THEME.colors.cyan,
                    boxShadow: `0 0 10px ${THEME.colors.cyan}`,
                    transform: isVertical
                      ? `translateY(${(pulseCycle - 0.5) * 40}px)`
                      : `translateX(${(pulseCycle - 0.5) * 50}px)`,
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};


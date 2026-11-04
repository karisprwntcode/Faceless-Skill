import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { THEME } from "../styles/theme";
import {
  StickmanFigure,
  TacticalRadarMap,
  InfographicBarChart,
  BlueprintComparison,
  CleanPillSubtitle,
  ProgressBar,
  VirtualCamera,
  TransitionWrapper,
} from "../components";

export const ArchetypeShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0b0f19", position: "relative", overflow: "hidden" }}>
      <ProgressBar color={THEME.colors.cyan} height={8} />

      {/* =========================================================================
          ARCHETYPE 1: STICKMAN STORYTELLING (0s - 3s / frames 0 - 90)
          Replicating 34-stickman.mp4: Large line-art character, horizon line,
          bold centered question, and solid black lower third pill!
          ========================================================================= */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ background: "#ffffff" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <TransitionWrapper exitAtFrame={76} exitMode="blur-disperse">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 160,
                }}
              >
                {/* Stickman with Edge-to-Edge Horizon Floor */}
                <StickmanFigure pose="laptop-tired" scale={1.6} />

                {/* Big Centered Headline */}
                <div
                  style={{
                    marginTop: 60,
                    fontSize: 68,
                    fontWeight: 900,
                    color: "#0f172a",
                    letterSpacing: -2,
                    fontFamily: THEME.fonts.sans,
                    textAlign: "center",
                  }}
                >
                  seharian di laptop?
                </div>
              </div>
            </TransitionWrapper>

            <CleanPillSubtitle
              text="Kerja seharian di depan laptop bikin lelah mental."
              variant="solid-black"
              highlightWords={["lelah", "mental."]}
              highlightColor={THEME.colors.cyan}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* =========================================================================
          ARCHETYPE 2: GLITCH & TACTICAL RADAR (3s - 7s / frames 90 - 120)
          Replicating 29-glitch.mp4: Full-width 920px radar map, CRT scanlines,
          and glowing Bermuda triangle coordinates!
          ========================================================================= */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#03080e" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
            <TransitionWrapper exitAtFrame={105} exitMode="slide-down">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 140,
                }}
              >
                <TacticalRadarMap title="HILANG?" />
              </div>
            </TransitionWrapper>

            <CleanPillSubtitle
              text="Konon, kapal dan pesawat lenyap tanpa jejak di zona ini."
              variant="solid-black"
              highlightWords={["lenyap", "tanpa", "jejak"]}
              highlightColor={THEME.colors.rose}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* =========================================================================
          ARCHETYPE 3: DATA INFOGRAPHICS (7s - 11s / frames 210 - 120)
          Replicating 07-infografis.mp4: 920px wide bar chart, dotted guides,
          tall bars growing dynamically, big headline number!
          ========================================================================= */}
      <Sequence from={210} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#0b0f19" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <TransitionWrapper exitAtFrame={105} exitMode="blur-disperse">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 140,
                }}
              >
                <InfographicBarChart
                  category="PERTUMBUHAN POPULASI"
                  headline="1 miliar • 1804"
                  sourceText="Sumber: PBB (UN DESA)"
                />
              </div>
            </TransitionWrapper>

            <CleanPillSubtitle
              text="Manusia butuh ratusan ribu tahun untuk mencapai satu miliar pertama."
              variant="solid-black"
              highlightWords={["ratusan", "ribu", "tahun"]}
              highlightColor={THEME.colors.cyan}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* =========================================================================
          ARCHETYPE 4: BLUEPRINT SCIENCE COMPARISON (11s - 15s / frames 330 - 120)
          Replicating 04-sains.mp4: Blueprint grid canvas, handwritten italic
          labels, interactive shrinking geometry!
          ========================================================================= */}
      <Sequence from={330} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#040d1a" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 140,
              }}
            >
              <BlueprintComparison />
            </div>

            <CleanPillSubtitle
              text="Hampir semua benda menyusut saat membeku, kecuali air."
              variant="bordered"
              highlightWords={["kecuali", "air."]}
              highlightColor="#38bdf8"
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

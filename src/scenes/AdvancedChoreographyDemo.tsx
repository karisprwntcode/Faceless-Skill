import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { THEME } from "../styles/theme";
import {
  CharacterFigure,
  CleanPillSubtitle,
  ProgressBar,
  BackgroundGrid,
  VirtualCamera,
  DustParticles,
  AuroraMesh,
  StabiloHighlight,
  PortalZoom,
  WhipPan,
  CodeTerminal,
} from "../components";

export const AdvancedChoreographyDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.colors.bgCanvas, position: "relative", overflow: "hidden" }}>
      <ProgressBar color={THEME.colors.cyan} height={8} />
      <BackgroundGrid gridSize={54} opacity={0.06} enableBreathing={true} />
      <DustParticles count={14} />

      {/* =========================================================================
          ACT 1: PANIC HEADGRAB AT CRASHED SERVER (0s - 3s / frames 0 - 90)
          Tata Hirarki 4-Tier:
          - Tier 1 (Top): [ CASE STUDY: SYSTEM RELIABILITY ] (20px)
          - Tier 2 (Hero Stage): Karakter panik pegang kepala, laptop di depannya crash merah!
          - Tier 3 (Punch Text): "server crash mendadak?" (68px tebal)
          - Tier 4 (Subtitle Pill): "Panik saat bug kritis muncul 10 menit sebelum rilis!"
          ========================================================================= */}
      <Sequence from={0} durationInFrames={90}>
        <WhipPan type="out" triggerFrame={76} direction="left">
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <AuroraMesh mood="tense" />

            {/* TIER 1: CONTEXT TAG (Top 140px) */}
            <div
              style={{
                position: "absolute",
                top: 140,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 40,
              }}
            >
              <span
                style={{
                  fontFamily: THEME.fonts.code,
                  fontSize: 20,
                  fontWeight: 700,
                  color: THEME.colors.rose,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                [ ERROR 500 : CRITICAL FAILURE ]
              </span>
            </div>

            {/* TIER 2: HERO ACTION STAGE (Y: 260px - 1160px / Height: 900px) */}
            <div
              style={{
                position: "absolute",
                top: 260,
                left: 80,
                width: 920,
                height: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
              }}
            >
              <CharacterFigure
                persona="developer"
                emotion="panic"
                action="panic-headgrab"
                accentColor={THEME.colors.rose}
                scale={1.35}
              />
            </div>

            {/* TIER 3: KINETIC PUNCH HEADLINE (Y: 1220px - 1380px) */}
            <div
              style={{
                position: "absolute",
                top: 1220,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0 80px",
                textAlign: "center",
                zIndex: 40,
              }}
            >
              <h1
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  fontFamily: THEME.fonts.sans,
                  margin: 0,
                  letterSpacing: -1,
                }}
              >
                Server Crash <StabiloHighlight color={THEME.colors.rose}>Mendadak?</StabiloHighlight>
              </h1>
            </div>

            {/* TIER 4: SUBTITLE PILL (Bottom Y: 1600px) */}
            <CleanPillSubtitle
              text="Panik saat bug kritis muncul 10 menit sebelum rilis produk!"
              highlightWords={["Panik", "bug", "kritis"]}
              highlightColor={THEME.colors.rose}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </WhipPan>
      </Sequence>

      {/* =========================================================================
          ACT 2: KNEEL DESPAIR AT CRASHED PORTFOLIO (3s - 6s / frames 90 - 90)
          Tata Hirarki 4-Tier:
          - Tier 1 (Top): [ METRIC: PORTFOLIO BALANCE ] (20px)
          - Tier 2 (Hero Stage): Karakter jatuh berlutut di lantai (OTL), hp tergeletak di lantai!
          - Tier 3 (Punch Text): "portofolio ikut anjlok?" (68px tebal)
          - Tier 4 (Subtitle Pill): "Ketika sistem tanpa pengaman otomatis bikin rugi besar!"
          ========================================================================= */}
      <Sequence from={90} durationInFrames={90}>
        <WhipPan type="in" triggerFrame={0} direction="left">
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04} shakeFrame={25} shakeDuration={12}>
            <AuroraMesh mood="tense" />

            {/* TIER 1: CONTEXT TAG (Top 140px) */}
            <div
              style={{
                position: "absolute",
                top: 140,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 40,
              }}
            >
              <span
                style={{
                  fontFamily: THEME.fonts.code,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#ef4444",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                [ BALANCE : -84.2% PLUNGE ]
              </span>
            </div>

            {/* TIER 2: HERO ACTION STAGE (Y: 260px - 1160px / Height: 900px) */}
            <div
              style={{
                position: "absolute",
                top: 260,
                left: 80,
                width: 920,
                height: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
              }}
            >
              <CharacterFigure
                persona="trader"
                emotion="dizzy"
                action="kneel-despair"
                accentColor="#ef4444"
                scale={1.35}
              />
            </div>

            {/* TIER 3: KINETIC PUNCH HEADLINE (Y: 1220px - 1380px) */}
            <div
              style={{
                position: "absolute",
                top: 1220,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0 80px",
                textAlign: "center",
                zIndex: 40,
              }}
            >
              <h1
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  fontFamily: THEME.fonts.sans,
                  margin: 0,
                  letterSpacing: -1,
                }}
              >
                Portofolio Ikut <StabiloHighlight color={THEME.colors.rose}>Anjlok Parah?</StabiloHighlight>
              </h1>
            </div>

            {/* TIER 4: SUBTITLE PILL */}
            <CleanPillSubtitle
              text="Ketika sistem tanpa pengaman otomatis bikin rugi besar!"
              highlightWords={["rugi", "besar!"]}
              highlightColor={THEME.colors.rose}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </WhipPan>
      </Sequence>

      {/* =========================================================================
          ACT 3: MAGNIFYING GLASS INSPECTION (6s - 10s / frames 180 - 120)
          Tata Hirarki 4-Tier:
          - Tier 1 (Top): [ SYSTEM DIAGNOSTIC : AUDIT ] (20px)
          - Tier 2 (Hero Stage): Karakter berdiri tegap mengarahkan kaca pembesar besar!
          - Tier 3 (Punch Text): "bedah sumber masalahnya" (68px tebal)
          - Tier 4 (Subtitle Pill): "Zoom langsung ke baris kode yang menyebabkan kebocoran!"
          Transition: PortalZoom menembus tepat ke tengah lensa kaca pembesar!
          ========================================================================= */}
      <Sequence from={180} durationInFrames={120}>
        <PortalZoom triggerFrame={85} durationFrames={20} originX="56%" originY="45%">
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
            <AuroraMesh mood="curious" />

            {/* TIER 1: CONTEXT TAG (Top 140px) */}
            <div
              style={{
                position: "absolute",
                top: 140,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 40,
              }}
            >
              <span
                style={{
                  fontFamily: THEME.fonts.code,
                  fontSize: 20,
                  fontWeight: 700,
                  color: THEME.colors.cyan,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                [ SYSTEM DIAGNOSTIC : ROOT CAUSE ]
              </span>
            </div>

            {/* TIER 2: HERO ACTION STAGE (Y: 260px - 1160px / Height: 900px) */}
            <div
              style={{
                position: "absolute",
                top: 260,
                left: 80,
                width: 920,
                height: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
              }}
            >
              <CharacterFigure
                persona="scientist"
                emotion="confused"
                action="inspect-magnify"
                accentColor={THEME.colors.cyan}
                scale={1.35}
              />
            </div>

            {/* TIER 3: KINETIC PUNCH HEADLINE (Y: 1220px - 1380px) */}
            <div
              style={{
                position: "absolute",
                top: 1220,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0 80px",
                textAlign: "center",
                zIndex: 40,
              }}
            >
              <h1
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  fontFamily: THEME.fonts.sans,
                  margin: 0,
                  letterSpacing: -1,
                }}
              >
                Bedah Sumber <StabiloHighlight color={THEME.colors.cyan}>Masalahnya</StabiloHighlight>
              </h1>
            </div>

            {/* TIER 4: SUBTITLE PILL */}
            <CleanPillSubtitle
              text="Zoom langsung ke baris kode yang menyebabkan kebocoran!"
              highlightWords={["baris", "kode"]}
              highlightColor={THEME.colors.cyan}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </PortalZoom>
      </Sequence>

      {/* =========================================================================
          ACT 4: THE SOLUTION CODE (10s - 13s / frames 300 - 90)
          Tata Hirarki 4-Tier:
          - Tier 1 (Top): [ IMPLEMENTATION : STABILITY PATTERN ]
          - Tier 2 (Hero Stage): Terminal Kode Circuit Breaker presisi 920px
          - Tier 3 (Punch Text): "pasang circuit breaker"
          - Tier 4 (Subtitle Pill): "Gunakan pola Circuit Breaker untuk menghentikan efek domino!"
          ========================================================================= */}
      <Sequence from={300} durationInFrames={90}>
        <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
          <AuroraMesh mood="solution" />

          {/* TIER 1: CONTEXT TAG (Top 140px) */}
          <div
            style={{
              position: "absolute",
              top: 140,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 40,
            }}
          >
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: 20,
                fontWeight: 700,
                color: THEME.colors.emerald,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              [ SOLUTION : CIRCUIT BREAKER ]
            </span>
          </div>

          {/* TIER 2: HERO ACTION STAGE (Y: 260px - 1160px / Height: 900px) */}
          <div
            style={{
              position: "absolute",
              top: 260,
              left: 80,
              width: 920,
              height: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <div style={{ width: "100%", maxWidth: 880 }}>
              <CodeTerminal
                title="circuitBreaker.ts"
                lines={[
                  { text: "// Pasang auto-circuit breaker", tokens: [{ text: "// Pasang auto-circuit breaker", color: THEME.colors.textMuted }] },
                  { text: "if (failureRate > 0.5) {", isHighlighted: true, tokens: [{ text: "if", color: "#f43f5e" }, { text: " (failureRate > 0.5) {", color: "#f8fafc" }] },
                  { text: "  return fallbackCache.serve();", isHighlighted: true, tokens: [{ text: "  return ", color: "#06b6d4" }, { text: "fallbackCache.serve();", color: "#10b981" }] },
                  { text: "}", tokens: [{ text: "}", color: "#f8fafc" }] },
                ]}
                highlightLineIndex={2}
              />
            </div>
          </div>

          {/* TIER 3: KINETIC PUNCH HEADLINE (Y: 1220px - 1380px) */}
          <div
            style={{
              position: "absolute",
              top: 1220,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0 80px",
              textAlign: "center",
              zIndex: 40,
            }}
          >
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.15,
                fontFamily: THEME.fonts.sans,
                margin: 0,
                letterSpacing: -1,
              }}
            >
              Pasang <StabiloHighlight color={THEME.colors.emerald}>Circuit Breaker</StabiloHighlight>
            </h1>
          </div>

          {/* TIER 4: SUBTITLE PILL */}
          <CleanPillSubtitle
            text="Gunakan pola Circuit Breaker untuk menghentikan efek domino!"
            highlightWords={["Circuit", "Breaker"]}
            highlightColor={THEME.colors.emerald}
            startFrame={15}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>

      {/* =========================================================================
          ACT 5: CELEBRATE VICTORY (13s - 16s / frames 390 - 90)
          Tata Hirarki 4-Tier:
          - Tier 1 (Top): [ STATUS : 100% OPERATIONAL ]
          - Tier 2 (Hero Stage): Karakter melompat kegirangan, kacamata hitam, tangan tinggi (\o/)!
          - Tier 3 (Punch Text): "sistem aman, cuan lancar!"
          - Tier 4 (Subtitle Pill): "Dan itulah kunci rahasia membangun sistem anti-boncos..."
          ========================================================================= */}
      <Sequence from={390} durationInFrames={90}>
        <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
          <AuroraMesh mood="solution" />

          {/* TIER 1: CONTEXT TAG (Top 140px) */}
          <div
            style={{
              position: "absolute",
              top: 140,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 40,
            }}
          >
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: 20,
                fontWeight: 700,
                color: THEME.colors.emerald,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              [ STATUS : 100% OPERATIONAL ✨ ]
            </span>
          </div>

          {/* TIER 2: HERO ACTION STAGE (Y: 260px - 1160px / Height: 900px) */}
          <div
            style={{
              position: "absolute",
              top: 260,
              left: 80,
              width: 920,
              height: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <CharacterFigure
              persona="trader"
              emotion="eureka"
              action="celebrate-victory"
              accentColor={THEME.colors.emerald}
              scale={1.35}
            />
          </div>

          {/* TIER 3: KINETIC PUNCH HEADLINE (Y: 1220px - 1380px) */}
          <div
            style={{
              position: "absolute",
              top: 1220,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0 80px",
              textAlign: "center",
              zIndex: 40,
            }}
          >
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.15,
                fontFamily: THEME.fonts.sans,
                margin: 0,
                letterSpacing: -1,
              }}
            >
              Sistem Aman, <StabiloHighlight color={THEME.colors.emerald}>Cuan Lancar!</StabiloHighlight>
            </h1>
          </div>

          {/* TIER 4: SUBTITLE PILL */}
          <CleanPillSubtitle
            text="Dan itulah kunci rahasia membangun sistem anti-boncos..."
            highlightWords={["kunci", "rahasia"]}
            highlightColor={THEME.colors.emerald}
            startFrame={25}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>
    </AbsoluteFill>
  );
};

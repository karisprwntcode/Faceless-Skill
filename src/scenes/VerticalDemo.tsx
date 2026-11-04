import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { THEME } from "../styles/theme";
import {
  KineticText,
  CodeTerminal,
  StatCounter,
  ProgressBar,
  CleanPillSubtitle,
  BackgroundGrid,
  VirtualCamera,
  CursorPointer,
  MemoryLeakVisualizer,
  TransitionWrapper,
  CharacterFigure,
} from "../components";

/**
 * Vertical 9:16 Technical Educational Motion Graphics
 * Theme: "Bagaimana Memory Leak Menghancurkan Server Kamu"
 * Sized & balanced for 1080x1920 canvas!
 */
export const VerticalDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: THEME.colors.bgCanvas,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Ambient Technical Grid with Breathing Pulse */}
      <BackgroundGrid gridSize={52} opacity={0.1} enableBreathing={true} />

      {/* 2. Top Retention Progress Bar */}
      <ProgressBar color={THEME.colors.cyan} height={8} />

      {/* =========================================================================
          ACT 1: THE HOOK + CHARACTER IN PANIC (0s - 3s / frames 0 - 90)
          ========================================================================= */}
      <Sequence from={0} durationInFrames={90}>
        <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
          <TransitionWrapper exitAtFrame={76} exitMode="blur-disperse">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 60px 140px 60px",
              }}
            >
              <KineticText
                badge="PERFORMANCE BUG"
                title="Kenapa Server Kamu Tiba-Tiba Crash?"
                highlightWords={["Server", "Crash?"]}
                subtitle="Bukan karena DDoS, tapi karena satu baris kode sepele."
                fontSize={64}
              />
              <div style={{ marginTop: 40 }}>
                <CharacterFigure
                  persona="developer"
                  emotion="shocked"
                  action="shrugging"
                  accentColor={THEME.colors.rose}
                  scale={1.3}
                />
              </div>
            </div>
          </TransitionWrapper>
          <CleanPillSubtitle
            text="Ini bahaya tersembunyi yang dinamakan Memory Leak."
            highlightWords={["Memory", "Leak."]}
            highlightColor={THEME.colors.rose}
            startFrame={22}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>

      {/* =========================================================================
          ACT 2: VISUAL METAPHOR + MEMORY LEAK TANK (3s - 7s / frames 90 - 120)
          ========================================================================= */}
      <Sequence from={90} durationInFrames={120}>
        <VirtualCamera zoomFrom={1.0} zoomTo={1.05} shakeFrame={85} shakeDuration={14}>
          <TransitionWrapper exitAtFrame={104} exitMode="slide-down">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 50px 140px 50px",
                gap: 36,
              }}
            >
              <KineticText
                badge="1. ANALOGI VISUAL"
                title="RAM Menumpuk Tanpa Dikosongkan"
                highlightWords={["RAM", "Menumpuk"]}
                fontSize={52}
              />
              <div style={{ width: "100%", maxWidth: 920 }}>
                <MemoryLeakVisualizer startFrame={5} triggerCrashFrame={85} />
              </div>
            </div>
          </TransitionWrapper>
          <CleanPillSubtitle
            text="Event listener yang lupa di-remove terus memakan alokasi heap RAM."
            highlightWords={["Event", "listener"]}
            highlightColor={THEME.colors.amber}
            startFrame={15}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>

      {/* =========================================================================
          ACT 3: CODE SOLUTION & TERMINAL (7s - 11s / frames 210 - 120)
          ========================================================================= */}
      <Sequence from={210} durationInFrames={120}>
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
                padding: "0 50px 140px 50px",
                gap: 36,
              }}
            >
              <KineticText
                badge="2. SOLUSI KODE"
                title="Selalu Cleanup Listener"
                highlightWords={["Cleanup"]}
                fontSize={52}
              />
              <div style={{ width: "100%", maxWidth: 920 }}>
                <CodeTerminal
                  title="connectionPool.ts"
                  lines={[
                    { text: "// SALAH: Listener terus menumpuk di memori", tokens: [{ text: "// SALAH: Listener terus menumpuk di memori", color: THEME.colors.textMuted }] },
                    { text: "socket.on('data', handlePayload);", tokens: [{ text: "socket.on(", color: "#f43f5e" }, { text: "'data', handlePayload);", color: "#f8fafc" }] },
                    { text: "// BENAR: Hapus saat koneksi selesai", tokens: [{ text: "// BENAR: Hapus saat koneksi selesai", color: THEME.colors.textMuted }] },
                    { text: "return () => socket.off('data');", isHighlighted: true, tokens: [{ text: "return () => ", color: "#06b6d4" }, { text: "socket.off('data');", color: "#10b981" }] },
                  ]}
                  highlightLineIndex={3}
                />
              </div>
            </div>
          </TransitionWrapper>

          {/* Virtual Mouse Cursor gliding to the fixed line */}
          <CursorPointer
            startX={200}
            startY={1200}
            targetX={650}
            targetY={1050}
            startFrame={20}
            clickFrame={45}
          />

          <CleanPillSubtitle
            text="Pastikan selalu membersihkan unsubscribe saat koneksi terputus."
            highlightWords={["unsubscribe", "membersihkan"]}
            highlightColor={THEME.colors.emerald}
            startFrame={25}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>

      {/* =========================================================================
          ACT 4: BENCHMARK + EUREKA (11s - 15s / frames 330 - 120)
          ========================================================================= */}
      <Sequence from={330} durationInFrames={120}>
        <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 60px 140px 60px",
              gap: 36,
            }}
          >
            <KineticText
              badge="HASIL SETELAH CLEANUP"
              title="Penggunaan RAM Stabil 24/7"
              highlightWords={["Stabil"]}
              fontSize={56}
            />
            <div style={{ width: "100%", maxWidth: 650 }}>
              <StatCounter
                label="Alokasi Heap Memory"
                from={4096}
                to={380}
                unit="MB"
                prefix="↓ "
                accentColor={THEME.colors.emerald}
                durationFrames={40}
              />
            </div>
            {/* Character celebrating with Eureka Lightbulb */}
            <div style={{ marginTop: 20 }}>
              <CharacterFigure
                persona="developer"
                emotion="eureka"
                action="pointing"
                accentColor={THEME.colors.emerald}
                scale={1.2}
              />
            </div>
          </div>

          {/* The Loop Bridge Subtitle */}
          <CleanPillSubtitle
            text="Dan itulah rahasia utama..."
            highlightWords={["rahasia", "utama..."]}
            highlightColor={THEME.colors.cyan}
            startFrame={50}
            bottomOffset={240}
          />
        </VirtualCamera>
      </Sequence>
    </AbsoluteFill>
  );
};

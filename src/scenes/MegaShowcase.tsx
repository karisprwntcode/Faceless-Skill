import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { THEME } from "../styles/theme";
import {
  FinanceCandlestick,
  CyberMatrix,
  SocialChatSimulator,
  NewspaperHeadline,
  DeviceMockup,
  CleanPillSubtitle,
  ProgressBar,
  VirtualCamera,
  TransitionWrapper,
} from "../components";

export const MegaShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#080c14", position: "relative", overflow: "hidden" }}>
      <ProgressBar color={THEME.colors.cyan} height={8} />

      {/* 1. FINANCE & CRYPTO (0s - 3s / frames 0 - 90) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ background: "#050b14" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <TransitionWrapper exitAtFrame={76} exitMode="blur-disperse">
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 140 }}>
                <FinanceCandlestick />
              </div>
            </TransitionWrapper>
            <CleanPillSubtitle
              text="Gaya Finansial & Trading dengan candlestick dan ticker harga dinamis."
              highlightWords={["Finansial", "Trading"]}
              highlightColor={THEME.colors.emerald}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* 2. CYBERSECURITY & DARK WEB (3s - 7s / frames 90 - 120) */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#030608" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
            <TransitionWrapper exitAtFrame={105} exitMode="slide-down">
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 140 }}>
                <CyberMatrix />
              </div>
            </TransitionWrapper>
            <CleanPillSubtitle
              text="Gaya Cyber Matrix untuk topik hacking, bug bounty, dan keamanan sistem."
              highlightWords={["Cyber", "Matrix"]}
              highlightColor="#10b981"
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* 3. SOCIAL CHAT SIMULATOR (7s - 11s / frames 210 - 120) */}
      <Sequence from={210} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#091014" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <TransitionWrapper exitAtFrame={105} exitMode="blur-disperse">
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 140 }}>
                <SocialChatSimulator />
              </div>
            </TransitionWrapper>
            <CleanPillSubtitle
              text="Gaya Chat WhatsApp untuk studi kasus nyata, drama kantor, atau storytelling."
              highlightWords={["Chat", "WhatsApp"]}
              highlightColor="#22c55e"
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* 4. INVESTIGATIVE NEWSPAPER (11s - 15s / frames 330 - 120) */}
      <Sequence from={330} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#18181b" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.04}>
            <TransitionWrapper exitAtFrame={105} exitMode="pop-down">
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 140 }}>
                <NewspaperHeadline />
              </div>
            </TransitionWrapper>
            <CleanPillSubtitle
              text="Gaya Koran & Investigasi untuk sejarah, skandal teknologi, dan kasus besar."
              variant="solid-black"
              highlightWords={["Investigasi"]}
              highlightColor={THEME.colors.amber}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>

      {/* 5. SMARTPHONE DEVICE MOCKUP (15s - 19s / frames 450 - 120) */}
      <Sequence from={450} durationInFrames={120}>
        <AbsoluteFill style={{ background: "#080c14" }}>
          <VirtualCamera zoomFrom={1.0} zoomTo={1.03}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 140 }}>
              <DeviceMockup />
            </div>
            <CleanPillSubtitle
              text="Gaya Mockup Smartphone untuk review aplikasi mobile, SaaS, dan produk digital."
              highlightWords={["Smartphone", "SaaS"]}
              highlightColor={THEME.colors.cyan}
              startFrame={15}
              bottomOffset={240}
            />
          </VirtualCamera>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

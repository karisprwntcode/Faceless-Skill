import React from "react";
import { Composition } from "remotion";
import { VerticalDemo } from "./scenes/VerticalDemo";
import { HorizontalDemo } from "./scenes/HorizontalDemo";
import { ArchetypeShowcase } from "./scenes/ArchetypeShowcase";
import { MegaShowcase } from "./scenes/MegaShowcase";
import { AdvancedChoreographyDemo } from "./scenes/AdvancedChoreographyDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Master Choreography: Latihan Karakter Dinamis & Match Cut Portal Zoom */}
      <Composition
        id="AdvancedChoreography"
        component={AdvancedChoreographyDemo}
        durationInFrames={480} // 16 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 2. Mega Showcase: 5 Gaya Baru (Crypto, Cyber Matrix, Chat WA, Koran, Mockup HP) */}
      <Composition
        id="MegaShowcase"
        component={MegaShowcase}
        durationInFrames={570} // 19 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 3. Reference Archetypes Showcase: 4 Gaya Asli (Stickman, Radar Bermuda, Infografis, Sains) */}
      <Composition
        id="ArchetypeShowcase"
        component={ArchetypeShowcase}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 4. Technical System Architecture Explainer */}
      <Composition
        id="VerticalExplainer"
        component={VerticalDemo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 5. Horizontal 16:9 YouTube Desktop Explainer */}
      <Composition
        id="HorizontalExplainer"
        component={HorizontalDemo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

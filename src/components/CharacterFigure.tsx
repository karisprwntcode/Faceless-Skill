import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { THEME } from "../styles/theme";

export type PersonaType = "developer" | "trader" | "hacker" | "scientist" | "casual";
export type EmotionType = "neutral" | "confused" | "shocked" | "eureka" | "tired" | "panic" | "dizzy";
export type ActionType =
  | "panic-headgrab"     // Panik memegang kepala saat server crash
  | "kneel-despair"      // Berlutut lemas (OTL) saat portofolio anjlok
  | "inspect-magnify"    // Berdiri tegak mengarahkan kaca pembesar ke target
  | "slumped-laptop"     // Duduk lemas terkulai di depan laptop
  | "celebrate-victory"  // Lompat gembira dengan kacamata hitam dan tangan tinggi (\o/)
  | "running-sprint"     // Berlari kencang menembus angin
  | "shrugging"          // Mengangkat bahu bingung
  | "holding-laptop"     // Memegang laptop
  | "holding-phone"      // Memegang hp
  | "pointing"           // Berdiri menunjuk dengan percaya diri
  | "standing";          // Berdiri santai

interface CharacterFigureProps {
  persona?: PersonaType;
  emotion?: EmotionType;
  action?: ActionType;
  color?: string;
  accentColor?: string;
  scale?: number;
  startFrame?: number;
  showDesk?: boolean;
}

export const CharacterFigure: React.FC<CharacterFigureProps> = ({
  persona = "developer",
  emotion = "panic",
  action = "panic-headgrab",
  color = "#ffffff",
  accentColor = THEME.colors.rose,
  scale = 1.3,
  startFrame = 0,
  showDesk = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const entry = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Action-specific kinematics
  // 1. Shaking panic wobble for headgrab
  const panicShakeX = action === "panic-headgrab" ? Math.sin(relFrame * 1.6) * 5 : 0;
  const panicShakeY = action === "panic-headgrab" ? Math.abs(Math.sin(relFrame * 1.2)) * 6 : 0;

  // 2. Slow breathing slump for despair / laptop
  const slumpBreath = (action === "kneel-despair" || action === "slumped-laptop")
    ? Math.sin((relFrame / 15) * Math.PI) * 4
    : 0;

  // 3. Victory jumping bounce
  const victoryBounce = action === "celebrate-victory"
    ? Math.abs(Math.sin((relFrame / 7) * Math.PI)) * 20
    : 0;

  // 4. Running cycle
  const runPhase = (relFrame % 10) / 10;
  const runSin = Math.sin(runPhase * Math.PI * 2);
  const runCos = Math.cos(runPhase * Math.PI * 2);

  // 5. Lightbulb / Z particles
  const lightbulbY = interpolate(relFrame % 40, [0, 40], [0, -15]);
  const lightbulbOp = interpolate(relFrame % 40, [0, 10, 30, 40], [0, 1, 1, 0]);

  return (
    <div
      style={{
        transform: `scale(${entry * scale}) translateY(${(1 - entry) * 40 - victoryBounce - panicShakeY + slumpBreath}px) translateX(${panicShakeX}px)`,
        opacity: entry,
        position: "relative",
        width: 520,
        height: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        pointerEvents: "none",
      }}
    >
      {/* =========================================================================
          ACTOR SVG STAGE (Height: 440px)
          Thick, clean lines (strokeWidth: 6-7px) matching 34-stickman.mp4
          ========================================================================= */}
      <svg
        width="520"
        height="440"
        viewBox="0 0 520 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ stroke: color, strokeWidth: 6.5, strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        {/* =====================================================================
            POSE 1: PANIC HEADGRAB (Server Crash Panik!)
            Karakter memegang kepala dengan kedua tangan, mulut melotot lebar,
            di depannya laptop memancarkan error merah [500 CRASH]
            ===================================================================== */}
        {action === "panic-headgrab" && (
          <g>
            {/* Ground Horizon Line */}
            <line x1="20" y1="410" x2="500" y2="410" stroke={color} strokeWidth="6" opacity="0.4" />

            {/* Standing Legs with trembling knees */}
            <line x1="230" y1="310" x2="200" y2="410" />
            <line x1="230" y1="310" x2="260" y2="410" />

            {/* Torso */}
            <line x1="230" y1="190" x2="230" y2="310" strokeWidth="7" />

            {/* Head */}
            <circle cx="230" cy="130" r="46" fill="#0b0f19" stroke={color} strokeWidth="6.5" />
            {/* Glasses */}
            <rect x="200" y="115" width="24" height="18" rx="4" stroke={accentColor} strokeWidth="4" fill="none" />
            <rect x="236" y="115" width="24" height="18" rx="4" stroke={accentColor} strokeWidth="4" fill="none" />
            <line x1="224" y1="124" x2="236" y2="124" stroke={accentColor} strokeWidth="4" />

            {/* Wide Open Screaming Mouth */}
            <ellipse cx="230" cy="154" rx="14" ry="16" fill={accentColor} stroke={color} strokeWidth="4" />

            {/* Both Hands Clutched to Head in Panic */}
            <path d="M 230 215 L 180 180 L 195 130" stroke={color} strokeWidth="6.5" fill="none" />
            <circle cx="195" cy="130" r="7" fill={color} />

            <path d="M 230 215 L 280 180 L 265 130" stroke={color} strokeWidth="6.5" fill="none" />
            <circle cx="265" cy="130" r="7" fill={color} />

            {/* Sweat Drops flying from head */}
            <ellipse cx="170" cy="110" rx="4" ry="7" fill={accentColor} stroke="none" transform="rotate(-25 170 110)" />
            <ellipse cx="290" cy="110" rx="4" ry="7" fill={accentColor} stroke="none" transform="rotate(25 290 110)" />

            {/* Broken / Crashed Laptop on Desk to the Right */}
            {showDesk && (
              <g transform="translate(320, 240)">
                {/* Desk Stand */}
                <line x1="0" y1="170" x2="160" y2="170" stroke={color} strokeWidth="5" />
                <line x1="20" y1="170" x2="20" y2="170" stroke={color} strokeWidth="5" />
                {/* Laptop Base */}
                <path d="M 10 135 L 140 135 L 130 150 L 20 150 Z" fill="#1e293b" stroke={color} strokeWidth="5" />
                {/* Laptop Screen with Red Crash Signal */}
                <rect x="25" y="45" width="100" height="90" rx="6" fill="#0f172a" stroke={accentColor} strokeWidth="5" />
                {/* Red X / 500 on Screen */}
                <line x1="55" y1="75" x2="95" y2="105" stroke={accentColor} strokeWidth="6" />
                <line x1="95" y1="75" x2="55" y2="105" stroke={accentColor} strokeWidth="6" />
              </g>
            )}
          </g>
        )}

        {/* =====================================================================
            POSE 2: KNEEL DESPAIR / OTL (Portofolio Anjlok Lemas!)
            Karakter jatuh bertumpu pada lutut di lantai (postur OTL),
            kepala menunduk putus asa, hp tergeletak di lantai dengan layar merah
            ===================================================================== */}
        {action === "kneel-despair" && (
          <g transform="translate(40, 20)">
            {/* Ground Horizon Line */}
            <line x1="-20" y1="390" x2="460" y2="390" stroke={color} strokeWidth="6" opacity="0.4" />

            {/* Bent Kneeling Legs (Paha rebah, betis menjejak lantai) */}
            <path d="M 280 290 L 230 350 L 170 390 L 130 390" stroke={color} strokeWidth="7" fill="none" />
            <path d="M 280 290 L 250 350 L 190 390 L 150 390" stroke={color} strokeWidth="7" fill="none" />

            {/* Slouched Torso leaning forward to the left */}
            <line x1="280" y1="290" x2="180" y2="250" strokeWidth="7.5" />

            {/* Drooping Head hanging low */}
            <circle cx="130" cy="235" r="44" fill="#0b0f19" stroke={color} strokeWidth="6.5" />

            {/* Despair / Sad closed eyes */}
            <line x1="110" y1="230" x2="124" y2="238" stroke={color} strokeWidth="4.5" />
            <line x1="134" y1="238" x2="148" y2="230" stroke={color} strokeWidth="4.5" />
            {/* Sad curved down mouth */}
            <path d="M 118 258 Q 130 248 142 258" stroke={color} strokeWidth="4.5" fill="none" />

            {/* Arms hanging limply down touching the floor */}
            <path d="M 180 250 L 140 330 L 120 390" stroke={color} strokeWidth="6.5" fill="none" />
            <path d="M 180 250 L 160 330 L 140 390" stroke={color} strokeWidth="6.5" fill="none" />

            {/* Dropped Smartphone on the Floor */}
            <g transform="translate(60, 360) rotate(-15)">
              <rect x="0" y="0" width="30" height="50" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="4" />
              <line x1="8" y1="18" x2="22" y2="34" stroke="#ef4444" strokeWidth="3" />
              <line x1="22" y1="18" x2="8" y2="34" stroke="#ef4444" strokeWidth="3" />
            </g>

            {/* Floating Dizzy Spiral over head */}
            <path
              d="M 125 160 Q 140 160 140 175 Q 140 190 125 190 Q 110 190 110 175"
              stroke="#ef4444"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
            />
          </g>
        )}

        {/* =====================================================================
            POSE 3: INSPECT WITH MAGNIFYING GLASS (Bedah Solusi Teliti)
            Karakter berdiri tegap, tangan kanan mengacungkan kaca pembesar besar
            langsung ke arah papan target, tangan kiri di pinggang penuh selidik
            ===================================================================== */}
        {action === "inspect-magnify" && (
          <g transform="translate(30, 0)">
            {/* Ground Horizon Line */}
            <line x1="0" y1="410" x2="480" y2="410" stroke={color} strokeWidth="6" opacity="0.4" />

            {/* Standing Legs */}
            <line x1="200" y1="300" x2="165" y2="410" strokeWidth="6.5" />
            <line x1="200" y1="300" x2="235" y2="410" strokeWidth="6.5" />

            {/* Torso leaning forward slightly */}
            <line x1="200" y1="300" x2="215" y2="180" strokeWidth="7" />

            {/* Head with Focused Eyes */}
            <circle cx="225" cy="120" r="44" fill="#0b0f19" stroke={color} strokeWidth="6.5" />
            {/* Glasses */}
            <rect x="205" y="105" width="22" height="18" rx="4" stroke={accentColor} strokeWidth="4" fill="none" />
            <rect x="235" y="105" width="22" height="18" rx="4" stroke={accentColor} strokeWidth="4" fill="none" />
            <line x1="227" y1="114" x2="235" y2="114" stroke={accentColor} strokeWidth="4" />
            {/* Focused mouth */}
            <ellipse cx="230" cy="144" rx="5" ry="6" stroke={color} strokeWidth="3.5" fill="none" />

            {/* Left Arm on Hip */}
            <path d="M 215 200 L 170 230 L 195 265" stroke={color} strokeWidth="6.5" fill="none" />

            {/* Right Arm extended holding Giant Magnifying Glass */}
            <path d="M 215 200 L 290 200 L 330 170" stroke={color} strokeWidth="6.5" fill="none" />

            {/* Magnifying Glass Handle */}
            <line x1="330" y1="170" x2="365" y2="140" stroke={accentColor} strokeWidth="8" />

            {/* Giant Optical Lens (Radius 42px!) */}
            <circle cx="395" cy="115" r="44" stroke={accentColor} strokeWidth="6.5" fill="rgba(6, 182, 212, 0.15)" />
            {/* Lens Reflection Arc */}
            <path d="M 370 100 A 32 32 0 0 1 415 85" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.8" />
            {/* Precision Crosshair Target inside Lens */}
            <line x1="395" y1="92" x2="395" y2="138" stroke={accentColor} strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="372" y1="115" x2="418" y2="115" stroke={accentColor} strokeWidth="2.5" strokeDasharray="4 4" />
            <circle cx="395" cy="115" r="5" fill={accentColor} />
          </g>
        )}

        {/* =====================================================================
            POSE 4: SLUMPED LAPTOP (Kerja Seharian di Laptop / Lelah Mental)
            Persis seperti 34-stickman.mp4 f1: Menempel di meja laptop,
            punggung membungkuk lelah, z z z melayang
            ===================================================================== */}
        {action === "slumped-laptop" && (
          <g transform="translate(50, 0)">
            {/* Horizon Desk / Floor Line */}
            <line x1="-30" y1="390" x2="450" y2="390" stroke={color} strokeWidth="6" opacity="0.4" />

            {/* Legs */}
            <line x1="170" y1="280" x2="130" y2="390" strokeWidth="6.5" />
            <line x1="170" y1="280" x2="185" y2="390" strokeWidth="6.5" />

            {/* Hunched Torso leaning toward laptop */}
            <line x1="170" y1="280" x2="190" y2="160" strokeWidth="7" />

            {/* Tired Drooping Head */}
            <circle cx="190" cy="105" r="44" fill="#0b0f19" stroke={color} strokeWidth="6.5" />
            {/* Droopy Eyes */}
            <line x1="175" y1="100" x2="185" y2="100" stroke={color} strokeWidth="5" />
            <line x1="195" y1="100" x2="205" y2="100" stroke={color} strokeWidth="5" />
            {/* Sad tired mouth */}
            <path d="M 180 125 Q 190 115 200 125" stroke={color} strokeWidth="4.5" fill="none" />

            {/* Arms resting on laptop keyboard */}
            <line x1="190" y1="180" x2="230" y2="210" strokeWidth="6.5" />
            <line x1="190" y1="195" x2="230" y2="230" strokeWidth="6.5" />

            {/* Laptop Base */}
            <path d="M 200 230 L 350 230 L 330 250 L 220 250 Z" fill="#1e293b" stroke={color} strokeWidth="5" />
            {/* Laptop Open Screen */}
            <rect x="235" y="115" width="115" height="115" rx="6" fill="#0f172a" stroke={color} strokeWidth="5" />

            {/* Floating z z Z sleep particles */}
            <g transform="translate(190, 30)">
              <text x="0" y="0" fill={THEME.colors.textMuted} fontSize="28" fontWeight="900" fontFamily={THEME.fonts.sans}>
                z
              </text>
              <text x="20" y="-20" fill={THEME.colors.textMuted} fontSize="38" fontWeight="900" fontFamily={THEME.fonts.sans}>
                Z
              </text>
            </g>
          </g>
        )}

        {/* =====================================================================
            POSE 5: CELEBRATE VICTORY (Sistem Aman, Cuan Mengalir!)
            Karakter melompat gembira, kedua tangan diangkat tinggi (\o/),
            kacamata hitam keren dengan garis kilau, senyum lebar
            ===================================================================== */}
        {action === "celebrate-victory" && (
          <g transform="translate(50, 0)">
            {/* Podium Base Line */}
            <line x1="-30" y1="410" x2="450" y2="410" stroke={THEME.colors.emerald} strokeWidth="6" opacity="0.5" />

            {/* Wide Confident Legs jumping off ground */}
            <line x1="210" y1="280" x2="160" y2="390" strokeWidth="7" />
            <line x1="210" y1="280" x2="260" y2="390" strokeWidth="7" />

            {/* Upright Strong Torso */}
            <line x1="210" y1="280" x2="210" y2="160" strokeWidth="7.5" />

            {/* Head with Cool Sunglasses */}
            <circle cx="210" cy="100" r="46" fill="#0b0f19" stroke={color} strokeWidth="6.5" />

            {/* Sunglasses with Glint */}
            <g>
              <path d="M 175 90 L 205 90 L 200 108 L 180 108 Z" fill="#10b981" stroke="#10b981" strokeWidth="3" />
              <path d="M 215 90 L 245 90 L 240 108 L 220 108 Z" fill="#10b981" stroke="#10b981" strokeWidth="3" />
              <line x1="205" y1="98" x2="215" y2="98" stroke="#10b981" strokeWidth="3" />
              {/* White Glint Lines on lenses */}
              <line x1="182" y1="93" x2="194" y2="105" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="222" y1="93" x2="234" y2="105" stroke="#ffffff" strokeWidth="2.5" />
            </g>

            {/* Happy Victorious Smile */}
            <path d="M 195 122 Q 210 138 225 122" stroke={THEME.colors.emerald} strokeWidth="5" fill="none" />

            {/* Both Arms Raised High in Triumph (\o/) */}
            <path d="M 210 170 L 140 110 L 110 80" stroke={THEME.colors.emerald} strokeWidth="7" fill="none" />
            <circle cx="110" cy="80" r="8" fill={THEME.colors.emerald} />

            <path d="M 210 170 L 280 110 L 310 80" stroke={THEME.colors.emerald} strokeWidth="7" fill="none" />
            <circle cx="310" cy="80" r="8" fill={THEME.colors.emerald} />

            {/* Victory Lightbulb / Checkmark overhead */}
            <g transform="translate(190, 10)">
              <circle cx="20" cy="0" r="18" fill="rgba(16, 185, 129, 0.2)" stroke={THEME.colors.emerald} strokeWidth="3" />
              <path d="M 12 0 L 18 6 L 28 -6" stroke={THEME.colors.emerald} strokeWidth="4" fill="none" />
            </g>
          </g>
        )}
        {/* =====================================================================
            POSE 6: STANDING / SHRUGGING / POINTING / HOLDING LAPTOP (DEFAULT)
            ===================================================================== */}
        {(action === "standing" || action === "shrugging" || action === "pointing" || action === "holding-laptop" || action === "holding-phone" || action === "running-sprint") && (
          <g transform="translate(50, 0)">
            <line x1="-30" y1="410" x2="450" y2="410" stroke={color} strokeWidth="6" opacity="0.4" />
            <line x1="210" y1="290" x2="175" y2="410" strokeWidth="6.5" />
            <line x1="210" y1="290" x2="245" y2="410" strokeWidth="6.5" />
            <line x1="210" y1="290" x2="210" y2="170" strokeWidth="7" />
            <circle cx="210" cy="115" r="44" fill="#0b0f19" stroke={color} strokeWidth="6.5" />
            
            {/* Expression */}
            <circle cx="196" cy="112" r="5" fill={color} />
            <circle cx="224" cy="112" r="5" fill={color} />
            <path d="M 200 132 Q 210 140 220 132" stroke={color} strokeWidth="4" fill="none" />

            {action === "shrugging" ? (
              <>
                <path d="M 210 190 L 160 170 L 140 190" stroke={color} strokeWidth="6.5" fill="none" />
                <path d="M 210 190 L 260 170 L 280 190" stroke={color} strokeWidth="6.5" fill="none" />
              </>
            ) : action === "pointing" ? (
              <>
                <line x1="210" y1="190" x2="165" y2="240" strokeWidth="6.5" />
                <line x1="210" y1="190" x2="310" y2="160" stroke={accentColor} strokeWidth="7" />
                <circle cx="310" cy="160" r="6" fill={accentColor} />
              </>
            ) : action === "holding-laptop" ? (
              <>
                <line x1="210" y1="190" x2="250" y2="220" strokeWidth="6.5" />
                <line x1="210" y1="205" x2="250" y2="235" strokeWidth="6.5" />
                <rect x="250" y="145" width="95" height="85" rx="6" fill="#0f172a" stroke={accentColor} strokeWidth="5" />
                <path d="M 235 230 L 360 230 L 345 245 L 250 245 Z" fill="#1e293b" stroke={accentColor} strokeWidth="5" />
              </>
            ) : (
              <>
                <line x1="210" y1="190" x2="170" y2="245" strokeWidth="6.5" />
                <line x1="210" y1="190" x2="250" y2="245" strokeWidth="6.5" />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

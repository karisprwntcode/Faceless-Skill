import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

export const CyberMatrix: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const entry = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Matrix Scramble effect on the decrypted string
  const targetWord = "SYSTEM COMPROMISED: CRITICAL RCE";
  const scrambleProgress = Math.min(1, relFrame / 40);
  const revealedLength = Math.floor(scrambleProgress * targetWord.length);

  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  const scrambledText = targetWord
    .split("")
    .map((char, i) => {
      if (i < revealedLength) return char;
      return glitchChars[Math.floor(Math.sin(frame * 10 + i) * 10 + 10) % glitchChars.length];
    })
    .join("");

  return (
    <div
      style={{
        transform: `scale(${entry})`,
        opacity: entry,
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        background: "#030708",
        border: "1.5px solid #10b981",
        borderRadius: 24,
        padding: "36px 44px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(16, 185, 129, 0.25)",
        fontFamily: THEME.fonts.code,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Matrix Rain Simulation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          fontSize: 16,
          color: "#10b981",
          lineHeight: 1.3,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        01010100 01100101 01110011 01110100 00100000 01010010 01100101 01100100 01101001 01110011 01101111 01110110
        01000001 01010000 01001001 00100000 01000111 01100001 01110100 01100101 01111001 00100000 01110011 01111001
        01010011 01010001 01001100 00100000 01001001 01101110 01101010 01100101 01100011 01110100 01101001 01101111
      </div>

      {/* Terminal Title Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid rgba(16, 185, 129, 0.35)", paddingBottom: 16, marginBottom: 28 }}>
        <div style={{ color: "#10b981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
          ROOT@FRAMEWORK:~# nmap -sV -p 443 192.168.1.104
        </div>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 14px #ef4444" }} />
      </div>

      {/* Scanning Target Details */}
      <div style={{ fontSize: 24, color: "#94a3b8", lineHeight: 2 }}>
        <div>[+] Target Host: <span style={{ color: "#fff", fontWeight: 700 }}>192.168.1.104</span></div>
        <div>[+] Port 443/TCP: <span style={{ color: "#10b981", fontWeight: 700 }}>OPEN (OpenSSL 1.1.1)</span></div>
        <div>[!] Vulnerability: <span style={{ color: "#f43f5e", fontWeight: 800 }}>CVE-2024-38812 Remote Code Execution</span></div>
      </div>

      {/* Scrambled Decryption Alert Banner */}
      <div
        style={{
          marginTop: 32,
          padding: "22px",
          background: "rgba(244, 63, 94, 0.15)",
          border: "2px solid #f43f5e",
          borderRadius: 12,
          textAlign: "center",
          color: "#f43f5e",
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 3,
          textShadow: "0 0 25px rgba(244, 63, 94, 0.6)",
        }}
      >
        {scrambledText}
      </div>
    </div>
  );
};

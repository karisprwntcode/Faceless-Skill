import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface ChatMessage {
  sender: "user" | "client";
  text: string;
  time: string;
  delayFrame: number;
}

export const SocialChatSimulator: React.FC<{ startFrame?: number }> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const containerEntry = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 140 },
  });

  const messages: ChatMessage[] = [
    { sender: "client", text: "Bro, website down lagi! Server crash jam 2 pagi 😭", time: "02:14", delayFrame: 5 },
    { sender: "user", text: "Tenang, lagi gue cek... Bentar ya.", time: "02:15", delayFrame: 35 },
    { sender: "user", text: "Ketemu! Ada memory leak di websocket listener.", time: "02:16", delayFrame: 65 },
  ];

  return (
    <div
      style={{
        transform: `scale(${containerEntry})`,
        opacity: containerEntry,
        width: "100%",
        maxWidth: 880,
        margin: "0 auto",
        background: "#0c1317",
        border: "1.5px solid #1f2c34",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 30px 70px rgba(0,0,0,0.9)",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Mobile Chat Header */}
      <div
        style={{
          background: "#1f2c34",
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 18,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 900,
            fontSize: 22,
          }}
        >
          CEO
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Pak Bos (Urgent)</div>
          <div style={{ fontSize: 16, color: "#22c55e", fontWeight: 600, marginTop: 2 }}>Online</div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20, minHeight: 380 }}>
        {messages.map((msg, idx) => {
          const msgSpring = spring({
            frame: relFrame - msg.delayFrame,
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 150 },
          });

          if (relFrame < msg.delayFrame) return null;

          const isUser = msg.sender === "user";

          return (
            <div
              key={idx}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "82%",
                transform: `scale(${msgSpring}) translateY(${(1 - msgSpring) * 15}px)`,
                opacity: msgSpring,
                background: isUser ? "#005c4b" : "#202c33",
                color: "#e9edef",
                padding: "16px 24px",
                borderRadius: isUser ? "22px 22px 6px 22px" : "22px 22px 22px 6px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ fontSize: 24, lineHeight: 1.45, fontWeight: 500 }}>{msg.text}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "right", marginTop: 6, fontWeight: 500 }}>
                {msg.time} {isUser && <span style={{ color: "#53bdeb", marginLeft: 4 }}>✓✓</span>}
              </div>
            </div>
          );
        })}

        {/* Animated Typing Indicator Bubble */}
        {relFrame >= 20 && relFrame < 35 && (
          <div
            style={{
              alignSelf: "flex-end",
              background: "#005c4b",
              padding: "14px 24px",
              borderRadius: "20px 20px 6px 20px",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", opacity: 0.6 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", opacity: 0.3 }} />
          </div>
        )}
      </div>
    </div>
  );
};

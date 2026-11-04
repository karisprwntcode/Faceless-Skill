export const THEME = {
  colors: {
    // Canvas & Surfaces (Dramatic Slate Noir)
    bgCanvas: "#080c14",
    bgCard: "#0f172a",
    bgCardHover: "#1e293b",
    bgPill: "rgba(15, 23, 42, 0.85)",
    
    // Borders (Micro-borders)
    border: "#1e293b",
    borderMuted: "rgba(255, 255, 255, 0.08)",
    borderBright: "#334155",
    
    // Typography
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    
    // Logic & Semantic Accents
    cyan: "#06b6d4",           // Data flow, network, API
    cyanGlow: "rgba(6, 182, 212, 0.3)",
    emerald: "#10b981",        // Solutions, success, optimization
    emeraldGlow: "rgba(16, 185, 129, 0.3)",
    rose: "#f43f5e",           // Problems, bottlenecks, bugs, old way
    roseGlow: "rgba(244, 63, 94, 0.3)",
    violet: "#8b5cf6",         // Logic, database, compute, memory
    violetGlow: "rgba(139, 92, 246, 0.3)",
    amber: "#fbbf24",          // Warning, highlighters, focus points
  },
  
  // Spring Physics Presets
  physics: {
    // Playful & Snappy: Cepat meluncur, membal lentur 1-2 kali, lalu mengunci mantap
    playful: {
      damping: 11,
      mass: 0.7,
      stiffness: 150,
    },
    // Stiff & Crisp (untuk cursor, indicator, progress)
    crisp: {
      damping: 15,
      mass: 0.5,
      stiffness: 170,
    },
    // Smooth Glide (untuk subtitle dan fade transisi)
    smooth: {
      damping: 18,
      mass: 0.8,
      stiffness: 100,
    },
  },

  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
    code: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
};

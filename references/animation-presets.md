# Animation & Motion Physics Presets

Use these Remotion physics curves to make animations feel snappy, dynamic, and professional.

## 1. Spring Physics Presets

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Preset A: Snappy Card / Terminal Pop-in (Best for UI Cards, Windows, Badges)
const snappySpring = spring({
  frame,
  fps,
  config: {
    damping: 14,     // Prevents excessive oscillation
    mass: 0.6,       // Light and responsive
    stiffness: 140,  // Quick launch
  },
});

// Preset B: Bouncy Alert / Counter Notification (For warnings, hooks, key numbers)
const bouncySpring = spring({
  frame,
  fps,
  config: {
    damping: 10,     // Allows 1-2 noticeable bounces
    mass: 0.8,
    stiffness: 160,
  },
});

// Preset C: Gentle Floating Drift (For background nodes, ambient glow)
const float = Math.sin((frame / 30) * Math.PI) * 12;
```

## 2. Text Reveal Interpolation

```tsx
// Staggered word or line reveal
const lineOpacity = (index: number) => {
  return interpolate(frame - (index * 6), [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const lineTranslateY = (index: number) => {
  return interpolate(frame - (index * 6), [0, 10], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
```

## 3. Highlighting Pulse Effect

```tsx
// Active pulse effect around architecture nodes or crucial code lines
const pulseScale = 1 + Math.sin((frame / 8) * Math.PI) * 0.05;
const pulseGlow = Math.sin((frame / 8) * Math.PI) * 10 + 15;
// boxShadow: `0 0 ${pulseGlow}px rgba(6, 182, 212, 0.6)`
```


# Camera Dynamics, Transitions & Micro-Interactions

## 1. Virtual Camera Choreography
Flat vector design feels static if the camera is completely motionless. Use `<VirtualCamera />`:

- **Subtle Continuous Zoom (Breathing Camera)**:
  - Scale from `1.0` to `1.04` over the sequence duration.
  - Adds unconscious forward momentum, pulling the viewer's eyes toward the focal point.
- **Impact / Error Shake**:
  - Used during crashes, exceptions, or dramatic problem reveals.
  - Frequency: Decay over 12–15 frames with decaying amplitude (`Math.sin(rel * 2.8) * decay`).
- **Focus Shift**:
  - When explaining a specific line of code or architecture node, slightly blur or dim surrounding elements with an atmospheric spotlight mask.

---

## 2. Exit Transitions (Dispersion Methods)
Never let elements cut off jarringly. Use `<TransitionWrapper />` with one of the following exit modes:

1. **`blur-disperse`**:
   - The element scales up slightly (`1.0 -> 1.12`) while blurring (`0px -> 20px`) and fading out.
   - Gives a holographic evaporation feel.
2. **`slide-down`**:
   - Drops with spring gravity into the floor (`translateY +80px`).
3. **`slide-left`**:
   - Glides leftwards as the next scene enters from the right.
4. **`pop-down`**:
   - Snappy scale reduction (`1.0 -> 0.7`) and quick snap out.

---

## 3. Micro-Interactions
- **Virtual Cursor Pointer (`<CursorPointer />`)**:
  - Guides viewer attention before a major UI action.
  - Glides across the screen, pauses over a button or code line, dips down with a click scale, and emits a glowing cyan click ripple wave.
- **Ambient Breathing Grid (`<BackgroundGrid />`)**:
  - Technical grid pattern (`48px`) with subtle breathing opacity pulse (`0.09` to `0.15`).

---

## 4. The Seamless Loop Formula (Shorts/Reels 100%+ Retention)
To trick algorithmic retention into exceeding 100%:
- **Ending Sentence (Last 3 seconds)**: Do not say "Sampai jumpa" or "Jangan lupa follow".
  - *Example Ending*: *"Dan itulah alasan terbesar..."*
- **Opening Sentence (First 2 seconds)**:
  - *Example Beginning*: *"...kenapa aplikasi kamu sering mendadak lemot!"*
- The final phrase syntactically bridges straight into the first sentence when looped by TikTok/Reels!


/**
 * Audio Synchronization & Timeline Calculator
 * Standard Conversational Pacing: ~140-150 Words Per Minute (WPM)
 * 1 Word = ~0.42 seconds = ~12.5 frames at 30fps
 */

export interface ScriptAct {
  actName: string;
  text: string;
  minDurationSec?: number;
}

export interface CalculatedTimeline {
  actName: string;
  fromFrame: number;
  durationInFrames: number;
  toFrame: number;
  wordCount: number;
}

/**
 * Automatically calculates exact frame allocations per scene based on text length.
 */
export function calculateTimeline(
  acts: ScriptAct[],
  fps: number = 30,
  wordsPerSecond: number = 2.4
): CalculatedTimeline[] {
  let currentFrame = 0;

  return acts.map((act) => {
    const words = act.text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Estimated speech duration in seconds
    const speechDurationSec = Math.max(
      act.minDurationSec || 2.5,
      wordCount / wordsPerSecond
    );

    // Padding for visual breathe & transition (0.5s)
    const totalDurationFrames = Math.round((speechDurationSec + 0.5) * fps);

    const fromFrame = currentFrame;
    const durationInFrames = totalDurationFrames;
    const toFrame = currentFrame + durationInFrames;

    currentFrame = toFrame;

    return {
      actName: act.actName,
      fromFrame,
      durationInFrames,
      toFrame,
      wordCount,
    };
  });
}

/**
 * Dynamic Audio Ducking Formula for Remotion <Audio /> component
 * Lowers BGM volume when voiceover is speaking, swells during scene transitions.
 */
export function getBgmVolume(
  currentFrame: number,
  speechIntervals: [number, number][],
  duckedVolume: number = 0.08, // -22dB
  swellVolume: number = 0.26   // -12dB
): number {
  const isSpeaking = speechIntervals.some(
    ([start, end]) => currentFrame >= start && currentFrame <= end
  );

  return isSpeaking ? duckedVolume : swellVolume;
}


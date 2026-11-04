import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type ExitMode = "blur-disperse" | "slide-down" | "slide-left" | "pop-down";

interface TransitionWrapperProps {
  children: React.ReactNode;
  exitAtFrame?: number;
  exitDuration?: number;
  exitMode?: ExitMode;
}

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  exitAtFrame,
  exitDuration = 14,
  exitMode = "blur-disperse",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If exit hasn't started yet, render normally
  if (exitAtFrame === undefined || frame < exitAtFrame) {
    return <>{children}</>;
  }

  const relExit = frame - exitAtFrame;
  const exitProgress = interpolate(relExit, [0, exitDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitSpring = spring({
    frame: relExit,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  let transform = "none";
  let opacity = 1 - exitProgress;
  let filter = "none";

  switch (exitMode) {
    case "blur-disperse":
      // Expanding and blurring into the air
      transform = `scale(${1 + exitProgress * 0.12})`;
      filter = `blur(${exitProgress * 20}px)`;
      break;

    case "slide-down":
      transform = `translateY(${exitSpring * 80}px)`;
      break;

    case "slide-left":
      transform = `translateX(${-exitSpring * 120}px)`;
      break;

    case "pop-down":
      transform = `scale(${1 - exitSpring * 0.3})`;
      break;
  }

  return (
    <div
      style={{
        transform,
        opacity,
        filter,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};


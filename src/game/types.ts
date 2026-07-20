export interface Size {
  width: number;
  height: number;
}

export interface Vector2 {
  x: number;
  y: number;
}

export type GamePhase = "running";

export interface GameTiming {
  frame: number;
  elapsedSeconds: number;
  deltaSeconds: number;
}

export interface GameState {
  field: Size;
  phase: GamePhase;
  timing: GameTiming;
}

export interface FrameStep {
  deltaSeconds: number;
  timestampSeconds: number;
}

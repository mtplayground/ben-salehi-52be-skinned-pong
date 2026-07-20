export interface Size {
  width: number;
  height: number;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Paddle {
  position: Vector2;
  size: Size;
}

export interface Ball {
  position: Vector2;
  radius: number;
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
  player: Paddle;
  opponent: Paddle;
  ball: Ball;
}

export interface FrameStep {
  deltaSeconds: number;
  timestampSeconds: number;
}

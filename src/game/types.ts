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
  velocity: Vector2;
  radius: number;
}

export interface InputState {
  up: boolean;
  down: boolean;
}

export type PlayerSide = "player" | "opponent";
export type GamePhase = "running" | "match-over";

export interface Score {
  player: number;
  opponent: number;
}

export interface GameTiming {
  frame: number;
  elapsedSeconds: number;
  deltaSeconds: number;
}

export interface GameState {
  field: Size;
  phase: GamePhase;
  timing: GameTiming;
  score: Score;
  winner: PlayerSide | null;
  player: Paddle;
  opponent: Paddle;
  ball: Ball;
}

export interface FrameStep {
  deltaSeconds: number;
  timestampSeconds: number;
}

import { BALL_RADIUS, PADDLE_EDGE_OFFSET, PADDLE_SIZE } from "./constants";
import type { FrameStep, GameState, Size } from "./types";

export function createInitialGameState(field: Size): GameState {
  const paddleY = (field.height - PADDLE_SIZE.height) / 2;

  return {
    field: { ...field },
    phase: "running",
    timing: {
      frame: 0,
      elapsedSeconds: 0,
      deltaSeconds: 0,
    },
    player: {
      position: {
        x: PADDLE_EDGE_OFFSET,
        y: paddleY,
      },
      size: { ...PADDLE_SIZE },
    },
    opponent: {
      position: {
        x: field.width - PADDLE_EDGE_OFFSET - PADDLE_SIZE.width,
        y: paddleY,
      },
      size: { ...PADDLE_SIZE },
    },
    ball: {
      position: {
        x: field.width / 2,
        y: field.height / 2,
      },
      radius: BALL_RADIUS,
    },
  };
}

export function updateGameState(state: GameState, step: FrameStep): void {
  state.timing.frame += 1;
  state.timing.deltaSeconds = step.deltaSeconds;
  state.timing.elapsedSeconds += step.deltaSeconds;
}

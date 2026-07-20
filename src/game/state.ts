import {
  BALL_RADIUS,
  FIELD_BORDER_INSET,
  PADDLE_EDGE_OFFSET,
  PADDLE_SIZE,
  PLAYER_PADDLE_SPEED,
} from "./constants";
import type { FrameStep, GameState, InputState, Size } from "./types";

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

export function updateGameState(
  state: GameState,
  step: FrameStep,
  input: InputState,
): void {
  state.timing.frame += 1;
  state.timing.deltaSeconds = step.deltaSeconds;
  state.timing.elapsedSeconds += step.deltaSeconds;

  updatePlayerPaddle(state, step.deltaSeconds, input);
}

function updatePlayerPaddle(
  state: GameState,
  deltaSeconds: number,
  input: InputState,
): void {
  const direction = Number(input.down) - Number(input.up);

  if (direction === 0) {
    return;
  }

  const minY = FIELD_BORDER_INSET;
  const maxY = state.field.height - FIELD_BORDER_INSET - state.player.size.height;
  const nextY =
    state.player.position.y + direction * PLAYER_PADDLE_SPEED * deltaSeconds;

  state.player.position.y = clamp(nextY, minY, maxY);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

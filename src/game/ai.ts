import {
  AI_PADDLE_SPEED,
  AI_REACTION_LAG_SECONDS,
  AI_RECENTER_SPEED_RATIO,
  AI_TRACKING_DEAD_ZONE,
  FIELD_BORDER_INSET,
} from "./constants";
import type { GameState } from "./types";

export function updateOpponentPaddle(
  state: GameState,
  deltaSeconds: number,
): void {
  const targetCenterY = getTargetCenterY(state);
  const paddleCenterY =
    state.opponent.position.y + state.opponent.size.height / 2;
  const distance = targetCenterY - paddleCenterY;

  if (Math.abs(distance) <= AI_TRACKING_DEAD_ZONE) {
    return;
  }

  const speed =
    state.ball.velocity.x > 0
      ? AI_PADDLE_SPEED
      : AI_PADDLE_SPEED * AI_RECENTER_SPEED_RATIO;
  const maxStep = speed * deltaSeconds;
  const step = clamp(distance, -maxStep, maxStep);
  const minY = FIELD_BORDER_INSET;
  const maxY =
    state.field.height - FIELD_BORDER_INSET - state.opponent.size.height;

  state.opponent.position.y = clamp(
    state.opponent.position.y + step,
    minY,
    maxY,
  );
}

function getTargetCenterY(state: GameState): number {
  if (state.ball.velocity.x <= 0) {
    return state.field.height / 2;
  }

  return state.ball.position.y - state.ball.velocity.y * AI_REACTION_LAG_SECONDS;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

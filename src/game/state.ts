import type { FrameStep, GameState, Size } from "./types";

export function createInitialGameState(field: Size): GameState {
  return {
    field: { ...field },
    phase: "running",
    timing: {
      frame: 0,
      elapsedSeconds: 0,
      deltaSeconds: 0,
    },
  };
}

export function updateGameState(state: GameState, step: FrameStep): void {
  state.timing.frame += 1;
  state.timing.deltaSeconds = step.deltaSeconds;
  state.timing.elapsedSeconds += step.deltaSeconds;
}

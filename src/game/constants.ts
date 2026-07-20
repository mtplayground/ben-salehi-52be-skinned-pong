import type { Size } from "./types";

export const FIELD_SIZE: Size = {
  width: 1280,
  height: 720,
};

export const FIELD_BORDER_INSET = 28;

export const PADDLE_SIZE: Size = {
  width: 22,
  height: 132,
};

export const PADDLE_EDGE_OFFSET = 72;
export const PLAYER_PADDLE_SPEED = 560;
export const AI_PADDLE_SPEED = 430;
export const AI_RECENTER_SPEED_RATIO = 0.55;
export const AI_REACTION_LAG_SECONDS = 0.14;
export const AI_TRACKING_DEAD_ZONE = 12;
export const BALL_RADIUS = 13;
export const BALL_SPEED = 520;
export const BALL_INITIAL_VERTICAL_SPEED_RATIO = 0.2;
export const BALL_MAX_BOUNCE_ANGLE = Math.PI / 3;

import {
  BALL_INITIAL_VERTICAL_SPEED_RATIO,
  BALL_MAX_BOUNCE_ANGLE,
  BALL_SPEED,
  FIELD_BORDER_INSET,
} from "./constants";
import type { Ball, GameState, Paddle, Size, Vector2 } from "./types";

export function createServeVelocity(
  horizontalDirection: -1 | 1,
  verticalDirection: -1 | 1 = 1,
): Vector2 {
  return {
    x: horizontalDirection * BALL_SPEED,
    y: verticalDirection * BALL_SPEED * BALL_INITIAL_VERTICAL_SPEED_RATIO,
  };
}

export function updateBallPhysics(state: GameState, deltaSeconds: number): void {
  state.ball.position.x += state.ball.velocity.x * deltaSeconds;
  state.ball.position.y += state.ball.velocity.y * deltaSeconds;

  bounceOffHorizontalWalls(state.ball, state.field);
  bounceOffPaddle(state.ball, state.player, 1);
  bounceOffPaddle(state.ball, state.opponent, -1);
  resetAfterPoint(state.ball, state.field);
}

function bounceOffHorizontalWalls(ball: Ball, field: Size): void {
  const top = FIELD_BORDER_INSET + ball.radius;
  const bottom = field.height - FIELD_BORDER_INSET - ball.radius;

  if (ball.position.y <= top) {
    ball.position.y = top;
    ball.velocity.y = Math.abs(ball.velocity.y);
  }

  if (ball.position.y >= bottom) {
    ball.position.y = bottom;
    ball.velocity.y = -Math.abs(ball.velocity.y);
  }
}

function bounceOffPaddle(
  ball: Ball,
  paddle: Paddle,
  horizontalDirection: -1 | 1,
): void {
  const movingTowardPaddle =
    horizontalDirection > 0 ? ball.velocity.x < 0 : ball.velocity.x > 0;

  if (!movingTowardPaddle || !intersectsPaddle(ball, paddle)) {
    return;
  }

  const paddleCenterY = paddle.position.y + paddle.size.height / 2;
  const hitOffset = clamp(
    (ball.position.y - paddleCenterY) / (paddle.size.height / 2),
    -1,
    1,
  );
  const bounceAngle = hitOffset * BALL_MAX_BOUNCE_ANGLE;
  const speed = Math.hypot(ball.velocity.x, ball.velocity.y);

  ball.velocity.x = horizontalDirection * speed * Math.cos(bounceAngle);
  ball.velocity.y = speed * Math.sin(bounceAngle);

  if (horizontalDirection > 0) {
    ball.position.x = paddle.position.x + paddle.size.width + ball.radius;
  } else {
    ball.position.x = paddle.position.x - ball.radius;
  }
}

function intersectsPaddle(ball: Ball, paddle: Paddle): boolean {
  return (
    ball.position.x + ball.radius >= paddle.position.x &&
    ball.position.x - ball.radius <= paddle.position.x + paddle.size.width &&
    ball.position.y + ball.radius >= paddle.position.y &&
    ball.position.y - ball.radius <= paddle.position.y + paddle.size.height
  );
}

function resetAfterPoint(ball: Ball, field: Size): void {
  if (ball.position.x + ball.radius < FIELD_BORDER_INSET) {
    resetBall(ball, field, 1);
  }

  if (ball.position.x - ball.radius > field.width - FIELD_BORDER_INSET) {
    resetBall(ball, field, -1);
  }
}

function resetBall(ball: Ball, field: Size, horizontalDirection: -1 | 1): void {
  const verticalDirection = ball.velocity.y >= 0 ? -1 : 1;

  ball.position.x = field.width / 2;
  ball.position.y = field.height / 2;
  ball.velocity = createServeVelocity(horizontalDirection, verticalDirection);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

import type { Ball, GameState, Paddle, Size } from "./types";
import { FIELD_BORDER_INSET } from "./constants";

const BACKGROUND_COLOR = "#03040a";
const FIELD_LINE_COLOR = "#27f5ff";
const FIELD_ACCENT_COLOR = "#ff3df2";
const CENTER_LINE_COLOR = "rgba(57, 255, 20, 0.5)";
const PLAYER_PADDLE_COLOR = "#27f5ff";
const OPPONENT_PADDLE_COLOR = "#ff3df2";
const BALL_COLOR = "#39ff14";
const BALL_CORE_COLOR = "#f7fff6";

export interface CanvasRenderer {
  resize(): void;
  draw(state: GameState): void;
}

export function createCanvasRenderer(canvas: HTMLCanvasElement): CanvasRenderer {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas rendering is not supported in this browser.");
  }

  const context2d = context;

  function resize(): void {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio));
    const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function draw(state: GameState): void {
    const scale = Math.min(
      canvas.width / state.field.width,
      canvas.height / state.field.height,
    );
    const drawWidth = state.field.width * scale;
    const drawHeight = state.field.height * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    context2d.clearRect(0, 0, canvas.width, canvas.height);
    context2d.fillStyle = BACKGROUND_COLOR;
    context2d.fillRect(0, 0, canvas.width, canvas.height);

    context2d.save();
    context2d.translate(offsetX, offsetY);
    context2d.scale(scale, scale);

    drawPlayField(context2d, state.field);
    drawPaddle(context2d, state.player, PLAYER_PADDLE_COLOR);
    drawPaddle(context2d, state.opponent, OPPONENT_PADDLE_COLOR);
    drawBall(context2d, state.ball);

    context2d.restore();
  }

  return {
    resize,
    draw,
  };
}

function drawPlayField(context: CanvasRenderingContext2D, fieldSize: Size): void {
  context.save();

  context.strokeStyle = FIELD_LINE_COLOR;
  context.lineWidth = 4;
  context.shadowColor = FIELD_LINE_COLOR;
  context.shadowBlur = 20;
  context.strokeRect(
    FIELD_BORDER_INSET,
    FIELD_BORDER_INSET,
    fieldSize.width - FIELD_BORDER_INSET * 2,
    fieldSize.height - FIELD_BORDER_INSET * 2,
  );

  context.strokeStyle = FIELD_ACCENT_COLOR;
  context.lineWidth = 2;
  context.shadowColor = FIELD_ACCENT_COLOR;
  context.shadowBlur = 12;
  context.strokeRect(
    FIELD_BORDER_INSET + 10,
    FIELD_BORDER_INSET + 10,
    fieldSize.width - (FIELD_BORDER_INSET + 10) * 2,
    fieldSize.height - (FIELD_BORDER_INSET + 10) * 2,
  );

  context.setLineDash([16, 18]);
  context.strokeStyle = CENTER_LINE_COLOR;
  context.lineWidth = 3;
  context.shadowColor = "#39ff14";
  context.shadowBlur = 12;
  context.beginPath();
  context.moveTo(fieldSize.width / 2, 48);
  context.lineTo(fieldSize.width / 2, fieldSize.height - 48);
  context.stroke();

  context.restore();
}

function drawPaddle(
  context: CanvasRenderingContext2D,
  paddle: Paddle,
  color: string,
): void {
  context.save();

  context.shadowColor = color;
  context.shadowBlur = 28;
  context.strokeStyle = color;
  context.lineWidth = 6;
  context.strokeRect(
    paddle.position.x,
    paddle.position.y,
    paddle.size.width,
    paddle.size.height,
  );

  context.shadowBlur = 14;
  context.fillStyle = color;
  context.fillRect(
    paddle.position.x,
    paddle.position.y,
    paddle.size.width,
    paddle.size.height,
  );

  context.shadowBlur = 0;
  context.fillStyle = "rgba(247, 255, 246, 0.72)";
  context.fillRect(
    paddle.position.x + paddle.size.width * 0.28,
    paddle.position.y + 8,
    paddle.size.width * 0.22,
    paddle.size.height - 16,
  );

  context.restore();
}

function drawBall(context: CanvasRenderingContext2D, ball: Ball): void {
  context.save();

  context.shadowColor = BALL_COLOR;
  context.shadowBlur = 30;
  context.fillStyle = BALL_COLOR;
  context.beginPath();
  context.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = BALL_CORE_COLOR;
  context.beginPath();
  context.arc(
    ball.position.x,
    ball.position.y,
    ball.radius * 0.45,
    0,
    Math.PI * 2,
  );
  context.fill();

  context.restore();
}

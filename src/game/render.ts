import type { Size } from "./types";

const BACKGROUND_COLOR = "#05050b";
const FIELD_LINE_COLOR = "rgba(85, 240, 255, 0.42)";
const CENTER_LINE_COLOR = "rgba(245, 247, 255, 0.2)";

export interface CanvasRenderer {
  resize(): void;
  drawBaseScene(): void;
}

export function createCanvasRenderer(
  canvas: HTMLCanvasElement,
  fieldSize: Size,
): CanvasRenderer {
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

  function drawBaseScene(): void {
    const scale = Math.min(
      canvas.width / fieldSize.width,
      canvas.height / fieldSize.height,
    );
    const drawWidth = fieldSize.width * scale;
    const drawHeight = fieldSize.height * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    context2d.clearRect(0, 0, canvas.width, canvas.height);
    context2d.fillStyle = BACKGROUND_COLOR;
    context2d.fillRect(0, 0, canvas.width, canvas.height);

    context2d.save();
    context2d.translate(offsetX, offsetY);
    context2d.scale(scale, scale);

    drawPlayField(context2d, fieldSize);

    context2d.restore();
  }

  return {
    resize,
    drawBaseScene,
  };
}

function drawPlayField(context: CanvasRenderingContext2D, fieldSize: Size): void {
  context.save();

  context.strokeStyle = FIELD_LINE_COLOR;
  context.lineWidth = 4;
  context.shadowColor = "rgba(0, 240, 255, 0.52)";
  context.shadowBlur = 18;
  context.strokeRect(28, 28, fieldSize.width - 56, fieldSize.height - 56);

  context.setLineDash([16, 18]);
  context.strokeStyle = CENTER_LINE_COLOR;
  context.lineWidth = 3;
  context.shadowBlur = 0;
  context.beginPath();
  context.moveTo(fieldSize.width / 2, 48);
  context.lineTo(fieldSize.width / 2, fieldSize.height - 48);
  context.stroke();

  context.restore();
}

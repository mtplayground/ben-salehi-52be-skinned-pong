import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createCanvasRenderer } from "./game/render";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

const renderer = createCanvasRenderer(canvas, FIELD_SIZE);

function resize(): void {
  renderer.resize();
  renderer.drawBaseScene();
}

window.addEventListener("resize", resize);
resize();

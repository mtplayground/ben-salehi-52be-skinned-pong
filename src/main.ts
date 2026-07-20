import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createGameLoop } from "./game/loop";
import { createCanvasRenderer } from "./game/render";
import { createInitialGameState, updateGameState } from "./game/state";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

const renderer = createCanvasRenderer(canvas);
const gameState = createInitialGameState(FIELD_SIZE);
const gameLoop = createGameLoop({
  update: (step) => {
    updateGameState(gameState, step);
  },
  draw: () => {
    renderer.resize();
    renderer.draw(gameState);
  },
});

function resize(): void {
  renderer.resize();
  renderer.draw(gameState);
}

window.addEventListener("resize", resize);
resize();
gameLoop.start();

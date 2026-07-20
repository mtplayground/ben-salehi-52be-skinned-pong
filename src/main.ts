import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createKeyboardInput } from "./game/input";
import { createGameLoop } from "./game/loop";
import { createCanvasRenderer } from "./game/render";
import { createInitialGameState, updateGameState } from "./game/state";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

const renderer = createCanvasRenderer(canvas);
const gameState = createInitialGameState(FIELD_SIZE);
const keyboard = createKeyboardInput(window);
const gameLoop = createGameLoop({
  update: (step) => {
    updateGameState(gameState, step, keyboard.state);
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

import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createKeyboardInput } from "./game/input";
import { createGameLoop } from "./game/loop";
import { createCanvasRenderer } from "./game/render";
import { createInitialGameState, updateGameState } from "./game/state";
import { createScoreHud } from "./ui/score";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
const playerScore = document.querySelector<HTMLElement>("#player-score");
const opponentScore = document.querySelector<HTMLElement>("#opponent-score");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

if (!playerScore || !opponentScore) {
  throw new Error("Score HUD elements were not found.");
}

const renderer = createCanvasRenderer(canvas);
const gameState = createInitialGameState(FIELD_SIZE);
const keyboard = createKeyboardInput(window);
const scoreHud = createScoreHud({ playerScore, opponentScore });
const gameLoop = createGameLoop({
  update: (step) => {
    updateGameState(gameState, step, keyboard.state);
  },
  draw: () => {
    renderer.resize();
    renderer.draw(gameState);
    scoreHud.update(gameState);
  },
});

function resize(): void {
  renderer.resize();
  renderer.draw(gameState);
  scoreHud.update(gameState);
}

window.addEventListener("resize", resize);
resize();
gameLoop.start();

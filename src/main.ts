import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createKeyboardInput } from "./game/input";
import { createGameLoop } from "./game/loop";
import { createCanvasRenderer } from "./game/render";
import { loadSelectedSkinId, saveSelectedSkinId } from "./game/skinStorage";
import { createInitialGameState, updateGameState } from "./game/state";
import { createScoreHud } from "./ui/score";
import { createSkinSelectionScreen } from "./ui/skinSelection";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
const playerScore = document.querySelector<HTMLElement>("#player-score");
const opponentScore = document.querySelector<HTMLElement>("#opponent-score");
const skinPickerList = document.querySelector<HTMLElement>("#skin-picker-list");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

if (!playerScore || !opponentScore) {
  throw new Error("Score HUD elements were not found.");
}

if (!skinPickerList) {
  throw new Error("Skin picker list element was not found.");
}

const renderer = createCanvasRenderer(canvas);
const gameState = createInitialGameState(FIELD_SIZE, loadSelectedSkinId());
const keyboard = createKeyboardInput(window);
const scoreHud = createScoreHud({ playerScore, opponentScore });
createSkinSelectionScreen({
  container: skinPickerList,
  selectedSkinId: gameState.selectedSkinId,
  onSelect: (skinId) => {
    gameState.selectedSkinId = skinId;
    saveSelectedSkinId(skinId);
  },
});
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

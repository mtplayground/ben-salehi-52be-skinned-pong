import "./styles.css";
import { FIELD_SIZE } from "./game/constants";
import { createKeyboardInput } from "./game/input";
import { createGameLoop } from "./game/loop";
import { createCanvasRenderer } from "./game/render";
import { loadSelectedSkinId, saveSelectedSkinId } from "./game/skinStorage";
import { createInitialGameState, updateGameState } from "./game/state";
import { createScreenNavigation } from "./ui/navigation";
import { createScoreHud } from "./ui/score";
import { createSkinSelectionScreen } from "./ui/skinSelection";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
const startScreen = document.querySelector<HTMLElement>("#start-screen");
const skinScreen = document.querySelector<HTMLElement>("#skin-selection-screen");
const scoreHudElement = document.querySelector<HTMLElement>(".score-hud");
const startMatchButton = document.querySelector<HTMLButtonElement>("#start-match-button");
const openSkinsButton = document.querySelector<HTMLButtonElement>("#open-skins-button");
const skinBackButton = document.querySelector<HTMLButtonElement>("#skin-back-button");
const skinStartMatchButton = document.querySelector<HTMLButtonElement>(
  "#skin-start-match-button",
);
const playerScore = document.querySelector<HTMLElement>("#player-score");
const opponentScore = document.querySelector<HTMLElement>("#opponent-score");
const skinPickerList = document.querySelector<HTMLElement>("#skin-picker-list");

if (!canvas) {
  throw new Error("Game canvas element was not found.");
}

if (
  !startScreen ||
  !skinScreen ||
  !scoreHudElement ||
  !startMatchButton ||
  !openSkinsButton ||
  !skinBackButton ||
  !skinStartMatchButton
) {
  throw new Error("Screen navigation elements were not found.");
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
const navigation = createScreenNavigation({
  startScreen,
  skinScreen,
  scoreHud: scoreHudElement,
});

createSkinSelectionScreen({
  container: skinPickerList,
  selectedSkinId: gameState.selectedSkinId,
  onSelect: (skinId) => {
    gameState.selectedSkinId = skinId;
    saveSelectedSkinId(skinId);
  },
});

function startMatch(): void {
  gameState.phase = "running";
  navigation.showMatch();
}

startMatchButton.addEventListener("click", startMatch);
skinStartMatchButton.addEventListener("click", startMatch);
openSkinsButton.addEventListener("click", () => {
  navigation.showSkins();
});
skinBackButton.addEventListener("click", () => {
  navigation.showStart();
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
navigation.showStart();
resize();
gameLoop.start();

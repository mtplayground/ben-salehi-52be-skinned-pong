export interface ScreenNavigation {
  showStart(): void;
  showSkins(): void;
  showMatch(): void;
}

export interface ScreenNavigationOptions {
  startScreen: HTMLElement;
  skinScreen: HTMLElement;
  scoreHud: HTMLElement;
}

export function createScreenNavigation({
  startScreen,
  skinScreen,
  scoreHud,
}: ScreenNavigationOptions): ScreenNavigation {
  function showStart(): void {
    startScreen.hidden = false;
    skinScreen.hidden = true;
    scoreHud.hidden = true;
  }

  function showSkins(): void {
    startScreen.hidden = true;
    skinScreen.hidden = false;
    scoreHud.hidden = true;
  }

  function showMatch(): void {
    startScreen.hidden = true;
    skinScreen.hidden = true;
    scoreHud.hidden = false;
  }

  return {
    showStart,
    showSkins,
    showMatch,
  };
}

export interface ScreenNavigation {
  showStart(): void;
  showSkins(): void;
  showMatch(): void;
  showMatchEnd(): void;
}

export interface ScreenNavigationOptions {
  startScreen: HTMLElement;
  skinScreen: HTMLElement;
  matchEndScreen: HTMLElement;
  scoreHud: HTMLElement;
}

export function createScreenNavigation({
  startScreen,
  skinScreen,
  matchEndScreen,
  scoreHud,
}: ScreenNavigationOptions): ScreenNavigation {
  function showStart(): void {
    startScreen.hidden = false;
    skinScreen.hidden = true;
    matchEndScreen.hidden = true;
    scoreHud.hidden = true;
  }

  function showSkins(): void {
    startScreen.hidden = true;
    skinScreen.hidden = false;
    matchEndScreen.hidden = true;
    scoreHud.hidden = true;
  }

  function showMatch(): void {
    startScreen.hidden = true;
    skinScreen.hidden = true;
    matchEndScreen.hidden = true;
    scoreHud.hidden = false;
  }

  function showMatchEnd(): void {
    startScreen.hidden = true;
    skinScreen.hidden = true;
    matchEndScreen.hidden = false;
    scoreHud.hidden = false;
  }

  return {
    showStart,
    showSkins,
    showMatch,
    showMatchEnd,
  };
}

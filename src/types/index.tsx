export interface Game {
  board: Board;
  readonly dimensions: number; // ? duplication
  movementCount: number;
  movementHistory?: any; // not considered yet
  reset: () => void;
}

export interface Board {
  readonly dimensions: number;
  tiles: Tile[];
  readonly matchedPlaces: number;
  move: (location: number) => number;
  /*
    check if the game is finished
  */
  isFinished: () => boolean;
  shuffle: () => void;
}

export interface Tile {
  id: number | 'empty';
  location: number;
  move: () => number;
  getRow: () => number;
  getCol: () => number;
}

export type GameInitializor = (dimensions: number) => Game;

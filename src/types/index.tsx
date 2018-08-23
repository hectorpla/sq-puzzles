export interface Game {
  readonly dimensions: number; // ? duplication
  // TODO: should be readonly, temporarily leave it because Game has no implementing class
  movementCount: number;
  readonly movementHistory?: any; // not considered yet
  readonly board: Board;
  reset: () => void;
}

export interface Board {
  readonly dimensions: number;
  readonly matchedPlaces: number;
  readonly tiles: Tile[];
  move: (location: number) => number;
  /*
    check if the game is finished: matched == d * d - 1
  */
  isFinished: () => boolean;
  shuffle: () => void;
}

// TODO: consider class implementation instead of plain object
export interface Tile {
  readonly id: number | 'empty';
  move: () => number;
  getRow: () => number;
  getCol: () => number;
}

export type GameInitializor = (dimensions: number) => Game;

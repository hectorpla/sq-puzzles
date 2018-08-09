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

// TODO: consider class implementation instead of plain object
export interface Tile {
  id: number | 'empty';
  // ? the client should not know the internal location in the array
  location: number;
  move: () => number;
  getRow: () => number;
  getCol: () => number;
}

export type GameInitializor = (dimensions: number) => Game;

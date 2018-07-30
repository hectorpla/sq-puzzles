export interface Game {
  board: Board;
  readonly dimensions: number;
  movementCount: number;
  movementHistory?: any; // not considered yet
  reset: () => void;
}

// ? how to maintain the 
export interface Board {
  dimensions: number;
  tiles: Tile[];
  emptyTileLocation: number;
  matchedPlaces: number;
  move: (location: number) => number;
  /*
    
  */
  isFinished: () => boolean;
  shuffle: () => void;
}

export interface Tile {
  id: number | 'empty';
  location: number;
  move: () => number;
}

export type GameInitializor = (dimensions: number) => Game;


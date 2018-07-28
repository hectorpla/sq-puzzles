export interface Game {
  board: Board;
  dimensions: number;
  movementCount: number;
  movementHistory?: any; // not considered yet
  reset: () => Board;
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
}

// ? should the empty tile be an instance of a tile?
export interface Tile {
  id: number | 'empty';
  location: number;
  // neighbors: TileNeighbors;
  move: () => number;
}

export type GameInitializor = (dimensions: number) => Game;

// export interface TileNeighbors {
//   top: Tile | void;
//   left: Tile | void;
//   bottom: Tile | void;
//   right: Tile | void;
// }

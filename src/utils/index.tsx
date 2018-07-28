import { GameInitializor, Board, Tile } from "../types";
import BoardModel from "../models/BoardModel";

namespace Game {
  const initBoard = (dimensions: number): Board {
    return new BoardModel(dimensions);
  }

  const initGame: GameInitializor = (dimensions: number) => {
    return {
      board: initBoard(dimensions),
      dimensions: dimensions,
      movementCount: 0
    }
  }
}

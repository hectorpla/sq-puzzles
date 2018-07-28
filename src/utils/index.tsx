import BoardModel from "../models/BoardModel";
import { Board, GameInitializor } from "../types";

const initBoard = (dimensions: number): Board => {
  return new BoardModel(dimensions);
}

export const getNewGame: GameInitializor = (dimensions: number) => {
  return {
    board: initBoard(dimensions),
    dimensions,
    movementCount: 0,
    reset() {
      throw Error('not implemented');
    }
  }
}

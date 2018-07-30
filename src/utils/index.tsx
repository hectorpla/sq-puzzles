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
      this.board.shuffle();
      this.movementCount = 0;
    }
  }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * form stack-overflow
 */
export const shuffle = (array: object[]) => {
  let i;
  let j;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

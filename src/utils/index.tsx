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
 * @param {Array} array items An array containing the items.
 * from stack-overflow
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

/**
 * Count inversions of an arrangement of tiles
 * @param {number[]} order
 * naive solution, binary search can improve
 */
export const countInversions = (order: number[]) => {
  let count = 0;
  for (let i = 0; i < order.length; i++) {
    for (let j = i + 1; j < order.length; j++) {
      if (order[i] && order[j] && order[i] > order[j]) {
        count++;
      }
    }
  }
  console.log(count);
  return count;
}

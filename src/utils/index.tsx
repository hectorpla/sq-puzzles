import BoardModel from "../models/BoardModel";
import { Board, GameInitializor, Tile } from "../types";

import * as Anime from 'animejs';

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
  // console.log(count);
  return count;
}

export interface Point {
  x: number;
  y: number;
}
export type Delta = Point;
export const calCoordDelta = (a: Point, b: Point): Delta => {
  return { x: a.x - b.x, y: a.y - b.y };
}

interface AllPosition {
  [id: string]: Delta;
}
type AllDelta = AllPosition;


export const getAllPositions = (tiles: Tile[]): AllPosition => {
  const id2pos = {};

  tiles.forEach((tile, i) => {
    id2pos[tile.id] = { x: tile.getCol(), y: tile.getRow() }
  })
  return id2pos;
}

export const computePositionDelta = (before: AllPosition, after: AllPosition, itemWidth: number): AllDelta => {
  const id2delta = {};

  for (const id in before) {
    if (!before.hasOwnProperty(id)) { continue; }
    const { x, y } = calCoordDelta(after[id], before[id]);
    id2delta[id] = {
      x: x * itemWidth,
      y: y * itemWidth
    }
  }
  return id2delta;
}

type VoidPromiseGenerators = Array<() => Promise<void>>;
export interface MovePromises {
  forward: VoidPromiseGenerators,
  reverse: VoidPromiseGenerators
}

export const getMovePromises = (deltas: AllDelta): MovePromises => {
  const forwardPromises: VoidPromiseGenerators = [];
  const reversePromises: VoidPromiseGenerators = [];

  for (const id in deltas) {
    if (!deltas.hasOwnProperty(id)) { continue; }

    const { x, y } = deltas[id];
    forwardPromises.push(() => Anime({
      targets: `#tile-${id}`,
      translateX: x,
      translateY: y,
      duration: 300,
    }).finished);

    reversePromises.push(() => Anime({
      targets: `#tile-${id}`,
      translateX: 0,
      translateY: 0,
      duration: 0,
    }).finished);
  }

  return {
    forward: forwardPromises,
    reverse: reversePromises
  };
}

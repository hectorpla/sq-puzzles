import { Board, Tile } from '../types';
import { countInversions, shuffle } from '../utils';

// should not expose, location is only visible here
type RealTile = Tile & { location: number };

class BoardModel implements Board {
  public readonly dimensions: number;
  public tiles: RealTile[];
  public matchedPlaces: number = 0;

  constructor(dimensions: number) {
    this.dimensions = dimensions;
    this.tiles = [];

    const size = dimensions * dimensions;
    const thisBoard = this;
    for (let i = 0; i < size; i++) {
      this.tiles.push({
        id: i < size - 1 ? i + 1 : 'empty',
        location: i,
        getRow() {
          return thisBoard.getRow(this.location);
        },
        getCol() {
          return thisBoard.getCol(this.location);
        },
        move() { // ? delegation in model
          return thisBoard.move(this.location);
        },
      })
    }
    this.setToFinishState();
  }

  public getRow(location: number) {
    return this.locationToCell(location)[0];
  }

  public getCol(location: number) {
    return this.locationToCell(location)[1];
  }

  /**
   * ! logically, this method should not be exposed
   * @param {number} the tile to move
   */
  public move(location: number) {
    const [row, col] = this.locationToCell(location);

    let newLocation =
      this.isCellEmpty(row - 1, col)
      || this.isCellEmpty(row + 1, col)
      || this.isCellEmpty(row, col - 1)
      || this.isCellEmpty(row, col + 1);

    if (newLocation === undefined) {
      return location;
    }
    newLocation -= 1; // bypassing || operator's indiscrimination for 0 and undef
    // console.log(location, '->', newLocation);

    this.swap(location, newLocation);
    return newLocation;
  }

  /**
   * check if the game is finshed
   */
  public isFinished(): boolean {
    const d = this.dimensions;
    return this.matchedPlaces === d * d;
  }

  public setToFinishState() {
    this.tiles.sort((a, b) => {
      if (a.id === 'empty') { return 1 };
      if (b.id === 'empty') { return -1 };
      return a.id > b.id ? 1 : -1; // fixed: originally 1 : 0
    })
    this.syncLocations();
  }

  /**
   * shuffle the postions of tiles
   * TODO: naive inprementation, not efficent but enough?
   * ! only suit for 8-puzzle, case for 15-puzzle is much complicated 
   */
  public shuffle() {
    do {
      shuffle(this.tiles);
    } while (!this.isSolvable());
    this.syncLocations();
  }

  /**
   * idea from geeksforgeeks (not totally figure out):
   * when the size is even, check if:
   * 1. the count of inversion is odd, and row of empty is even
   * 2. even and odd
   */
  public isSolvable(): boolean {
    // ensure the state is consistent, (added for tests) 
    this.syncLocations();

    const numOfInversion = countInversions(this.getOrder());
    if (this.dimensions % 2 === 1) {
      return numOfInversion % 2 === 0;
    }
    const emptyRow = this.tiles.filter(tile => tile.id === 'empty')[0].getRow(); 
    // console.log(numOfInversion, emptyRow);
    return !!((numOfInversion & 1) ^ (emptyRow & 1));
  }

  /**
   * should be called after swap operations in the tile array
   */
  private syncLocations() {
    this.matchedPlaces = 0;
    this.tiles.forEach((tile, i) => {
      tile.location = i;
      this.matchedPlaces += this.isMatched(i) ? 1 : 0;
    });
  }

  private locationToCell(location: number): [number, number] {
    const d = this.dimensions;
    const row = Math.floor(location / d);
    const col = location % d;
    return [row, col];
  }

  private cellToLocation(row: number, col: number): number {
    return row * this.dimensions + col;
  }

  // check if the tile is an emty one, boundary considered
  // return the location offset by 1
  private isCellEmpty(row: number, col: number): (number | void) {
    const d = this.dimensions;
    const tiles = this.tiles;
    const location = this.cellToLocation(row, col);

    if (row < 0 || row >= d || col < 0 || col >= d || tiles[location].id !== 'empty') {
      // console.log('isCellEmpty:', undefined);
      return undefined;
    }
    // console.log('isCellEmpty:', location + 1);
    return location + 1;
  }

  private getOrder(): number[] {
    // const last = this.dimensions * this.dimensions - 1;
    return this.tiles.map(tile => tile.id === 'empty' ? 0 : tile.id);
  }

  // TODO: test
  private isMatched(pos: number) {
    // console.log(this.tiles[pos]);
    const { id, location } = this.tiles[pos];
    const d = this.dimensions;
    return id === location + 1
      || (id === 'empty' && location === d * d - 1);
  }

  private swap(pos1: number, pos2: number) {
    // console.log('swapping:', pos1, pos2);
    if (pos1 === pos2) { // for sake of safefy
      return;
    }

    this.matchedPlaces += this.isMatched(pos1) ? -1 : 0;
    this.matchedPlaces += this.isMatched(pos2) ? -1 : 0;

    const temp = this.tiles[pos1];
    this.tiles[pos1] = this.tiles[pos2];
    this.tiles[pos2] = temp;
    this.tiles[pos1].location = pos1;
    this.tiles[pos2].location = pos2;

    this.matchedPlaces += this.isMatched(pos1) ? 1 : 0;
    this.matchedPlaces += this.isMatched(pos2) ? 1 : 0;
    // console.log(this.tiles);
  }
}

export default BoardModel;

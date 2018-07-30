import { Board, Tile } from '../types';
import { shuffle } from '../utils';

class BoardModel implements Board {
  // ? public? interface inforces that
  public dimensions: number;
  public tiles: Tile[];
  public emptyTileLocation: number;
  public matchedPlaces: number = 0;

  constructor(dimensions: number) {
    this.dimensions = dimensions;
    this.tiles = [{
      id: 'empty',
      location: 0,
      move() {
        return this.location;
      }
    }];
    this.emptyTileLocation = 0;

    const size = dimensions * dimensions;
    const thisBoard = this;
    for (let i = 1; i < size; i++) {
      this.tiles.push({
        id: i,
        location: i,
        move() {
          return thisBoard.move(this.location);
        },
      })
    }
  }

  /**
   * @param {number} the tile to move
   */
  public move(location: number) {
    const [row, col] = this.locationToCell(location);

    // ! value zero will not be selected
    let newLocation =
      this.isCellEmpty(row - 1, col)
      || this.isCellEmpty(row + 1, col)
      || this.isCellEmpty(row, col - 1)
      || this.isCellEmpty(row, col + 1);

    if (newLocation === undefined) {
      return location;
    }
    newLocation -= 1; // bypassing || operator's indiscrimination for 0 and undef
    console.log(location, '->', newLocation);

    this.swap(location, newLocation);
    return newLocation;
  }

  /**
   * check if the game is finshed
   */
  public isFinished() {
    throw Error('not implemented');
    return false;
  }

  /**
   * shuffle the postions of tiles
   */
  public shuffle() {
    shuffle(this.tiles);
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

    console.log('isCellEmpty', row, col, tiles[location]);
    if (row < 0 || row >= d || col < 0 || col >= d || tiles[location].id !== 'empty') {
      return undefined;
    }
    return location + 1;
  }

  // TODO: test
  private isMatched(pos: number) {
    console.log(this.tiles[pos]);
    const { id, location } = this.tiles[pos];
    const d = this.dimensions;
    return id === location + 1
      || (id === 'empty' && location === d * d - 1);
  }

  private swap(pos1: number, pos2: number) {
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
  }
}

export default BoardModel;

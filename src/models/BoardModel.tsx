import { Board, Tile } from '../types';

class BoardModel implements Board {
  // ? public? interface inforces that
  public dimensions: number;
  public tiles: Tile[];
  public emptyTileLocation: number;
  public matchedPlaces: number;
  
  constructor(dimensions: number) {
    this.tiles = [{
      id: 'empty',
      location: 0,
      move: function() {
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
        move: function() {
          return thisBoard.move(this.location);
        }
      })
    }
  }

  public move(location: number) {
    throw Error('not implemented');
    return location;
  }

  public isFinished() {
    throw Error('not implemented');
    return false;
  }
}


export default BoardModel;

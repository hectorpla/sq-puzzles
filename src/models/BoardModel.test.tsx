import BoardModel from "./BoardModel";

function checkMatched(board: BoardModel) {
  const tiles = board.tiles;
  let count = 0;

  tiles.forEach((tile) => {
    if (tile.id === 'empty') {
      if (tile.location === 8) { count++; }
      return;
    }
    count += tile.id === tile.location + 1 ? 1 : 0;
  })
  return expect(board.matchedPlaces).toBe(count);
}

describe('8-puzzle', () => {
  const board = new BoardModel(3);
  const locations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const getRandomLocation = (): number => {
    return Math.floor(Math.random() * 9);
  }

  beforeAll(() => {
    // should be a finshed state
    expect(board.matchedPlaces).toBe(9);
    expect(board.isFinished()).toBe(true);
  })

  beforeEach(() => {
    board.setToFinishState();
  });

  it('finished state of a game', () => {
    expect(board.dimensions).toBe(3);

    board.tiles.forEach((tile, i) => {
      if (tile.id === 'empty') {
        expect(tile.location).toBe(8);
        return;
      }
      expect(tile.id).toBe(i + 1);
    })

    expect(board.matchedPlaces).toBe(9);
    expect(board.isFinished()).toBe(true);
  })

  it('invalid moves', () => {
    locations.forEach(i => {
      if (i === 5 || i === 7) { return };
      expect(board.move(i)).toBe(i);
      expect(board.isFinished());
      if (i === 8) {
        expect(board.tiles[i].id).toBe('empty');
        return;
      }
      expect(board.tiles[i].id).toBe(i + 1);
    })
  })

  it('one move (5 -> 8) from finshed state', () => {
    expect(board.move(5)).toBe(8);
    expect(board.matchedPlaces).toBe(7);
    expect(board.isFinished()).toBe(false);
    expect(board.tiles[5].id).toBe('empty');
    expect(board.tiles[8].id).toBe(6);
  })

  it('one move (7 -> 8) from finshed state', () => {
    expect(board.move(7)).toBe(8);
    expect(board.matchedPlaces).toBe(7);
    expect(board.isFinished()).toBe(false);
    expect(board.tiles[7].id).toBe('empty');
    expect(board.tiles[8].id).toBe(8);
  });

  it('two moves (7 -> 8, 6 -> 7)', () => {
    board.move(7);
    expect(board.move(6)).toBe(7);
    expect(board.matchedPlaces).toBe(6);
    expect(board.isFinished()).toBe(false);
    expect(board.tiles[6].id).toBe('empty');
    expect(board.tiles[7].id).toBe(7);
    expect(board.tiles[8].id).toBe(8);
  });

  it('two moves (7 -> 8, 4 -> 7)', () => {
    board.move(7);
    expect(board.move(4)).toBe(7);
    expect(board.matchedPlaces).toBe(6);
    expect(board.isFinished()).toBe(false);
    expect(board.tiles[4].id).toBe('empty');
    expect(board.tiles[7].id).toBe(5);
    expect(board.tiles[8].id).toBe(8);
  });

  it('5 random moves', () => {
    for (let i = 0; i < 5; i++) {
      board.move(getRandomLocation());
    }
    checkMatched(board);
  });

  it('20 random moves', () => {
    for (let i = 0; i < 20; i++) {
      board.move(getRandomLocation());
      checkMatched(board);
    }
  });

  // TODO: tests solvable
  // the initialization method utilizes the tester (reverse pairs)
})

describe('15-puzzle', () => {
  const board = new BoardModel(4);

  it('finshed state', () => {
    expect(board.matchedPlaces).toBe(16);
    expect(board.isFinished()).toBe(true);
    board.tiles.forEach((tile, i) => {
      if (i === board.tiles.length - 1) {
        expect(tile.id).toBe('empty');
        return;
      }
      expect(tile.id).toBe(i + 1);
    })
  })
})

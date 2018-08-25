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

function checkFinished(board: BoardModel) {
  board.tiles.forEach((tile, i) => {
    if (tile.id === 'empty') {
      expect(tile.location).toBe(8);
      return;
    }
    expect(tile.id).toBe(i + 1);
  })
  expect(board.isFinished()).toBe(true);
}

/**
 * gurantee valid move
 * @param curLocation 
 * @param size 
 */
function randomMoveFactory(size: number) {
  const offsets = [-1, 1, -size, size];
  return (currentLocation: number) => {
    const bound = size ** 2;
    let index: number;
    let ret: number;
    do {
      index = Math.floor(Math.random() * 4);
      ret = currentLocation + offsets[index];
    } while (ret < 0 || ret >= bound)
    return ret;
  }
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
    checkFinished(board);
    expect(board.matchedPlaces).toBe(9);
  })

  // only one test though
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

  it('two moves (7 -> 8, 8 -> 7) back to finished state', () => {
    board.move(7);
    expect(board.move(8)).toBe(7);
    checkFinished(board);
    expect(board.matchedPlaces).toBe(9);
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
  });
})

/**
 * a hack into the data structure
 * @param array 
 * @param i 
 * @param j 
 */
function swap(array: any[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// TODO: tests solvable
// the initialization method utilizes the tester (reverse pairs)
describe('solvability', () => {
  describe('3-puzzle', () => {
    const board = new BoardModel(2);
    const tiles = board.tiles;

    beforeEach(() => {
      board.setToFinishState();
    });

    it('true at initial state', () => {
      expect(board.isSolvable()).toBe(true);
    });

    it('false after swapping (2, 3)', () => {
      swap(tiles, 1, 2);
      expect(board.isSolvable()).toBe(false);
    });

    it('false after swapping (1, 2)', () => {
      swap(tiles, 0, 1);
      expect(board.isSolvable()).toBe(false);
    });
  })

  describe('8-puzzle', () => {
    const board = new BoardModel(3);
    const tiles = board.tiles;

    beforeEach(() => {
      board.setToFinishState();
    });

    it('true at initial state', () => {
      expect(board.isSolvable()).toBe(true);
    });

    it('false after swapping (2, 3)', () => {
      swap(tiles, 1, 2);
      expect(board.isSolvable()).toBe(false);
    });

    it('false after swapping (6, 8)', () => {
      swap(tiles, 5, 7);
      expect(board.isSolvable()).toBe(false);
    });
  })

  // TODO: more coverage
  describe('15-puzzle', () => {
    const board = new BoardModel(4);
    const tiles = board.tiles;
    const randomMove = randomMoveFactory(4);

    beforeEach(() => {
      board.setToFinishState();
    });

    it('true at initial state', () => {
      expect(board.isSolvable()).toBe(true);
    });

    it('false after swapping (12, 15)', () => {
      swap(tiles, 11, 14);
      expect(board.isSolvable()).toBe(false);
    });

    it('false after swapping (12, empty), (8, 11)', () => {
      swap(tiles, 11, 15);
      swap(tiles, 7, 10);
      expect(board.isSolvable()).toBe(false);
    });

    it('false after swapping (12, empty), (8, empty), (4, 7)', () => {
      swap(tiles, 11, 15);
      swap(tiles, 7, 11);
      swap(tiles, 3, 6);
      expect(board.isSolvable()).toBe(false);
    });

    it('false after swapping (12, empty), (8, empty), (4, empty), (7, empty)', () => {
      swap(tiles, 11, 15);
      swap(tiles, 7, 11);
      swap(tiles, 3, 7);
      swap(tiles, 3, 6);
      expect(board.isSolvable()).toBe(false);
    });

    /**
     * for local use temporarily
     */
    function moveFromState(currentEmptyLocation: number, steps: number) {
      for (let i = 0; i < steps; i++) {
        const nonEmptyLocation = randomMove(currentEmptyLocation);
        if (board.move(nonEmptyLocation) === currentEmptyLocation) {
          currentEmptyLocation = nonEmptyLocation;
        }
      }
      return currentEmptyLocation;
    }

    it('start from initial state, 10 random moves, expect true', () => {
      expect(tiles[15].id).toBe('empty');
      moveFromState(15, 10);
      expect(board.isSolvable()).toBe(true);
    });

    it('start from initial state, 50 random moves, expect true', () => {
      moveFromState(15, 50);
      expect(board.isSolvable()).toBe(true);
    });

    it('start from initial state, 10 * 10 random moves, expect true', () => {
      let currentEmptyLocation = 15;
      for (let i = 0; i < 10; i++) {
        currentEmptyLocation = moveFromState(currentEmptyLocation, 10);
        expect(board.isSolvable()).toBe(true);
      }
    });

    it('start from invalid state, 10 random moves, expect false', () => {
      swap(tiles, 11, 14);
      expect(tiles[15].id).toBe('empty');
      moveFromState(15, 10);
      expect(board.isSolvable()).toBe(false);
    });

    it('start from invalid state, 50 random moves, expect false', () => {
      swap(tiles, 11, 14);
      expect(tiles[15].id).toBe('empty');
      moveFromState(15, 50);
      expect(board.isSolvable()).toBe(false);
    });

    it('start from invalid state, 10 * 10 random moves, expect true', () => {
      swap(tiles, 11, 14);

      let currentEmptyLocation = 15;
      for (let i = 0; i < 10; i++) {
        currentEmptyLocation = moveFromState(currentEmptyLocation, 10);
        expect(board.isSolvable()).toBe(false);
      }
    });
  })
})

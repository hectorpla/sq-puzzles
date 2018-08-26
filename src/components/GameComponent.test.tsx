import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
// import * as sinon from 'sinon';

import BoardComponent from './BoardComponent';
import GameComponent from './GameComponent';
import TileComponent from './TileComponent';

enzyme.configure({ adapter: new Adapter() });

describe('<GameComponent />', () => {
  // TODO: test display of matched tiles
  it('matched number', () => {
    // test
  });

  describe('game should start when the first tile moves', () => {
    const gameComp = enzyme.mount<GameComponent>(<GameComponent dimensions={3} />);
    const boardComp = gameComp.find(BoardComponent);
    const tiles = boardComp.find(TileComponent);

    expect(boardComp.props().board.isFinished()).toBe(true);
    expect(gameComp.state().counting).toBe(false);

    (tiles.at(7).instance() as TileComponent).handleClick()
      .then(() => {
        expect(gameComp.state().counting).toBe(true);
      })
  })

});
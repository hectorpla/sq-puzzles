import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as sinon from 'sinon';

import BoardModel from '../models/BoardModel';
import BoardComponent from './BoardComponent';
import TileComponent from './TileComponent';

enzyme.configure({ adapter: new Adapter() });

const mockOnChange = () => { console.log('should not be invoked') };

describe('<BoardComponent />', () => {
  describe('rendering', () => {
    it('renders 9 tiles when given a board of size 3', () => {
      const board = new BoardModel(3);
      const component = enzyme.shallow(<BoardComponent board={board} itemWidth={1} onChange={mockOnChange} />)
      expect(component.find(TileComponent)).toHaveLength(9);
    });

    it('renders 16 tiles when given a board of size 4', () => {
      const board = new BoardModel(4);
      const component = enzyme.shallow(<BoardComponent board={board} itemWidth={1} onChange={mockOnChange} />)
      expect(component.find(TileComponent)).toHaveLength(16);
    });
  });

  describe('clicking behaviors', () => {
    let board: BoardModel;
    beforeEach(() => {
      board = new BoardModel(3);
    })

    describe('8-puzzle linear clicks (1~8,empty)', () => {
      it('at initial state, onChange() should be invoked once and at tile 6', () => {
        const onChangeSpy = sinon.spy();
        //! full-rendered: might be slow
        const component = enzyme.mount(<BoardComponent board={board} itemWidth={1}
          onChange={onChangeSpy} />);
        const tiles = component.find(TileComponent);

        tiles.forEach((tile, i) => {
          tile.simulate('click');
          console.log(`clicking ${tile}, ${i}`)
        });
        
        //? onChange() called async, expected to fail
        expect(onChangeSpy.callCount).toBe(1);
        expect(tiles.get(5).props.id).toBe('empty');
        expect(tiles.get(8).props.id).toBe(6);
      });
    })

    // TODO: test tile change after click
  });
});

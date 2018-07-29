import * as React from 'react';
import { Board } from '../types';
import TileComponent from './TileComponent';

import './BoardComponent.css';

export interface Props {
  board: Board;
  // other states, like top/left offset
  itemWidth: number;
}

// temporaily
const colors = [
  'red accent-2',
  'deep-purple lighten-2',
  'light-blue lighten-3',
  'yellow lighten-2'
];

class BoardComponent extends React.Component<Props> {
  // TODO: responsive?
  private boardStyle: React.CSSProperties;

  public render() {
    return (
      <div style={this.boardStyle} className="center game-board">
        {this.props.board.tiles.map(tile => {
          let color = "";
          if (typeof tile.id === 'number') {
            color = colors[tile.id % colors.length];
          }
          return (
            <TileComponent key={tile.id} tile={tile}
              dimension={this.props.itemWidth}
              rowItems= {this.props.board.dimensions}
              color={color} />
          )
        })}
      </div>
    )
  }
}

export default BoardComponent;
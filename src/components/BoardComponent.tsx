import * as React from 'react';
import { Board } from '../types';
import TileComponent from './TileComponent';

export interface Props {
  board: Board;
  // other states, like top/left offset
  width: number;
}

class BoardComponent extends React.Component<Props> {
  public render() {
    return (
      <div>
        {this.props.board.tiles.map(tile => (
          <TileComponent key={tile.id} tile={tile} dimension={this.props.width} />
        ))}
      </div>
    )
  }
}

export default BoardComponent;
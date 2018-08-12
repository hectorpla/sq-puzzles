import * as React from 'react';
import { Board } from '../types';
import TileComponent from './TileComponent';

import './BoardComponent.css';

export interface Props {
  board: Board;
  // other states, like top/left offset
  itemWidth: number;
  onChange: () => void;
}

// !temporaily
const colors = [
  'red accent-2',
  'deep-purple lighten-2',
  'light-blue lighten-3',
  'yellow lighten-2',
  'lime accent-3',
  'orange lighten-3',
  'green darken-1',
  'teal accent-2'
];

class BoardComponent extends React.Component<Props> {
  // TODO: responsive?
  private boardStyle: React.CSSProperties;

  public constructor(props: Props) {
    super(props);
    // TODO add horizontal padding
    const width = props.itemWidth * props.board.dimensions;
    this.boardStyle = {
      width
    }
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <div style={this.boardStyle}
        className="game-board brown lighten-2 hoverable">
        {this.props.board.tiles.map(tile => {
          let color = "";
          if (typeof tile.id === 'number') {
            color = colors[tile.id % colors.length];
          }
          return (
            <TileComponent key={tile.id} tile={tile}
              dimension={this.props.itemWidth}
              color={color}
              onMove={this.handleClick} />
          )
        })}
      </div>
    )
  }

  // ? event bubbling
  private handleClick() {
    this.props.onChange();
  }
}

export default BoardComponent;

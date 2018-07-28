import * as React from 'react';
import { Tile } from '../types';

export interface Props {
  tile: Tile; // model
  top: number;
  left: number;
  dimension: number;
  onClick: () => void;
}


class TileComponent extends React.Component<Props> {
  private tileStyle: React.CSSProperties;

  public componentDidMount() {
    this.tileStyle = {
      width: this.props.dimension + 'px',
      height: this.props.dimension + 'px',
      color: "blue"
    }
  }

  public render() {
    return (
      <div style={this.tileStyle}>
        {this.props.tile.id}
      </div>
    )
  }
}

export default TileComponent;
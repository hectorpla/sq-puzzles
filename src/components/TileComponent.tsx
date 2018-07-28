import * as React from 'react';
// import { $log } from 'ts-log-debug';
import { Tile } from '../types';

// $log.name = 'component: tile';
// $log.level = 'debug';

export interface Props {
  tile: Tile; // model
  // top: number;
  // left: number;
  dimension: number;
  // onClick: () => void;
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
    const handleClick = this.handleClick.bind(this);
    return (
      <div style={this.tileStyle} onClick={handleClick}>
        {this.props.tile.id}
      </div>
    )
  }

  private handleClick() {
    console.debug(this.props);
    const { tile } = this.props;
    const originalPosition = tile.location;
    const afterPosition = tile.move();
    if (originalPosition === afterPosition) {
      return;
    }
    throw Error('on implemented');
  }
}

export default TileComponent;
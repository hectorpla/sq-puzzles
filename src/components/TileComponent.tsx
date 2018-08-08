import * as React from 'react';
import { Tile } from '../types';
import './TileComponent.css';


export interface Props {
  tile: Tile; // model
  dimension: number;
  color: string;
}

class TileComponent extends React.Component<Props> {
  private tileStyle: React.CSSProperties;
  private classNames: string = "tile";

  public constructor(prop: any) {
    super(prop);

    const { dimension } = this.props;
    const margin = 2;
    const itemLength = dimension - 2 * margin;
    this.tileStyle = { // implicit length unit: px
      width: itemLength,
      height: itemLength,
      lineHeight: itemLength + 'px',
      fontSize: 20,
      // color: 'white',
      margin: `${margin}px ${margin}px ${margin}px ${margin}px`
    };

    this.classNames += ' ' + this.props.color;
  }

  public render() {
    const tile = this.props.tile;
    const { dimension } = this.props;
    const row = tile.getRow();
    const col = tile.getCol();
    const top = row * dimension;
    const left = col * dimension;

    this.tileStyle = {
      ...this.tileStyle,
      top,
      left
    }
    // console.debug(`square ${this.props.tile.id}: location ${location}, top ${top}, left: ${left}`);

    const handleClick = this.handleClick.bind(this);
    return (
      <div className={this.classNames} style={this.tileStyle}
        onClick={handleClick}>
        <span>
          {this.props.tile.id === 'empty' ? "" : this.props.tile.id}
        </span>
      </div>
    )
  }

  private handleClick() {
    const { tile } = this.props;
    const originalPosition = tile.location;
    const afterPosition = tile.move();
    if (originalPosition === afterPosition) {
      return;
    }
    // ? notify parent?
  }
}

export default TileComponent;

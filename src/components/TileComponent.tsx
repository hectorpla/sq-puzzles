import * as React from 'react';
import { Tile } from '../types';
import './TileComponent.css';


export interface Props {
  tile: Tile; // model
  dimension: number;
  rowItems: number;
  color: string;
}

// TODO: bigger font and center align
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
    const { location } = this.props.tile;
    const { dimension, rowItems } = this.props;
    const row = Math.floor(location / rowItems);
    const col = location % rowItems;
    const top = row * dimension;
    const left = col * dimension;

    this.tileStyle = {
      ...this.tileStyle,
      top: top + 'px',
      left: left + 'px'
    }
    // console.debug(`square ${this.props.tile.id}: location ${location}, top ${top}, left: ${left}`);

    const handleClick = this.handleClick.bind(this);
    return (
      <div className={this.classNames} style={this.tileStyle}
        onClick={handleClick}>
        <span>
          {typeof this.props.tile.id === 'string' ? "" : this.props.tile.id}
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

import * as React from 'react';
import { Tile } from '../types';
import './TileComponent.css';

// ? a little bit strange: import as namespace but used as a function
import * as anime from 'animejs';

// TODO: make anime as a depedency (for test)
export interface Props {
  tile: Tile; // model
  dimension: number;
  color: string;

  /**
   * callback that should be called after animation stops
   */
  afterMove: () => Promise<void>;

  // passed down from GameComponent, sync methods
  freeze?: () => void;
  thaw?: () => void;
}

class TileComponent extends React.Component<Props> {
  private tileStyle: React.CSSProperties;
  private classNames: string = "tile";
  private domId = 'tile-' + this.props.tile.id;

  public constructor(prop: any) {
    super(prop);

    const { dimension } = this.props;
    const margin = 2;
    const itemLength = dimension - 2 * margin;
    this.tileStyle = { // implicit length unit: px
      width: itemLength,
      height: itemLength,
      lineHeight: itemLength + 'px',
      fontSize: itemLength * 0.38,
      margin: `${margin}px ${margin}px ${margin}px ${margin}px`,
    };

    this.classNames += ' ' + this.props.color;
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * trigger tile.move() method in the data model
   * ! theorethical data race of the data model?
   */
  public handleClick() {
    const { tile } = this.props;
    const oldRow = tile.getRow();
    const oldCol = tile.getCol();

    tile.move();

    const row = tile.getRow()
    const col = tile.getCol();
    if (row === oldRow && col === oldCol) {
      return Promise.resolve();
    }
    return this.moveTileComponent(row - oldRow, col - oldCol);
  }

  public render() {
    const tile = this.props.tile;
    const [top, left] = this.getOffset();

    this.tileStyle = {
      ...this.tileStyle,
      top,
      left
    }

    return (
      <div id={this.domId} className={this.classNames} style={this.tileStyle}
        onClick={this.handleClick} >
        <span>
          {tile.id === 'empty' ? "" : this.props.tile.id}
        </span>
      </div>
    )
  }

  private getOffset(): [number, number] {
    const tile = this.props.tile;
    const { dimension } = this.props;
    const row = tile.getRow();
    const col = tile.getCol();
    const top = row * dimension;
    const left = col * dimension;

    return [top, left];
  }

  /**
   * move the tile with top/left offsets
   * ! notice: the translated attribute still exists after re-render
   * @param top row deviation
   * @param left col devation
   */
  private moveTileComponent(top: number, left: number) {
    const { dimension } = this.props;
    left *= dimension;
    top *= dimension;

    console.log(`tile ${this.props.tile.id} moving: ${left}, ${top}`);

    // ? work around that prevents weird behaviors
    // TODO make it parallel
    if (this.props.freeze) {
      this.props.freeze();
    }
    return anime({
      targets: '#' + this.domId,
      translateX: left,
      translateY: top,
      duration: 100,
      easing: 'easeOutQuad',
    }).finished
      .then(() => {
        console.log(`tile ${this.props.tile.id} returning`);
        return this.props.afterMove();
      })
      .then(() => {
        // ? work around
        return anime({
          targets: '#' + this.domId,
          translateX: 0,
          translateY: 0,
          duration: 0,
        }).finished
      })
      .then(() => {
        if (this.props.thaw) { this.props.thaw() }
      });
  }

}

export default TileComponent;

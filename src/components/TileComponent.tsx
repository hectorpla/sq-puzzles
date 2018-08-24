import * as React from 'react';
import { Tile } from '../types';
import './TileComponent.css';

// ? a little bit strange: import as namespace but used as a function
import * as anime from 'animejs';

export interface Props {
  tile: Tile; // model
  dimension: number;
  color: string;

  /**
   * callback that should be called after animation stops
   */
  afterMove: (callback: () => void) => void;

  // passed down from GameComponent
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
        onClick={this.handleClick}>
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
    anime({
      targets: '#' + this.domId,
      translateX: left,
      translateY: top,
      duration: 100,
      easing: 'easeOutQuad',
      complete: (anim) => {
        console.log(`tile ${this.props.tile.id} returning: ${anim.completed}`);
        this.props.afterMove(() => {
          // commented: conflicts with the anime lib: animation only play once
          // const elem = document.querySelector('#' + this.domId)!;
          // elem.classList.add('origin');

          // ? work around
          anime({
            targets: '#' + this.domId,
            translateX: 0,
            translateY: 0,
            duration: 0,
            complete: () => { if (this.props.thaw) { this.props.thaw!() } }
          })
        });
      }
    })
  }

  /**
   * trigger tile.move() method in the data model
   * ! theorethical data race of the data model?
   */
  private handleClick() {
    const { tile } = this.props;
    const oldRow = tile.getRow();
    const oldCol = tile.getCol();

    tile.move();

    const row = tile.getRow()
    const col = tile.getCol();
    if (row === oldRow && col === oldCol) {
      return;
    }

    // ! animation
    this.moveTileComponent(row - oldRow, col - oldCol);
  }
}

export default TileComponent;

import * as React from 'react';
import { Tile } from '../types';
import './TileComponent.css';

// ! mind name confliction in global scope
import Move from 'move-js';

export interface Props {
  tile: Tile; // model
  dimension: number;
  color: string;
  onMove: () => void;

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
    
    // removeEventListener doesn't help here, the problem is moves of other tiles
    console.log(`tile ${this.props.tile.id} moving: ${left}, ${top}`);
    this.props.freeze!();
    new Move('#' + this.domId)
      .duration(800)
      .translate(left, top)
      .then(this.props.onMove) // ? work around for view updating
      .end(() => {
        // ! another work around to restore place after re-render
        // ! problems happend when the duration is long
        // reference to CSS3, can specify at which point in the animation
        // the movement starts
        console.log(`tile ${this.props.tile.id} returning`)
        // new Move('#' + this.domId)
        //   .duration(0)
        //   .to(0, 0)
        //   .end();
        const elem = document.querySelector('#' + this.domId)!;
        elem.classList.add('origin');
        this.props.thaw!();
      });
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
    // ? notify parent? No: event bubling to the board (parent)

    // ! animation
    // console.log('moving', `row: ${row}, oldRow: ${oldRow}; col: ${col}, oldCol: ${oldCol}`);
    this.moveTileComponent(row - oldRow, col - oldCol);
  }
}

export default TileComponent;

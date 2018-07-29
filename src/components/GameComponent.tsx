import * as React from 'react';
import { Game } from '../types';
import { getNewGame } from '../utils';
import BoardComponent from './BoardComponent';
import './GameComponent.css';

export interface Props {
  dimensions: number;
}

class GameComponent extends React.Component<Props> {
  private game: Game;
  private itemWidth: number = 80;
  private gamePanelStyle: React.CSSProperties;

  public constructor(props: Props) {
    super(props);
    this.game = getNewGame(this.props.dimensions);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;

    this.gamePanelStyle = {
      width: size,
      height: size
    }
  }

  // TODO: center the game board; failed 
  public render() {
    return (
      <div>
        <div style={this.gamePanelStyle} className="game-board-panel">
          <div className="center">
            <BoardComponent board={this.game.board} itemWidth={this.itemWidth} />
          </div>
        </div>
        <div className="control-panel center">
          <button>New Game</button>
        </div>
      </div>
    )
  }
}

export default GameComponent;
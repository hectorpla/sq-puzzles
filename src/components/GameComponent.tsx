import * as React from 'react';
import { Game } from '../types';
import { getNewGame } from '../utils';
import BoardComponent from './BoardComponent';
import './GameComponent.css';

export interface Props {
  dimensions: number;
  itemWidth?: number;
}

export interface State {
  game: Game;
  // TODO: game speed
}

class GameComponent extends React.Component<Props, State> {
  public state = {
    game: getNewGame(this.props.dimensions)
  }

  private itemWidth: number = this.props.itemWidth || 80;
  private gamePanelStyle: React.CSSProperties;

  public constructor(props: Props) {
    super(props);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;
    this.gamePanelStyle = {
      height: size
    }
    this.handleGameBoardChagne = this.handleGameBoardChagne.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  public handleGameBoardChagne() {
    this.setState(this.state, () => {
      // !bug: callback invoked before re-rendering
      if (this.state.game.board.isFinished()) {
        alert('Congrad! you finisehd');
      }
    });
    // console.log(this.state.game.board.tiles);
  }

  public render() {
    const dimensions = this.props.dimensions;
    return (
      <div className="container">
        <div className="title row">
          <p className="center">{dimensions * dimensions - 1}-puzzle </p>
        </div>
        <div style={this.gamePanelStyle} className="game-board-panel row">
          <BoardComponent
            board={this.state.game.board}
            itemWidth={this.itemWidth}
            onChange={this.handleGameBoardChagne} />
        </div>
        <div>
          {/* TODO: animation for match changes */}

          <div className="control-panel row center">
            <div className="col s6">
              <div className="card-panel blue-grey lighten-2 col s8 offset-s2">
                <i className="material-icons inline-icon">change_history</i> matched tiles: {this.state.game.board.matchedPlaces}
              </div>
            </div>
            <div className="col s6">
              <button className="waves-effect teal btn" onClick={this.resetGame}>New Game</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private resetGame() {
    this.state.game.reset();
    this.setState(this.state);
  }
}

export default GameComponent;
